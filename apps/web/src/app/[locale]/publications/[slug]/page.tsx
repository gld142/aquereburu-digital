import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/ui';
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
      <header className="shell pb-10 pt-8 md:pt-10">
        <Breadcrumbs locale={locale} items={[{ label: fr ? 'Publications' : 'Insights', href: '/publications' }, { label: i.title[locale] }]} />
        <div className="mt-10 md:mt-16 md:grid md:grid-cols-12 md:gap-10">
          <div className="md:col-span-9 lg:col-span-8">
            <p className="t-small text-slate">
              {insightTypes[i.type][locale]}, <time dateTime={i.date}>{formatDate(i.date, locale)}</time>
              {author ? `, ${author.name}` : ''}
            </p>
            <h1 className="t-h1 mt-4">{i.title[locale]}</h1>
            <p className="t-lead mt-6 text-ink-2">{i.summary[locale]}</p>
          </div>
        </div>
      </header>
      <div className="shell grid gap-x-10 gap-y-12 border-t border-rule pb-20 pt-12 md:grid-cols-12 md:pb-28">
        <div className="t-body measure md:col-span-7">
          {i.body[locale].map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
          <p className="t-small mt-10 border-t border-rule pt-5 text-slate">
            {fr
              ? 'Cette note a une vocation d’information générale et ne constitue pas une consultation. Pour une analyse de votre situation, consultez un avocat.'
              : 'This note is for general information and is not legal advice. For an analysis of your situation, consult a lawyer.'}
          </p>
        </div>
        <aside className="space-y-10 md:col-span-4 md:col-start-9">
          <div>
            <h2 className="t-section">{fr ? 'Expertises' : 'Expertise'}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {i.practices.map((s) => {
                const p = getPractice(s)!;
                return (
                  <li key={s}>
                    <Link href={practiceHref(p)} className="chip">
                      {practiceContent(p, locale).name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="t-section">{fr ? 'Partager' : 'Share'}</h2>
            <ul className="t-ui mt-3 space-y-2">
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
        </aside>
      </div>
    </article>
  );
}
