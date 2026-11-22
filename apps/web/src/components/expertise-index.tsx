'use client';

import { useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/content/site';
import type { PracticeGroup } from '@/content/practices';
import { fold } from '@/lib/content';
import { Fleche } from './ui';

export interface ExpertiseRow {
  slug: string;
  name: string;
  pitch: string;
  haystack: string;
  group: PracticeGroup | null;
  href: { pathname: '/expertises/[slug]' | '/secteurs/[slug]'; params: { slug: string } };
}

export function ExpertiseIndex({
  rows,
  groups,
  locale,
}: {
  rows: ExpertiseRow[];
  groups: { id: PracticeGroup; label: string }[];
  locale: Locale;
}) {
  const fr = locale === 'fr';
  const [q, setQ] = useState('');
  const [group, setGroup] = useState<PracticeGroup | null>(null);

  const visible = useMemo(() => {
    const terms = fold(q).split(/\s+/).filter(Boolean);
    return rows.filter(
      (r) => (!group || r.group === group) && terms.every((t) => fold(`${r.name} ${r.haystack}`).includes(t)),
    );
  }, [rows, q, group]);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label={fr ? 'Filtrer par famille' : 'Filter by group'}>
          <button type="button" className="filtre" aria-pressed={group === null} onClick={() => setGroup(null)}>
            {fr ? 'Toutes' : 'All'}
          </button>
          {groups.map((g) => (
            <button key={g.id} type="button" className="filtre" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
              {g.label}
            </button>
          ))}
        </div>
        <label className="champ-icone w-full lg:w-80">
          <span className="sr-only">{fr ? 'Rechercher une expertise' : 'Search expertise'}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={fr ? 'Ex. : concession, marques, OHADA' : 'E.g. concession, trade marks, OHADA'}
            className="field"
          />
        </label>
      </div>

      <p className="t-glose mt-8 pb-3" aria-live="polite">
        {visible.length} {fr ? (visible.length > 1 ? 'expertises' : 'expertise') : visible.length > 1 ? 'practices' : 'practice'}
      </p>

      {visible.length === 0 ? (
        <div className="filet py-10">
          <p className="t-h3">{fr ? 'Aucune expertise ne correspond à cette recherche.' : 'No practice matches this search.'}</p>
          <button
            type="button"
            className="lien mt-4"
            onClick={() => {
              setQ('');
              setGroup(null);
            }}
          >
            {fr ? 'Effacer les filtres' : 'Clear filters'}
          </button>
        </div>
      ) : (
        <ul className="filet">
          {visible.map((r) => (
            <li key={r.slug}>
              <Link href={r.href} className="ligne">
                <b>{r.name}</b>
                <span>{r.pitch}</span>
                <Fleche strokeWidth={1.8} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
