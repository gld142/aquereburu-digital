'use client';

import { attorneys, juristes } from '@/data/team';
import { Link } from '@/i18n/routing';

export default function EquipePage() {
  const associes = attorneys.filter((a) => a.title === 'associe');
  const collaborateurs = attorneys.filter((a) => a.title === 'collaborateur');

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-900 py-28 lg:py-36">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ background: 'linear-gradient(135deg, #C9A84C 0%, transparent 60%)' }} />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-500/60">
            Notre Équipe
          </p>
          <h1 className="font-display text-[48px] font-normal leading-[1.15] text-white lg:text-[56px]">
            9 avocats d&apos;excellence au service de vos <em className="italic text-gold-400">intérêts</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/45">
            Une équipe pluridisciplinaire alliant expertise juridique pointue, expérience internationale et engagement envers nos clients.
          </p>
        </div>
      </section>

      {/* Associés */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500">
              Avocats Associés
            </p>
            <h2 className="font-display text-[32px] font-normal text-navy-900">
              Les fondateurs et associés du cabinet
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-black/5 sm:grid-cols-2 lg:grid-cols-3">
            {associes.map((attorney) => (
              <div key={attorney.id} className="group bg-white">
                {/* Photo */}
                <div className="relative h-[380px] overflow-hidden bg-[#f0ece3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={attorney.image}
                    alt={attorney.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="p-7">
                  <h3 className="font-display text-[20px] font-medium text-navy-900">
                    {attorney.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gold-500/60">
                    Avocat Associé
                  </p>
                  <p className="mt-1 text-[12px] text-gray-400">
                    {attorney.department}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-gray-500 line-clamp-3">
                    {attorney.bio}
                  </p>

                  {/* Specialties */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {attorney.specialties.slice(0, 3).map((s) => (
                      <span key={s} className="border border-black/8 px-2.5 py-1 text-[10px] font-medium text-navy-900/50">
                        {s}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-[11px] text-gray-400">{attorney.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborateurs */}
      <section className="bg-[#faf8f3] py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500">
              Avocats Collaborateurs
            </p>
            <h2 className="font-display text-[32px] font-normal text-navy-900">
              Expertise et complémentarité
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-black/5 sm:grid-cols-2 lg:grid-cols-3">
            {collaborateurs.map((attorney) => (
              <div key={attorney.id} className="group bg-white">
                {/* Photo */}
                <div className="relative h-[340px] overflow-hidden bg-[#f0ece3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={attorney.image}
                    alt={attorney.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="p-7">
                  <h3 className="font-display text-[18px] font-medium text-navy-900">
                    {attorney.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-gold-500/60">
                    Avocat Collaborateur
                  </p>
                  <p className="mt-1 text-[12px] text-gray-400">
                    {attorney.department}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-gray-500 line-clamp-3">
                    {attorney.bio}
                  </p>

                  {attorney.specialties.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {attorney.specialties.slice(0, 3).map((s) => (
                        <span key={s} className="border border-black/8 px-2.5 py-1 text-[10px] font-medium text-navy-900/50">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="mt-4 text-[11px] text-gray-400">{attorney.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Juristes */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500">
              Juristes
            </p>
            <h2 className="font-display text-[32px] font-normal text-navy-900">
              L&apos;équipe juridique d&apos;appui
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-gray-500">
              Nos juristes assistants participent activement à la recherche juridique, à la veille législative et à la préparation des dossiers du cabinet.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-black/5 sm:grid-cols-3 lg:grid-cols-6">
            {juristes.map((j) => (
              <div key={j.id} className="flex flex-col items-center bg-[#faf8f3] p-6 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={j.image}
                  alt={j.name}
                  className="mb-4 h-20 w-20 rounded-full object-cover"
                />
                <p className="text-[13px] font-medium text-navy-900">{j.name}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-gold-500/60">Juriste</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-[32px] font-normal text-white">
            Un besoin juridique ? <em className="italic text-gold-400">Parlons-en.</em>
          </h2>
          <p className="mt-4 text-[14px] text-white/40">
            Chaque membre de notre équipe est à votre disposition pour vous accompagner dans vos projets et défendre vos intérêts.
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
