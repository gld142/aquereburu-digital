'use client';

import type { RefObject } from 'react';
import { gsap, pointeurFin, reduit, useGSAP } from './gsap';

/**
 * Lumière des éléments en relief (timbre sec, gaufrage).
 *
 * Un seul gestionnaire pour toute la page : un écouteur de curseur, une
 * fonction dans le ticker GSAP, autant d'éléments enregistrés que l'on veut.
 * Chaque élément est éclairé depuis la position du curseur par rapport à son
 * centre, comme un papier que l'on incline sous la lampe.
 *
 * Convention : l'élément contient un filtre SVG dont les `feOffset` portent
 * `data-l="-1"` (arête éclairée) ou `data-l="1"` (arête dans l'ombre) ; voir
 * `FiltreRelief` dans components/acte.tsx. Les éléments hors écran ne sont pas
 * mis à jour. Rien ne tourne sans pointeur fin ni si le visiteur a demandé
 * moins d'animations : le relief garde alors son éclairage par défaut.
 */

interface Relief {
  el: Element;
  decalages: SVGFEOffsetElement[];
  force: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  visible: boolean;
}

/** Éclairage au repos : lumière venant d'en haut à gauche. */
const REPOS = -Math.SQRT1_2;

const reliefs = new Set<Relief>();
let observateur: IntersectionObserver | null = null;

function viser(r: Relief, cx: number, cy: number) {
  const b = r.el.getBoundingClientRect();
  const dx = cx - (b.left + b.width / 2);
  const dy = cy - (b.top + b.height / 2);
  const n = Math.hypot(dx, dy) || 1;
  r.tx = dx / n;
  r.ty = dy / n;
}

function suivre(e: PointerEvent) {
  if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
  reliefs.forEach((r) => {
    if (r.visible) viser(r, e.clientX, e.clientY);
  });
}

function tick() {
  reliefs.forEach((r) => {
    if (!r.visible) return;
    if (Math.abs(r.tx - r.x) < 0.002 && Math.abs(r.ty - r.y) < 0.002) return;
    r.x += (r.tx - r.x) * 0.08;
    r.y += (r.ty - r.y) * 0.08;
    for (const o of r.decalages) {
      const s = Number(o.dataset.l) * r.force;
      o.setAttribute('dx', (r.x * s).toFixed(2));
      o.setAttribute('dy', (r.y * s).toFixed(2));
    }
  });
}

/**
 * Enregistre un élément en relief. Renvoie la fonction de désinscription.
 * `force` : amplitude du décalage, dans les unités du filtre (1.85 pour le timbre sec).
 */
export function enregistrerRelief(el: Element, force = 1.85): () => void {
  if (!pointeurFin() || reduit()) return () => {};

  const relief: Relief = {
    el,
    decalages: Array.from(el.querySelectorAll<SVGFEOffsetElement>('feOffset[data-l]')),
    force,
    x: REPOS,
    y: REPOS,
    tx: REPOS,
    ty: REPOS,
    visible: false,
  };

  if (reliefs.size === 0) {
    window.addEventListener('pointermove', suivre, { passive: true });
    gsap.ticker.add(tick);
    observateur = new IntersectionObserver((entrees) => {
      for (const entree of entrees) {
        reliefs.forEach((r) => {
          if (r.el === entree.target) r.visible = entree.isIntersecting;
        });
      }
    });
  }
  reliefs.add(relief);
  observateur?.observe(el);

  return () => {
    observateur?.unobserve(el);
    reliefs.delete(relief);
    if (reliefs.size === 0) {
      window.removeEventListener('pointermove', suivre);
      gsap.ticker.remove(tick);
      observateur?.disconnect();
      observateur = null;
    }
  };
}

/** Branche un élément en relief sur la lumière partagée, le temps de sa vie dans la page. */
export function useRelief(ref: RefObject<Element | null>, force?: number) {
  useGSAP(() => {
    if (!ref.current) return;
    return enregistrerRelief(ref.current, force);
  }, [ref, force]);
}
