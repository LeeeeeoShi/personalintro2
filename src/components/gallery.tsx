'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeading from '@/components/section-heading';
import DroppableImage from '@/components/droppable-image';

const photos = [
  { id: 'g1', file: 'fbe9a5ff47c474ddc7b9be0090d63789.jpg' },
  { id: 'g2', file: 'fba59dfd046c5db72e7b4b5662d21bef.jpg' },
  { id: 'g3', file: 'f5376b2a9384abd84235ad11aa7b6a2a.jpg' },
  { id: 'g4', file: 'f0e24a8ebbf7443e4153aea947fc3e90.jpg' },
];

export default function Gallery() {
  const { ref } = useScrollReveal(0.1);

  return (
    <section id="gallery" ref={ref} className="py-28 md:py-36 px-6 story-bg border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading title="相册" center />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {photos.map((p, i) => (
            <DroppableImage
              key={p.id}
              storageKey={`gallery-${p.id}`}
              defaultSrc={`/photography/${p.file}`}
              alt=""
              className="reveal rounded-xl"
              style={{ transitionDelay: `${i * 0.08}s`, boxShadow: '0 2px 8px var(--card-shadow)' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
