import clsx from 'clsx';

/** Proportions (largeur / hauteur) des gravures de public/images/gravures. */
const GRAVURES = {
  avocat: '461 / 1307',
  duo: '529 / 742',
  palabre: '1137 / 1405',
  transmission: '1866 / 1986',
  pirogue: '911 / 343',
} as const;

/**
 * Petite gravure qui prolonge le dessin du hero : tracé net, encre teintée,
 * qui apparaît quand on arrive dessus (classes « attend » / « vu » posées par
 * components/motion.tsx). Décorative par défaut ; avec `alt`, elle est décrite.
 * Les classes passées doivent être fixes : React ne doit pas réécrire `className`.
 */
export function Gravure({
  nom,
  largeur,
  legende,
  alt,
  className,
}: {
  nom: keyof typeof GRAVURES;
  /** Largeur CSS (longueur ou clamp) */
  largeur: string;
  legende?: string;
  alt?: string;
  className?: string;
}) {
  const style = {
    '--g-img': `url(/images/gravures/gravure-${nom}.svg)`,
    '--g-r': GRAVURES[nom],
    '--g-w': largeur,
  } as React.CSSProperties;
  return (
    <figure className={clsx('gravure', className)} style={style} aria-hidden={alt ? undefined : true}>
      <div className="g-rev">
        <div className="g-encre" role={alt ? 'img' : undefined} aria-label={alt} />
      </div>
      {legende && <figcaption>{legende}</figcaption>}
    </figure>
  );
}
