'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import clsx from 'clsx';
import { usePathname } from '@/i18n/routing';
import { firm, type Locale } from '@/content/site';
import { useSubmit } from '@/lib/submit';
import { Sceau } from '../acte';
import { Fleche } from '../ui';

export interface DomaineRdv {
  slug: string;
  nom: string;
}

/** Champs de la feuille (noms repris de la maquette, les styles s'y réfèrent) → champs de l'API. */
const VERS_FEUILLE: Record<string, string> = {
  name: 'nom',
  organisation: 'org',
  email: 'mel',
  phone: 'tel',
  subject: 'objet',
  message: 'precisions',
  consent: 'accord',
};

const A_COMPLETER = {
  nom: { fr: 'votre nom', en: 'your name' },
  mel: { fr: 'une adresse e-mail valide', en: 'a valid email address' },
  accord: { fr: 'votre accord', en: 'your consent' },
} as const;
type Requis = keyof typeof A_COMPLETER;

const enumerer = (items: string[], et: string) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} ${et} ${items[items.length - 1]}`;

/**
 * « Prendre rendez-vous » (maquette i.html, « Rendez-vous V3 ») : la demande se
 * remplit comme un acte. La phrase est découpée en membres (`.l`) : elle se lit
 * d'un trait sur ordinateur, et chaque membre fait une ligne nette sur
 * téléphone. Les précisions et l'accord vont dans la marge ; en bas, la date du
 * jour à Lomé, le bouton et le téléphone. Quand l'envoi a réussi, le cabinet y
 * appose son tampon « Reçu ».
 *
 * L'envoi passe par l'API existante (/api/contact, voir lib/submit.ts), comme
 * le formulaire de la page Contact : jamais de faux succès.
 *
 * L'objet peut être prérempli de deux façons : le paramètre d'adresse
 * `?objet=<slug>` et l'événement `rdv:objet` émis sur `window`
 * (`CustomEvent` dont `detail` est le slug du domaine).
 *
 * La feuille ne s'affiche pas sur les pages qui ont déjà leur formulaire.
 */
export function RendezVous({ locale, domaines }: { locale: Locale; domaines: DomaineRdv[] }) {
  const fr = locale === 'fr';
  const pathname = usePathname();
  const feuille = useRef<HTMLFormElement>(null);
  const { state, submit, reset } = useSubmit(locale);
  const [objet, setObjet] = useState('');
  const [manque, setManque] = useState<string[]>([]);
  const [jour, setJour] = useState<{ long: string; court: string } | null>(null);

  const masquee = pathname === '/contact' || pathname === '/carrieres';
  const envoi = state.status === 'sending';
  const recu = state.status === 'sent';

  // La date du jour à Lomé, posée après l'hydratation (le rendu serveur ne connaît pas le jour de la visite).
  useEffect(() => {
    const dater = (options: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(fr ? 'fr-FR' : 'en-GB', { timeZone: 'Africa/Lome', ...options }).format(new Date());
    const long = dater({ day: 'numeric', month: 'long', year: 'numeric' });
    setJour({
      long: fr ? long.replace(/^1 /, '1er ') : long,
      court: dater({ day: '2-digit', month: '2-digit', year: 'numeric' }),
    });
  }, [fr]);

  // Objet prérempli : paramètre d'adresse, puis événement émis par le répertoire.
  useEffect(() => {
    const connus = new Set(domaines.map((d) => d.slug));
    const poser = (slug: unknown) => {
      if (typeof slug === 'string' && (connus.has(slug) || slug === 'autre')) setObjet(slug);
    };
    poser(new URLSearchParams(window.location.search).get('objet'));
    const ecouter = (e: Event) => poser((e as CustomEvent<unknown>).detail);
    window.addEventListener('rdv:objet', ecouter);
    return () => window.removeEventListener('rdv:objet', ecouter);
  }, [domaines]);

  // Repli pour les navigateurs sans `field-sizing` : la largeur du champ suit ce qu'on y écrit.
  useEffect(() => {
    const form = feuille.current;
    if (!form || CSS.supports('field-sizing', 'content')) return;
    const champs = Array.from(form.querySelectorAll<HTMLInputElement>('.phrase input'));
    const ajuster = (el: HTMLInputElement) => {
      el.style.width = `${Math.max((el.value || el.placeholder).length, 7) + 2}ch`;
    };
    const suivre = (e: Event) => ajuster(e.currentTarget as HTMLInputElement);
    champs.forEach((el) => {
      ajuster(el);
      el.addEventListener('input', suivre);
    });
    return () => champs.forEach((el) => el.removeEventListener('input', suivre));
  }, [masquee]);

  if (masquee) return null;

  const signale = (nom: string) => {
    const parServeur = state.status === 'error' && state.fields?.some((f) => (VERS_FEUILLE[f] ?? f) === nom);
    return manque.includes(nom) || parServeur ? true : undefined;
  };

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (envoi || recu) return;
    const form = e.currentTarget;
    const champ = (nom: string) => form.elements.namedItem(nom) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const valeur = (nom: string) => champ(nom).value.trim();

    const defauts: Requis[] = [];
    if (valeur('nom').length < 2) defauts.push('nom');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valeur('mel'))) defauts.push('mel');
    if (!(champ('accord') as HTMLInputElement).checked) defauts.push('accord');
    setManque(defauts);
    const premier = defauts[0];
    if (premier) {
      if (state.status === 'error') reset();
      champ(premier).focus();
      return;
    }

    const slug = valeur('objet');
    await submit({
      kind: 'rendez-vous',
      name: valeur('nom'),
      organisation: valeur('org'),
      email: valeur('mel'),
      phone: valeur('tel'),
      subject: domaines.find((d) => d.slug === slug)?.nom ?? (slug === 'autre' ? (fr ? 'Autre question' : 'Another matter') : ''),
      // L'API exige un message : sans précision, la demande le dit en clair.
      message: valeur('precisions') || (fr ? 'Demande de rendez-vous, sans précision à ce stade.' : 'Meeting request, no details at this stage.'),
      consent: true,
      website: valeur('website'),
    });
  }

  // Dès qu'on corrige un champ, son signalement tombe ; un message d'erreur d'envoi s'efface aussi.
  function corriger(e: FormEvent<HTMLFormElement>) {
    const nom = (e.target as HTMLInputElement).name;
    if (manque.includes(nom)) setManque((m) => m.filter((n) => n !== nom));
    if (state.status === 'error') reset();
  }

  let retour = '';
  if (manque.length) {
    const liste = enumerer(manque.map((n) => A_COMPLETER[n as Requis][locale]), fr ? 'et' : 'and');
    retour = fr ? `Il manque ${liste}.` : `Missing: ${liste}.`;
  } else if (state.status === 'error') {
    retour = state.message;
  } else if (recu) {
    retour = fr
      ? 'Le cabinet a bien reçu votre demande. Un avocat vous répondra à l’adresse indiquée.'
      : 'The firm has received your request. A lawyer will reply to the address you gave.';
  }
  const enErreur = manque.length > 0 || state.status === 'error';

  const telephone = firm.phone.replace(/ /g, ' ');

  return (
    <div className="shell acte2">
      <form ref={feuille} className="feuille coin" id="rdv" noValidate onSubmit={envoyer} onInput={corriger}>
        <h2>{fr ? 'Prendre rendez-vous' : 'Book a meeting'}</h2>
        <p className="phrase">
          <span className="l">
            {fr ? 'Je soussigné(e) ' : 'I, the undersigned '}
            <span className="nb">
              <input
                name="nom"
                type="text"
                autoComplete="name"
                aria-label={fr ? 'Prénom et nom' : 'First and last name'}
                placeholder={fr ? 'prénom et nom' : 'first and last name'}
                required
                maxLength={120}
                aria-invalid={signale('nom')}
              />
              ,
            </span>
          </span>{' '}
          <span className="l">
            {fr ? 'agissant pour ' : 'acting for '}
            <span className="nb">
              <input
                name="org"
                type="text"
                autoComplete="organization"
                aria-label={fr ? 'Société ou organisation (facultatif)' : 'Company or organisation (optional)'}
                placeholder={fr ? 'ma société, ou moi-même' : 'my company, or myself'}
                maxLength={160}
              />
              ,
            </span>
          </span>{' '}
          <span className="l">
            {fr ? 'souhaite m’entretenir avec un avocat du cabinet.' : 'wish to speak with a lawyer of the firm.'}
          </span>{' '}
          <span className="l">
            {fr ? 'Objet : ' : 'Subject: '}
            <span className="nb">
              <select
                name="objet"
                aria-label={fr ? 'Objet de la demande' : 'Subject of the request'}
                value={objet}
                onChange={(e) => setObjet(e.target.value)}
              >
                <option value="">{fr ? 'un domaine à préciser' : 'an area to be specified'}</option>
                {domaines.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.nom}
                  </option>
                ))}
                <option value="autre">{fr ? 'une autre question' : 'another matter'}</option>
              </select>
              .
            </span>
          </span>{' '}
          <span className="l">
            {fr ? 'Je peux être joint(e) à ' : 'I can be reached at '}
            <span className="nb">
              <input
                name="mel"
                type="email"
                autoComplete="email"
                aria-label={fr ? 'Adresse e-mail' : 'Email address'}
                placeholder={fr ? 'mon adresse e-mail' : 'my email address'}
                required
                maxLength={200}
                aria-invalid={signale('mel')}
              />
            </span>
          </span>{' '}
          <span className="l">
            {fr ? 'ou au ' : 'or on '}
            <span className="nb">
              <input
                name="tel"
                type="tel"
                autoComplete="tel"
                aria-label={fr ? 'Téléphone (facultatif)' : 'Phone (optional)'}
                placeholder={fr ? 'téléphone, facultatif' : 'phone, optional'}
                maxLength={40}
              />
              .
            </span>
          </span>
        </p>
        <div className="marge">
          <label className="precis">
            <span>
              {fr
                ? 'Précisions utiles (facultatif). N’indiquez rien de confidentiel à ce stade.'
                : 'Useful details (optional). Do not include anything confidential at this stage.'}
            </span>
            <textarea name="precisions" rows={2} maxLength={5000} aria-invalid={signale('precisions')} />
          </label>
          <label className="accord">
            <input type="checkbox" name="accord" required aria-invalid={signale('accord')} />
            <span>
              {fr
                ? 'J’accepte que le cabinet utilise ces informations pour répondre à ma demande. Elle est lue par un avocat, sous le sceau du secret professionnel.'
                : 'I agree to the firm using this information to answer my request. It is read by a lawyer, under professional secrecy.'}
            </span>
          </label>
        </div>
        {/* Pot de miel : invisible, jamais rempli par une personne. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <div className="signe">
          <p className="fait">
            {jour ? (fr ? `Fait le ${jour.long}.` : `Done on ${jour.long}.`) : fr ? 'Fait ce jour.' : 'Done this day.'}
          </p>
          <button className="btn" type="submit" disabled={envoi || recu}>
            {envoi
              ? fr
                ? 'Envoi en cours…'
                : 'Sending…'
              : recu
                ? fr
                  ? 'Demande envoyée'
                  : 'Request sent'
                : fr
                  ? 'Signer et envoyer'
                  : 'Sign and send'}
            {!envoi && !recu && (
              <>
                {' '}
                <Fleche />
              </>
            )}
          </button>
          <a className="lien" href={`tel:${firm.phone.replace(/\s/g, '')}`}>
            {fr ? `ou par téléphone : ${telephone}` : `or by phone: ${telephone}`}
          </a>
          <p className={clsx('retour', enErreur && 'err')} role="status">
            {retour}
          </p>
        </div>
        <Sceau papier />
        <p className={clsx('tampon', recu && 'pose')} aria-hidden="true">
          <b>{fr ? 'Reçu' : 'Received'}</b>
          <br />
          <span>{jour ? (fr ? `le ${jour.court}` : jour.court) : ''}</span>
        </p>
      </form>
    </div>
  );
}
