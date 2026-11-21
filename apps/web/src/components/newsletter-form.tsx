'use client';

import { useId } from 'react';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/content/site';
import { useSubmit } from '@/lib/submit';

export function NewsletterForm({ locale }: { locale: Locale }) {
  const { state, submit } = useSubmit(locale);
  const id = useId();
  const fr = locale === 'fr';

  if (state.status === 'sent') {
    return (
      <p className="t-small mt-4 text-white" role="status">
        {fr ? 'Inscription enregistrée. Vous recevrez la prochaine publication.' : 'Subscribed. You will receive the next issue.'}
      </p>
    );
  }

  return (
    <form
      className="mt-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        await submit({
          kind: 'newsletter',
          email: fd.get('email'),
          consent: fd.get('consent') === 'on',
          website: fd.get('website') ?? '',
        });
      }}
    >
      <div className="flex gap-2">
        <label htmlFor={`${id}-email`} className="sr-only">
          {fr ? 'Adresse e-mail' : 'Email address'}
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={fr ? 'nom@entreprise.com' : 'name@company.com'}
          className="field border-white/20 bg-white/5 text-white placeholder:text-mist hover:border-white/40"
        />
        <button type="submit" className="btn btn-primary shrink-0" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? (fr ? 'Envoi…' : 'Sending…') : fr ? 'S’inscrire' : 'Subscribe'}
        </button>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="t-small mt-3 flex items-start gap-2 text-mist">
        <input type="checkbox" name="consent" required className="mt-[3px] accent-white" />
        <span>
          {fr ? 'J’accepte que mon adresse soit utilisée pour cet envoi. ' : 'I agree to my address being used for this mailing. '}
          <Link href="/confidentialite" className="link text-haze">
            {fr ? 'Confidentialité' : 'Privacy'}
          </Link>
        </span>
      </label>
      {state.status === 'error' && (
        <p className="t-small mt-3 text-[#ffb4a8]" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
