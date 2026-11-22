'use client';

import { useMemo, useState } from 'react';
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
        <label className="champ-icone md:col-span-5">
          <span className="sr-only">{fr ? 'Rechercher une publication' : 'Search insights'}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={fr ? 'Sujet, texte, mot-clé' : 'Topic, statute, keyword'} className="field" />
        </label>
        <label className="md:col-span-3">
          <span className="sr-only">{fr ? 'Format' : 'Format'}</span>
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

      <p className="t-glose mt-8 pb-3" aria-live="polite">
        {visible.length} {fr ? (visible.length > 1 ? 'publications' : 'publication') : visible.length > 1 ? 'items' : 'item'}
      </p>

      {visible.length === 0 ? (
        <div className="filet py-10">
          <p className="t-h3">{fr ? 'Aucune publication ne correspond à ces critères.' : 'No insight matches these criteria.'}</p>
          <button
            type="button"
            className="lien mt-4"
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
        <ul className="pubs">
          {visible.map((r) => (
            <li key={r.slug} className="pub">
              <p className="t-glose">
                {r.typeLabel}
                <br className="hidden md:block" />
                <span className="md:hidden">, </span>
                <time dateTime={r.date}>{r.dateLabel}</time>
              </p>
              <div>
                <h2>
                  <Link href={{ pathname: '/publications/[slug]', params: { slug: r.slug } }}>{r.title}</Link>
                </h2>
                <p className="mt-2">{r.summary}</p>
                <p className="t-small mt-3">{r.practices.map((p) => p.name).join(', ')}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
