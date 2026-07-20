'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeading from '@/components/section-heading';
import DroppableImage from '@/components/droppable-image';

const coffeePhotos = [
  { id: 'c1', file: 'f378fceb1fa6cc8e33890c63de016e7e.jpg' },
  { id: 'c2', file: 'd60fadfc1c5d4051ca1d18e6152207de.jpg' },
  { id: 'c3', file: 'c84afb0d520c9ead7a827bdb4f74d4e9.jpg' },
  { id: 'c4', file: '93b8921c49932e02c6426b7c48971844.jpg' },
];

export default function CoffeeGallery() {
  const { ref } = useScrollReveal(0.1);

  return (
    <section id="coffee" ref={ref} className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading title="Coffee &amp; Tea" center />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {coffeePhotos.map((p, i) => (
            <DroppableImage
              key={p.id}
              storageKey={`coffee-${p.id}`}
              defaultSrc={`/coffee/${p.file}`}
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
