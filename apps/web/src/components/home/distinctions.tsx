import Image from 'next/image';
import { distinctions, distinctionsPhoto, type Locale } from '@/content/site';
import { Section, capitale, enLettres } from '../ui';

/**
 * Accueil — les distinctions (maquette i.html, « Distinctions V4 »).
 * À gauche le titre, la phrase et la photo de la remise du trophée ; à droite
 * le registre : l'année, le vrai insigne, l'intitulé et l'organisme, du plus
 * ancien au plus récent. Les apparitions (data-stagger, data-fade) sont jouées
 * par `Reveals` (components/motion.tsx).
 */
export function HomeDistinctions({ locale }: { locale: Locale }) {
  const fr = locale === 'fr';
  const registre = [...distinctions].reverse();
  const annees = registre.map((d) => d.year);
  const nombre = capitale(enLettres(registre.length, locale));
  const debut = Math.min(...annees);
  const fin = Math.max(...annees);

  return (
    <Section
      id="distinctions"
      lecture={false}
      plein
      tone="nuit"
      label={fr ? 'Distinctions' : 'Recognition'}
      gloss={fr ? `${nombre} reconnaissances, de ${debut} à ${fin}` : `${nombre} distinctions, ${debut} to ${fin}`}
    >
      <div className="dist3">
        <div className="ds-tete">
          <div data-stagger>
            <h2>{fr ? 'Une exigence reconnue' : 'A recognised standard'}</h2>
            <p>
              {fr
                ? 'Prix d’excellence, distinctions internationales, certification qualité : le travail du cabinet est évalué par d’autres que lui.'
                : 'Awards for excellence, international distinctions, quality certification: the firm’s work is assessed by others than itself.'}
            </p>
          </div>
          <figure className="ds-photo" data-fade>
            <div className="coin">
              <Image
                src={distinctionsPhoto.src}
                width={distinctionsPhoto.width}
                height={distinctionsPhoto.height}
                alt={distinctionsPhoto.alt[locale]}
                sizes="(min-width: 861px) 40vw, (min-width: 621px) 50vw, 100vw"
              />
            </div>
            <figcaption>{distinctionsPhoto.caption[locale]}</figcaption>
          </figure>
        </div>
        <ol className="ds-frise" data-stagger>
          {registre.map((d) => (
            <li key={`${d.year}-${d.source}`}>
              <time className="ds-an" dateTime={String(d.year)}>
                {d.year}
              </time>
              <div className="ds-plaque coin">
                <Image src={d.badge.src} width={d.badge.width} height={d.badge.height} alt={d.badge.alt[locale]} sizes="96px" />
              </div>
              <b>{d.title[locale]}</b>
              <i>{d.source}</i>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
