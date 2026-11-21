import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Ruler } from '@/components/ruler';
import { Portrait, SectionHead } from '@/components/ui';
import { MatterRows } from '@/components/matter-rows';
import { firm, milestones, offices, values, type Locale } from '@/content/site';
import { partners, people } from '@/content/people';
import { insights, insightTypes } from '@/content/insights';
import { formatDate, practiceContent, practiceHref, practiceList, sectorList, sortByName } from '@/lib/content';
import library from '../../../public/images/photo-bibliotheque.png';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';
  const now = new Date().getFullYear();
  const name = (p: (typeof practiceList)[number]) => practiceContent(p, locale).name;

  return (
    <>
      {/* ——— Hero ——— */}
      <section aria-labelledby="devise" className="shell pt-10 md:pt-16 lg:pt-20">
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-8 lg:col-span-9">
            <h1 id="devise" className="t-display max-w-[13ch]">
              {firm.motto[locale]}
            </h1>
            <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-9">
              <p className="t-lead text-ink-2 lg:col-span-6">
                {fr
                  ? 'Société d’avocats fondée à Lomé en 1987, présente à Paris et à Cotonou. Nous conseillons et défendons entreprises, investisseurs et autorités publiques en droit des affaires OHADA, arbitrage, propriété intellectuelle et financement de projets.'
                  : 'A law firm founded in Lomé in 1987, with offices in Paris and Cotonou. We advise and represent companies, investors and public authorities in OHADA business law, arbitration, intellectual property and project finance.'}
              </p>
              <div className="flex flex-wrap items-start gap-3 lg:col-span-3 lg:flex-col lg:items-stretch">
                <Link href="/expertises" className="btn btn-primary">
                  {fr ? 'Voir nos expertises' : 'See our expertise'}
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  {fr ? 'Nous contacter' : 'Contact us'}
                </Link>
              </div>
            </div>
          </div>
          <figure className="relative hidden aspect-[3/4] overflow-hidden bg-haze md:col-span-4 md:block lg:col-span-3">
            <Image
              src={library}
              alt={fr ? 'Bibliothèque juridique' : 'Law library'}
              fill
              sizes="(min-width: 1024px) 25vw, 33vw"
              className="portrait object-cover object-[38%_50%]"
              placeholder="blur"
            />
          </figure>
        </div>

        <div className="mt-14 border-t border-rule pb-14 pt-8 md:mt-20 md:pb-20">
          <Ruler milestones={milestones} start={firm.founded} end={now} locale={locale} />
        </div>
      </section>

      {/* ——— Valeurs ——— */}
      <section aria-labelledby="valeurs" className="bg-paper-2">
        <div className="shell py-16 md:py-24">
          <h2 id="valeurs" className="sr-only">
            {fr ? 'Nos valeurs' : 'Our values'}
          </h2>
          <ul className="grid gap-10 md:grid-cols-3 md:gap-12">
            {values.map((v) => (
              <li key={v.title.fr} className="border-t border-ink pt-5">
                <h3 className="t-h3">{v.title[locale]}</h3>
                <p className="t-body mt-3 text-[1.0625rem] text-ink-2">{v.body[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— Index des expertises ——— */}
      <section aria-labelledby="expertises" className="shell py-20 md:py-28">
        <SectionHead
          id="expertises"
          title={fr ? 'Expertises' : 'Expertise'}
          intro={
            fr
              ? `${practiceList.length} pratiques et ${sectorList.length} secteurs, servis par une même équipe et un même niveau d’exigence.`
              : `${practiceList.length} practices and ${sectorList.length} sectors, served by one team to one standard.`
          }
          link={{ label: fr ? 'Toutes les expertises' : 'All expertise', href: '/expertises' }}
        />
        <div className="mt-12 grid gap-x-10 gap-y-12 md:mt-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <h3 className="t-section">{fr ? 'Pratiques' : 'Practices'}</h3>
            <ul className="mt-3 grid border-t border-rule sm:grid-cols-2 sm:gap-x-10">
              {sortByName(practiceList, name, locale).map((p) => (
                <li key={p.slug} className="border-b border-rule">
                  <Link
                    href={practiceHref(p)}
                    className="semiwide group flex min-h-14 items-center justify-between gap-4 py-3 font-sans text-[1.125rem] tracking-[-0.01em] text-ink transition-colors hover:text-accent"
                  >
                    {name(p)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h3 className="t-section">{fr ? 'Secteurs' : 'Sectors'}</h3>
            <ul className="mt-3 border-t border-rule">
              {sortByName(sectorList, name, locale).map((p) => (
                <li key={p.slug} className="border-b border-rule">
                  <Link
                    href={practiceHref(p)}
                    className="semiwide flex min-h-14 items-center py-3 font-sans text-[1.125rem] tracking-[-0.01em] text-ink transition-colors hover:text-accent"
                  >
                    {name(p)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ——— Réalisations ——— */}
      <section aria-labelledby="realisations" className="border-t border-rule">
        <div className="shell py-20 md:py-28">
          <SectionHead
            id="realisations"
            title={fr ? 'Dossiers représentatifs' : 'Representative matters'}
            intro={
              fr
                ? 'Sélection anonymisée, publiée dans le respect du secret professionnel.'
                : 'An anonymised selection, published with due regard to professional secrecy.'
            }
            link={{ label: fr ? 'Toutes les réalisations' : 'All matters', href: '/realisations' }}
          />
          <MatterRows locale={locale} limit={3} />
        </div>
      </section>

      {/* ——— Associés ——— */}
      <section aria-labelledby="associes" className="bg-paper-2">
        <div className="shell py-20 md:py-28">
          <SectionHead
            id="associes"
            title={fr ? 'Les associés' : 'The partners'}
            link={{
              label: fr ? `Toute l’équipe, ${people.length} personnes` : `All ${people.length} people`,
              href: '/equipe',
            }}
          />
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 md:mt-16 lg:grid-cols-4">
            {partners.map((p, i) => (
              <li key={p.slug}>
                <Link href={{ pathname: '/equipe/[slug]', params: { slug: p.slug } }} className="group block">
                  <Portrait src={p.photo} name={p.name} priority={i === 0} />
                  <p className="t-h3 mt-4 text-[1.0625rem] group-hover:text-accent sm:text-[1.1875rem]">{p.name}</p>
                  <p className="t-small mt-1 text-slate">{p.title[locale]}</p>
                </Link>
              </li>
            ))}
            <li className="col-span-2 flex flex-col justify-end border-t border-ink pt-5 sm:col-span-1 lg:col-span-1">
              <p className="t-body text-[1.0625rem] text-ink-2">
                {fr
                  ? 'Chaque avocat est inscrit au tableau de l’Ordre. Sa fiche précise son barreau, ses juridictions et ses activités déclarées.'
                  : 'Every lawyer is on the Bar roll. Each profile states their bar, courts and declared activities.'}
              </p>
              <Link href="/equipe" className="link t-ui mt-4 self-start">
                {fr ? 'Rechercher un avocat' : 'Find a lawyer'}
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ——— Publications ——— */}
      <section aria-labelledby="publications" className="shell py-20 md:py-28">
        <SectionHead
          id="publications"
          title={fr ? 'Publications' : 'Insights'}
          link={{ label: fr ? 'Toutes les publications' : 'All insights', href: '/publications' }}
        />
        <ul className="mt-12 grid gap-x-10 gap-y-12 md:mt-16 md:grid-cols-3">
          {insights.slice(0, 3).map((i) => (
            <li key={i.slug} className="border-t border-rule pt-5">
              <p className="t-small text-slate">
                {insightTypes[i.type][locale]}, <time dateTime={i.date}>{formatDate(i.date, locale)}</time>
              </p>
              <h3 className="t-h3 mt-3">
                <Link href={{ pathname: '/publications/[slug]', params: { slug: i.slug } }} className="hover:text-accent">
                  {i.title[locale]}
                </Link>
              </h3>
              <p className="t-body mt-3 text-[1.0625rem] text-ink-2">{i.summary[locale]}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ——— Engagement ——— */}
      <section aria-labelledby="engagement" className="on-dark bg-ink text-white">
        <div className="shell grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <h2 id="engagement" className="t-h2 md:col-span-6">
            {fr ? 'La Fondation Aquereburu & Partners' : 'The Aquereburu & Partners Foundation'}
          </h2>
          <div className="md:col-span-5 md:col-start-8">
            <p className="t-lead text-haze">
              {fr
                ? 'Accès au droit, éducation, environnement : le cabinet consacre une part de son temps et de ses moyens à des actions durables au Togo, en pro bono et à travers sa Fondation.'
                : 'Access to justice, education, the environment: the firm devotes part of its time and resources to lasting work in Togo, pro bono and through its Foundation.'}
            </p>
            <Link href="/cabinet/engagement" className="btn btn-ghost mt-8">
              {fr ? 'Notre engagement' : 'Our commitment'}
            </Link>
          </div>
        </div>
      </section>

      {/* ——— Contact ——— */}
      <section aria-labelledby="rendez-vous" className="shell py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 id="rendez-vous" className="t-h2">
              {fr ? 'Prendre rendez-vous' : 'Book a meeting'}
            </h2>
            <p className="t-lead mt-4 text-ink-2">
              {fr
                ? 'Décrivez votre situation en quelques lignes. Nous vous orientons vers l’avocat compétent, sous le sceau du secret professionnel.'
                : 'Describe your situation in a few lines. We will direct you to the right lawyer, under professional secrecy.'}
            </p>
            <Link href="/contact" className="btn btn-primary mt-8">
              {fr ? 'Écrire au cabinet' : 'Write to the firm'}
            </Link>
          </div>
          <ul className="grid gap-8 sm:grid-cols-3 md:col-span-6 md:col-start-7">
            {offices.map((o) => (
              <li key={o.id} className="border-t border-ink pt-4">
                <p className="t-h3">{o.city[locale]}</p>
                <p className="t-small mt-1 text-slate">
                  {o.role[locale]}, {o.country[locale]}
                </p>
                {o.address ? (
                  <address className="t-small mt-4 not-italic leading-relaxed text-ink-2">
                    {o.address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                ) : (
                  <p className="t-small mt-4 text-ink-2">{fr ? 'Rendez-vous sur demande' : 'Meetings on request'}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
