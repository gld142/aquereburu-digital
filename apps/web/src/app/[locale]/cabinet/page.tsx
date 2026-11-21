import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Missing, PageHead } from '@/components/ui';
import { distinctions, firm, offices, type Locale } from '@/content/site';
import { people } from '@/content/people';
import associes from '../../../../public/images/photo-associes.jpg';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Le cabinet' : 'The firm' };
}

export default async function FirmPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';
  const count = (r: string) => people.filter((p) => p.role === r).length;

  const identity: { label: string; value: React.ReactNode }[] = [
    { label: fr ? 'Raison sociale' : 'Registered name', value: firm.legalName },
    { label: fr ? 'Forme' : 'Legal form', value: firm.legalForm[locale] },
    { label: fr ? 'Création' : 'Founded', value: `${firm.founded}, ${fr ? 'Lomé' : 'Lomé'}` },
    { label: fr ? 'Barreau' : 'Bar', value: firm.bar[locale] },
    { label: fr ? 'Inscription au tableau' : 'Bar registration', value: firm.barRegistration ?? <Missing locale={locale} /> },
    {
      label: fr ? 'Bureaux' : 'Offices',
      value: offices.map((o) => `${o.city[locale]} (${o.role[locale].toLowerCase()})`).join(', '),
    },
    {
      label: fr ? 'Effectif' : 'People',
      value: fr
        ? `${count('associe')} associés, ${count('collaborateur') + count('counsel')} avocats, ${count('juriste')} juristes`
        : `${count('associe')} partners, ${count('collaborateur') + count('counsel')} lawyers, ${count('juriste')} legal counsel`,
    },
    { label: fr ? 'Qualité' : 'Quality', value: `${firm.iso}, AFAQ` },
  ];

  return (
    <>
      <PageHead
        locale={locale}
        title={fr ? 'Le cabinet' : 'The firm'}
        lead={
          fr
            ? `Fondée à Lomé en ${firm.founded} par ${firm.founder}, la SCP Aquereburu & Partners est l’un des premiers cabinets d’affaires du Togo. Elle conseille et défend entreprises, investisseurs et institutions dans l’espace OHADA et à l’international.`
            : `Founded in Lomé in ${firm.founded} by ${firm.founder}, SCP Aquereburu & Partners is one of Togo’s leading business law firms. It advises and represents companies, investors and institutions across the OHADA area and internationally.`
        }
        crumbs={[{ label: fr ? 'Cabinet' : 'Firm' }]}
      />

      <section aria-labelledby="devise" className="shell grid gap-x-10 gap-y-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <h2 id="devise" className="t-h2">
            {firm.motto[locale]}
          </h2>
        </div>
        <div className="t-body measure md:col-span-6 md:col-start-7">
          <p>
            {fr
              ? 'Hier, c’est près de quarante ans de dossiers, de jurisprudence et de pratiques éprouvées devant les juridictions togolaises, régionales et internationales. C’est aussi l’héritage d’un fondateur qui a fait de la propriété intellectuelle et du droit OHADA des spécialités du cabinet avant qu’elles ne deviennent des évidences.'
              : 'Yesterday means nearly forty years of matters, case law and proven practice before Togolese, regional and international courts. It is also the legacy of a founder who made intellectual property and OHADA law firm specialities before they became obvious choices.'}
          </p>
          <p>
            {fr
              ? 'Demain, ce sont les questions que nos clients se posent déjà : fintech et données, transition énergétique, partenariats public-privé, intégration régionale. Nous y répondons avec la même rigueur, en nous appuyant sur ce que l’expérience nous a appris.'
              : 'Tomorrow means the questions our clients already face: fintech and data, the energy transition, public-private partnerships, regional integration. We answer them with the same rigour, drawing on what experience has taught us.'}
          </p>
        </div>
      </section>

      <section aria-labelledby="mission" className="bg-paper-2">
        <div className="shell grid gap-x-10 gap-y-12 py-16 md:grid-cols-12 md:py-24">
          <figure className="relative aspect-[4/3] overflow-hidden bg-haze md:col-span-5">
            <Image
              src={associes}
              alt={fr ? 'Deux associés du cabinet' : 'Two of the firm’s partners'}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              placeholder="blur"
              className="portrait object-cover"
            />
          </figure>
          <div className="grid gap-10 sm:grid-cols-2 md:col-span-6 md:col-start-7 md:self-center">
            <div>
              <h2 id="mission" className="t-h3">
                {fr ? 'Mission' : 'Mission'}
              </h2>
              <p className="t-body mt-3 text-[1.0625rem] text-ink-2">
                {fr
                  ? 'Sécuriser les projets de nos clients et défendre leurs intérêts avec des conseils clairs, applicables et rendus dans les délais.'
                  : 'To secure our clients’ projects and defend their interests with clear, practical advice delivered on time.'}
              </p>
            </div>
            <div>
              <h2 className="t-h3">{fr ? 'Vision' : 'Vision'}</h2>
              <p className="t-body mt-3 text-[1.0625rem] text-ink-2">
                {fr
                  ? 'Être, depuis Lomé, un cabinet de référence pour les opérations qui traversent l’Afrique de l’Ouest et la relient au reste du monde.'
                  : 'To be, from Lomé, a firm of reference for transactions that cross West Africa and connect it with the rest of the world.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="identite" className="shell grid gap-x-10 gap-y-10 py-16 md:grid-cols-12 md:py-24">
        <h2 id="identite" className="t-h2 md:col-span-4">
          {fr ? 'Fiche d’identité' : 'Key facts'}
        </h2>
        <dl className="border-t border-ink md:col-span-8">
          {identity.map((f) => (
            <div key={f.label} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-3 sm:gap-6">
              <dt className="t-small text-slate">{f.label}</dt>
              <dd className="t-ui sm:col-span-2">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="distinctions" className="border-t border-rule">
        <div className="shell grid gap-x-10 gap-y-10 py-16 md:grid-cols-12 md:py-24">
          <h2 id="distinctions" className="t-h2 md:col-span-4">
            {fr ? 'Distinctions' : 'Recognition'}
          </h2>
          <ol className="border-t border-ink md:col-span-8">
            {distinctions.map((d) => (
              <li key={d.title.fr} className="grid grid-cols-[4.5rem_1fr] gap-x-6 border-b border-rule py-4 sm:grid-cols-[6rem_1fr_auto]">
                <span className="semiwide font-sans text-[1.125rem] tabular-nums">{d.year}</span>
                <span className="t-ui">{d.title[locale]}</span>
                <span className="t-small col-start-2 text-slate sm:col-start-3">{d.source}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label={fr ? 'Pour aller plus loin' : 'Further reading'} className="shell grid gap-4 pb-20 md:grid-cols-2 md:pb-28">
        {[
          {
            href: '/cabinet/deontologie' as const,
            title: fr ? 'Déontologie et conformité UEMOA' : 'Ethics and WAEMU compliance',
            body: fr
              ? 'Indépendance, secret professionnel, conflits d’intérêts, activités déclarées : les règles qui encadrent notre exercice.'
              : 'Independence, professional secrecy, conflicts of interest, declared activities: the rules that govern our practice.',
            cta: fr ? 'Lire nos engagements' : 'Read our commitments',
          },
          {
            href: '/cabinet/engagement' as const,
            title: fr ? 'Fondation et responsabilité sociétale' : 'Foundation and social responsibility',
            body: fr
              ? 'Pro bono, accès au droit, éducation et environnement : ce que le cabinet et sa Fondation font au Togo.'
              : 'Pro bono, access to justice, education and the environment: what the firm and its Foundation do in Togo.',
            cta: fr ? 'Découvrir notre engagement' : 'See our commitment',
          },
        ].map((c) => (
          <div key={c.href} className="flex flex-col rounded-[10px] bg-paper-2 p-8 md:p-10">
            <h2 className="t-h3">{c.title}</h2>
            <p className="t-body mt-3 text-[1.0625rem] text-ink-2">{c.body}</p>
            <Link href={c.href} className="btn btn-primary mt-8 self-start">
              {c.cta}
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
