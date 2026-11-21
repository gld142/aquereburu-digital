import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Missing, PageHead } from '@/components/ui';
import { ProseSections } from '@/components/prose-sections';
import { firm, offices, type Locale } from '@/content/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Mentions légales' : 'Legal notice', robots: { index: true, follow: true } };
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';
  const v = (x: string | null) => x ?? <Missing locale={locale} />;
  const hq = offices[0]!;

  const Row = ({ k, children }: { k: string; children: React.ReactNode }) => (
    <li>
      <strong>{k} :</strong> {children}
    </li>
  );

  return (
    <>
      <PageHead locale={locale} title={fr ? 'Mentions légales' : 'Legal notice'} crumbs={[{ label: fr ? 'Mentions légales' : 'Legal notice' }]} />
      <ProseSections
        sections={[
          {
            id: 'editeur',
            title: fr ? 'Éditeur du site' : 'Publisher',
            body: (
              <ul>
                <Row k={fr ? 'Raison sociale' : 'Registered name'}>{firm.legalName}</Row>
                <Row k={fr ? 'Forme juridique' : 'Legal form'}>{firm.legalForm[locale]}</Row>
                <Row k={fr ? 'Siège' : 'Registered office'}>{hq.address!.join(', ')}</Row>
                <Row k={fr ? 'Téléphone' : 'Phone'}>{firm.phone}</Row>
                <Row k="E-mail">{firm.email}</Row>
                <Row k={fr ? 'Barreau' : 'Bar'}>{firm.bar[locale]}</Row>
                <Row k={fr ? 'N° d’inscription au tableau' : 'Bar registration no.'}>{v(firm.barRegistration)}</Row>
                <Row k={fr ? 'RCCM / identification' : 'Company registration'}>{v(firm.rcs)}</Row>
                <Row k={fr ? 'N° d’identification fiscale' : 'Tax ID'}>{v(firm.taxId)}</Row>
                <Row k={fr ? 'Directeur de la publication' : 'Publication director'}>{v(firm.publicationDirector)}</Row>
              </ul>
            ),
          },
          {
            id: 'assurance',
            title: fr ? 'Assurance responsabilité civile professionnelle' : 'Professional indemnity insurance',
            body: (
              <ul>
                <Row k={fr ? 'Assureur' : 'Insurer'}>{v(firm.insurer)}</Row>
                <Row k={fr ? 'Couverture géographique' : 'Territorial coverage'}>{v(firm.insuranceCoverage)}</Row>
              </ul>
            ),
          },
          {
            id: 'reglementation',
            title: fr ? 'Profession réglementée' : 'Regulated profession',
            body: (
              <p>
                {fr
                  ? `Les avocats du cabinet sont soumis aux règles de leur Ordre et au ${firm.uemoaRegulation.fr}. Titre professionnel : avocat, délivré au Togo.`
                  : `The firm’s lawyers are subject to the rules of their Bar and to ${firm.uemoaRegulation.en}. Professional title: avocat (lawyer), granted in Togo.`}
              </p>
            ),
          },
          {
            id: 'hebergeur',
            title: fr ? 'Hébergement' : 'Hosting',
            body: (
              <p>
                {firm.host.name}, {firm.host.address}.
              </p>
            ),
          },
          {
            id: 'propriete',
            title: fr ? 'Propriété intellectuelle' : 'Intellectual property',
            body: (
              <p>
                {fr
                  ? 'Les textes, photographies et éléments graphiques de ce site appartiennent au cabinet ou sont utilisés avec autorisation. Toute reproduction sans accord écrit est interdite. Les noms et logos des organismes cités dans les distinctions appartiennent à leurs titulaires.'
                  : 'The texts, photographs and graphic elements of this website belong to the firm or are used with permission. Reproduction without written consent is prohibited. The names and logos of the organisations cited in awards belong to their owners.'}
              </p>
            ),
          },
          {
            id: 'responsabilite',
            title: fr ? 'Responsabilité' : 'Liability',
            body: (
              <p>
                {fr
                  ? 'Les informations publiées sur ce site sont générales. Elles ne constituent ni une consultation juridique ni une offre de services personnalisée. Aucune relation avocat-client ne naît de la consultation du site ou de l’envoi d’un message.'
                  : 'Information on this website is general. It is neither legal advice nor a personalised offer of services. No lawyer-client relationship arises from visiting the site or sending a message.'}
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
