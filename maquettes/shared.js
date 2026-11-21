/* Maquettes Aquereburu — socle commun : défilement fluide, révélations, parallaxe, intro. */
gsap.registerPlugin(ScrollTrigger);
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ——— Défilement fluide (Lenis) synchronisé avec GSAP
let lenis = null;
if (!REDUCE && window.Lenis) {
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ——— Découpe en mots masqués, en conservant <em>, <span>, <br>
function splitWords(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(' '));
          const w = document.createElement('span');
          w.className = 'w';
          const i = document.createElement('span');
          i.className = 'wi';
          i.textContent = part;
          w.appendChild(i);
          frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
  };
  walk(el);
  return el.querySelectorAll('.wi');
}

function initMotion() {
  // Titres : les mots montent derrière un masque
  document.querySelectorAll('[data-split]').forEach((el) => {
    const words = splitWords(el);
    if (el.closest('[data-intro]') || REDUCE) return;
    gsap.from(words, {
      yPercent: 118,
      duration: 1.15,
      ease: 'expo.out',
      stagger: 0.04,
      scrollTrigger: { trigger: el, start: 'top 86%' },
    });
  });

  // Texte qui s'allume mot à mot au défilement
  document.querySelectorAll('[data-scrubtext]').forEach((el) => {
    const words = splitWords(el);
    if (REDUCE) return;
    gsap.fromTo(
      words,
      { opacity: 0.13 },
      { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: true } },
    );
  });

  if (REDUCE) return;

  document.querySelectorAll('[data-fade]').forEach((el) => {
    gsap.from(el, {
      y: 44,
      opacity: 0,
      duration: 1.1,
      ease: 'expo.out',
      delay: parseFloat(el.dataset.fade || 0),
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  // Parallaxe : data-parallax="12" = amplitude en %
  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const p = parseFloat(el.dataset.parallax || 10);
    gsap.fromTo(el, { yPercent: -p }, { yPercent: p, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // Image dévoilée par un masque
  document.querySelectorAll('[data-unmask]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 85%' } },
    );
    const img = el.querySelector('img');
    if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
  });

  // Bandeau défilant, qui accélère et s'inverse avec le sens du défilement
  document.querySelectorAll('[data-marquee]').forEach((el) => {
    const track = el.firstElementChild;
    track.innerHTML += track.innerHTML;
    const tween = gsap.to(track, { xPercent: -50, repeat: -1, duration: parseFloat(el.dataset.marquee || 28), ease: 'none' });
    ScrollTrigger.create({
      onUpdate(self) {
        const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 260);
        gsap.to(tween, { timeScale: (self.direction < 0 ? -1 : 1) * (1 + Math.abs(v)), duration: 0.3, overwrite: true });
      },
    });
  });
}

// ——— Écran d'ouverture : le compteur va de 1987 à l'année en cours, puis le rideau se lève
function runLoader(onDone) {
  const L = document.querySelector('.loader');
  if (!L || REDUCE) {
    if (L) L.remove();
    onDone();
    return;
  }
  const n = L.querySelector('[data-count]');
  const bar = L.querySelector('[data-bar]');
  const o = { v: 1987 };
  const end = new Date().getFullYear();
  if (lenis) lenis.stop();
  gsap
    .timeline({
      onComplete() {
        L.remove();
        if (lenis) lenis.start();
      },
    })
    .to(o, { v: end, duration: 1.7, ease: 'power2.inOut', onUpdate: () => (n.textContent = Math.round(o.v)) })
    .to(bar, { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0)
    .to(L, { yPercent: -100, duration: 1.05, ease: 'expo.inOut' })
    .add(onDone, '-=0.6');
}

window.addEventListener('load', () => {
  initMotion();
  runLoader(() => window.dispatchEvent(new Event('intro')));
});
