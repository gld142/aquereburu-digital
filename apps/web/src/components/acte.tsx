'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/content/site';
import { useRelief } from '@/lib/relief';

/**
 * « Fait à Lomé, le … » : la formule qui clôt un acte, datée du jour à Lomé.
 * La date est posée après l'hydratation : le rendu serveur (éventuellement
 * mis en cache) ne peut pas connaître le jour de la visite.
 */
export function FaitALome({ locale }: { locale: Locale }) {
  const fr = locale === 'fr';
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const d = new Intl.DateTimeFormat(fr ? 'fr-FR' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Africa/Lome',
    }).format(new Date());
    setDate(fr ? d.replace(/^1 /, '1er ') : d);
  }, [fr]);

  if (!date) return <span>{fr ? 'Fait à Lomé.' : 'Done at Lomé.'}</span>;
  return <span>{fr ? `Fait à Lomé, le ${date}.` : `Done at Lomé, on ${date}.`}</span>;
}

/**
 * Filtre de gaufrage : une arête claire du côté de la lumière, une arête sombre
 * à l'opposé, un voile très léger sur la matière. Les deux `feOffset` portent
 * `data-l` : c'est par eux que `useRelief` déplace la lumière.
 * `papier` : réglage pour un fond clair (arête blanche, ombre marine), celui
 * de la feuille « Prendre rendez-vous » ; sinon, réglage pour un fond sombre.
 */
export function FiltreRelief({ id, papier = false }: { id: string; papier?: boolean }) {
  const t = papier
    ? { d: 1.63, marge: 8, clair: '#ffffff', oClair: 1, sombre: '#1b2a4a', oSombre: 0.4, voile: '#1b2a4a', oVoile: 0.04 }
    : { d: 1.3, marge: 6, clair: '#a9c3de', oClair: 0.62, sombre: '#02070c', oSombre: 0.72, voile: '#ffffff', oVoile: 0.028 };
  return (
    <filter
      id={id}
      x={`-${t.marge}%`}
      y={`-${t.marge}%`}
      width={`${100 + 2 * t.marge}%`}
      height={`${100 + 2 * t.marge}%`}
      colorInterpolationFilters={papier ? 'sRGB' : undefined}
    >
      <feOffset in="SourceAlpha" dx={t.d} dy={t.d} result="o1" data-l="-1" />
      <feComposite in="SourceAlpha" in2="o1" operator="out" result="clair" />
      <feFlood floodColor={t.clair} floodOpacity={t.oClair} />
      <feComposite in2="clair" operator="in" result="L" />
      <feOffset in="SourceAlpha" dx={-t.d} dy={-t.d} result="o2" data-l="1" />
      <feComposite in="SourceAlpha" in2="o2" operator="out" result="sombre" />
      <feFlood floodColor={t.sombre} floodOpacity={t.oSombre} />
      <feComposite in2="sombre" operator="in" result="D" />
      <feFlood floodColor={t.voile} floodOpacity={t.oVoile} />
      <feComposite in2="SourceAlpha" operator="in" result="F" />
      <feMerge>
        <feMergeNode in="F" />
        <feMergeNode in="D" />
        <feMergeNode in="L" />
      </feMerge>
    </filter>
  );
}

/**
 * Timbre sec du cabinet : l'emblème gaufré dans le papier de la feuille
 * « Prendre rendez-vous » (`papier`) ou dans un fond sombre.
 * Sur ordinateur, le relief suit le curseur (lumière partagée, lib/relief.ts).
 */
export function Sceau({ papier = false }: { papier?: boolean }) {
  const svg = useRef<SVGSVGElement>(null);
  useRelief(svg, papier ? 2.3 : undefined);
  const filtre = papier ? 'timbre-papier' : 'timbre';
  const arc = papier ? 'arc-sceau-papier' : 'arc-sceau';

  return (
    <svg ref={svg} className="sceau" viewBox="0 0 300 340" aria-hidden="true">
      <defs>
        <path id={arc} d="M 35 148 Q 150 55 265 148" />
        <FiltreRelief id={filtre} papier={papier} />
      </defs>
      {/* Le continent vient d'un fichier statique (mis en cache) : seul son canal alpha sert au filtre. */}
      <g filter={`url(#${filtre})`}>
        <image href="/sceau-carte.svg" x="0" y="0" width="300" height="340" />
      </g>
      <g filter={`url(#${filtre})`}>
        <g fill="#7B8DB5">
          <path d="M 112,260 L 109,260 L 142,120 L 146,118 L 148,120 L 116,260 Z" />
          <path d="M 148,120 L 150,118 L 170,260 L 167,260 L 148,124 Z" />
          <path d="M 122,213 L 122,210 L 162,210 L 162,213 Z" />
        </g>
        <g fill="#1B2A4A">
          <path d="M 150,96 L 157,96 L 157,266 L 162,266 L 162,270 L 145,270 L 145,266 L 150,266 Z" />
          <path d="M 150,100 L 157,100 C 162,98 170,96 180,98 C 195,102 205,118 203,138 C 201,158 188,170 174,172 C 165,173 157,168 157,168 L 157,160 C 157,160 164,165 172,164 C 184,162 194,152 196,138 C 198,122 190,110 180,106 C 172,103 164,106 157,112 L 150,112 Z" />
        </g>
        <text fontFamily="Georgia, 'Times New Roman', serif" fontSize="12" fontWeight="700" fill="#1B2A4A" letterSpacing="2.5">
          <textPath href={`#${arc}`} startOffset="50%" textAnchor="middle">
            AQUEREBURU &amp; PARTNERS
          </textPath>
        </text>
        <text
          x="150"
          y="298"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="14"
          fontStyle="italic"
          fill="#1B2A4A"
          letterSpacing="1"
        >
          Société d’Avocats
        </text>
      </g>
    </svg>
  );
}
