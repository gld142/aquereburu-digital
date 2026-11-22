import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { PageHead } from '@/components/ui';
import { ProseSections } from '@/components/prose-sections';
import type { Locale } from '@/content/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Fondation et responsabilité sociétale' : 'Foundation and social responsibility' };
}

export default async function CommitmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';
  const foundationUrl = process.env.NEXT_PUBLIC_FONDATION_URL;

  return (
    <>
      <PageHead
        locale={locale}
        title={fr ? 'Fondation et responsabilité sociétale' : 'Foundation and social responsibility'}
        lead={
          fr
            ? 'Un cabinet d’avocats a une responsabilité particulière : rendre le droit accessible. Nous l’exerçons par le pro bono, par la formation et à travers la Fondation Aquereburu & Partners.'
            : 'A law firm carries a particular responsibility: making the law accessible. We meet it through pro bono work, training and the Aquereburu & Partners Foundation.'
        }
        crumbs={[{ label: fr ? 'Cabinet' : 'Firm', href: '/cabinet' }, { label: fr ? 'Engagement' : 'Commitment' }]}
        aside={
          foundationUrl ? (
            <a href={foundationUrl} className="btn" rel="noopener">
              {fr ? 'Site de la Fondation' : 'Foundation website'}
            </a>
          ) : undefined
        }
      />
      <ProseSections
        dessins={['ecoliers', null, 'barque']}
        sections={[
          {
            id: 'fondation',
            title: fr ? 'La Fondation' : 'The Foundation',
            body: fr ? (
              <p>
                La Fondation Aquereburu & Partners soutient le développement social, éducatif et environnemental du Togo par des
                actions concrètes et durables, menées avec des partenaires locaux.
              </p>
            ) : (
              <p>
                The Aquereburu & Partners Foundation supports social, educational and environmental development in Togo through
                practical, lasting projects run with local partners.
              </p>
            ),
          },
          {
            id: 'pro-bono',
            title: fr ? 'Pro bono' : 'Pro bono',
            body: fr ? (
              <p>
                Les avocats du cabinet consacrent une partie de leur temps à l’assistance juridique gratuite de personnes et
                d’associations qui n’ont pas les moyens d’un conseil. Les demandes sont examinées par un associé, dans le respect des
                règles de l’Ordre.
              </p>
            ) : (
              <p>
                The firm’s lawyers devote part of their time to free legal assistance for individuals and associations who cannot
                afford counsel. Requests are reviewed by a partner, in line with the rules of the Bar.
              </p>
            ),
          },
          {
            id: 'formation',
            title: fr ? 'Transmettre le droit' : 'Passing on the law',
            body: fr ? (
              <p>
                Le cabinet forme des stagiaires, des juristes d’entreprise et des agents publics. Ses associés interviennent dans
                les écoles de droit et lors de conférences en Afrique de l’Ouest et en Europe.
              </p>
            ) : (
              <p>
                The firm trains interns, in-house lawyers and civil servants. Its partners teach at law schools and speak at
                conferences in West Africa and Europe.
              </p>
            ),
          },
          {
            id: 'contact',
            title: fr ? 'Proposer un projet' : 'Propose a project',
            body: (
              <p>
                {fr
                  ? 'Associations, écoles, institutions : pour solliciter le cabinet ou la Fondation, '
                  : 'Associations, schools, institutions: to approach the firm or the Foundation, '}
                <Link href="/contact">{fr ? 'écrivez-nous' : 'write to us'}</Link>.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
