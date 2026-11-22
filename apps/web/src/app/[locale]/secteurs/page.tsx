import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Fleche, PageHead, Section, capitale, enLettres } from '@/components/ui';
import type { Locale } from '@/content/site';
import { practiceContent, practiceHref, sectorList, sortByName } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Secteurs' : 'Sectors' };
}

export default async function SectorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';
  const list = sortByName(sectorList, (p) => practiceContent(p, locale).name, locale);

  return (
    <>
      <PageHead
        locale={locale}
        title={fr ? 'Secteurs' : 'Sectors'}
        lead={
          fr
            ? 'Connaître le métier de nos clients, ses contrats types, ses régulateurs et ses risques : c’est ce qui rend un conseil utile.'
            : 'Knowing our clients’ business, its standard contracts, regulators and risks is what makes advice useful.'
        }
        crumbs={[{ label: fr ? 'Secteurs' : 'Sectors' }]}
      />
      <Section
        id="index"
        label={fr ? 'Secteurs' : 'Sectors'}
        gloss={
          fr
            ? `${capitale(enLettres(list.length, locale))} secteurs d’activité`
            : `${capitale(enLettres(list.length, locale))} industry sectors`
        }
      >
        <ul className="filet">
          {list.map((p) => {
            const c = practiceContent(p, locale);
            return (
              <li key={p.slug}>
                <Link href={practiceHref(p)} className="ligne">
                  <b>{c.name}</b>
                  <span>
                    {c.pitch}
                    <span className="t-glose mt-2 block">{c.services.slice(0, 3).join(' · ')}</span>
                  </span>
                  <Fleche strokeWidth={1.8} />
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
