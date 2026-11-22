'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, reduit, useGSAP } from '@/lib/gsap';
import { brancherLenis, lenisCourant } from '@/lib/scroll';

/**
 * Défilement fluide (Lenis) synchronisé avec GSAP. Rien n'est créé si le
 * visiteur a demandé moins d'animations : le défilement natif reste intact.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (reduit()) return;
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, anchors: true, autoRaf: false });
    const tick = (t: number) => lenis.raf(t * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    brancherLenis(lenis);
    return () => {
      brancherLenis(null);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Changement de page : Next a déjà replacé le défilement, Lenis repart de là
  // (sans quoi il poursuivrait sa course vers l'ancienne position).
  useEffect(() => {
    const lenis = lenisCourant();
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    }
    ScrollTrigger.refresh();
  }, [pathname]);

  // L'encre des gravures, de la Fondation et du soleil de fin de page apparaît quand on arrive dessus :
  // la classe « attend » est posée ici, puis remplacée par « vu » (les styles font le reste).
  useEffect(() => {
    if (reduit() || !('IntersectionObserver' in window)) return;
    const cibles = [...document.querySelectorAll('.gravure, .fondation, .colophon')].filter((el) => !el.classList.contains('vu'));
    cibles.forEach((el) => el.classList.add('attend'));
    const io = new IntersectionObserver(
      (entrees) =>
        entrees.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.replace('attend', 'vu');
          io.unobserve(e.target);
        }),
      { rootMargin: '0px 0px -14% 0px' },
    );
    cibles.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Les polices arrivent après le premier rendu : les repères de défilement se recalent.
  useEffect(() => {
    let vivant = true;
    document.fonts?.ready.then(() => vivant && ScrollTrigger.refresh());
    return () => {
      vivant = false;
    };
  }, []);

  return null;
}

/**
 * Révélations sobres au défilement, pilotées par attributs comme dans la maquette :
 *   data-fade      le bloc monte et apparaît ;
 *   data-stagger   ses enfants apparaissent l'un après l'autre ;
 *   data-parallax  amplitude en %, sur une image plus haute que son cadre ;
 *   data-trace     la variable --trace va de 0 à 1 avec le défilement (frise).
 * Ce qui est déjà à l'écran au chargement n'est pas animé : pas d'éclair de
 * contenu entre le rendu serveur et l'hydratation.
 */
export function Reveals({ children }: { children: React.ReactNode }) {
  const racine = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = racine.current;
      if (!el || reduit()) return;
      const sousLaLigne = (n: Element) => n.getBoundingClientRect().top + window.scrollY > window.innerHeight * 0.9;

      el.querySelectorAll<HTMLElement>('[data-fade]').forEach((n) => {
        if (!sousLaLigne(n)) return;
        gsap.from(n, {
          y: 44,
          opacity: 0,
          duration: 1.1,
          ease: 'expo.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: n, start: 'top 88%' },
        });
      });

      el.querySelectorAll<HTMLElement>('[data-stagger]').forEach((n) => {
        if (!sousLaLigne(n)) return;
        gsap.from(n.children, {
          y: 26,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.07,
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: n, start: 'top 87%' },
        });
      });

      el.querySelectorAll<HTMLElement>('[data-parallax]').forEach((n) => {
        const p = parseFloat(n.dataset.parallax || '10');
        gsap.fromTo(
          n,
          { yPercent: -p },
          {
            yPercent: p,
            ease: 'none',
            scrollTrigger: { trigger: n.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });

      el.querySelectorAll<HTMLElement>('[data-trace]').forEach((n) => {
        gsap.fromTo(
          n,
          { '--trace': 0 },
          { '--trace': 1, ease: 'none', scrollTrigger: { trigger: n, start: 'top 85%', end: 'top 45%', scrub: true } },
        );
      });
    },
    { scope: racine },
  );

  return <div ref={racine}>{children}</div>;
}
