'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/content/site';
import { gsap, pointeurFin, reduit, useGSAP } from '@/lib/gsap';
import { lenisCourant } from '@/lib/scroll';
import { Fleche } from '../ui';
import { EVT_DOMAINE, demanderRendezVous } from './evenements';

export interface DomaineRepertoire {
  slug: string;
  nom: string;
  /** Initiale sans accent, en capitale : le groupe de la liste et l'onglet */
  lettre: string;
  /** Présentation du domaine */
  texte: string;
  prestations: string[];
  /** Domaines voisins (« Voir aussi ») */
  lies: { slug: string; nom: string }[];
  /** Slugs des avocats qui suivent ce domaine */
  referents: string[];
  href: { pathname: '/expertises/[slug]' | '/secteurs/[slug]'; params: { slug: string } };
}

export interface ReferentRepertoire {
  nom: string;
  titre: string;
  photo: string | null;
}

/** Normalise pour la recherche : sans accents, en minuscules, apostrophes neutralisées. */
const plier = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’']/g, ' ');

/** Prénom + nom de famille (on ignore les initiales intermédiaires « P. », « Y. H. »). */
const initiales = (nom: string) => {
  const mots = nom.split(/\s+/).filter((m) => /^[A-ZÀ-Ý]/.test(m) && !m.endsWith('.'));
  return (mots[0]?.[0] ?? '') + (mots.length > 1 ? mots[mots.length - 1]![0] : '');
};

/** Le nom du domaine, avec les termes cherchés surlignés. */
function surligner(nom: string, termes: string[]) {
  const base = plier(nom);
  const marques: [number, number][] = [];
  termes.forEach((t) => {
    const i = base.indexOf(t);
    if (i > -1) marques.push([i, i + t.length]);
  });
  // Si la normalisation a changé la longueur (ligatures…), on ne surligne pas : les positions ne correspondraient plus.
  if (!marques.length || base.length !== nom.length) return nom;
  marques.sort((a, b) => a[0] - b[0]);
  const morceaux: React.ReactNode[] = [];
  let pos = 0;
  marques.forEach(([a, b]) => {
    if (a < pos) return;
    if (a > pos) morceaux.push(nom.slice(pos, a));
    morceaux.push(<mark key={a}>{nom.slice(a, b)}</mark>);
    pos = b;
  });
  if (pos < nom.length) morceaux.push(nom.slice(pos));
  return morceaux;
}

interface Demande {
  slug: string;
  /** Ne pas recaler la liste (survol, onglet) */
  garderListe?: boolean;
  /** Faire défiler la page jusqu'au répertoire et y porter le focus (demande venue d'ailleurs) */
  defiler?: boolean;
  n: number;
}

/**
 * Le répertoire en trois volets (maquette i.html) : le filtre en tête, la liste
 * des domaines par lettre à gauche, la fiche du domaine à droite, et les onglets
 * de lettres sur la tranche.
 *
 * Clavier : flèche bas depuis le filtre pour entrer dans la liste ; flèches,
 * Début et Fin dans la liste (flèche haut depuis le premier pour revenir au
 * filtre) ; Échap vide le filtre. Le domaine s'ouvre au clic, au focus et,
 * avec une souris, après un court survol.
 *
 * Le répertoire écoute « aqp:domaine » (voir evenements.ts) : une puce de
 * domaine ailleurs dans la page l'ouvre et y fait défiler la page.
 */
export function RepertoireVolets({
  domaines,
  referents,
  locale,
}: {
  /** Domaines déjà triés dans la langue de la page */
  domaines: DomaineRepertoire[];
  referents: Record<string, ReferentRepertoire>;
  locale: Locale;
}) {
  const fr = locale === 'fr';
  const uid = useId();
  const parSlug = useMemo(() => new Map(domaines.map((d) => [d.slug, d])), [domaines]);
  const cles = useMemo(
    () => new Map(domaines.map((d) => [d.slug, plier([d.nom, d.texte, ...d.prestations].join(' '))])),
    [domaines],
  );
  const groupes = useMemo(() => {
    const parLettre = new Map<string, DomaineRepertoire[]>();
    domaines.forEach((d) => parLettre.set(d.lettre, [...(parLettre.get(d.lettre) ?? []), d]));
    return [...parLettre.entries()].map(([lettre, lignes]) => ({ lettre, lignes }));
  }, [domaines]);

  const [q, setQ] = useState('');
  const [courant, setCourant] = useState(() => (parSlug.has('arbitrage') ? 'arbitrage' : (domaines[0]?.slug ?? '')));
  const [demande, setDemande] = useState<Demande | null>(null);

  const termes = useMemo(() => plier(q).split(/\s+/).filter(Boolean), [q]);
  const visibles = useMemo(
    () => domaines.filter((d) => termes.every((t) => cles.get(d.slug)!.includes(t))).map((d) => d.slug),
    [domaines, cles, termes],
  );
  const estVisible = useMemo(() => new Set(visibles), [visibles]);

  const champ = useRef<HTMLInputElement>(null);
  const liste = useRef<HTMLElement>(null);
  const detail = useRef<HTMLDivElement>(null);
  const boutons = useRef(new Map<string, HTMLButtonElement>());
  const sections = useRef(new Map<string, HTMLElement>());
  const intention = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const compteur = useRef(0);
  const premierRendu = useRef(true);

  const ouvrir = useCallback(
    (slug: string, opts: { garderListe?: boolean; defiler?: boolean } = {}) => {
      if (!parSlug.has(slug)) return;
      if (opts.defiler) setQ('');
      setCourant(slug);
      compteur.current += 1;
      setDemande({ slug, ...opts, n: compteur.current });
    },
    [parSlug],
  );

  // Le filtre change : si le domaine ouvert ne répond plus, on ouvre le premier qui répond ; la liste remonte.
  useEffect(() => {
    if (visibles.length && !estVisible.has(courant)) setCourant(visibles[0]!);
    if (liste.current) liste.current.scrollTop = 0;
    // On ne réagit qu'au texte du filtre, pas au domaine ouvert.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  // Après chaque ouverture : la liste se recale sans faire défiler la page ; une demande venue d'ailleurs amène la page ici.
  useEffect(() => {
    if (!demande) return;
    const l = liste.current;
    const b = boutons.current.get(demande.slug);
    if (l && b && !demande.garderListe) {
      const haut = b.getBoundingClientRect().top - l.getBoundingClientRect().top + l.scrollTop;
      const bas = haut + b.offsetHeight;
      if (haut < l.scrollTop + 46) l.scrollTop = Math.max(haut - 46, 0);
      else if (bas > l.scrollTop + l.clientHeight) l.scrollTop = bas - l.clientHeight + 12;
    }
    if (demande.defiler) {
      const section = document.getElementById('expertises');
      if (section) {
        const lenis = lenisCourant();
        if (lenis) lenis.scrollTo(section, { offset: -100, duration: 1.1 });
        else section.scrollIntoView({ behavior: reduit() ? 'auto' : 'smooth', block: 'start' });
      }
      detail.current?.focus({ preventScroll: true });
    }
  }, [demande]);

  // La fiche change : elle repart du haut et ses éléments montent l'un après l'autre.
  useGSAP(
    () => {
      const d = detail.current;
      if (!d) return;
      d.scrollTop = 0;
      if (premierRendu.current) {
        premierRendu.current = false;
        return;
      }
      if (reduit()) return;
      gsap.fromTo(
        d.querySelectorAll('.r-d > div > *'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'expo.out', stagger: 0.03, overwrite: true, clearProps: 'transform,opacity' },
      );
    },
    { dependencies: [courant] },
  );

  // Une puce de domaine ailleurs dans la page (fiche d'associé…) ouvre le domaine ici.
  useEffect(() => {
    const surDomaine = (e: Event) => {
      const slug = (e as CustomEvent<{ slug?: string }>).detail?.slug;
      if (slug) ouvrir(slug, { defiler: true });
    };
    window.addEventListener(EVT_DOMAINE, surDomaine);
    return () => window.removeEventListener(EVT_DOMAINE, surDomaine);
  }, [ouvrir]);

  useEffect(() => () => clearTimeout(intention.current), []);

  const focaliser = (slug: string | undefined) => {
    if (slug) boutons.current.get(slug)?.focus({ preventScroll: true });
  };

  const toucheFiltre = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focaliser(visibles[0]);
    } else if (e.key === 'Escape' && q) {
      setQ('');
    }
  };

  const toucheListe = (slug: string) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const i = visibles.indexOf(slug);
    let j: number | null = null;
    if (e.key === 'ArrowDown') j = Math.min(i + 1, visibles.length - 1);
    else if (e.key === 'ArrowUp') j = i - 1;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = visibles.length - 1;
    if (j === null) return;
    e.preventDefault();
    if (j < 0) champ.current?.focus();
    else focaliser(visibles[j]);
  };

  const survoler = (slug: string) => () => {
    if (!pointeurFin()) return;
    clearTimeout(intention.current);
    intention.current = setTimeout(() => ouvrir(slug, { garderListe: true }), 140);
  };

  const allerALettre = (lettre: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const premier = groupes.find((g) => g.lettre === lettre)?.lignes.find((d) => estVisible.has(d.slug));
    if (!premier) return;
    ouvrir(premier.slug, { garderListe: true });
    const l = liste.current;
    const s = sections.current.get(lettre);
    if (l && s) l.scrollTop = s.getBoundingClientRect().top - l.getBoundingClientRect().top + l.scrollTop;
    e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  const d = parSlug.get(courant);
  const lettreCourante = d?.lettre;
  const total = domaines.length;
  const compte = termes.length
    ? fr
      ? `${visibles.length} domaine${visibles.length > 1 ? 's' : ''} sur ${total}`
      : `${visibles.length} of ${total} areas`
    : fr
      ? `${total} domaines`
      : `${total} areas`;

  return (
    <div className="rep2 ombre" data-fade>
      <div className="r-feuille">
        <div className="r-barre">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <label className="sr-only" htmlFor={`${uid}-q`}>
            {fr ? 'Filtrer les domaines' : 'Filter the areas'}
          </label>
          <input
            ref={champ}
            id={`${uid}-q`}
            type="search"
            autoComplete="off"
            spellCheck={false}
            placeholder={fr ? 'Filtrer : marque, fusion, concession…' : 'Filter: trademark, merger, concession…'}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={toucheFiltre}
          />
          <p className="r-compte" aria-live="polite">
            {compte}
          </p>
        </div>

        <div className="r-corps">
          <nav
            ref={liste}
            className="r-liste"
            aria-label={fr ? 'Domaines d’intervention' : 'Areas of practice'}
            data-lenis-prevent
          >
            {groupes.map((g) => (
              <section
                key={g.lettre}
                data-l={g.lettre}
                hidden={!g.lignes.some((x) => estVisible.has(x.slug))}
                ref={(el) => {
                  if (el) sections.current.set(g.lettre, el);
                  else sections.current.delete(g.lettre);
                }}
              >
                <h3>{g.lettre}</h3>
                <ul>
                  {g.lignes.map((x) => (
                    <li key={x.slug} hidden={!estVisible.has(x.slug)}>
                      <button
                        type="button"
                        aria-current={x.slug === courant ? 'true' : undefined}
                        ref={(el) => {
                          if (el) boutons.current.set(x.slug, el);
                          else boutons.current.delete(x.slug);
                        }}
                        onClick={() => ouvrir(x.slug)}
                        onFocus={() => ouvrir(x.slug)}
                        onMouseEnter={survoler(x.slug)}
                        onMouseLeave={() => clearTimeout(intention.current)}
                        onKeyDown={toucheListe(x.slug)}
                      >
                        {surligner(x.nom, termes)}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <p className="r-vide" hidden={visibles.length > 0}>
              {fr
                ? 'Aucun domaine ne correspond. Décrivez votre question au cabinet : il vous orientera.'
                : 'No area matches. Describe your question to the firm: it will direct you.'}
            </p>
          </nav>

          <div
            ref={detail}
            className="r-detail"
            role="region"
            aria-labelledby={`${uid}-titre`}
            tabIndex={-1}
            data-lenis-prevent
          >
            {d && (
              <div className="r-d">
                <div>
                  <h3 id={`${uid}-titre`}>{d.nom}</h3>
                  <p className="acc">{d.texte}</p>
                  <h4>{fr ? 'Nous intervenons sur' : 'We act on'}</h4>
                  <ul className="sv">
                    {d.prestations.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="r-cote">
                  <h4>
                    {d.referents.length > 1
                      ? fr
                        ? 'Vos interlocuteurs'
                        : 'Your contacts'
                      : fr
                        ? 'Votre interlocuteur'
                        : 'Your contact'}
                  </h4>
                  {d.referents.length ? (
                    d.referents.map((slug) => {
                      const r = referents[slug];
                      if (!r) return null;
                      return (
                        <div className="r-ref" key={slug}>
                          {r.photo ? (
                            <Image src={r.photo} alt="" width={54} height={64} />
                          ) : (
                            <span className="ini" aria-hidden="true">
                              {initiales(r.nom)}
                            </span>
                          )}
                          <p>
                            <b>{r.nom}</b>
                            <span>{r.titre}</span>
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="r-orient">
                      {fr
                        ? 'Dès votre premier message, le cabinet vous oriente vers l’avocat qui suivra votre dossier.'
                        : 'From your first message, the firm directs you to the lawyer who will handle your matter.'}
                    </p>
                  )}
                  {d.lies.length > 0 && (
                    <>
                      <h4>{fr ? 'Voir aussi' : 'See also'}</h4>
                      <div className="r-voir">
                        {d.lies.map((x) => (
                          <button type="button" className="puce" key={x.slug} onClick={() => ouvrir(x.slug)}>
                            {x.nom}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  <div className="r-actions">
                    <a className="btn" href="#rdv" data-rdv={d.slug} onClick={() => demanderRendezVous(d.slug)}>
                      {fr ? 'Prendre rendez-vous' : 'Book a meeting'} <Fleche />
                    </a>
                    <Link className="lien" href={d.href}>
                      {fr ? 'Consulter la page' : 'View the page'} <Fleche />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="tabs" role="group" aria-label={fr ? 'Aller à une lettre' : 'Go to a letter'}>
        {groupes.map((g, k) => (
          <button
            type="button"
            key={g.lettre}
            data-l={g.lettre}
            aria-pressed={g.lettre === lettreCourante}
            disabled={!g.lignes.some((x) => estVisible.has(x.slug))}
            style={{ '--k': k } as React.CSSProperties}
            onClick={allerALettre(g.lettre)}
          >
            <span className="sr-only">{fr ? 'Lettre ' : 'Letter '}</span>
            {g.lettre}
          </button>
        ))}
      </div>
    </div>
  );
}
