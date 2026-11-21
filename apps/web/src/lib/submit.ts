'use client';

import { useState } from 'react';
import type { Locale } from '@/content/site';
import { firm } from '@/content/site';

export type SubmitState =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'sent' }
  | { status: 'error'; message: string; fields?: string[] };

const messages = {
  rate_limited: {
    fr: 'Trop d’envois depuis cette connexion. Réessayez dans dix minutes.',
    en: 'Too many submissions from this connection. Try again in ten minutes.',
  },
  invalid: {
    fr: 'Certains champs sont incomplets. Vérifiez les champs signalés.',
    en: 'Some fields are incomplete. Check the highlighted fields.',
  },
  not_configured: {
    fr: `L’envoi en ligne n’est pas encore activé. Écrivez-nous directement à ${firm.email}.`,
    en: `Online sending is not active yet. Write to us directly at ${firm.email}.`,
  },
  send_failed: {
    fr: `Le message n’a pas pu partir. Réessayez ou écrivez à ${firm.email}.`,
    en: `The message could not be sent. Try again or write to ${firm.email}.`,
  },
  network: {
    fr: 'Connexion interrompue. Vérifiez votre réseau et réessayez.',
    en: 'Connection lost. Check your network and try again.',
  },
};

export function useSubmit(locale: Locale) {
  const [state, setState] = useState<SubmitState>({ status: 'idle' });

  async function submit(payload: Record<string, unknown>) {
    setState({ status: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, locale }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: keyof typeof messages; fields?: string[] };
      if (res.ok && json.ok) {
        setState({ status: 'sent' });
        return true;
      }
      const key = json.error && json.error in messages ? json.error : 'send_failed';
      setState({ status: 'error', message: messages[key][locale], fields: json.fields });
    } catch {
      setState({ status: 'error', message: messages.network[locale] });
    }
    return false;
  }

  return { state, submit, reset: () => setState({ status: 'idle' }) };
}
