/**
 * Limitation de débit en mémoire pour les formulaires publics.
 *
 * L'adresse IP n'est utilisée que si elle vient d'une source que le client
 * ne peut pas falsifier :
 *  - sur Vercel, les en-têtes posés par la plateforme ;
 *  - derrière un reverse proxy déclaré (TRUSTED_PROXY_HOPS), l'entrée de
 *    X-Forwarded-For ajoutée par ce proxy, comptée depuis la droite.
 * Sinon aucune IP n'est fiable : toutes les requêtes partagent un seul
 * compteur, plus large, plutôt que de se fier à un en-tête forgeable.
 *
 * Limite connue : le compteur vit dans la mémoire d'une instance. En
 * serverless il ne survit pas d'une instance à l'autre ; pour une limite
 * stricte, ajouter une règle de rate limiting côté hébergeur ou un stockage
 * partagé (Redis).
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_CLIENT = 5;
const MAX_UNTRUSTED = 20;
const MAX_KEYS = 5000;

const isIp = (s: string) => s.length <= 45 && /^[0-9a-fA-F:.]+$/.test(s);

export function trustedClientIp(headers: Headers, env: NodeJS.ProcessEnv = process.env): string | null {
  if (env.VERCEL === '1') {
    const fromPlatform = (headers.get('x-vercel-forwarded-for') ?? headers.get('x-real-ip') ?? '').split(',')[0]!.trim();
    return isIp(fromPlatform) ? fromPlatform : null;
  }

  const hops = Number.parseInt(env.TRUSTED_PROXY_HOPS ?? '0', 10);
  if (Number.isInteger(hops) && hops > 0) {
    const chain = (headers.get('x-forwarded-for') ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const candidate = chain[chain.length - hops];
    return candidate && isIp(candidate) ? candidate : null;
  }

  return null;
}

const hits = new Map<string, number[]>();

function prune(now: number) {
  for (const [key, times] of hits) {
    if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  // Toujours pleine : on retire les plus anciennes (ordre d'insertion) pour
  // laisser la place à la clé qui va être ajoutée.
  for (const key of hits.keys()) {
    if (hits.size < MAX_KEYS) break;
    hits.delete(key);
  }
}

/** Enregistre la requête et dit si elle dépasse la limite. */
export function rateLimited(headers: Headers, now: number = Date.now()): boolean {
  const ip = trustedClientIp(headers);
  const key = ip ? `ip:${ip}` : 'untrusted';
  const max = ip ? MAX_PER_CLIENT : MAX_UNTRUSTED;

  if (hits.size >= MAX_KEYS && !hits.has(key)) prune(now);

  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

/** Nombre de clients suivis en mémoire (supervision et tests). */
export const trackedClients = () => hits.size;
