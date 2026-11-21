'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/content/site';
import type { Role } from '@/content/people';
import { fold } from '@/lib/content';
import { Portrait } from './ui';

export interface DirectoryPerson {
  slug: string;
  name: string;
  title: string;
  role: Role;
  photo: string | null;
  practices: { slug: string; name: string }[];
  languages: ('fr' | 'en')[];
  hasProfile: boolean;
}

const roleFilters: { id: Role | 'avocats'; fr: string; en: string }[] = [
  { id: 'associe', fr: 'Associés', en: 'Partners' },
  { id: 'avocats', fr: 'Avocats', en: 'Lawyers' },
  { id: 'juriste', fr: 'Juristes', en: 'Legal counsel' },
];

export function TeamDirectory({
  people,
  practiceOptions,
  locale,
}: {
  people: DirectoryPerson[];
  practiceOptions: { slug: string; name: string }[];
  locale: Locale;
}) {
  const fr = locale === 'fr';
  const [q, setQ] = useState('');
  const [role, setRole] = useState<Role | 'avocats' | null>(null);
  const [practice, setPractice] = useState('');
  const [lang, setLang] = useState('');

  const visible = useMemo(() => {
    const terms = fold(q).split(/\s+/).filter(Boolean);
    return people.filter((p) => {
      if (role === 'associe' && p.role !== 'associe') return false;
      if (role === 'avocats' && p.role === 'juriste') return false;
      if (role === 'juriste' && p.role !== 'juriste') return false;
      if (practice && !p.practices.some((x) => x.slug === practice)) return false;
      if (lang && !p.languages.includes(lang as 'fr' | 'en')) return false;
      const hay = fold(`${p.name} ${p.title} ${p.practices.map((x) => x.name).join(' ')}`);
      return terms.every((t) => hay.includes(t));
    });
  }, [people, q, role, practice, lang]);

  const clear = () => {
    setQ('');
    setRole(null);
    setPractice('');
    setLang('');
  };

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-12">
        <label className="relative block md:col-span-5">
          <span className="sr-only">{fr ? 'Rechercher une personne' : 'Search people'}</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={fr ? 'Nom ou domaine' : 'Name or practice'}
            className="field pl-9"
          />
        </label>
        <label className="md:col-span-4">
          <span className="sr-only">{fr ? 'Expertise' : 'Practice'}</span>
          <select value={practice} onChange={(e) => setPractice(e.target.value)} className="field">
            <option value="">{fr ? 'Toutes les expertises' : 'All practices'}</option>
            {practiceOptions.map((o) => (
              <option key={o.slug} value={o.slug}>
                {o.name}
              </option>
            ))}
          </select>
        </label>
        <label className="md:col-span-3">
          <span className="sr-only">{fr ? 'Langue de travail' : 'Working language'}</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="field">
            <option value="">{fr ? 'Toutes les langues' : 'All languages'}</option>
            <option value="fr">{fr ? 'Français' : 'French'}</option>
            <option value="en">{fr ? 'Anglais' : 'English'}</option>
          </select>
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label={fr ? 'Filtrer par fonction' : 'Filter by role'}>
        <button type="button" className="chip" aria-pressed={role === null} onClick={() => setRole(null)}>
          {fr ? 'Tout le monde' : 'Everyone'}
        </button>
        {roleFilters.map((r) => (
          <button key={r.id} type="button" className="chip" aria-pressed={role === r.id} onClick={() => setRole(r.id)}>
            {r[locale]}
          </button>
        ))}
        <span className="t-small ml-auto text-slate" aria-live="polite">
          {visible.length} {fr ? (visible.length > 1 ? 'personnes' : 'personne') : visible.length > 1 ? 'people' : 'person'}
        </span>
      </div>

      {visible.length === 0 ? (
        <div className="mt-10 border-t border-rule py-12">
          <p className="t-ui">{fr ? 'Personne ne correspond à ces critères.' : 'Nobody matches these criteria.'}</p>
          <button type="button" className="link t-ui mt-2 text-accent" onClick={clear}>
            {fr ? 'Effacer les filtres' : 'Clear filters'}
          </button>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visible.map((p) => {
            const body = (
              <>
                <Portrait src={p.photo} name={p.name} sizes="(min-width: 1280px) 18vw, (min-width: 768px) 30vw, 50vw" />
                <p className="t-ui mt-3 font-medium text-ink group-hover:text-accent">{p.name}</p>
                <p className="t-small mt-0.5 text-slate">{p.title}</p>
              </>
            );
            return (
              <li key={p.slug}>
                {p.hasProfile ? (
                  <Link href={{ pathname: '/equipe/[slug]', params: { slug: p.slug } }} className="group block">
                    {body}
                  </Link>
                ) : (
                  <div>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
