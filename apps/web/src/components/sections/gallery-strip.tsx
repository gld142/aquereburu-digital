'use client';

import Image from 'next/image';

export function GalleryStrip() {
  const images = [
    { id: 1, src: '/images/photo-conf-oif.png', alt: 'Conférence OIF' },
    { id: 2, src: '/images/photo-prix-bid.png', alt: 'Remise prix BID' },
    { id: 3, src: '/images/photo-associes.jpg', alt: 'Photo groupe' },
    { id: 4, src: '/images/photo-bibliotheque.png', alt: 'Bibliothèque' },
  ];

  return (
    <section className="py-0">
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-4">
        {images.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden"
            style={{ height: '280px' }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
