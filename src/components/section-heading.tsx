'use client';

export default function SectionHeading({ title, center = false }: { title: string; center?: boolean }) {
  return (
    <div className="reveal" style={{ transitionDelay: '0s' }}>
      <span className={`section-marker text-xs tracking-[0.15em] uppercase text-gray-soft font-medium ${center ? 'justify-center' : ''}`} />
      <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight text-foreground leading-[1.2]">
        {title}
      </h2>
    </div>
  );
}
