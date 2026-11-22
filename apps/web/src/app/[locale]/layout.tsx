import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/header';
import { SmoothScroll } from '@/components/motion';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { buildSearchIndex } from '@/lib/search-index';
import { firm, offices, type Locale } from '@/content/site';

// Source Serif 4 porte les titres, Source Sans 3 le texte et l'interface.
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const fr = locale === 'fr';
  return {
    metadataBase: new URL(firm.siteUrl),
    title: {
      default: fr
        ? 'Aquereburu & Partners, société d’avocats à Lomé et Paris'
        : 'Aquereburu & Partners, law firm in Lomé and Paris',
      template: '%s | Aquereburu & Partners',
    },
    description: fr
      ? 'Société civile professionnelle d’avocats fondée en 1987 à Lomé. Droit des affaires OHADA, arbitrage, propriété intellectuelle, financement de projets, contentieux.'
      : 'Professional partnership of lawyers founded in Lomé in 1987. OHADA business law, arbitration, intellectual property, project finance and disputes.',
    openGraph: {
      type: 'website',
      siteName: 'Aquereburu & Partners',
      locale: fr ? 'fr_FR' : 'en_GB',
      alternateLocale: fr ? 'en_GB' : 'fr_FR',
    },
    alternates: { languages: { fr: '/fr', en: '/en' } },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const l = locale as Locale;

  const organisation = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: firm.legalName,
    alternateName: firm.name,
    url: `${firm.siteUrl}/${l}`,
    foundingDate: String(firm.founded),
    founder: { '@type': 'Person', name: firm.founder.replace('Me ', '') },
    email: firm.email,
    telephone: firm.phone,
    slogan: firm.motto[l],
    areaServed: ['TG', 'BJ', 'FR', 'OHADA', 'UEMOA'],
    address: offices
      .filter((o) => o.address)
      .map((o) => ({
        '@type': 'PostalAddress',
        streetAddress: o.address![0],
        addressLocality: o.city[l],
        addressCountry: o.id === 'paris' ? 'FR' : o.id === 'cotonou' ? 'BJ' : 'TG',
      })),
  };

  return (
    <html lang={l} className={`${sourceSerif.variable} ${sourceSans.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only z-[100] bg-marine px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {l === 'fr' ? 'Aller au contenu' : 'Skip to content'}
        </a>
        <JsonLd data={organisation} />
        <NextIntlClientProvider locale={l} messages={{}}>
          <SmoothScroll />
          <Header locale={l} searchIndex={buildSearchIndex(l)} />
          <main id="contenu">{children}</main>
          <Footer locale={l} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
