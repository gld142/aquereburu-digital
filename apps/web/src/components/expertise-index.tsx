'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/content/site';
import type { PracticeGroup } from '@/content/practices';
import { fold } from '@/lib/content';

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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label={fr ? 'Filtrer par famille' : 'Filter by group'}>
          <button type="button" className="chip" aria-pressed={group === null} onClick={() => setGroup(null)}>
            {fr ? 'Toutes' : 'All'}
          </button>
          {groups.map((g) => (
            <button key={g.id} type="button" className="chip" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
              {g.label}
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:w-80">
          <span className="sr-only">{fr ? 'Rechercher une expertise' : 'Search expertise'}</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={fr ? 'Ex. : concession, marques, OHADA' : 'E.g. concession, trade marks, OHADA'}
            className="field pl-9"
          />
        </label>
      </div>

      <p className="t-small mt-6 text-slate" aria-live="polite">
        {visible.length} {fr ? (visible.length > 1 ? 'expertises' : 'expertise') : visible.length > 1 ? 'practices' : 'practice'}
      </p>

      {visible.length === 0 ? (
        <div className="mt-4 border-t border-rule py-12">
          <p className="t-ui">{fr ? 'Aucune expertise ne correspond à cette recherche.' : 'No practice matches this search.'}</p>
          <button
            type="button"
            className="link t-ui mt-2 text-accent"
            onClick={() => {
              setQ('');
              setGroup(null);
            }}
          >
            {fr ? 'Effacer les filtres' : 'Clear filters'}
          </button>
        </div>
      ) : (
        <ul className="mt-4 border-t border-ink">
          {visible.map((r) => (
            <li key={r.slug} className="border-b border-rule">
              <Link href={r.href} className="group grid gap-2 py-6 md:grid-cols-12 md:gap-10">
                <span className="t-h3 transition-colors group-hover:text-accent md:col-span-4">{r.name}</span>
                <span className="t-body line-clamp-2 text-[1.0625rem] text-ink-2 md:col-span-7">{r.pitch}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
