import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PageHead, Section } from '@/components/ui';
import { ContactForm } from '@/components/contact-form';
import { Gravure } from '@/components/gravure';
import { firm, type Locale } from '@/content/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Carrières' : 'Careers' };
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';

  const steps = fr
    ? [
        ['Candidature', 'Lettre et CV, par le formulaire ci-dessous ou par e-mail.'],
        ['Premier entretien', 'Avec un associé et un avocat du département concerné.'],
        ['Mise en situation', 'Un cas pratique court, en lien avec le poste.'],
        ['Décision', 'Réponse écrite, que la candidature soit retenue ou non.'],
      ]
    : [
        ['Application', 'Cover letter and CV, through the form below or by email.'],
        ['First interview', 'With a partner and a lawyer from the relevant department.'],
        ['Case study', 'A short practical exercise related to the role.'],
        ['Decision', 'A written answer, whether or not the application is successful.'],
      ];

  const profiles = fr
    ? [
        ['Avocats', 'Inscrits au tableau, avec une pratique en droit des affaires, contentieux ou droit public.'],
        ['Élèves-avocats et stagiaires', 'Stages encadrés par un avocat référent.'],
        ['Juristes', 'Veille, recherche, rédaction et appui aux équipes.'],
      ]
    : [
        ['Lawyers', 'Admitted to the Bar, with experience in business law, disputes or public law.'],
        ['Trainee lawyers and interns', 'Placements supervised by a lawyer.'],
        ['Legal counsel', 'Monitoring, research, drafting and support for the teams.'],
      ];

  return (
    <>
      <PageHead
        locale={locale}
        title={fr ? 'Carrières' : 'Careers'}
        lead={
          fr
            ? 'Rejoindre le cabinet, c’est travailler sur des dossiers qui comptent, aux côtés d’associés qui transmettent. Nous recrutons des avocats, des stagiaires et des juristes.'
            : 'Joining the firm means working on matters that count, alongside partners who teach. We recruit lawyers, interns and legal counsel.'
        }
        crumbs={[{ label: fr ? 'Carrières' : 'Careers' }]}
        aside={<Gravure nom="lecteur" largeur="clamp(32px, 3.4vw, 50px)" className="g-tete" />}
      />

      <Section
        id="profils"
        heading
        label={fr ? 'Qui nous recrutons' : 'Who we recruit'}
        gloss={fr ? 'Candidatures étudiées toute l’année' : 'Applications reviewed all year round'}
      >
        <ul className="rangs max-w-[52rem]">
          {profiles.map(([t, d]) => (
            <li key={t} className="grid gap-x-6 gap-y-1 sm:grid-cols-3">
              <p className="t-h3">{t}</p>
              <p className="sm:col-span-2">{d}</p>
            </li>
          ))}
        </ul>
        <p className="t-small mt-5">
          {fr
            ? 'Aucune offre n’est publiée en ce moment. Les candidatures spontanées sont étudiées toute l’année.'
            : 'No vacancies are advertised at the moment. Speculative applications are reviewed all year round.'}
        </p>
      </Section>

      <Section
        id="processus"
        heading
        tone="brume"
        label={fr ? 'Le processus de recrutement' : 'How we recruit'}
        gloss={fr ? 'Quatre étapes' : 'Four steps'}
      >
        <ol className="etapes">
          {steps.map(([t, d], i) => (
            <li key={t}>
              <span className="num" aria-hidden="true">
                {i + 1}
              </span>
              <p className="t-h3 mt-4">{t}</p>
              <p className="mt-2 text-[16px]">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="postuler" heading label={fr ? 'Postuler' : 'Apply'} gloss={fr ? 'Candidature spontanée' : 'Speculative application'}>
        <p className="mb-8 max-w-[62ch]">
          {fr ? 'Envoyez votre CV en pièce jointe à ' : 'Send your CV as an attachment to '}
          <a className="link" href={`mailto:${firm.email}?subject=${encodeURIComponent(fr ? 'Candidature' : 'Application')}`}>
            {firm.email}
          </a>
          {fr ? ', ou présentez-vous ici.' : ', or introduce yourself here.'}
        </p>
        <div className="max-w-[46rem]">
          <ContactForm locale={locale} practiceOptions={[]} defaultKind="candidature" />
        </div>
      </Section>
    </>
  );
}
