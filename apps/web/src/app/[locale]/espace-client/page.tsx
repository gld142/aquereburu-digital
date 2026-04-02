'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';

export default function EspaceClientPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-900 py-28 lg:py-36">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ background: 'linear-gradient(135deg, #C9A84C 0%, transparent 60%)' }} />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-500/60">
            Espace Client
          </p>
          <h1 className="font-display text-[48px] font-normal leading-[1.15] text-white lg:text-[56px]">
            Votre espace <em className="italic text-gold-400">sécurisé</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/45">
            Accédez à vos dossiers, documents et échanges avec votre avocat référent depuis votre espace personnel.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left: Features */}
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500">
                Fonctionnalités
              </p>
              <h2 className="font-display text-[28px] font-normal text-navy-900">
                Un suivi de vos dossiers en temps réel
              </h2>

              <div className="mt-8 space-y-6">
                {[
                  {
                    title: 'Suivi de dossiers',
                    desc: "Consultez l'état d'avancement de vos dossiers en cours, les échéances à venir et l'historique complet des actions réalisées.",
                  },
                  {
                    title: 'Documents partagés',
                    desc: "Accédez à l'ensemble des documents liés à vos dossiers : contrats, conclusions, pièces justificatives et correspondances.",
                  },
                  {
                    title: 'Messagerie sécurisée',
                    desc: "Échangez directement avec votre avocat référent via un canal de communication chiffré et confidentiel.",
                  },
                  {
                    title: 'Facturation',
                    desc: "Consultez vos factures, honoraires et paiements depuis votre tableau de bord personnel.",
                  },
                ].map((feature) => (
                  <div key={feature.title} className="border-l-2 border-gold-500/20 pl-6">
                    <h3 className="text-[15px] font-semibold text-navy-900">{feature.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-gray-500">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Login form */}
            <div className="bg-[#faf8f3] p-10 lg:p-12">
              <h3 className="mb-2 font-display text-[22px] font-medium text-navy-900">
                Connexion
              </h3>
              <p className="mb-8 text-[13px] text-gray-400">
                Identifiez-vous pour accéder à votre espace personnel.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Fonctionnalité bientôt disponible');
                }}
                className="space-y-5"
              >
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-navy-900/60">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-black/10 bg-white px-4 py-3 text-[13px] text-navy-900 outline-none transition-colors focus:border-gold-500"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-navy-900/60">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-black/10 bg-white px-4 py-3 text-[13px] text-navy-900 outline-none transition-colors focus:border-gold-500"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-3.5 w-3.5 accent-gold-500" />
                    <span className="text-[12px] text-gray-500">Se souvenir de moi</span>
                  </label>
                  <button type="button" className="text-[12px] font-medium text-gold-500 hover:underline">
                    Mot de passe oublié ?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-navy-900 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-navy-800"
                >
                  Se connecter
                </button>
              </form>

              <div className="mt-8 border-t border-black/6 pt-6 text-center">
                <p className="text-[12px] text-gray-400">
                  Vous n&apos;avez pas encore de compte ?
                </p>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex text-[12px] font-semibold text-gold-500 hover:underline"
                >
                  Contactez le cabinet pour obtenir vos accès
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
