import type { MetadataRoute } from 'next';
import { getPathname, routing } from '@/i18n/routing';
import { firm } from '@/content/site';
import { practices } from '@/content/practices';
import { people } from '@/content/people';
import { insights } from '@/content/insights';

type Href = Parameters<typeof getPathname>[0]['href'];

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = [
    '/', '/cabinet', '/cabinet/deontologie', '/cabinet/engagement', '/expertises', '/secteurs', '/equipe',
    '/realisations', '/publications', '/carrieres', '/contact', '/mentions-legales', '/confidentialite',
  ] as const;

  const hrefs: Href[] = [
    ...statics,
    ...practices.map((p) => ({
      pathname: p.kind === 'secteur' ? ('/secteurs/[slug]' as const) : ('/expertises/[slug]' as const),
      params: { slug: p.slug },
    })),
    ...people.filter((p) => p.bio.fr).map((p) => ({ pathname: '/equipe/[slug]' as const, params: { slug: p.slug } })),
    ...insights.map((i) => ({ pathname: '/publications/[slug]' as const, params: { slug: i.slug } })),
  ];

  const url = (href: Href, locale: (typeof routing.locales)[number]) =>
    `${firm.siteUrl}${getPathname({ href, locale, forcePrefix: true })}`;

  return hrefs.map((href) => ({
    url: url(href, 'fr'),
    alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, url(href, l)])) },
  }));
}
