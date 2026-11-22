import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Fleche, Missing, PageHead, Section } from '@/components/ui';
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

      <Section id="devise" label={fr ? 'Devise' : 'Motto'} gloss={fr ? `Depuis ${firm.founded}` : `Since ${firm.founded}`}>
        <h2 className="t-h2 max-w-[18ch]">{firm.motto[locale]}</h2>
        <div className="prose mt-6">
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
      </Section>

      <Section
        id="mission"
        tone="brume"
        label={fr ? 'Mission et vision' : 'Mission and vision'}
        gloss={fr ? 'Ce qui guide le cabinet' : 'What guides the firm'}
      >
        <div className="cab">
          <figure>
            <div className="ph coin">
              <Image
                src={associes}
                alt={fr ? 'Deux associés du cabinet' : 'Two of the firm’s partners'}
                sizes="(min-width: 1081px) 40vw, (min-width: 861px) 50vw, 100vw"
                placeholder="blur"
              />
            </div>
            <figcaption>{fr ? 'Les associés du cabinet' : 'Partners of the firm'}</figcaption>
          </figure>
          <div className="grid gap-8">
            <div className="filet pt-3">
              <h2 className="t-h3">{fr ? 'Mission' : 'Mission'}</h2>
              <p className="mt-2">
                {fr
                  ? 'Sécuriser les projets de nos clients et défendre leurs intérêts avec des conseils clairs, applicables et rendus dans les délais.'
                  : 'To secure our clients’ projects and defend their interests with clear, practical advice delivered on time.'}
              </p>
            </div>
            <div className="filet pt-3">
              <h2 className="t-h3">{fr ? 'Vision' : 'Vision'}</h2>
              <p className="mt-2">
                {fr
                  ? 'Être, depuis Lomé, un cabinet de référence pour les opérations qui traversent l’Afrique de l’Ouest et la relient au reste du monde.'
                  : 'To be, from Lomé, a firm of reference for transactions that cross West Africa and connect it with the rest of the world.'}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="identite" heading label={fr ? 'Fiche d’identité' : 'Key facts'} gloss={fr ? 'Mentions institutionnelles' : 'Institutional details'}>
        <dl className="fiche max-w-[52rem]">
          {identity.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="distinctions" heading label={fr ? 'Distinctions' : 'Recognition'} gloss={fr ? 'Datées et sourcées' : 'Dated and sourced'}>
        <ol className="rangs max-w-[52rem]">
          {distinctions.map((d) => (
            <li key={d.title.fr} className="grid grid-cols-[4.25rem_minmax(0,1fr)] items-baseline gap-x-5 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto]">
              <span className="font-serif text-[22px] font-semibold text-bleu [font-variant-numeric:lining-nums]">{d.year}</span>
              <span className="text-marine">{d.title[locale]}</span>
              <span className="t-glose col-start-2 sm:col-start-3">{d.source}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="suite" tone="brume" label={fr ? 'Pour aller plus loin' : 'Further reading'} gloss={fr ? 'Règles et engagements' : 'Rules and commitments'}>
        <div className="grid gap-5 md:grid-cols-2">
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
            <div key={c.href} className="panneau flex flex-col">
              <h2 className="t-h3">{c.title}</h2>
              <p className="mt-3">{c.body}</p>
              <Link href={c.href} className="lien mt-6 self-start">
                {c.cta} <Fleche />
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
