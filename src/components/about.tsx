'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeading from '@/components/section-heading';
import EditableText from '@/components/editable-text';
import DroppableImage from '@/components/droppable-image';

export default function About() {
  const { ref } = useScrollReveal(0.2);

  return (
    <section id="about" ref={ref} className="py-28 md:py-36 px-6 story-bg border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          <div className="md:col-span-2">
            <DroppableImage
              storageKey="about-photo"
              alt="Leoshi 施仲勋"
              aspectRatio="aspect-[3/4]"
              className="reveal rounded-2xl shadow-lg"
            />
          </div>

          <div className="md:col-span-3 space-y-6">
            <SectionHeading title="关于我" />

            <EditableText
              storageKey="about-p1"
              fallback="常驻台北，在艺术、设计与摄影之间穿行。我相信好的作品来自精确而非丰富——知道该舍弃什么，该在哪里放置一条线，以及何时让空无发声。"
              className="reveal text-sm text-gray-soft font-light leading-relaxed"
            />

            <EditableText
              storageKey="about-p2"
              fallback="多年来，我曾在台北、东京和柏林展出，与亚洲及欧洲的设计工作室合作，并在建筑期刊上发表摄影作品。我的实践根植于减法、结构与光的行为。"
              className="reveal text-sm text-gray-soft font-light leading-relaxed"
              tag="p"
            />

            <div className="reveal pt-2" style={{ transitionDelay: '0.3s' }}>
              <EditableText
                storageKey="about-hobbies-label"
                fallback="爱好"
                tag="h4"
                className="text-xs tracking-wider uppercase text-foreground/60 mb-3"
              />
              <div className="flex flex-wrap gap-2">
                {['建筑漫游', '黑胶收藏', '手冲咖啡', '独立出版', '城市徒步'].map((h) => (
                  <span key={h} className="px-3 py-1.5 rounded-full text-xs border border-border text-gray-soft font-light">
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal pt-2" style={{ transitionDelay: '0.4s' }}>
              <EditableText
                storageKey="about-signature"
                fallback="&mdash; Leoshi 施仲勋"
                className="text-sm text-foreground/50 font-light italic"
                tag="p"
              />
            </div>

            <div className="reveal pt-4 border-t border-border" style={{ transitionDelay: '0.45s' }}>
              <EditableText
                storageKey="about-bio"
                fallback="生于台湾，现居台北。跨媒介创作者，工作在艺术、设计与摄影的交汇处。"
                className="text-xs text-gray-soft/60 font-light leading-relaxed"
                tag="p"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
