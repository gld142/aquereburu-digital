'use client';

import { useEffect } from 'react';
import type Lenis from 'lenis';

/**
 * Défilement fluide partagé. Les fenêtres modales (menu, recherche) doivent
 * pouvoir l'arrêter : Lenis pilote le défilement par script, un simple
 * `overflow: hidden` ne suffirait pas à figer la page derrière elles.
 */
let lenis: Lenis | null = null;
let verrous = 0;

function appliquer() {
  const bloque = verrous > 0;
  document.documentElement.style.overflow = bloque ? 'hidden' : '';
  if (!lenis) return;
  if (bloque) lenis.stop();
  else lenis.start();
}

export function brancherLenis(instance: Lenis | null) {
  lenis = instance;
  if (instance && verrous > 0) instance.stop();
}

export const lenisCourant = () => lenis;

/** Fige le défilement de la page tant que `actif` est vrai. */
export function useVerrouDefilement(actif: boolean) {
  useEffect(() => {
    if (!actif) return;
    verrous += 1;
    appliquer();
    return () => {
      verrous -= 1;
      appliquer();
    };
  }, [actif]);
}
