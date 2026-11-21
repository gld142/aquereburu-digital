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
    <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-paper-2">
      {on ? (
        <iframe
          title={fr ? `Plan d’accès, ${label}` : `Map, ${label}`}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-6">
          <p className="t-small max-w-xs text-ink-2">
            {fr
              ? 'La carte est fournie par Google Maps, qui peut déposer des cookies.'
              : 'The map is provided by Google Maps, which may set cookies.'}
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={() => setOn(true)}>
              {fr ? 'Afficher la carte' : 'Show map'}
            </button>
            <a
              className="btn btn-ghost bg-paper"
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
