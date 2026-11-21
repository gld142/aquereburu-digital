import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PageHead } from '@/components/ui';
import { InsightsList, type InsightRow } from '@/components/insights-list';
import { insights, insightTypes, type InsightType } from '@/content/insights';
import type { Locale } from '@/content/site';
import { formatDate, getPractice, practiceContent, sortByName } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Publications' : 'Insights' };
}

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';

  const rows: InsightRow[] = [...insights]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((i) => ({
      slug: i.slug,
      title: i.title[locale],
      summary: i.summary[locale],
      date: i.date,
      dateLabel: formatDate(i.date, locale),
      year: i.date.slice(0, 4),
      type: i.type,
      typeLabel: insightTypes[i.type][locale],
      practices: i.practices.map((s) => ({ slug: s, name: practiceContent(getPractice(s)!, locale).name })),
    }));

  const used = [...new Set(insights.flatMap((i) => i.practices))];
  const practiceOptions = sortByName(
    used.map((s) => ({ slug: s, name: practiceContent(getPractice(s)!, locale).name })),
    (o) => o.name,
    locale,
  );
  const types = (Object.keys(insightTypes) as InsightType[])
    .filter((t) => insights.some((i) => i.type === t))
    .map((t) => ({ id: t, label: insightTypes[t][locale] }));

  return (
    <>
      <PageHead
        locale={locale}
        title={fr ? 'Publications' : 'Insights'}
        lead={
          fr
            ? 'Notes juridiques et briefings sur le droit OHADA, la réglementation UEMOA et l’actualité des affaires en Afrique de l’Ouest.'
            : 'Legal notes and briefings on OHADA law, WAEMU regulation and business developments in West Africa.'
        }
        crumbs={[{ label: fr ? 'Publications' : 'Insights' }]}
      />
      <div className="shell py-12 md:py-16">
        <InsightsList rows={rows} types={types} practiceOptions={practiceOptions} locale={locale} />
      </div>
    </>
  );
}
