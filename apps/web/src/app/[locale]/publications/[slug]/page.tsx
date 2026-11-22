import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import { PageHead, Section } from '@/components/ui';
import { JsonLd } from '@/components/json-ld';
import { getInsight, insights, insightTypes } from '@/content/insights';
import { getPerson } from '@/content/people';
import { firm, type Locale } from '@/content/site';
import { formatDate, getPractice, practiceContent, practiceHref } from '@/lib/content';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => insights.map((i) => ({ locale, slug: i.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const i = getInsight(slug);
  if (!i) return {};
  const l = locale as Locale;
  return { title: i.title[l], description: i.summary[l], openGraph: { type: 'article', publishedTime: i.date } };
}

export default async function InsightPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';
  const i = getInsight(slug);
  if (!i) notFound();
  const author = i.author ? getPerson(i.author) : null;
  const shareUrl = `${firm.siteUrl}/${locale}/${fr ? 'publications' : 'insights'}/${i.slug}`;

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: i.title[locale],
          description: i.summary[locale],
          datePublished: i.date,
          inLanguage: locale,
          author: author ? { '@type': 'Person', name: author.name } : { '@type': 'Organization', name: firm.legalName },
          publisher: { '@type': 'Organization', name: firm.legalName },
        }}
      />
      <PageHead
        locale={locale}
        long
        meta={
          <>
            {insightTypes[i.type][locale]}, <time dateTime={i.date}>{formatDate(i.date, locale)}</time>
            {author ? `, ${author.name}` : ''}
          </>
        }
        title={i.title[locale]}
        lead={i.summary[locale]}
        crumbs={[{ label: fr ? 'Publications' : 'Insights', href: '/publications' }, { label: i.title[locale] }]}
      />

      <Section label={insightTypes[i.type][locale]} gloss={formatDate(i.date, locale)}>
        <div className="prose">
          {i.body[locale].map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
        <p className="t-small mt-10 max-w-[68ch] border-t border-trait pt-5">
          {fr
            ? 'Cette note a une vocation d’information générale et ne constitue pas une consultation. Pour une analyse de votre situation, consultez un avocat.'
            : 'This note is for general information and is not legal advice. For an analysis of your situation, consult a lawyer.'}
        </p>
      </Section>

      <Section tone="brume" label={fr ? 'Pour aller plus loin' : 'Further reading'} gloss={fr ? 'Expertises liées' : 'Related expertise'}>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="t-h3 mb-4">{fr ? 'Expertises' : 'Expertise'}</h2>
            <ul className="flex flex-wrap gap-2">
              {i.practices.map((s) => {
                const p = getPractice(s)!;
                return (
                  <li key={s}>
                    <Link href={practiceHref(p)} className="filtre">
                      {practiceContent(p, locale).name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="t-h3 mb-4">{fr ? 'Partager' : 'Share'}</h2>
            <ul className="space-y-2.5">
              <li>
                <a className="link" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="link" href={`mailto:?subject=${encodeURIComponent(i.title[locale])}&body=${encodeURIComponent(shareUrl)}`}>
                  {fr ? 'Par e-mail' : 'By email'}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </article>
  );
}
