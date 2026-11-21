import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  pathnames: {
    '/': '/',
    '/cabinet': { fr: '/cabinet', en: '/firm' },
    '/cabinet/deontologie': { fr: '/cabinet/deontologie', en: '/firm/ethics' },
    '/cabinet/engagement': { fr: '/cabinet/engagement', en: '/firm/responsibility' },
    '/expertises': { fr: '/expertises', en: '/expertise' },
    '/expertises/[slug]': { fr: '/expertises/[slug]', en: '/expertise/[slug]' },
    '/secteurs': { fr: '/secteurs', en: '/sectors' },
    '/secteurs/[slug]': { fr: '/secteurs/[slug]', en: '/sectors/[slug]' },
    '/equipe': { fr: '/equipe', en: '/people' },
    '/equipe/[slug]': { fr: '/equipe/[slug]', en: '/people/[slug]' },
    '/realisations': { fr: '/realisations', en: '/matters' },
    '/publications': { fr: '/publications', en: '/insights' },
    '/publications/[slug]': { fr: '/publications/[slug]', en: '/insights/[slug]' },
    '/carrieres': { fr: '/carrieres', en: '/careers' },
    '/contact': { fr: '/contact', en: '/contact' },
    '/mentions-legales': { fr: '/mentions-legales', en: '/legal-notice' },
    '/confidentialite': { fr: '/confidentialite', en: '/privacy' },
  },
});

export type AppPathname = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
