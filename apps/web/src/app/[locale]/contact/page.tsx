'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const expertiseOptions = [
  'Propriété intellectuelle',
  'Droit OHADA',
  'Droit des affaires',
  'Fiscalité',
  'Droit maritime',
  'Droit social & pénal',
  'Arbitrage & médiation',
  'Commande publique',
  'Environnement',
  'Formations',
  'Autre',
];

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    type: '',
    expertise: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-900 py-28 lg:py-36">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ background: 'linear-gradient(135deg, #C9A84C 0%, transparent 60%)' }} />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-500/60">
            Contact
          </p>
          <h1 className="font-display text-[48px] font-normal leading-[1.15] text-white lg:text-[56px]">
            Prenez <em className="italic text-gold-400">rendez-vous</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/45">
            Notre équipe est à votre disposition pour répondre à vos besoins juridiques. Contactez-nous par téléphone, email ou via le formulaire ci-dessous.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr]">
            {/* Left: Contact info */}
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500">
                Nos Coordonnées
              </p>
              <h2 className="font-display text-[28px] font-normal text-navy-900">
                À votre service
              </h2>

              {/* Lomé */}
              <div className="mt-10 border-t border-black/6 pt-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">
                  Siège — Lomé, Togo
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-navy-900/70">
                  777, Avenue Kléber Dadjo<br />
                  08 BP 8989 Lomé 08
                </p>
                <div className="mt-4 space-y-2">
                  <a href="tel:+22822210505" className="block text-[14px] text-navy-900/70 transition-colors hover:text-gold-500">
                    +228 22 21 05 05
                  </a>
                  <a href="tel:+22822214901" className="block text-[14px] text-navy-900/70 transition-colors hover:text-gold-500">
                    +228 22 21 49 01
                  </a>
                  <a href="mailto:contact@aquereburu-partners.com" className="block text-[14px] text-navy-900/70 transition-colors hover:text-gold-500">
                    contact@aquereburu-partners.com
                  </a>
                </div>
              </div>

              {/* Horaires */}
              <div className="mt-8 border-t border-black/6 pt-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">
                  Horaires d&apos;ouverture
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-navy-900/70">
                  Lundi — Vendredi : 8h00 - 18h00<br />
                  Samedi : Sur rendez-vous
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-[#faf8f3] p-10 lg:p-12">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10">
                    <span className="text-2xl text-gold-500">✓</span>
                  </div>
                  <h3 className="font-display text-[24px] font-medium text-navy-900">
                    Demande envoyée
                  </h3>
                  <p className="mt-3 max-w-sm text-[14px] text-gray-500">
                    Votre demande a été envoyée avec succès. Notre équipe vous recontactera sous 24h ouvrées.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="mb-8 font-display text-[22px] font-medium text-navy-900">
                    Formulaire de contact
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Type */}
                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-navy-900/60">
                        Vous êtes
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Particulier', 'Entreprise', 'Institution', 'Autre cabinet'].map((opt) => (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => setFormData({ ...formData, type: opt })}
                            className={`border px-4 py-2 text-[12px] font-medium transition-all duration-200 ${
                              formData.type === opt
                                ? 'border-gold-500 bg-gold-500/10 text-navy-900'
                                : 'border-black/10 text-gray-500 hover:border-black/20'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Expertise */}
                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-navy-900/60">
                        Domaine concerné
                      </label>
                      <select
                        value={formData.expertise}
                        onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                        className="w-full border border-black/10 bg-white px-4 py-3 text-[13px] text-navy-900 outline-none transition-colors focus:border-gold-500"
                      >
                        <option value="">Sélectionner un domaine</option>
                        {expertiseOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-navy-900/60">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full border border-black/10 bg-white px-4 py-3 text-[13px] text-navy-900 outline-none transition-colors focus:border-gold-500"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-navy-900/60">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full border border-black/10 bg-white px-4 py-3 text-[13px] text-navy-900 outline-none transition-colors focus:border-gold-500"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    {/* Phone + Company */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-navy-900/60">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full border border-black/10 bg-white px-4 py-3 text-[13px] text-navy-900 outline-none transition-colors focus:border-gold-500"
                          placeholder="+228 ..."
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-navy-900/60">
                          Entreprise
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full border border-black/10 bg-white px-4 py-3 text-[13px] text-navy-900 outline-none transition-colors focus:border-gold-500"
                          placeholder="Nom de l'entreprise"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-navy-900/60">
                        Votre message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full resize-none border border-black/10 bg-white px-4 py-3 text-[13px] text-navy-900 outline-none transition-colors focus:border-gold-500"
                        placeholder="Décrivez brièvement votre situation et votre besoin juridique..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-navy-900 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-navy-800"
                    >
                      Envoyer ma demande
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
