import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Missing, PageHead } from '@/components/ui';
import { ProseSections } from '@/components/prose-sections';
import { firm, type Locale } from '@/content/site';
import { Gravure } from '@/components/gravure';
import { people } from '@/content/people';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Déontologie et conformité' : 'Ethics and compliance' };
}

export default async function EthicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';
  const declared = people.filter((p) => p.declaredActivities.length > 0);
  const lawyers = people.filter((p) => p.bar);

  return (
    <>
      <PageHead
        locale={locale}
        title={fr ? 'Déontologie et conformité' : 'Ethics and compliance'}
        lead={
          fr
            ? `Le cabinet exerce dans le respect des règles de l’Ordre des avocats du Togo et du ${firm.uemoaRegulation.fr}.`
            : `The firm practises in accordance with the rules of the Togo Bar and ${firm.uemoaRegulation.en}.`
        }
        crumbs={[{ label: fr ? 'Cabinet' : 'Firm', href: '/cabinet' }, { label: fr ? 'Déontologie' : 'Ethics' }]}
        aside={<Gravure nom="robe" largeur="clamp(40px, 4.2vw, 60px)" className="g-tete" />}
      />
      <ProseSections
        dessins={[null, 'auditeurs', null, 'lecteur']}
        sections={[
          {
            id: 'independance',
            title: fr ? 'Liberté et indépendance' : 'Freedom and independence',
            body: fr ? (
              <p>
                La profession d’avocat est libre et indépendante. Nos avocats ne reçoivent d’instruction que de leurs clients, dans
                les limites de la loi et de leur conscience. Aucun intérêt commercial, politique ou personnel ne peut infléchir un conseil
                ou une stratégie de défense.
              </p>
            ) : (
              <p>
                The legal profession is free and independent. Our lawyers take instructions only from their clients, within the
                limits of the law and their conscience. No commercial, political or personal interest may influence advice or a
                defence strategy.
              </p>
            ),
          },
          {
            id: 'secret',
            title: fr ? 'Secret professionnel' : 'Professional secrecy',
            body: fr ? (
              <p>
                Tout ce que vous confiez au cabinet est couvert par le secret professionnel : échanges, documents, existence même du
                dossier. C’est pourquoi nos réalisations sont publiées sans nom de client et sans détail permettant de l’identifier.
              </p>
            ) : (
              <p>
                Everything you share with the firm is covered by professional secrecy: communications, documents and the very
                existence of the matter. This is why our matters are published without client names or identifying details.
              </p>
            ),
          },
          {
            id: 'conflits',
            title: fr ? 'Conflits d’intérêts' : 'Conflicts of interest',
            body: fr ? (
              <p>
                Avant d’accepter un dossier, nous vérifions systématiquement l’absence de conflit d’intérêts avec nos clients actuels
                et passés. En cas de doute, nous déclinons le mandat.
              </p>
            ) : (
              <p>
                Before accepting a matter, we systematically check for conflicts of interest with current and former clients. If in
                doubt, we decline the instruction.
              </p>
            ),
          },
          {
            id: 'inscription',
            title: fr ? 'Inscription au tableau' : 'Bar registration',
            body: (
              <>
                <p>
                  {fr
                    ? `La SCP est inscrite au ${firm.bar.fr}, sous le numéro `
                    : `The partnership is registered with the ${firm.bar.en} under number `}
                  {firm.barRegistration ?? <Missing locale={locale} />}.{' '}
                  {fr
                    ? 'Chaque fiche d’avocat précise son barreau d’inscription, son année d’admission et les juridictions devant lesquelles il plaide.'
                    : 'Each lawyer’s profile states their bar, year of admission and the courts before which they appear.'}
                </p>
                <ul>
                  {lawyers.map((p) => (
                    <li key={p.slug}>
                      <Link href={{ pathname: '/equipe/[slug]', params: { slug: p.slug } }}>{p.name}</Link>, {p.bar![locale]}
                      {p.admittedYear ? `, ${p.admittedYear}` : ''}
                    </li>
                  ))}
                </ul>
              </>
            ),
          },
          {
            id: 'activites',
            title: fr ? 'Activités compatibles déclarées' : 'Declared compatible activities',
            body: (
              <>
                <p>
                  {fr
                    ? 'Certaines fonctions sont compatibles avec la profession d’avocat (enseignement, arbitrage, expertise, mandats institutionnels). Elles sont déclarées à l’Ordre et mentionnées ici comme sur les fiches individuelles.'
                    : 'Some roles are compatible with legal practice (teaching, arbitration, expert work, institutional mandates). They are declared to the Bar and listed here as well as on individual profiles.'}
                </p>
                <ul>
                  {declared.map((p) => (
                    <li key={p.slug}>
                      <strong>{p.name}</strong> : {p.declaredActivities.map((a) => a[locale]).join(' ; ')}
                    </li>
                  ))}
                </ul>
              </>
            ),
          },
          {
            id: 'communication',
            title: fr ? 'Communication et site internet' : 'Communication and website',
            body: fr ? (
              <p>
                Ce site informe ; il ne sollicite pas. Il est conçu conformément au règlement UEMOA, notamment son article 35 relatif
                à la création de sites internet par les avocats : contenu sobre et exact, pas de comparaison avec d’autres
                confrères, pas de promesse de résultat. Les distinctions citées sont datées et leur source est indiquée.
              </p>
            ) : (
              <p>
                This website informs; it does not solicit. It complies with the WAEMU regulation, in particular Article 35 on lawyers’
                websites: sober and accurate content, no comparison with other lawyers, no promise of results. Awards are dated and
                their source is given.
              </p>
            ),
          },
          {
            id: 'qualite',
            title: fr ? 'Qualité et réclamations' : 'Quality and complaints',
            body: fr ? (
              <p>
                Le cabinet est certifié {firm.iso}. Toute réclamation peut être adressée à l’associé responsable du dossier ou à{' '}
                <a href={`mailto:${firm.email}`}>{firm.email}</a>. Vous pouvez également saisir le bâtonnier de l’Ordre des avocats.
              </p>
            ) : (
              <p>
                The firm is certified {firm.iso}. Complaints may be addressed to the partner in charge of the matter or to{' '}
                <a href={`mailto:${firm.email}`}>{firm.email}</a>. You may also refer the matter to the President of the Bar.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
