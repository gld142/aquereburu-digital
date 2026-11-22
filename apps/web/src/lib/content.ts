import { practices, type Practice, type PracticeContent } from '@/content/practices';
import { practicesEn } from '@/content/practices-en';
import type { Locale } from '@/content/site';

export function practiceContent(p: Practice, locale: Locale): PracticeContent {
  return locale === 'en' ? (practicesEn[p.slug] ?? p.fr) : p.fr;
}

export const getPractice = (slug: string) => practices.find((p) => p.slug === slug);
export const practiceList = practices.filter((p) => p.kind === 'pratique');
export const sectorList = practices.filter((p) => p.kind === 'secteur');

export function practiceHref(p: Practice) {
  return p.kind === 'secteur'
    ? ({ pathname: '/secteurs/[slug]', params: { slug: p.slug } } as const)
    : ({ pathname: '/expertises/[slug]', params: { slug: p.slug } } as const);
}

export function sortByName<T>(items: T[], name: (item: T) => string, locale: Locale) {
  return [...items].sort((a, b) => name(a).localeCompare(name(b), locale, { sensitivity: 'base' }));
}

/** Normalise pour la recherche : minuscules, sans accents. */
export function fold(s: string) {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

/** Première phrase d'un texte, pour les descriptions courtes du répertoire. */
export function premierePhrase(s: string) {
  return s.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? s;
}

/** Initiale sans accent, en capitale : « Énergie » se range à E. */
export function initiale(s: string) {
  return fold(s).charAt(0).toUpperCase();
}
