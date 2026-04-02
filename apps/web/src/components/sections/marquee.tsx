'use client';

import { useTranslations } from 'next-intl';

export function MarqueeSection() {
  const t = useTranslations('marquee');

  // Split the comma-separated items into an array
  const items = t('items')
    .split('—')
    .map((item) => item.trim())
    .filter(Boolean);

  // Create a duplicated array for seamless looping
  const repeatedItems = [...items, ...items];

  return (
    <section className="relative overflow-hidden bg-gold-500 py-3">
      {/* CSS keyframe animation for smooth infinite scroll */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-content {
          display: flex;
          animation: marquee 60s linear infinite;
          will-change: transform;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex w-full overflow-hidden">
        <div className="marquee-content">
          {repeatedItems.map((item, index) => (
            <div key={index} className="flex shrink-0 items-center gap-6 px-8">
              <span className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-wider text-navy-900">
                {item}
              </span>
              {index < repeatedItems.length - 1 && (
                <span className="text-navy-900/30" aria-hidden="true">
                  •
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
