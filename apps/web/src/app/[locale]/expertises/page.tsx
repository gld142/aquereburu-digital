'use client';

import { expertises } from '@/data/expertises';
import { attorneys } from '@/data/team';
import { Link } from '@/i18n/routing';

const iconMap: Record<string, string> = {
  Globe: '🌍',
  Briefcase: '💼',
  Shield: '🛡',
  Calculator: '📊',
  Anchor: '⚓',
  Leaf: '🌿',
  Scale: '⚖',
  Building: '🏛',
  Handshake: '🤝',
};

export default function ExpertisesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-900 py-28 lg:py-36">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ background: 'linear-gradient(135deg, #C9A84C 0%, transparent 60%)' }} />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-500/60">
            Nos Expertises
          </p>
          <h1 className="font-display text-[48px] font-normal leading-[1.15] text-white lg:text-[56px]">
            Un accompagnement juridique{' '}
            <em className="italic text-gold-400">complet</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/45">
            Plus de 21 domaines d&apos;expertise couvrant l&apos;ensemble du droit des affaires en Afrique de l&apos;Ouest et à l&apos;international.
          </p>
        </div>
      </section>

      {/* Expertises Grid */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12">
            {expertises.map((exp, i) => {
              const referent = attorneys.find((a) => a.id === exp.referentId);
              return (
                <div
                  key={exp.slug}
                  id={exp.slug}
                  className={`grid grid-cols-1 gap-px lg:grid-cols-[1fr_2fr] ${
                    i > 0 ? 'border-t border-black/6 pt-12' : ''
                  }`}
                >
                  {/* Left: Number + Icon */}
                  <div className="mb-6 lg:mb-0">
                    <span className="font-display text-[13px] italic text-gold-500/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="mt-2 font-display text-[28px] font-medium leading-[1.25] text-navy-900">
                      {exp.title}
                    </h2>
                    {referent && (
                      <div className="mt-4 flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={referent.image}
                          alt={referent.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-[12px] font-medium text-navy-900">{referent.name}</p>
                          <p className="text-[10px] text-gray-400">Référent</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Description + details */}
                  <div>
                    <p className="text-[15px] leading-[1.8] text-gray-500">
                      {exp.shortDesc}
                    </p>

                    {referent && referent.specialties.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {referent.specialties.map((s) => (
                          <span
                            key={s}
                            className="border border-black/8 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-navy-900/50"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition-colors duration-300 hover:text-gold-500"
                    >
                      Consulter un avocat
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-[32px] font-normal text-white">
            Quel est votre besoin <em className="italic text-gold-400">juridique ?</em>
          </h2>
          <p className="mt-4 text-[14px] text-white/40">
            Nos experts sont à votre disposition pour analyser votre situation et vous proposer un accompagnement sur mesure.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-3 bg-gold-500 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-navy-900 transition-colors duration-300 hover:bg-gold-400"
          >
            Prendre rendez-vous
            <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
