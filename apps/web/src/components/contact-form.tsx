'use client';

import { useId, useState } from 'react';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/content/site';
import { useSubmit } from '@/lib/submit';
import { Fleche } from './ui';

export function ContactForm({
  locale,
  practiceOptions,
  defaultKind = 'rendez-vous',
}: {
  locale: Locale;
  practiceOptions: { slug: string; name: string }[];
  defaultKind?: 'rendez-vous' | 'contact' | 'candidature';
}) {
  const fr = locale === 'fr';
  const id = useId();
  const { state, submit, reset } = useSubmit(locale);
  const [kind, setKind] = useState(defaultKind);
  const invalid = (f: string) => (state.status === 'error' && state.fields?.includes(f) ? true : undefined);

  if (state.status === 'sent') {
    return (
      <div role="status" className="panneau">
        <p className="t-h3">{fr ? 'Message envoyé' : 'Message sent'}</p>
        <p className="mt-3">
          {fr
            ? 'Le cabinet a bien reçu votre message. Un avocat vous répondra à l’adresse indiquée.'
            : 'The firm has received your message. A lawyer will reply to the address you gave.'}
        </p>
        <button type="button" onClick={reset} className="lien mt-6">
          {fr ? 'Écrire un autre message' : 'Write another message'}
        </button>
      </div>
    );
  }

  const label = 'etiq';

  return (
    <form
      noValidate={false}
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const subject = String(fd.get('subject') ?? '');
        await submit({
          kind,
          name: fd.get('name'),
          organisation: fd.get('organisation'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          subject: subject
            ? practiceOptions.find((o) => o.slug === subject)?.name ?? subject
            : '',
          message: fd.get('message'),
          consent: fd.get('consent') === 'on',
          website: fd.get('website') ?? '',
        });
      }}
      className="grid gap-5 sm:grid-cols-2"
    >
      <fieldset className="sm:col-span-2">
        <legend className={label}>{fr ? 'Votre demande' : 'Your request'}</legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ['rendez-vous', fr ? 'Prendre rendez-vous' : 'Book a meeting'],
              ['contact', fr ? 'Poser une question' : 'Ask a question'],
              ['candidature', fr ? 'Candidature' : 'Application'],
            ] as const
          ).map(([value, text]) => (
            <button key={value} type="button" className="filtre" aria-pressed={kind === value} onClick={() => setKind(value)}>
              {text}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${id}-name`} className={label}>
          {fr ? 'Nom et prénom' : 'Full name'}
        </label>
        <input id={`${id}-name`} name="name" required autoComplete="name" className="field" aria-invalid={invalid('name')} />
      </div>
      <div>
        <label htmlFor={`${id}-org`} className={label}>
          {fr ? 'Organisation (facultatif)' : 'Organisation (optional)'}
        </label>
        <input id={`${id}-org`} name="organisation" autoComplete="organization" className="field" />
      </div>
      <div>
        <label htmlFor={`${id}-email`} className={label}>
          {fr ? 'E-mail' : 'Email'}
        </label>
        <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className="field" aria-invalid={invalid('email')} />
      </div>
      <div>
        <label htmlFor={`${id}-phone`} className={label}>
          {fr ? 'Téléphone (facultatif)' : 'Phone (optional)'}
        </label>
        <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className="field" />
      </div>
      {kind !== 'candidature' && (
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-subject`} className={label}>
            {fr ? 'Domaine concerné (facultatif)' : 'Area of law (optional)'}
          </label>
          <select id={`${id}-subject`} name="subject" className="field" defaultValue="">
            <option value="">{fr ? 'Je ne sais pas encore' : 'Not sure yet'}</option>
            {practiceOptions.map((o) => (
              <option key={o.slug} value={o.slug}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={label}>
          {kind === 'candidature'
            ? fr
              ? 'Présentez-vous en quelques lignes (poste visé, disponibilités)'
              : 'Introduce yourself (position sought, availability)'
            : fr
              ? 'Décrivez votre situation'
              : 'Describe your situation'}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={6}
          maxLength={5000}
          className="field min-h-44 resize-y"
          aria-invalid={invalid('message')}
          aria-describedby={`${id}-message-hint`}
        />
        <p id={`${id}-message-hint`} className="t-small mt-2">
          {fr
            ? 'N’indiquez pas d’informations confidentielles à ce stade : un avocat vous recontactera pour en parler.'
            : 'Do not include confidential information at this stage: a lawyer will contact you to discuss it.'}
        </p>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="flex items-start gap-3 text-[16px] sm:col-span-2">
        <input type="checkbox" name="consent" required className="coche" />
        <span>
          {fr
            ? 'J’accepte que le cabinet utilise ces informations pour répondre à ma demande. '
            : 'I agree to the firm using this information to answer my request. '}
          <Link href="/confidentialite" className="link">
            {fr ? 'Politique de confidentialité' : 'Privacy policy'}
          </Link>
        </span>
      </label>

      {state.status === 'error' && (
        <p role="alert" className="alerte sm:col-span-2">
          {state.message}
        </p>
      )}

      <div className="sm:col-span-2">
        <button type="submit" className="btn" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? (fr ? 'Envoi en cours…' : 'Sending…') : fr ? 'Envoyer le message' : 'Send message'}
          {state.status !== 'sending' && <Fleche />}
        </button>
      </div>
    </form>
  );
}
