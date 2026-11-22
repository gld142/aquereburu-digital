'use client';

import { useState } from 'react';
import type { Locale } from '@/content/site';

/**
 * Carte chargée à la demande : aucun cookie ni requête vers un tiers
 * tant que le visiteur n'a pas cliqué (RGPD).
 */
export function MapEmbed({ query, label, locale }: { query: string; label: string; locale: Locale }) {
  const [on, setOn] = useState(false);
  const fr = locale === 'fr';
  const q = encodeURIComponent(query);

  return (
    <div className="plan-acces">
      {on ? (
        <iframe
          title={fr ? `Plan d’accès, ${label}` : `Map, ${label}`}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-5 sm:p-6">
          <p className="t-small max-w-xs">
            {fr
              ? 'La carte est fournie par Google Maps, qui peut déposer des cookies.'
              : 'The map is provided by Google Maps, which may set cookies.'}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <button type="button" className="btn" onClick={() => setOn(true)}>
              {fr ? 'Afficher la carte' : 'Show map'}
            </button>
            <a
              className="btn contour"
              href={`https://www.openstreetmap.org/search?query=${q}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenStreetMap
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
