import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  pathnames: {
    '/': '/',
    '/cabinet': {
      fr: '/cabinet',
      en: '/about-us',
    },
    '/equipe': {
      fr: '/equipe',
      en: '/team',
    },
    '/expertises': {
      fr: '/expertises',
      en: '/expertise',
    },
    '/expertises/[slug]': {
      fr: '/expertises/[slug]',
      en: '/expertise/[slug]',
    },
    '/formations': {
      fr: '/formations',
      en: '/training',
    },
    '/actualites': {
      fr: '/actualites',
      en: '/news',
    },
    '/espace-client': {
      fr: '/espace-client',
      en: '/client-portal',
    },
    '/contact': {
      fr: '/contact',
      en: '/contact',
    },
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
