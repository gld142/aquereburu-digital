'use client';

import { useRef } from 'react';
import { firm, offices, type Locale } from '@/content/site';
import { gsap, pointeurFin, reduit, useGSAP } from '@/lib/gsap';
import { Fleche, capitale, enLettres } from '../ui';

/**
 * Accueil, section 1 — hero (maquette i.html).
 *
 * Un frontispice centré : la ligne d'identité entre deux filets doubles, la
 * devise dont la seconde ligne est en italique, un ornement, la phrase qui
 * nomme le cabinet, un bouton et un lien. Derrière, à droite, le dessin à la
 * plume du wharf de Lomé : c'est un masque teinté (fichiers dans
 * /images/dessin/, voir accueil-hero.css), soutenu sur les deux silhouettes
 * et léger ailleurs. Sous le tout, les quatre repères du cabinet,
 * en légende sous un filet double.
 *
 * L'ouverture (encre qui apparaît depuis le cœur de la scène, mots qui montent)
 * est jouée en CSS, donc dès le premier affichage et sans éclair de contenu à
 * l'hydratation. Le script n'ajoute que la vie du dessin :
 *   - le trait tremble à peine, comme repassé à la main, sur grand écran seulement ;
 *   - le dessin glisse un peu avec le curseur ;
 *   - toutes les 90 s, le trait du soleil s'efface en suivant son cercle, puis se retrace.
 */
export function HomeHero({ locale }: { locale: Locale }) {
  const fr = locale === 'fr';
  const racine = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = racine.current;
      if (!hero || reduit()) return;
      const dessin = hero.querySelector<HTMLElement>('.hero-dessin');
      const cadre = hero.querySelector<HTMLElement>('.hd-cadre');
      const vie = hero.querySelector<SVGSVGElement>('.hd-vie');
      const soleil = hero.querySelector<HTMLElement>('.hd-soleil');
      if (!dessin || !cadre || !vie || !soleil) return;

      // ——— Le soleil : toutes les 90 s (la première fois à 41 s), son trait s'efface en suivant
      // le cercle, reste absent un instant, puis se retrace dans le même sens.
      const cycleSoleil = gsap
        .timeline()
        .to(soleil, { '--sb': '208deg', duration: 3.4, ease: 'sine.inOut' })
        .set(soleil, { '--sa': '0deg', '--sb': '0deg' }, '+=1.1')
        .to(soleil, { '--sa': '208deg', duration: 4.2, ease: 'sine.inOut' });
      const vieDuDessin = gsap.timeline({ repeat: -1, paused: true });
      vieDuDessin.add(cycleSoleil, 41).set({}, {}, 90);

      // Rien ne tourne quand le hero n'est pas à l'écran ou que l'onglet est caché.
      let visible = true;
      const rythme = () => {
        if (visible && !document.hidden) vieDuDessin.play();
        else vieDuDessin.pause();
      };
      const io = new IntersectionObserver(([e]) => {
        visible = !!e?.isIntersecting;
        rythme();
      });
      io.observe(hero);
      document.addEventListener('visibilitychange', rythme);
      rythme();

      // ——— Le trait qui tremble : trois tirages du même filtre, sur grand écran seulement.
      // La classe suit la largeur de la fenêtre : l'effet s'arrête si elle rétrécit.
      const large = window.matchMedia('(min-width: 1081px)');
      const trembler = () => dessin.classList.toggle('tremble', large.matches);
      trembler();
      large.addEventListener('change', trembler);
      let tirage = 0;
      const horloge = window.setInterval(() => {
        if (!visible || document.hidden || !large.matches) return;
        tirage = (tirage + 1) % 3;
        dessin.dataset.main = String(tirage);
      }, 240);

      // ——— Le dessin glisse un peu avec le curseur (les oiseaux davantage que la scène).
      let lacher = () => {};
      if (pointeurFin()) {
        const glisse = (
          [
            [cadre, 0.014],
            [vie, 0.034],
          ] as const
        ).map(([el, p]) => ({
          p,
          x: gsap.quickTo(el, 'x', { duration: 1.4, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 1.4, ease: 'power3.out' }),
        }));
        const suivre = (e: MouseEvent) => {
          const r = hero.getBoundingClientRect();
          const dx = e.clientX - r.left - r.width / 2;
          const dy = e.clientY - r.top - r.height / 2;
          glisse.forEach((g) => {
            g.x(-dx * g.p);
            g.y(-dy * g.p * 0.6);
          });
        };
        const revenir = () =>
          glisse.forEach((g) => {
            g.x(0);
            g.y(0);
          });
        hero.addEventListener('mousemove', suivre);
        hero.addEventListener('mouseleave', revenir);
        lacher = () => {
          hero.removeEventListener('mousemove', suivre);
          hero.removeEventListener('mouseleave', revenir);
        };
      }

      return () => {
        io.disconnect();
        document.removeEventListener('visibilitychange', rythme);
        large.removeEventListener('change', trembler);
        window.clearInterval(horloge);
        lacher();
        dessin.classList.remove('tremble');
        delete dessin.dataset.main;
      };
    },
    { scope: racine },
  );

  // La devise sur deux lignes : la seconde, en italique, commence à « en s'inspirant » / « inspired ».
  const devise = firm.motto[locale];
  const coupe = fr ? devise.indexOf(' en ') : devise.indexOf(', ') + 1;
  const lignes = coupe > 0 ? [devise.slice(0, coupe).trim(), devise.slice(coupe).trim()] : [devise, ''];
  const mots1 = lignes[0]!.split(' ');
  const mots2 = lignes[1] ? lignes[1].split(' ') : [];
  /** Chaque mot monte derrière son masque ; --i règle le décalage (animation CSS). */
  const mots = (liste: string[], depart: number) =>
    liste.map((mot, i) => (
      <span key={depart + i}>
        {i > 0 && ' '}
        <span className="w">
          <span className="wi" style={{ '--i': depart + i } as React.CSSProperties}>
            {mot}
          </span>
        </span>
      </span>
    ));

  const villes = offices.map((o) => o.city[locale]);
  const reperes = [
    {
      titre: fr ? `Depuis ${firm.founded}` : `Since ${firm.founded}`,
      texte: fr ? `Fondé à Lomé par ${firm.founder}` : `Founded in Lomé by ${firm.founder}`,
    },
    {
      titre: firm.bar[locale],
      texte: fr ? 'Société civile professionnelle d’avocats' : 'Professional partnership of lawyers',
    },
    { titre: firm.iso, texte: fr ? 'Certification qualité AFAQ' : 'AFAQ quality certification' },
    {
      titre: `${capitale(enLettres(offices.length, locale))} ${fr ? 'bureaux' : 'offices'}`,
      texte: `${villes.slice(0, -1).join(', ')} ${fr ? 'et' : 'and'} ${villes[villes.length - 1]}`,
    },
  ];

  return (
    <section ref={racine} className="hero" aria-labelledby="devise">
      <figure className="hero-dessin">
        <div className="hd-cadre">
          <div className="hd-rev">
            <div
              className="hd-encre"
              role="img"
              aria-label={
                fr
                  ? 'Dessin à la plume : au bout d’un vieux wharf, deux silhouettes vues de dos, un avocat âgé en robe et un plus jeune, regardent le soleil sur l’océan ; des cocotiers, une pirogue et, tout au loin, un arbre à palabres.'
                  : 'Pen drawing: at the end of an old wharf, two figures seen from behind, an elderly lawyer in his robe and a younger one, watch the sun over the ocean; coconut palms, a pirogue and, far in the distance, a palaver tree.'
              }
            />
            <div className="hd-soleil" aria-hidden="true">
              <i />
            </div>
          </div>
        </div>
        <svg className="hd-vie" viewBox="0 0 1600 900" aria-hidden="true">
          <defs>
            {/* Trois tirages du même léger déplacement : en passant de l'un à l'autre, le trait tremble. */}
            {[4, 17, 29].map((graine, i) => (
              <filter key={graine} id={`hd-main-${i}`} x="-2%" y="-2%" width="104%" height="104%">
                <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="2" seed={graine} result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            ))}
          </defs>
          <g className="vol">
            <path className="oiseau" d="M-15 -8Q-7 -12 0 0Q7 -12 15 -8" />
            <path className="oiseau" d="M36 -30Q42 -34 48 -24Q54 -34 60 -30" />
            <path className="oiseau" d="M70 3Q77 -1 84 10Q91 -1 98 3" />
            <path className="oiseau" d="M130 -19Q135 -22 140 -12Q145 -22 150 -19" />
            <path className="oiseau" d="M-55 14Q-49 10 -44 20Q-39 10 -33 14" />
          </g>
        </svg>
      </figure>

      <div className="shell">
        <div className="hero-in">
          <p className="sur">
            <span>{fr ? 'Cabinet d’avocats' : 'Law firm'}</span>
            <i aria-hidden="true" />
            <span>{firm.bar[locale]}</span>
            <i aria-hidden="true" />
            <span>{fr ? `Depuis ${firm.founded}` : `Since ${firm.founded}`}</span>
          </p>
          <h1 id="devise">
            {mots(mots1, 0)}
            {mots2.length > 0 && (
              <>
                <br />
                <em>{mots(mots2, mots1.length)}</em>
              </>
            )}
          </h1>
          <p className="orn" aria-hidden="true">
            <i />
          </p>
          <div className="hero-col">
            <p className="ch">
              <b>{firm.name}</b>{' '}
              {fr
                ? `est un cabinet d’avocats fondé à Lomé en ${firm.founded}.`
                : `is a law firm founded in Lomé in ${firm.founded}.`}
            </p>
            <p className="ch2">
              {fr
                ? 'Il conseille et défend entreprises, investisseurs et États en droit des affaires OHADA, arbitrage, propriété intellectuelle et financement de projets.'
                : 'It advises and represents companies, investors and States in OHADA business law, arbitration, intellectual property and project finance.'}
            </p>
            {/* Comme dans la maquette, les deux actions mènent plus bas dans la page :
                la demande de rendez-vous (pied de page) et le répertoire des expertises. */}
            <div className="acts">
              <a className="btn" href="#contact">
                {fr ? 'Prendre rendez-vous' : 'Book a meeting'} <Fleche />
              </a>
              <a className="lien" href="#expertises">
                {fr ? 'Nos domaines d’intervention' : 'Our areas of practice'} <Fleche />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-mentions">
        <ul>
          {reperes.map((r) => (
            <li key={r.titre}>
              <b>{r.titre}</b>
              <span>{r.texte}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
