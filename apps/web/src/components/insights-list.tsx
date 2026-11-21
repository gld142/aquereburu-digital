'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/content/site';
import { fold } from '@/lib/content';

export interface InsightRow {
  slug: string;
  title: string;
  summary: string;
  date: string;
  dateLabel: string;
  year: string;
  type: string;
  typeLabel: string;
  practices: { slug: string; name: string }[];
}

export function InsightsList({
  rows,
  types,
  practiceOptions,
  locale,
}: {
  rows: InsightRow[];
  types: { id: string; label: string }[];
  practiceOptions: { slug: string; name: string }[];
  locale: Locale;
}) {
  const fr = locale === 'fr';
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [practice, setPractice] = useState('');
  const [year, setYear] = useState('');
  const years = [...new Set(rows.map((r) => r.year))].sort().reverse();

  const visible = useMemo(() => {
    const terms = fold(q).split(/\s+/).filter(Boolean);
    return rows.filter(
      (r) =>
        (!type || r.type === type) &&
        (!year || r.year === year) &&
        (!practice || r.practices.some((p) => p.slug === practice)) &&
        terms.every((t) => fold(`${r.title} ${r.summary} ${r.practices.map((p) => p.name).join(' ')}`).includes(t)),
    );
  }, [rows, q, type, practice, year]);

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-12">
        <label className="relative block md:col-span-5">
          <span className="sr-only">{fr ? 'Rechercher une publication' : 'Search insights'}</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate" aria-hidden />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={fr ? 'Sujet, texte, mot-clé' : 'Topic, statute, keyword'} className="field pl-9" />
        </label>
        <label className="md:col-span-3">
          <span className="sr-only">{fr ? 'Type' : 'Type'}</span>
          <select value={type} onChange={(e) => setType(e.target.value)} className="field">
            <option value="">{fr ? 'Tous les formats' : 'All formats'}</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="sr-only">{fr ? 'Expertise' : 'Practice'}</span>
          <select value={practice} onChange={(e) => setPractice(e.target.value)} className="field">
            <option value="">{fr ? 'Expertise' : 'Practice'}</option>
            {practiceOptions.map((o) => (
              <option key={o.slug} value={o.slug}>
                {o.name}
              </option>
            ))}
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="sr-only">{fr ? 'Année' : 'Year'}</span>
          <select value={year} onChange={(e) => setYear(e.target.value)} className="field">
            <option value="">{fr ? 'Année' : 'Year'}</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="t-small mt-6 text-slate" aria-live="polite">
        {visible.length} {fr ? (visible.length > 1 ? 'publications' : 'publication') : visible.length > 1 ? 'items' : 'item'}
      </p>

      {visible.length === 0 ? (
        <div className="mt-4 border-t border-rule py-12">
          <p className="t-ui">{fr ? 'Aucune publication ne correspond à ces critères.' : 'No insight matches these criteria.'}</p>
          <button
            type="button"
            className="link t-ui mt-2 text-accent"
            onClick={() => {
              setQ('');
              setType('');
              setPractice('');
              setYear('');
            }}
          >
            {fr ? 'Effacer les filtres' : 'Clear filters'}
          </button>
        </div>
      ) : (
        <ul className="mt-4 border-t border-ink">
          {visible.map((r) => (
            <li key={r.slug} className="grid gap-x-10 gap-y-2 border-b border-rule py-8 md:grid-cols-12">
              <p className="t-small text-slate md:col-span-3">
                {r.typeLabel}
                <br className="hidden md:block" />
                <span className="md:hidden">, </span>
                <time dateTime={r.date}>{r.dateLabel}</time>
              </p>
              <div className="md:col-span-8">
                <h2 className="t-h3">
                  <Link href={{ pathname: '/publications/[slug]', params: { slug: r.slug } }} className="hover:text-accent">
                    {r.title}
                  </Link>
                </h2>
                <p className="t-body mt-2 text-[1.0625rem] text-ink-2">{r.summary}</p>
                <p className="t-small mt-3 text-slate">{r.practices.map((p) => p.name).join(', ')}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
