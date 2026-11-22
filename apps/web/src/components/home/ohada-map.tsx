'use client';

import { useRef, useState } from 'react';
import { CARTE_PATHS, CARTE_VIEWBOX, OHADA_INDICES } from '@/content/carte-ohada';
import type { Locale } from '@/content/site';
import { gsap, reduit, useGSAP } from '@/lib/gsap';

export interface EtatAffiche {
  /** Indice de la forme dans le tracé, ou 'com' pour les Comores (point) */
  id: string;
  nom: string;
  /** Texte de la légende quand l'État est désigné */
  legende: string;
  /** Nom développé pour les lecteurs d'écran, s'il diffère du nom affiché */
  nomLong?: string;
}

const membres = new Set(OHADA_INDICES.map(String));

/**
 * Accueil — l'emblème du cabinet prend vie : la carte de l'espace OHADA
 * (maquette i.html). Styles : app/styles/accueil-ohada.css.
 *
 * La liste des États et la carte se répondent : survoler une forme allume son
 * nom dans la liste, survoler ou focaliser un nom allume sa forme. La légende
 * (aria-live) annonce l'État désigné et, pour le Togo et le Bénin, la présence
 * du cabinet. Lomé, Cotonou et le méridien de Paris situent les trois bureaux.
 *
 * Accessibilité : la carte est une image décrite (role="img") ; son
 * équivalent utilisable au clavier est la liste de boutons. Le survol
 * l'emporte sur le focus, pour qu'un nom resté focalisé ne masque pas ce que
 * la souris désigne.
 *
 * Les formes viennent de content/carte-ohada.ts (correspondance indice → pays
 * vérifiée) ; les Comores, absentes du tracé, sont un point. Au large de Lomé,
 * une petite pirogue gravée, discrète : un clin d'œil au dessin du hero.
 */
export function OhadaMap({
  etats,
  locale,
  children,
}: {
  /** États membres, déjà triés dans la langue de la page */
  etats: EtatAffiche[];
  locale: Locale;
  /** Titre et texte d'introduction, au-dessus de la liste */
  children: React.ReactNode;
}) {
  const fr = locale === 'fr';
  const carte = useRef<HTMLDivElement>(null);
  const [survol, setSurvol] = useState<string | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const actif = survol ?? focus;
  const designe = etats.find((e) => e.id === actif);

  useGSAP(
    () => {
      const el = carte.current;
      if (!el || reduit()) return;
      // Les États membres se remplissent d'ouest en est, puis le méridien de Paris se trace.
      const formes = gsap.utils
        .toArray<SVGGraphicsElement>('.m', el)
        .sort((a, b) => a.getBBox().x - b.getBBox().x);
      const mer = el.querySelector<SVGPathElement>('.meridien');
      if (!mer) return;
      const long = mer.getTotalLength();
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top 72%' } })
        .from(formes, { fill: '#e4eaf2', duration: 0.5, stagger: 0.045, ease: 'power1.out', clearProps: 'fill' })
        .from('.pt, text', { opacity: 0, duration: 0.5, stagger: 0.05, clearProps: 'opacity' }, '-=0.3')
        .fromTo(
          mer,
          { strokeDasharray: long, strokeDashoffset: long },
          {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set(mer, { clearProps: 'strokeDasharray,strokeDashoffset' });
            },
          },
          '-=0.5',
        );
    },
    { scope: carte },
  );

  const survoler = (id: string | null) => () => setSurvol(id);

  return (
    <div className="ohada">
      <div>
        {children}
        <ul className="etats" aria-label={fr ? 'États membres de l’OHADA' : 'OHADA member States'}>
          {etats.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                className={actif === e.id ? 'on' : undefined}
                aria-label={e.nomLong}
                onMouseEnter={survoler(e.id)}
                onMouseLeave={survoler(null)}
                onFocus={() => setFocus(e.id)}
                onBlur={() => setFocus(null)}
              >
                {e.nom}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="carte" ref={carte}>
        <svg
          viewBox={CARTE_VIEWBOX}
          role="img"
          aria-label={
            fr
              ? 'Carte de l’Afrique : les dix-sept États membres de l’OHADA, avec Lomé, Cotonou et la direction de Paris'
              : 'Map of Africa: the seventeen OHADA member States, with Lomé, Cotonou and the direction of Paris'
          }
        >
          <g>
            {CARTE_PATHS.map((d, i) => {
              const id = String(i);
              return membres.has(id) ? (
                <path
                  key={id}
                  className={actif === id ? 'm on' : 'm'}
                  d={d}
                  onMouseEnter={survoler(id)}
                  onMouseLeave={survoler(null)}
                />
              ) : (
                <path key={id} className="p" d={d} />
              );
            })}
          </g>
          {/* La pirogue du hero, cachée au large de Lomé */}
          <image
            className="pirogue"
            href="/images/gravures/gravure-pirogue.svg"
            x="921"
            y="566"
            width="46"
            height="17.3"
            aria-hidden="true"
          />
          <path className="meridien" d="M985.5 531 C 986 440, 990 340, 990 262" />
          {/* Comores : un point, avec une zone de survol plus large que lui */}
          <g onMouseEnter={survoler('com')} onMouseLeave={survoler(null)}>
            <circle className="zone" cx="1219" cy="648" r="11" />
            <circle className={actif === 'com' ? 'pt com on' : 'pt com'} cx="1219" cy="648" r="3.2" />
          </g>
          <text className="s" x="1226" y="652">
            {fr ? 'Comores' : 'Comoros'}
          </text>
          <circle className="pt" cx="990" cy="258" r="3.4" />
          <text x="997" y="262">
            Paris
          </text>
          <circle className="pt" cx="981" cy="533" r="3.1" />
          <text x="975" y="547" textAnchor="end">
            Lomé
          </text>
          <circle className="pt" cx="990.5" cy="533" r="3.1" />
          <text x="997" y="547">
            Cotonou
          </text>
        </svg>
        <p className="legende" aria-live="polite">
          {designe ? designe.legende : fr ? 'Dix-sept États membres' : 'Seventeen member States'}
        </p>
      </div>
    </div>
  );
}
