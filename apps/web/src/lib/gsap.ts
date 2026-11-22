'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Enregistrement unique, côté navigateur seulement : rien ne s'exécute au rendu serveur.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Vrai quand le visiteur a demandé moins d'animations. À n'appeler que dans le navigateur. */
export const reduit = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Vrai pour une souris ou un pavé tactile : les effets liés au curseur n'ont pas de sens au doigt. */
export const pointeurFin = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export { gsap, ScrollTrigger, useGSAP };
