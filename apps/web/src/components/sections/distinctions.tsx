'use client';

import { useTranslations } from 'next-intl';

const SITE = 'https://www.aquereburu-partners.com/wp-content/uploads';

const distinctions = [
  { year: '2019', key: '2019_iso', sourceKey: '2019_iso' },
  { year: '2019', key: '2019_pi', sourceKey: '2019_pi' },
  { year: '2017', key: '2017_award', sourceKey: '2017_award' },
  { year: '2016', key: '2016_bid', sourceKey: '2016_bid' },
  { year: '2010', key: '2010_prix', sourceKey: '2010_prix' },
];

const trophies = [
  {
    label: 'ISO 9001:2015',
    sublabel: 'AFAQ — Certifié',
    image: `${SITE}/2019/10/certification-afaq-iso-9001-300x185.jpg`,
  },
  {
    label: 'Global Law Experts',
    sublabel: '1ère Société PI au Togo',
    image: `${SITE}/2019/11/Global-Law-Experts-300x186.jpg`,
  },
  {
    label: 'Legal Awards 2017',
    sublabel: 'Lawyer Monthly',
    image: `${SITE}/2019/11/legal-awards-2017-300x185.jpg`,
  },
  {
    label: 'World Quality Commitment',
    sublabel: 'BID Paris — Gold',
    image: `${SITE}/2019/10/Prix-World-Quality-Commitment-business-initiative-direction-300x185.jpg`,
  },
  {
    label: 'Prix d\'Excellence Qualité',
    sublabel: 'UEMOA',
    image: `${SITE}/2019/11/uemoa-300x185.jpg`,
  },
  {
    label: 'Chambers & Partners',
    sublabel: 'Classé',
    image: `${SITE}/2019/11/Chambers-Partners-300x185.jpg`,
  },
  {
    label: 'Union Internationale des Avocats',
    sublabel: 'Membre',
    image: `${SITE}/2019/10/Union_Internationale_des_Avocats-300x185.jpg`,
  },
];

export function DistinctionsSection() {
  const t = useTranslations('distinctions');

  return (
    <section className="border-t border-black/6 bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        {/* Header - centered */}
        <div className="mb-14 text-center">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500">
            Reconnaissances
          </p>
          <h2 className="font-display text-[24px] font-normal text-navy-900 sm:text-[30px] lg:text-[36px]">
            Distinctions &amp; classements
          </h2>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative flex justify-center">
          {/* Connecting line */}
          <div className="absolute left-[5%] right-[5%] top-5 hidden h-px bg-[#f0ece3] sm:block" />

          {/* Timeline items */}
          <div className="relative z-10 flex flex-wrap justify-center gap-6">
            {distinctions.map((item) => (
              <div
                key={item.key}
                className="flex max-w-[220px] flex-1 basis-[140px] flex-col items-center px-3 text-center sm:px-6"
              >
                {/* Year Circle */}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-navy-900">
                  <span className="font-display text-[12px] font-semibold text-gold-500">
                    {item.year}
                  </span>
                </div>

                {/* Title */}
                <p className="mb-2 font-display text-[14px] font-medium leading-[1.4] text-navy-900">
                  {t(`items.${item.key}`)}
                </p>

                {/* Organization */}
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">
                  {t(`sources.${item.sourceKey}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trophies row — real images from site */}
        <div className="mt-16 border-t border-black/4 pt-10">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {trophies.map((trophy) => (
              <div key={trophy.label} className="flex flex-col items-center gap-2 opacity-60 transition-opacity duration-300 hover:opacity-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={trophy.image}
                  alt={trophy.label}
                  className="h-[60px] w-auto object-contain"
                />
                <p className="text-[9px] font-medium text-gray-400">{trophy.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
