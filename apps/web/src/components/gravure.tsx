import clsx from 'clsx';

/**
 * Les petits dessins du site. Deux familles :
 *  - les gravures (tracé net, tirées des dessins du hero) ;
 *  - les scènes de vie à la plume (masques d'encre légers), pour les pages intérieures.
 * `r` est le rapport largeur / hauteur du fichier ; `l` la largeur par défaut quand le dessin est posé dans une marge.
 */
const DESSINS = {
  // gravures
  avocat: { src: '/images/gravures/gravure-avocat.svg', r: '461 / 1307', l: 'clamp(40px, 3.6vw, 52px)', scene: false },
  duo: { src: '/images/gravures/gravure-duo.svg', r: '529 / 742', l: 'clamp(64px, 6vw, 88px)', scene: false },
  palabre: { src: '/images/gravures/gravure-palabre.svg', r: '1137 / 1405', l: 'clamp(84px, 8.6vw, 124px)', scene: false },
  transmission: { src: '/images/gravures/gravure-transmission.svg', r: '1866 / 1986', l: 'clamp(84px, 9vw, 130px)', scene: false },
  pirogue: { src: '/images/gravures/gravure-pirogue.svg', r: '911 / 343', l: 'clamp(90px, 9vw, 130px)', scene: false },
  // scènes de vie
  echelle: { src: '/images/scenes/scene-echelle.webp', r: '384 / 440', l: 'clamp(72px, 9vw, 128px)', scene: true },
  pecheurs: { src: '/images/scenes/scene-pecheurs.webp', r: '440 / 290', l: 'clamp(118px, 13vw, 190px)', scene: true },
  tailleur: { src: '/images/scenes/scene-tailleur.webp', r: '440 / 389', l: 'clamp(88px, 10vw, 146px)', scene: true },
  robe: { src: '/images/scenes/scene-robe.webp', r: '189 / 440', l: 'clamp(36px, 4vw, 60px)', scene: true },
  ecoliers: { src: '/images/scenes/scene-ecoliers.webp', r: '440 / 356', l: 'clamp(96px, 10.5vw, 152px)', scene: true },
  lecteur: { src: '/images/scenes/scene-lecteur.webp', r: '139 / 440', l: 'clamp(27px, 3vw, 46px)', scene: true },
  port: { src: '/images/scenes/scene-port.webp', r: '440 / 296', l: 'clamp(118px, 13vw, 190px)', scene: true },
  docker: { src: '/images/scenes/scene-docker.webp', r: '300 / 422', l: 'clamp(58px, 7vw, 100px)', scene: true },
  mouette: { src: '/images/scenes/scene-mouette.webp', r: '136 / 97', l: 'clamp(44px, 4.6vw, 64px)', scene: true },
  grue: { src: '/images/scenes/scene-grue.webp', r: '403 / 440', l: 'clamp(76px, 9vw, 130px)', scene: true },
  barque: { src: '/images/scenes/scene-barque.webp', r: '206 / 256', l: 'clamp(64px, 7.6vw, 108px)', scene: true },
  'pirogue-plage': { src: '/images/scenes/scene-pirogue-plage.webp', r: '380 / 100', l: 'clamp(120px, 12vw, 170px)', scene: true },
  cocotiers: { src: '/images/scenes/scene-cocotiers.webp', r: '310 / 244', l: 'clamp(92px, 10vw, 144px)', scene: true },
  auditeurs: { src: '/images/scenes/scene-auditeurs.webp', r: '323 / 325', l: 'clamp(76px, 9vw, 130px)', scene: true },
} as const;

export type NomDessin = keyof typeof DESSINS;

/** Scènes qui vont bien dans une marge de fiche (domaine, secteur) : une par page, toujours la même pour une même adresse. */
const TOURNANTES: NomDessin[] = ['mouette', 'barque', 'cocotiers', 'pirogue-plage', 'lecteur', 'robe', 'docker', 'auditeurs'];
export function dessinPour(cle: string): NomDessin {
  let h = 0;
  for (const c of cle) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return TOURNANTES[h % TOURNANTES.length] ?? 'mouette';
}

/**
 * Petit dessin posé dans la page : l'encre apparaît quand on arrive dessus (classes « attend » / « vu » posées par
 * components/motion.tsx). Décoratif par défaut ; avec `alt`, il est décrit aux lecteurs d'écran.
 * Les classes passées doivent être fixes : React ne doit pas réécrire `className`.
 */
export function Gravure({
  nom,
  largeur,
  legende,
  alt,
  className,
}: {
  nom: NomDessin;
  /** Largeur CSS (longueur ou clamp) ; par défaut, celle prévue pour une marge */
  largeur?: string;
  legende?: string;
  alt?: string;
  className?: string;
}) {
  const d = DESSINS[nom];
  const style = { '--g-img': `url(${d.src})`, '--g-r': d.r, '--g-w': largeur ?? d.l } as React.CSSProperties;
  return (
    <figure className={clsx('gravure', d.scene && 'scene', className)} style={style} aria-hidden={alt ? undefined : true}>
      <div className="g-rev">
        <div className="g-encre" role={alt ? 'img' : undefined} aria-label={alt} />
      </div>
      {legende && <figcaption>{legende}</figcaption>}
    </figure>
  );
}

/** Pause dessinée dans une longue liste : une ligne sans texte, un petit dessin debout sur son filet. */
export function Pause({ nom, cote = 'droite', largeur }: { nom: NomDessin; cote?: 'gauche' | 'droite'; largeur?: string }) {
  return (
    <li className={clsx('pause', cote === 'gauche' && 'gauche')} aria-hidden>
      <Gravure nom={nom} largeur={largeur} />
    </li>
  );
}
