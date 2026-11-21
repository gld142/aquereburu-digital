import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { PageHead } from '@/components/ui';
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
      <ul className="shell grid gap-x-10 py-12 md:grid-cols-2 md:py-16">
        {list.map((p) => {
          const c = practiceContent(p, locale);
          return (
            <li key={p.slug} className="border-b border-rule">
              <Link href={practiceHref(p)} className="group block py-8">
                <span className="t-h2 block transition-colors group-hover:text-accent">{c.name}</span>
                <span className="t-body mt-3 block text-[1.0625rem] text-ink-2">{c.pitch}</span>
                <span className="t-small mt-4 block text-slate">{c.services.slice(0, 3).join(', ')}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
