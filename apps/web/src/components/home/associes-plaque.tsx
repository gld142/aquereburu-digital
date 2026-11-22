'use client';

import { useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/content/site';
import { gsap, pointeurFin, reduit, useGSAP } from '@/lib/gsap';
import { Fleche, Portrait } from '../ui';
import { ouvrirDomaineDansRepertoire } from './evenements';

export interface AssocieFiche {
  slug: string;
  nom: string;
  titre: string;
  photo: string | null;
  bio: string;
  /** Barreau d'inscription, avec l'année si elle est connue */
  barreau: string | null;
  domaines: { slug: string; nom: string }[];
  formation: string[];
  fonctions: string[];
  langues: string[];
}

/**
 * La plaque du cabinet et la fiche qui s'ouvre à côté (maquette i.html).
 *
 * La plaque est une liste d'onglets verticale (flèches, Début, Fin). Les noms
 * y sont gravés : leur ombre suit la lumière du curseur. Toutes les fiches
 * sont dans la page, empilées dans la même case : la zone garde la hauteur de
 * la plus longue et rien ne saute quand on change d'associé. Les puces de
 * domaine ouvrent le domaine dans le répertoire (« aqp:domaine »).
 */
export function AssociesPlaque({
  fiches,
  locale,
  mention,
}: {
  fiches: AssocieFiche[];
  locale: Locale;
  /** Mention sous la liste : forme et barreau du cabinet */
  mention: string;
}) {
  const fr = locale === 'fr';
  const racine = useRef<HTMLDivElement>(null);
  const plaque = useRef<HTMLDivElement>(null);
  const onglets = useRef<(HTMLButtonElement | null)[]>([]);
  const premierRendu = useRef(true);
  const [courant, setCourant] = useState(fiches[0]?.slug ?? '');

  // La fiche change : le portrait se dévoile de haut en bas, le texte monte ligne après ligne.
  useGSAP(
    () => {
      if (premierRendu.current) {
        premierRendu.current = false;
        return;
      }
      if (reduit()) return;
      const fiche = racine.current?.querySelector<HTMLElement>('.fiche2:not([inert])');
      if (!fiche) return;
      const portrait = fiche.querySelector('.pp');
      if (portrait) {
        gsap.fromTo(
          portrait,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'expo.out', clearProps: 'clipPath', overwrite: true },
        );
      }
      gsap.fromTo(
        fiche.querySelectorAll(':scope > div:last-child > *'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out', stagger: 0.04, clearProps: 'transform,opacity', overwrite: true },
      );
    },
    { dependencies: [courant], scope: racine },
  );

  // La lumière des noms gravés suit le curseur (souris seulement, jamais en « animations réduites »).
  useGSAP(
    () => {
      const el = plaque.current;
      if (!el || reduit() || !pointeurFin()) return;
      const lum = { x: -Math.SQRT1_2, y: -Math.SQRT1_2, tx: -Math.SQRT1_2, ty: -Math.SQRT1_2 };
      const viser = (e: PointerEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        const n = Math.max(Math.hypot(x, y), 0.35);
        lum.tx = x / n;
        lum.ty = y / n;
      };
      const tick = () => {
        const dx = lum.tx - lum.x;
        const dy = lum.ty - lum.y;
        if (Math.abs(dx) + Math.abs(dy) < 0.004) return;
        lum.x += dx * 0.08;
        lum.y += dy * 0.08;
        el.style.setProperty('--lx2', lum.x.toFixed(3));
        el.style.setProperty('--ly2', lum.y.toFixed(3));
      };
      window.addEventListener('pointermove', viser, { passive: true });
      gsap.ticker.add(tick);
      return () => {
        window.removeEventListener('pointermove', viser);
        gsap.ticker.remove(tick);
        el.style.removeProperty('--lx2');
        el.style.removeProperty('--ly2');
      };
    },
    { scope: racine },
  );

  const choisir = (i: number, focus = false) => {
    const f = fiches[i];
    if (!f) return;
    setCourant(f.slug);
    if (focus) onglets.current[i]?.focus();
  };

  const touche = (i: number) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const pas = ({ ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 } as Record<string, number>)[e.key];
    let j: number | null = null;
    if (pas) j = (i + pas + fiches.length) % fiches.length;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = fiches.length - 1;
    if (j === null) return;
    e.preventDefault();
    choisir(j, true);
  };

  return (
    <div className="assoc2" ref={racine}>
      <div className="ombre" data-fade>
        <div className="plaque2 coin" ref={plaque}>
          <h2>{fr ? 'Les associés' : 'The partners'}</h2>
          <div
            className="pl-liste"
            role="tablist"
            aria-label={fr ? 'Les associés du cabinet' : 'The firm’s partners'}
            aria-orientation="vertical"
          >
            {fiches.map((p, i) => {
              const actif = p.slug === courant;
              return (
                <button
                  type="button"
                  role="tab"
                  key={p.slug}
                  id={`pl-${p.slug}`}
                  aria-controls={`fiche-${p.slug}`}
                  aria-selected={actif}
                  tabIndex={actif ? 0 : -1}
                  ref={(el) => {
                    onglets.current[i] = el;
                  }}
                  onClick={() => choisir(i)}
                  onKeyDown={touche(i)}
                >
                  <span className="pl-n grave">{p.nom}</span>
                  <span className="pl-r">{p.titre}</span>
                </button>
              );
            })}
          </div>
          <p className="pl-b">{mention}</p>
          <Link className="lien" href="/equipe">
            {fr ? 'Toute l’équipe' : 'The whole team'} <Fleche />
          </Link>
        </div>
      </div>

      <div className="fiches">
        {fiches.map((p) => {
          const actif = p.slug === courant;
          return (
            <div
              className="fiche2"
              key={p.slug}
              id={`fiche-${p.slug}`}
              role="tabpanel"
              aria-labelledby={`pl-${p.slug}`}
              aria-hidden={!actif}
              inert={!actif}
            >
              <Portrait src={p.photo} name={p.nom} sizes="(min-width: 621px) 236px, 220px" />
              <div>
                <h3>{p.nom}</h3>
                <p className="role">{p.titre}</p>
                <p className="bio">{p.bio}</p>
                <dl>
                  {p.barreau && (
                    <div>
                      <dt>{fr ? 'Barreau' : 'Bar'}</dt>
                      <dd>{p.barreau}</dd>
                    </div>
                  )}
                  {p.domaines.length > 0 && (
                    <div>
                      <dt>{fr ? 'Domaines' : 'Practice areas'}</dt>
                      <dd>
                        <span className="dom">
                          {p.domaines.map((x) => (
                            <button
                              type="button"
                              className="puce"
                              key={x.slug}
                              onClick={() => ouvrirDomaineDansRepertoire(x.slug)}
                            >
                              {x.nom}
                            </button>
                          ))}
                        </span>
                      </dd>
                    </div>
                  )}
                  {p.formation.length > 0 && (
                    <div>
                      <dt>{fr ? 'Formation' : 'Education'}</dt>
                      <dd>
                        {p.formation.map((ligne, k) => (
                          <span key={ligne}>
                            {k > 0 && <br />}
                            {ligne}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                  {p.fonctions.length > 0 && (
                    <div>
                      <dt>{fr ? 'Fonctions' : 'Positions'}</dt>
                      <dd>
                        {p.fonctions.map((ligne, k) => (
                          <span key={ligne}>
                            {k > 0 && <br />}
                            {ligne}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                  {p.langues.length > 0 && (
                    <div>
                      <dt>{fr ? 'Langues' : 'Languages'}</dt>
                      <dd>{p.langues.join(', ')}</dd>
                    </div>
                  )}
                </dl>
                <Link className="lien" href={{ pathname: '/equipe/[slug]', params: { slug: p.slug } }}>
                  {fr ? 'Consulter la fiche complète' : 'View full profile'} <Fleche />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
