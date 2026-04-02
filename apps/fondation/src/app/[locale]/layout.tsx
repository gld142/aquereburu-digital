import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '700'],
});

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
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      data-theme="fondation"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-amber-50 font-sans text-slate-700 antialiased dark:bg-slate-950 dark:text-slate-200">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <main>{children}</main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
