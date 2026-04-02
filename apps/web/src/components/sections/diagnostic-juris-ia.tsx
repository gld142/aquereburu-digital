'use client';

import { Link } from '@/i18n/routing';

export function DiagnosticJurisIA() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Dark navy gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0f1831 0%, #1a2847 50%, #0f1831 100%)',
        }}
      />

      {/* Decorative ::before with radial gradients */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(217, 119, 6, 0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center max-w-5xl">
          {/* LEFT COLUMN: diagnostic-text */}
          <div className="space-y-8">
            {/* Blue tag */}
            <div>
              <span className="inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-ai-300">
                JURIS IA — Intelligence Artificielle
              </span>
            </div>

            {/* h2 with italic accent */}
            <h2 className="font-display text-[38px] leading-[1.2] text-white">
              Votre diagnostic juridique{' '}
              <span className="italic text-ai-300">en 2 minutes</span>
            </h2>

            {/* Description paragraph */}
            <p className="text-[14px] leading-[1.8] text-white/45 max-w-md">
              Obtenez une analyse complète de votre situation juridique en quelques secondes, 24h/24. Notre IA identifie votre domaine de droit et vous propose une recommandation d'action.
            </p>

            {/* 3 Features with icons */}
            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-ai-500/12 border border-ai-500/20">
                  <span className="text-base">⚡</span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white">
                    Analyse instantanée
                  </p>
                  <p className="text-[13px] text-white/60">
                    Réponse en quelques secondes, 24h/24
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-ai-500/12 border border-ai-500/20">
                  <span className="text-base">🎯</span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white">
                    Orientation précise
                  </p>
                  <p className="text-[13px] text-white/60">
                    Identification du domaine de droit et des textes applicables
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4">
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-ai-500/12 border border-ai-500/20">
                  <span className="text-base">🔒</span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white">
                    100% confidentiel
                  </p>
                  <p className="text-[13px] text-white/60">
                    Vos données sont protégées et chiffrées
                  </p>
                </div>
              </div>
            </div>

            {/* Powered by badge */}
            <p className="text-[12px] font-medium text-white/40 pt-4">
              Propulsé par JURIS IA —{' '}
              <span className="text-ai-300">En savoir plus sur la plateforme</span>
            </p>
          </div>

          {/* RIGHT COLUMN: diagnostic-card */}
          <div
            className="rounded-2xl p-9 backdrop-blur"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Card Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-center w-9 h-9 rounded bg-ai-500">
                <span className="text-base">⚖️</span>
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-white">
                  Diagnostic Express
                </h3>
                <p className="text-[12px] text-white/60">
                  Gratuit · 5 questions · 2 min
                </p>
              </div>
            </div>

            {/* 5 Step items */}
            <div className="space-y-3 mb-8">
              {/* Step 1 - Done */}
              <div className="flex gap-3 rounded-lg border border-white/6 p-4" style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                <div className="flex items-center justify-center w-8 h-8 rounded text-[12px] font-semibold text-ai-300 shrink-0 bg-ai-500/20">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-white/60 line-through">
                    Vous êtes : Entreprise / Particulier
                  </p>
                </div>
              </div>

              {/* Step 2 - Done */}
              <div className="flex gap-3 rounded-lg border border-white/6 p-4" style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                <div className="flex items-center justify-center w-8 h-8 rounded text-[12px] font-semibold text-ai-300 shrink-0 bg-ai-500/20">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-white/60 line-through">
                    Nature du besoin : Contentieux / Conseil / Audit
                  </p>
                </div>
              </div>

              {/* Step 3 - Active */}
              <div className="flex gap-3 rounded-lg border border-ai-500/30 p-4 bg-ai-500/10">
                <div className="flex items-center justify-center w-8 h-8 rounded text-[12px] font-semibold text-white shrink-0 bg-ai-500">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-white">
                    Domaine concerné : Commercial, Fiscal, Social...
                  </p>
                </div>
              </div>

              {/* Step 4 - Default */}
              <div className="flex gap-3 rounded-lg border border-white/6 p-4">
                <div className="flex items-center justify-center w-8 h-8 rounded text-[12px] font-semibold text-white/40 shrink-0 bg-white/6">
                  4
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-white/40">
                    Décrivez brièvement votre situation
                  </p>
                </div>
              </div>

              {/* Step 5 - Default */}
              <div className="flex gap-3 rounded-lg border border-white/6 p-4">
                <div className="flex items-center justify-center w-8 h-8 rounded text-[12px] font-semibold text-white/40 shrink-0 bg-white/6">
                  5
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-white/40">
                    Degré d'urgence
                  </p>
                </div>
              </div>
            </div>

            {/* Result box at bottom */}
            <div
              className="rounded-lg p-4 border border-ai-500/15 text-center mb-6"
              style={{
                background:
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(217, 119, 6, 0.06) 100%)',
              }}
            >
              <p className="text-[12px] leading-[1.6] text-white/70">
                <span className="text-ai-300 font-semibold">Résultat IA:</span>{' '}
                Analyse complète + textes applicables + recommandation
                d'action + mise en relation avec l'avocat spécialisé
              </p>
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center bg-ai-500 text-white text-[12px] font-semibold uppercase tracking-[0.08em] py-3 rounded-lg hover:bg-ai-600 transition-colors duration-300"
            >
              Commencer mon diagnostic →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
