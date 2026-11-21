import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { PracticeDetail } from '@/components/practice-detail';
import type { Locale } from '@/content/site';
import { getPractice, practiceContent, sectorList } from '@/lib/content';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => sectorList.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getPractice(slug);
  if (!p) return {};
  const c = practiceContent(p, locale as Locale);
  return { title: c.name, description: c.pitch };
}

export default async function SectorPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = getPractice(slug);
  if (!p || p.kind !== 'secteur') notFound();
  return <PracticeDetail practice={p} locale={locale as Locale} />;
}
