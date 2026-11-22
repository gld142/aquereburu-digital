import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Gravure } from '@/components/gravure';
import { PageHead, Section, capitale, enLettres } from '@/components/ui';
import { ExpertiseIndex, type ExpertiseRow } from '@/components/expertise-index';
import { practiceGroups, type PracticeGroup } from '@/content/practices';
import type { Locale } from '@/content/site';
import { practiceContent, practiceList, sortByName } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr' ? 'Expertises' : 'Expertise',
    description:
      locale === 'fr'
        ? 'Arbitrage, corporate, financement de projets, propriété intellectuelle, droit public : les pratiques du cabinet Aquereburu & Partners.'
        : 'Arbitration, corporate, project finance, intellectual property, public law: the practices of Aquereburu & Partners.',
  };
}

export default async function ExpertisesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';

  const rows: ExpertiseRow[] = sortByName(practiceList, (p) => practiceContent(p, locale).name, locale).map((p) => {
    const c = practiceContent(p, locale);
    return {
      slug: p.slug,
      name: c.name,
      pitch: c.pitch,
      haystack: [c.pitch, ...c.services].join(' '),
      group: p.group ?? null,
      href: { pathname: '/expertises/[slug]', params: { slug: p.slug } },
    };
  });

  const groups = (Object.keys(practiceGroups) as PracticeGroup[]).map((id) => ({ id, label: practiceGroups[id][locale] }));

  return (
    <>
      <PageHead
        locale={locale}
        title={fr ? 'Expertises' : 'Expertise'}
        lead={
          fr
            ? 'Conseil, transactions, contentieux : chaque dossier est suivi par un associé référent et l’équipe qu’il réunit, à Lomé, Paris ou Cotonou.'
            : 'Advisory, transactions, disputes: every matter is led by a responsible partner and the team they bring together, in Lomé, Paris or Cotonou.'
        }
        crumbs={[{ label: fr ? 'Expertises' : 'Expertise' }]}
        aside={<Gravure nom="avocat" largeur="clamp(40px, 3.6vw, 52px)" className="g-tete" />}
      />
      <Section
        id="index"
        label={fr ? 'Pratiques' : 'Practices'}
        gloss={
          fr
            ? `${capitale(enLettres(rows.length, locale))} pratiques, par ordre alphabétique`
            : `${capitale(enLettres(rows.length, locale))} practices, in alphabetical order`
        }
      >
        <ExpertiseIndex rows={rows} groups={groups} locale={locale} />
      </Section>
    </>
  );
}
