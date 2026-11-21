import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Réception des formulaires (contact, rendez-vous, candidature, newsletter).
 * Envoi via l'API Resend si RESEND_API_KEY et CONTACT_TO sont configurés.
 * Sans configuration, la route répond 503 avec un message explicite : le
 * formulaire n'affiche jamais un faux succès.
 */

const schema = z.object({
  kind: z.enum(['contact', 'rendez-vous', 'candidature', 'newsletter']),
  locale: z.enum(['fr', 'en']).default('fr'),
  name: z.string().trim().max(120).optional().default(''),
  organisation: z.string().trim().max(160).optional().default(''),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().default(''),
  subject: z.string().trim().max(160).optional().default(''),
  message: z.string().trim().max(5000).optional().default(''),
  consent: z.literal(true),
  website: z.string().max(0).optional(), // pot de miel
});

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    // Pot de miel rempli : on répond comme un succès sans rien envoyer.
    if ((body as { website?: string })?.website) return NextResponse.json({ ok: true });
    return NextResponse.json(
      { ok: false, error: 'invalid', fields: Object.keys(parsed.error.flatten().fieldErrors) },
      { status: 400 },
    );
  }

  const data = parsed.data;
  if (data.kind !== 'newsletter' && (!data.name || !data.message)) {
    return NextResponse.json({ ok: false, error: 'invalid', fields: ['name', 'message'].filter((f) => !data[f as 'name']) }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !to || !from) {
    console.error('[contact] RESEND_API_KEY, CONTACT_TO ou EMAIL_FROM manquant : message non envoyé.');
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  const rows: [string, string][] = (
  [
    ['Type', data.kind],
    ['Nom', data.name],
    ['Organisation', data.organisation],
    ['Email', data.email],
    ['Téléphone', data.phone],
    ['Objet', data.subject],
    ['Langue', data.locale],
  ] as [string, string][]
  ).filter(([, v]) => v);

  const html = `<table>${rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5b6678">${k}</td><td>${escape(v)}</td></tr>`)
    .join('')}</table><p style="white-space:pre-wrap">${escape(data.message)}</p>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: to.split(',').map((s) => s.trim()),
      reply_to: data.email,
      subject: `[Site] ${data.kind}${data.subject ? ` : ${data.subject}` : ''}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error('[contact] Échec Resend', res.status, await res.text().catch(() => ''));
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
