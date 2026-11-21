import { practices } from '@/content/practices';
import { people, roleLabels } from '@/content/people';
import { insights, insightTypes } from '@/content/insights';
import type { Locale } from '@/content/site';
import { practiceContent } from './content';

export type SearchKind = 'expertise' | 'secteur' | 'personne' | 'publication' | 'page';

export interface SearchItem {
  kind: SearchKind;
  title: string;
  meta: string;
  /** Texte additionnel indexé mais non affiché */
  keywords: string;
  href: { pathname: string; params?: Record<string, string> };
}

const pages: { fr: string; en: string; pathname: string; keywords: string }[] = [
  { fr: 'Le cabinet', en: 'The firm', pathname: '/cabinet', keywords: 'histoire history mission vision scp 1987 iso' },
  { fr: 'Déontologie et conformité UEMOA', en: 'Ethics and WAEMU compliance', pathname: '/cabinet/deontologie', keywords: 'ethique secret professionnel uemoa reglement independance' },
  { fr: 'Fondation et responsabilité sociétale', en: 'Foundation and social responsibility', pathname: '/cabinet/engagement', keywords: 'rse pro bono fondation esg' },
  { fr: 'Réalisations', en: 'Matters', pathname: '/realisations', keywords: 'dossiers deals cas references' },
  { fr: 'Carrières', en: 'Careers', pathname: '/carrieres', keywords: 'stage emploi recrutement jobs internship' },
  { fr: 'Contact et bureaux', en: 'Contact and offices', pathname: '/contact', keywords: 'adresse lome paris cotonou telephone rendez-vous' },
  { fr: 'Mentions légales', en: 'Legal notice', pathname: '/mentions-legales', keywords: 'assurance rcs editeur' },
  { fr: 'Confidentialité et cookies', en: 'Privacy and cookies', pathname: '/confidentialite', keywords: 'rgpd donnees personnelles' },
];

export function buildSearchIndex(locale: Locale): SearchItem[] {
  const fr = locale === 'fr';
  const items: SearchItem[] = [];

  for (const p of practices) {
    const c = practiceContent(p, locale);
    items.push({
      kind: p.kind === 'secteur' ? 'secteur' : 'expertise',
      title: c.name,
      meta: p.kind === 'secteur' ? (fr ? 'Secteur' : 'Sector') : fr ? 'Expertise' : 'Practice',
      keywords: [c.pitch, ...c.services].join(' '),
      href: { pathname: p.kind === 'secteur' ? '/secteurs/[slug]' : '/expertises/[slug]', params: { slug: p.slug } },
    });
  }

  for (const person of people) {
    items.push({
      kind: 'personne',
      title: person.name,
      meta: person.title[locale] || roleLabels[person.role][locale],
      keywords: person.practices.join(' '),
      href: person.bio.fr
        ? { pathname: '/equipe/[slug]', params: { slug: person.slug } }
        : { pathname: '/equipe' },
    });
  }

  for (const i of insights) {
    items.push({
      kind: 'publication',
      title: i.title[locale],
      meta: insightTypes[i.type][locale],
      keywords: i.summary[locale],
      href: { pathname: '/publications/[slug]', params: { slug: i.slug } },
    });
  }

  for (const page of pages) {
    items.push({ kind: 'page', title: page[locale], meta: 'Page', keywords: page.keywords, href: { pathname: page.pathname } });
  }

  return items;
}
