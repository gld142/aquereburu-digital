import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PageHead } from '@/components/ui';
import { ContactForm } from '@/components/contact-form';
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
      />

      <section aria-labelledby="profils" className="shell grid gap-x-10 gap-y-8 py-16 md:grid-cols-12 md:py-24">
        <h2 id="profils" className="t-h2 md:col-span-4">
          {fr ? 'Qui nous recrutons' : 'Who we recruit'}
        </h2>
        <ul className="border-t border-ink md:col-span-8">
          {profiles.map(([t, d]) => (
            <li key={t} className="grid gap-2 border-b border-rule py-5 sm:grid-cols-3 sm:gap-6">
              <p className="t-h3 text-[1.125rem]">{t}</p>
              <p className="t-body text-[1.0625rem] text-ink-2 sm:col-span-2">{d}</p>
            </li>
          ))}
        </ul>
        <p className="t-small text-slate md:col-span-8 md:col-start-5">
          {fr
            ? 'Aucune offre n’est publiée en ce moment. Les candidatures spontanées sont étudiées toute l’année.'
            : 'No vacancies are advertised at the moment. Speculative applications are reviewed all year round.'}
        </p>
      </section>

      <section aria-labelledby="processus" className="bg-paper-2">
        <div className="shell py-16 md:py-24">
          <h2 id="processus" className="t-h2">
            {fr ? 'Le processus de recrutement' : 'How we recruit'}
          </h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([t, d], i) => (
              <li key={t} className="border-t border-ink pt-5">
                <p className="semiwide font-sans text-[2rem] font-[300] leading-none tabular-nums text-slate">{i + 1}</p>
                <p className="t-h3 mt-5">{t}</p>
                <p className="t-body mt-2 text-[1.0625rem] text-ink-2">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="postuler" className="shell grid gap-x-10 gap-y-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-4">
          <h2 id="postuler" className="t-h2">
            {fr ? 'Postuler' : 'Apply'}
          </h2>
          <p className="t-body mt-4 text-[1.0625rem] text-ink-2">
            {fr ? 'Envoyez votre CV en pièce jointe à ' : 'Send your CV as an attachment to '}
            <a className="link" href={`mailto:${firm.email}?subject=${encodeURIComponent(fr ? 'Candidature' : 'Application')}`}>
              {firm.email}
            </a>
            {fr ? ', ou présentez-vous ici.' : ', or introduce yourself here.'}
          </p>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <ContactForm locale={locale} practiceOptions={[]} defaultKind="candidature" />
        </div>
      </section>
    </>
  );
}
