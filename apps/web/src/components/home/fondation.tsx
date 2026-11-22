import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { foundation, type Locale } from '@/content/site';
import { Fleche } from '../ui';

/**
 * Accueil — la Fondation (maquette i.html).
 * Le violet de la Fondation, l'arbre à palabres gravé en clair (un masque
 * teinté, voir styles/accueil-fondation.css) et, à son pied, une vraie photo
 * d'une action. Puis les trois axes, avec des faits relevés sur le site de la
 * Fondation (content/site.ts).
 *
 * L'encre de l'arbre apparaît quand on arrive sur la section : les classes
 * « attend » puis « vu » sont posées sur la section par components/motion.tsx,
 * d'où un `className` fixe ici.
 */
export function HomeFondation({ locale }: { locale: Locale }) {
  const fr = locale === 'fr';

  return (
    <section className="fondation sur-sombre" id="fondation" aria-labelledby="fondation-t">
      <div className="shell">
        <div className="fd-haut">
          <div className="fd-texte" data-stagger>
            <p className="fd-sur">
              <span>{fr ? 'La Fondation Aquereburu & Partners' : 'The Aquereburu & Partners Foundation'}</span>
            </p>
            <h2 id="fondation-t">
              {fr ? (
                <>
                  Demain se construit aussi <em>hors du prétoire.</em>
                </>
              ) : (
                <>
                  Tomorrow is also built <em>outside the courtroom.</em>
                </>
              )}
            </h2>
            <p className="fd-ch">
              {fr
                ? 'La Fondation agit pour le développement social, éducatif et environnemental du Togo, par des actions concrètes et durables.'
                : 'The Foundation works for social, educational and environmental development in Togo, through practical and lasting action.'}
            </p>
            <div className="fd-acts">
              <Link className="btn blanc" href="/cabinet/engagement">
                {fr ? 'Découvrir la Fondation' : 'Discover the Foundation'} <Fleche />
              </Link>
            </div>
          </div>
          <figure className="fd-gravure">
            <div className="fd-voile">
              <div className="fd-rev">
                <div
                  className="fd-encre"
                  role="img"
                  aria-label={
                    fr
                      ? 'Gravure : un grand arbre à palabres, des cocotiers au loin.'
                      : 'Engraving: a large palaver tree, coconut palms in the distance.'
                  }
                />
              </div>
            </div>
            <div className="fd-photo" data-fade>
              <div className="fd-cadre">
                <Image
                  src={foundation.photo.src}
                  width={foundation.photo.width}
                  height={foundation.photo.height}
                  alt={foundation.photo.alt[locale]}
                  sizes="(min-width: 861px) 32vw, 64vw"
                />
              </div>
              <p>{foundation.photo.caption[locale]}</p>
            </div>
          </figure>
        </div>
        <ul className="fd-axes" data-stagger>
          {foundation.axes.map((axe) => (
            <li key={axe.title.fr}>
              <b>{axe.title[locale]}</b>
              <span>{axe.body[locale]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
