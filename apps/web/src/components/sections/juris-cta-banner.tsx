'use client';

import { Link } from '@/i18n/routing';

export function JurisCTABanner() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Dark navy gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0f1831 0%, #1a2847 100%)',
        }}
      />

      {/* Decorative ::before with radial gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="flex justify-center">
          <div className="text-center max-w-[700px]">
            {/* h2 with italic accent */}
            <h2 className="font-display text-[32px] leading-[1.2] text-white mb-6">
              Vous êtes un cabinet d'avocats ou un département juridique ?{' '}
              <span className="italic text-ai-300">Découvrez JURIS IA Pro</span>
            </h2>

            {/* Description paragraph */}
            <p className="text-[14px] leading-[1.7] text-white/40 mb-12">
              Optimisez votre cabinet avec notre solution d'IA dédiée aux professionnels du droit. Gagnez du temps, améliorez vos services et conquérez de nouveaux clients.
            </p>

            {/* Two buttons centered */}
            <div className="flex flex-col gap-3">
              {/* Primary button */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-ai-500 text-white text-[14px] font-semibold uppercase tracking-[0.08em] px-8 py-3.5 rounded hover:bg-ai-600 transition-colors duration-300"
              >
                Découvrir JURIS IA Pro →
              </Link>

              {/* Ghost link */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center text-white/40 text-[14px] font-medium underline hover:text-white/60 transition-colors duration-300"
              >
                Demander une démo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
