'use client';

import { useTranslations } from 'next-intl';
import { WorldMapPaths } from '@/components/ui/world-map';

export function FoundationSection() {
  const t = useTranslations('foundation');

  return (
    <section className="relative border-t border-black/6 bg-white py-24 px-24 lg:px-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Content */}
          <div className="relative z-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gold-600/70">
              Engagement Social
            </p>
            <h2 className="mt-4 font-display text-[2.75rem] font-semibold text-navy-900">
              La Fondation AQUEREBURU &amp; <span className="italic text-gold-600">Partners</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-navy-700/60">
              {t('description')}
            </p>

            <button
              className="mt-8 inline-flex items-center gap-2 bg-navy-900 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-navy-800"
            >
              Découvrir la fondation →
            </button>
          </div>

          {/* Right: Flat world map — real country outlines */}
          <div className="relative hidden lg:flex lg:items-center lg:justify-center">
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes city-ping {
                0%, 100% { r: 5; opacity: 0.6; }
                50% { r: 16; opacity: 0; }
              }
              @keyframes city-ping-lg {
                0%, 100% { r: 8; opacity: 0.7; }
                50% { r: 24; opacity: 0; }
              }
              @keyframes dash-flow {
                0% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -20; }
              }
              @keyframes glow-pulse {
                0%, 100% { opacity: 0.15; }
                50% { opacity: 0.35; }
              }
              @keyframes scan-line {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(100%); }
              }
              .ping-lome { animation: city-ping-lg 2.8s ease-in-out infinite; }
              .ping-1 { animation: city-ping 3s ease-in-out infinite 0.3s; }
              .ping-2 { animation: city-ping 3s ease-in-out infinite 0.7s; }
              .ping-3 { animation: city-ping 3s ease-in-out infinite 1.1s; }
              .ping-4 { animation: city-ping 3s ease-in-out infinite 1.5s; }
              .ping-5 { animation: city-ping 3s ease-in-out infinite 1.9s; }
              .ping-6 { animation: city-ping 3s ease-in-out infinite 2.3s; }
              .arc-flow { animation: dash-flow 2s linear infinite; }
              .arc-glow { animation: glow-pulse 3s ease-in-out infinite; }
            `}} />
            <svg
              viewBox="0 0 2000 1001"
              className="w-full h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Subtle grid overlay for tech feel */}
              <defs>
                <pattern id="techGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#C9A84C" strokeWidth="0.15" opacity="0.12" />
                </pattern>
                <radialGradient id="mapGlow" cx="935" cy="530" r="400" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                </radialGradient>
                <filter id="cityGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="arcGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Tech grid background */}
              <rect width="2000" height="1001" fill="url(#techGrid)" />

              {/* Radial glow centered on Lomé */}
              <circle cx="935" cy="530" r="400" fill="url(#mapGlow)" />

              {/* Real world map outlines */}
              <WorldMapPaths />

              {/* ===== CONNECTION ARCS (behind markers) ===== */}
              {/* Glowing arcs with animated dashes */}

              {/* Lomé → Paris */}
              <path d="M935 530 Q956 420 978 330" stroke="#C9A84C" strokeWidth="1.5" opacity="0.12" fill="none" className="arc-glow" />
              <path d="M935 530 Q956 420 978 330" stroke="#C9A84C" strokeWidth="0.8" opacity="0.35" strokeDasharray="8 5" fill="none" className="arc-flow" filter="url(#arcGlow)" />

              {/* Lomé → New York */}
              <path d="M935 530 Q762 410 588 378" stroke="#C9A84C" strokeWidth="1.2" opacity="0.1" fill="none" className="arc-glow" />
              <path d="M935 530 Q762 410 588 378" stroke="#C9A84C" strokeWidth="0.7" opacity="0.3" strokeDasharray="8 5" fill="none" className="arc-flow" filter="url(#arcGlow)" />

              {/* Lomé → Dubaï */}
              <path d="M935 530 Q1086 460 1238 448" stroke="#C9A84C" strokeWidth="1.2" opacity="0.1" fill="none" className="arc-glow" />
              <path d="M935 530 Q1086 460 1238 448" stroke="#C9A84C" strokeWidth="0.7" opacity="0.3" strokeDasharray="8 5" fill="none" className="arc-flow" filter="url(#arcGlow)" />

              {/* Lomé → London */}
              <path d="M935 530 Q948 415 960 318" stroke="#C9A84C" strokeWidth="1" opacity="0.08" fill="none" className="arc-glow" />
              <path d="M935 530 Q948 415 960 318" stroke="#C9A84C" strokeWidth="0.6" opacity="0.25" strokeDasharray="8 5" fill="none" className="arc-flow" filter="url(#arcGlow)" />

              {/* Lomé → Dakar */}
              <path d="M935 530 Q905 510 878 498" stroke="#C9A84C" strokeWidth="0.8" opacity="0.08" fill="none" className="arc-glow" />
              <path d="M935 530 Q905 510 878 498" stroke="#C9A84C" strokeWidth="0.5" opacity="0.25" strokeDasharray="6 4" fill="none" className="arc-flow" />

              {/* Lomé → Kinshasa */}
              <path d="M935 530 Q960 560 988 578" stroke="#C9A84C" strokeWidth="0.8" opacity="0.08" fill="none" className="arc-glow" />
              <path d="M935 530 Q960 560 988 578" stroke="#C9A84C" strokeWidth="0.5" opacity="0.25" strokeDasharray="6 4" fill="none" className="arc-flow" />

              {/* Lomé → Addis Abeba */}
              <path d="M935 530 Q1040 510 1118 518" stroke="#C9A84C" strokeWidth="0.8" opacity="0.08" fill="none" className="arc-glow" />
              <path d="M935 530 Q1040 510 1118 518" stroke="#C9A84C" strokeWidth="0.5" opacity="0.25" strokeDasharray="6 4" fill="none" className="arc-flow" />

              {/* ===== CITY MARKERS ===== */}

              {/* LOMÉ — primary hub */}
              <circle cx="935" cy="530" r="8" fill="#C9A84C" opacity="0.9" filter="url(#cityGlow)" />
              <circle cx="935" cy="530" className="ping-lome" fill="none" stroke="#C9A84C" strokeWidth="2" />
              <text x="952" y="528" fill="#C9A84C" opacity="1" fontSize="18" fontFamily="Inter, sans-serif" fontWeight="800" letterSpacing="2.5">LOMÉ</text>

              {/* PARIS */}
              <circle cx="978" cy="330" r="5" fill="#C9A84C" opacity="0.85" filter="url(#cityGlow)" />
              <circle cx="978" cy="330" className="ping-1" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
              <text x="990" y="328" fill="#C9A84C" opacity="0.85" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="2">PARIS</text>

              {/* NEW YORK */}
              <circle cx="588" cy="378" r="5" fill="#C9A84C" opacity="0.8" filter="url(#cityGlow)" />
              <circle cx="588" cy="378" className="ping-2" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
              <text x="548" y="370" fill="#C9A84C" opacity="0.8" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="1.5">NEW YORK</text>

              {/* DUBAÏ */}
              <circle cx="1238" cy="448" r="5" fill="#C9A84C" opacity="0.8" filter="url(#cityGlow)" />
              <circle cx="1238" cy="448" className="ping-3" fill="none" stroke="#C9A84C" strokeWidth="1.2" />
              <text x="1252" y="446" fill="#C9A84C" opacity="0.8" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="1.5">DUBAÏ</text>

              {/* LONDON */}
              <circle cx="960" cy="318" r="4" fill="#C9A84C" opacity="0.75" filter="url(#cityGlow)" />
              <circle cx="960" cy="318" className="ping-4" fill="none" stroke="#C9A84C" strokeWidth="1" />
              <text x="932" y="308" fill="#C9A84C" opacity="0.75" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="1.5">LONDON</text>

              {/* BRUXELLES */}
              <circle cx="975" cy="324" r="3.5" fill="#C9A84C" opacity="0.65" />
              <text x="984" y="316" fill="#C9A84C" opacity="0.65" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="1">BRUXELLES</text>

              {/* GENÈVE */}
              <circle cx="986" cy="340" r="3.5" fill="#C9A84C" opacity="0.65" />
              <text x="996" y="348" fill="#C9A84C" opacity="0.65" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="1">GENÈVE</text>

              {/* ABIDJAN */}
              <circle cx="910" cy="540" r="4" fill="#C9A84C" opacity="0.75" filter="url(#cityGlow)" />
              <circle cx="910" cy="540" className="ping-5" fill="none" stroke="#C9A84C" strokeWidth="1" />
              <text x="878" y="556" fill="#C9A84C" opacity="0.75" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="1.5">ABIDJAN</text>

              {/* DAKAR */}
              <circle cx="878" cy="498" r="4" fill="#C9A84C" opacity="0.75" filter="url(#cityGlow)" />
              <circle cx="878" cy="498" className="ping-6" fill="none" stroke="#C9A84C" strokeWidth="1" />
              <text x="845" y="492" fill="#C9A84C" opacity="0.75" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="1.5">DAKAR</text>

              {/* COTONOU */}
              <circle cx="942" cy="536" r="3.5" fill="#C9A84C" opacity="0.65" />
              <text x="952" y="548" fill="#C9A84C" opacity="0.65" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="1">COTONOU</text>

              {/* KINSHASA */}
              <circle cx="988" cy="578" r="4" fill="#C9A84C" opacity="0.7" filter="url(#cityGlow)" />
              <text x="1000" y="576" fill="#C9A84C" opacity="0.7" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="1.5">KINSHASA</text>

              {/* ADDIS ABEBA */}
              <circle cx="1118" cy="518" r="3.5" fill="#C9A84C" opacity="0.65" />
              <text x="1130" y="516" fill="#C9A84C" opacity="0.65" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="1">ADDIS ABEBA</text>

              {/* LIBREVILLE */}
              <circle cx="958" cy="560" r="3" fill="#C9A84C" opacity="0.6" />
              <text x="968" y="568" fill="#C9A84C" opacity="0.6" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="1">LIBREVILLE</text>

              {/* Latitude / longitude reference lines — tech feel */}
              <line x1="0" y1="500" x2="2000" y2="500" stroke="#C9A84C" strokeWidth="0.3" opacity="0.06" strokeDasharray="3 8" />
              <line x1="0" y1="400" x2="2000" y2="400" stroke="#C9A84C" strokeWidth="0.3" opacity="0.06" strokeDasharray="3 8" />
              <line x1="0" y1="300" x2="2000" y2="300" stroke="#C9A84C" strokeWidth="0.3" opacity="0.06" strokeDasharray="3 8" />
              <line x1="935" y1="0" x2="935" y2="1001" stroke="#C9A84C" strokeWidth="0.3" opacity="0.06" strokeDasharray="3 8" />
              <line x1="600" y1="0" x2="600" y2="1001" stroke="#C9A84C" strokeWidth="0.3" opacity="0.06" strokeDasharray="3 8" />
              <line x1="1200" y1="0" x2="1200" y2="1001" stroke="#C9A84C" strokeWidth="0.3" opacity="0.06" strokeDasharray="3 8" />

              {/* Coordinate labels — subtle tech detail */}
              <text x="10" y="303" fill="#C9A84C" opacity="0.12" fontSize="7" fontFamily="monospace">48°N</text>
              <text x="10" y="403" fill="#C9A84C" opacity="0.12" fontSize="7" fontFamily="monospace">30°N</text>
              <text x="10" y="503" fill="#C9A84C" opacity="0.12" fontSize="7" fontFamily="monospace">6°N</text>
              <text x="938" y="995" fill="#C9A84C" opacity="0.12" fontSize="7" fontFamily="monospace">1°E</text>
              <text x="603" y="995" fill="#C9A84C" opacity="0.12" fontSize="7" fontFamily="monospace">74°W</text>
              <text x="1203" y="995" fill="#C9A84C" opacity="0.12" fontSize="7" fontFamily="monospace">55°E</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
