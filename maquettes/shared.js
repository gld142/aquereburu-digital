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

  // Filets qui se tracent
  document.querySelectorAll('[data-rule]').forEach((el) => {
    gsap.from(el, { scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 92%' } });
  });

  // Groupes : les enfants apparaissent l'un après l'autre
  document.querySelectorAll('[data-stagger]').forEach((el) => {
    gsap.from(el.children, { y: 26, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: el, start: 'top 87%' } });
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
    .to(o, { v: end, duration: n ? 1.7 : 1.1, ease: 'power2.inOut', onUpdate: () => n && (n.textContent = Math.round(o.v)) })
    .to(bar || {}, { scaleX: 1, duration: n ? 1.7 : 1.1, ease: 'power2.inOut' }, 0)
    .to(L, { yPercent: -100, duration: 1.05, ease: 'expo.inOut' })
    .add(onDone, '-=0.6');
}

// ——— Menu mobile et en-tête qui se solidifie après le hero
document.querySelectorAll('[data-menu]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    document.querySelectorAll('[data-menu]').forEach((b) => b.setAttribute('aria-expanded', String(open)));
    if (lenis) open ? lenis.stop() : lenis.start();
  });
});
document.querySelectorAll('.mnav a').forEach((a) => a.addEventListener('click', () => document.body.classList.remove('menu-open')));
addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
    document.body.classList.remove('menu-open');
    if (lenis) lenis.start();
  }
});
const solidAfter = document.querySelector('[data-solid-after]');
if (solidAfter) {
  ScrollTrigger.create({
    trigger: solidAfter,
    start: 'bottom top+=80',
    onEnter: () => document.body.classList.add('scrolled'),
    onLeaveBack: () => document.body.classList.remove('scrolled'),
  });
}

window.addEventListener('load', () => {
  initMotion();
  runLoader(() => window.dispatchEvent(new Event('intro')));
});
