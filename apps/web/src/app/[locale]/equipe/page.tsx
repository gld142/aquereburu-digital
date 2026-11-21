import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PageHead } from '@/components/ui';
import { TeamDirectory, type DirectoryPerson } from '@/components/team-directory';
import { people } from '@/content/people';
import type { Locale } from '@/content/site';
import { practices as _p } from '@/content/practices';
import { getPractice, practiceContent, sortByName } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Équipe' : 'People' };
}

const roleOrder = { associe: 0, counsel: 1, collaborateur: 2, juriste: 3 } as const;

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';

  const list: DirectoryPerson[] = [...people]
    .sort((a, b) => roleOrder[a.role] - roleOrder[b.role] || a.sortName.localeCompare(b.sortName, locale))
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      title: p.title[locale],
      role: p.role,
      photo: p.photo,
      languages: p.languages,
      hasProfile: Boolean(p.bio.fr),
      practices: p.practices.map((s) => ({ slug: s, name: practiceContent(getPractice(s)!, locale).name })),
    }));

  const used = new Set(people.flatMap((p) => p.practices));
  const practiceOptions = sortByName(
    _p.filter((p) => used.has(p.slug)).map((p) => ({ slug: p.slug, name: practiceContent(p, locale).name })),
    (o) => o.name,
    locale,
  );

  return (
    <>
      <PageHead
        locale={locale}
        title={fr ? 'Équipe' : 'People'}
        lead={
          fr
            ? 'Avocats inscrits au tableau de l’Ordre et juristes : recherchez par nom, par expertise ou par langue de travail.'
            : 'Lawyers on the Bar roll and legal counsel: search by name, practice or working language.'
        }
        crumbs={[{ label: fr ? 'Équipe' : 'People' }]}
      />
      <div className="shell py-12 md:py-16">
        <TeamDirectory people={list} practiceOptions={practiceOptions} locale={locale} />
      </div>
    </>
  );
}
