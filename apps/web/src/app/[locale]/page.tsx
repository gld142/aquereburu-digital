import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Reveals } from '@/components/motion';
import { HomeHero } from '@/components/home/hero';
import { HomeRepertoire } from '@/components/home/repertoire';
import { OhadaMap, type EtatAffiche } from '@/components/home/ohada-map';
import { HomeDistinctions } from '@/components/home/distinctions';
import { HomeAssocies } from '@/components/home/associes';
import { HomeFondation } from '@/components/home/fondation';
import { Fleche, Section } from '@/components/ui';
import { firm, values, type Locale } from '@/content/site';
import { ETATS_OHADA } from '@/content/carte-ohada';
import { sortByName } from '@/lib/content';
import associes from '../../../public/images/photo-associes.jpg';

/**
 * Accueil, fidèle à maquettes/i.html. Chaque section vit dans son fichier
 * (components/home/) : hero, répertoire, carte OHADA, distinctions, équipe,
 * Fondation. Le cabinet et le texte de l'espace OHADA sont composés ici.
 * « Prendre rendez-vous » et la fin de page sont rendus par le pied de page.
 */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';

  // ——— Espace OHADA : États triés dans la langue de la page
  const etats: EtatAffiche[] = sortByName(ETATS_OHADA, (e) => e.nom[locale], locale).map((e) => ({
    id: e.id,
    nom: e.nom[locale],
    nomLong: e.nomLong?.[locale],
    legende: `${(e.nomLong ?? e.nom)[locale]}${e.precision?.[locale] ?? ''}`,
  }));

  return (
    <Reveals>
      <HomeHero locale={locale} />

      {/* ——— Le cabinet ——— */}
      <Section
        id="cabinet"
        lecture={false}
        label={fr ? 'Le cabinet' : 'The firm'}
        gloss={fr ? `Fondé à Lomé en ${firm.founded}` : `Founded in Lomé in ${firm.founded}`}
      >
        <div className="cab">
          <figure data-fade>
            <div className="ph coin">
              <Image
                src={associes}
                alt={fr ? 'Deux associés du cabinet' : 'Two of the firm’s partners'}
                sizes="(min-width: 1081px) 40vw, (min-width: 861px) 50vw, 100vw"
                placeholder="blur"
                data-parallax="4"
              />
            </div>
            <figcaption>{fr ? 'Les associés du cabinet' : 'Partners of the firm'}</figcaption>
          </figure>
          <div data-stagger>
            <h2>
              {fr ? 'Près de quarante ans au service du droit des affaires' : 'Nearly forty years in the service of business law'}
            </h2>
            <p>
              {fr
                ? 'Le cabinet accompagne ses clients dans l’espace OHADA et à l’international. Pionnier de la propriété intellectuelle au Togo, mandataire agréé auprès de l’OAPI, il intervient en conseil comme en contentieux.'
                : 'The firm supports its clients across the OHADA area and internationally. A pioneer of intellectual property in Togo and an accredited OAPI agent, it acts in both advisory and contentious matters.'}
            </p>
            <ul className="valeurs">
              {values.map((v) => (
                <li key={v.title.fr}>
                  <b>{v.title[locale]}</b>
                  {v.body[locale]}
                </li>
              ))}
            </ul>
            <Link className="lien" href="/cabinet">
              {fr ? 'Découvrir le cabinet' : 'Discover the firm'} <Fleche />
            </Link>
          </div>
        </div>
      </Section>

      <HomeRepertoire locale={locale} />

      {/* ——— Espace OHADA ——— */}
      <Section
        id="ohada"
        lecture={false}
        label={fr ? 'Espace OHADA' : 'OHADA area'}
        gloss={fr ? 'Dix-sept États, un même droit des affaires' : 'Seventeen States, one business law'}
      >
        <OhadaMap etats={etats} locale={locale}>
          <h2>{fr ? 'Le terrain du cabinet' : 'The firm’s home ground'}</h2>
          <p>
            {fr
              ? 'L’OHADA réunit dix-sept États africains autour d’un droit des affaires commun. Le cabinet y intervient depuis Lomé et Cotonou, en lien avec son bureau de Paris.'
              : 'OHADA brings seventeen African States together under a common business law. The firm works across it from Lomé and Cotonou, in liaison with its Paris office.'}
          </p>
        </OhadaMap>
      </Section>

      <HomeDistinctions locale={locale} />

      <HomeAssocies locale={locale} />

      <HomeFondation locale={locale} />
    </Reveals>
  );
}
