import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  return {
    title: {
      default: "AQUEREBURU & PARTNERS — Société d'Avocats Juridique et Fiscale",
      template: '%s | AQUEREBURU & PARTNERS',
    },
    description: isFr
      ? "Cabinet d'avocats certifié ISO 9001 à Lomé et Paris. Experts en droit OHADA, propriété intellectuelle, fiscal, maritime et environnement."
      : 'ISO 9001 certified law firm in Lomé and Paris. Experts in OHADA law, intellectual property, tax, maritime, and environmental law.',
    keywords: [
      'AQUEREBURU',
      'avocats',
      'Togo',
      'Lomé',
      'Paris',
      'OHADA',
      'propriété intellectuelle',
      'fiscal',
      'maritime',
      'ISO 9001',
    ],
    authors: [{ name: 'AQUEREBURU & PARTNERS' }],
    openGraph: {
      type: 'website',
      locale: isFr ? 'fr_FR' : 'en_US',
      alternateLocale: isFr ? 'en_US' : 'fr_FR',
      siteName: 'AQUEREBURU & PARTNERS',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        fr: '/fr',
        en: '/en',
      },
    },
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

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#faf8f3] font-sans text-slate-700 antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
