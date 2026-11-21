import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PageHead } from '@/components/ui';
import { ProseSections } from '@/components/prose-sections';
import { firm, type Locale } from '@/content/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Confidentialité et cookies' : 'Privacy and cookies' };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';

  return (
    <>
      <PageHead
        locale={locale}
        title={fr ? 'Confidentialité et cookies' : 'Privacy and cookies'}
        lead={
          fr
            ? 'Ce site collecte le minimum : ce que vous nous écrivez. Pas de traceur publicitaire, pas de mesure d’audience nominative.'
            : 'This site collects the minimum: what you write to us. No advertising trackers, no personal audience tracking.'
        }
        crumbs={[{ label: fr ? 'Confidentialité' : 'Privacy' }]}
      />
      <ProseSections
        sections={[
          {
            id: 'responsable',
            title: fr ? 'Responsable du traitement' : 'Data controller',
            body: (
              <p>
                {firm.legalName}, {fr ? 'joignable à' : 'reachable at'} <a href={`mailto:${firm.email}`}>{firm.email}</a>.
              </p>
            ),
          },
          {
            id: 'donnees',
            title: fr ? 'Données collectées' : 'Data collected',
            body: fr ? (
              <ul>
                <li>Formulaire de contact et de candidature : nom, organisation, e-mail, téléphone, message.</li>
                <li>Inscription aux publications : adresse e-mail.</li>
                <li>Journaux techniques de l’hébergeur (adresse IP, date), conservés pour la sécurité du site.</li>
              </ul>
            ) : (
              <ul>
                <li>Contact and application forms: name, organisation, email, phone, message.</li>
                <li>Insights subscription: email address.</li>
                <li>Host technical logs (IP address, date), kept for site security.</li>
              </ul>
            ),
          },
          {
            id: 'finalites',
            title: fr ? 'Finalités et base légale' : 'Purposes and legal basis',
            body: (
              <p>
                {fr
                  ? 'Répondre à votre demande, étudier une candidature ou vous adresser nos publications. La base légale est votre consentement, exprimé en cochant la case prévue, que vous pouvez retirer à tout moment.'
                  : 'To answer your request, review an application or send you our insights. The legal basis is your consent, given by ticking the box provided, which you may withdraw at any time.'}
              </p>
            ),
          },
          {
            id: 'conservation',
            title: fr ? 'Durée de conservation' : 'Retention',
            body: (
              <p>
                {fr
                  ? 'Demandes de contact : trois ans après le dernier échange. Candidatures : deux ans. Publications : jusqu’à désinscription.'
                  : 'Contact requests: three years after the last exchange. Applications: two years. Insights: until you unsubscribe.'}
              </p>
            ),
          },
          {
            id: 'droits',
            title: fr ? 'Vos droits' : 'Your rights',
            body: (
              <p>
                {fr
                  ? 'Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de portabilité. Écrivez à '
                  : 'You have the right of access, rectification, erasure, objection and portability. Write to '}
                <a href={`mailto:${firm.email}`}>{firm.email}</a>
                {fr
                  ? '. Vous pouvez aussi saisir l’autorité de protection des données compétente (au Togo, l’IPDCP ; en France, la CNIL).'
                  : '. You may also contact the competent data protection authority (IPDCP in Togo; CNIL in France).'}
              </p>
            ),
          },
          {
            id: 'cookies',
            title: 'Cookies',
            body: (
              <p>
                {fr
                  ? 'Le site ne dépose aucun cookie de mesure ou de publicité. Les cartes Google Maps de la page Contact ne se chargent qu’après votre clic ; Google peut alors déposer ses propres cookies. Le choix de langue est conservé par un cookie technique strictement nécessaire.'
                  : 'The site sets no analytics or advertising cookies. The Google Maps on the Contact page load only after you click; Google may then set its own cookies. Your language choice is kept in a strictly necessary technical cookie.'}
              </p>
            ),
          },
          {
            id: 'transferts',
            title: fr ? 'Hébergement et transferts' : 'Hosting and transfers',
            body: (
              <p>
                {fr
                  ? `Le site est hébergé par ${firm.host.name}. Les messages sont acheminés par un prestataire d’envoi d’e-mails. Ces prestataires peuvent traiter des données hors de l’Union européenne, dans le cadre de garanties contractuelles.`
                  : `The site is hosted by ${firm.host.name}. Messages are delivered by an email provider. These providers may process data outside the European Union under contractual safeguards.`}
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
