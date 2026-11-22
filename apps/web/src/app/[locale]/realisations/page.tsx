import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PageHead, Section } from '@/components/ui';
import { MatterRows } from '@/components/matter-rows';
import { Gravure } from '@/components/gravure';
import type { Locale } from '@/content/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Réalisations' : 'Matters' };
}

export default async function MattersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';
  return (
    <>
      <PageHead
        locale={locale}
        title={fr ? 'Réalisations' : 'Matters'}
        lead={
          fr
            ? 'Une sélection de dossiers représentatifs. Le secret professionnel interdit de citer nos clients : chaque dossier est décrit par la nature du client, le mandat, notre rôle et le résultat obtenu.'
            : 'A selection of representative matters. Professional secrecy prevents us from naming clients: each matter is described by the type of client, the mandate, our role and the outcome.'
        }
        crumbs={[{ label: fr ? 'Réalisations' : 'Matters' }]}
        aside={<Gravure nom="grue" largeur="clamp(84px, 10vw, 140px)" className="g-tete" />}
      />
      <Section
        id="dossiers"
        label={fr ? 'Dossiers représentatifs' : 'Representative matters'}
        gloss={fr ? 'Sélection anonymisée' : 'Anonymised selection'}
      >
        <MatterRows locale={locale} />
      </Section>
    </>
  );
}
