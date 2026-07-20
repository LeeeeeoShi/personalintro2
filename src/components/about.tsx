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
              fallback="16 岁｜ENTP｜base 上海&四川。目前在研究 podcast 和 vibe coding。"
              className="reveal text-sm text-gray-soft font-light leading-relaxed"
            />

            <EditableText
              storageKey="about-p2"
              fallback="目前在寻地 Wemapterra 担任视频部主管&制片，同时筹备两档播客节目，偶尔做点 vibe coding 的开发。"
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
                {['摄影', '钢琴', '无人机', '写作', '播客', 'Vibecoding'].map((h) => (
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
                fallback="ENTP / INTJ｜创新 · 热情 · 理性｜想拓展人脉，了解风口，向大佬学习。"
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
