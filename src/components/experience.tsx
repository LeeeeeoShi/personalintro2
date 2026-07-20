'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeading from '@/components/section-heading';
import EditableText from '@/components/editable-text';

const entries = [
  { period: '筹备中', title: 'Founder', org: '边界秩序 BoundaryLogic', descKey: 'exp-desc-0', fallbackDesc: '一档探索科技、文化与创作边界的播客节目。' },
  { period: '至今', title: '视频部主管 & 制片', org: '寻地 Wemapterra', descKey: 'exp-desc-1', fallbackDesc: '负责视频内容策划、拍摄与制作管理。' },
  { period: '至今', title: 'Co-Founder & CEO', org: '轻愈 Qingyu', descKey: 'exp-desc-2', fallbackDesc: '带领团队构建心理疗愈服务体系，探索身心整合的创新路径。' },
  { period: '至今', title: 'Co-Founder & 教务', org: '某英语教育机构', descKey: 'exp-desc-3', fallbackDesc: '负责课程体系搭建与教学质量管理。' },
  { period: '2024', title: 'Founder & Senior Adviser', org: '翰云无人机', descKey: 'exp-desc-4', fallbackDesc: '从零组建团队，涵盖无人机定制组装、课程培训、出口贸易、电商及民用产品研发。后因政策因素将团队转至其他地区，现担任顾问。' },
];

export default function Experience() {
  const { ref } = useScrollReveal(0.15);

  return (
    <section id="experience" ref={ref} className="py-28 md:py-36 px-6 story-bg border-y border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <SectionHeading title="履历" center />
        </div>

        <div className="space-y-12">
          {entries.map((e, i) => (
            <div
              key={i}
              className="reveal relative pl-8 border-l border-border"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-background border-2 border-terracotta -translate-x-[7px]" />
              <EditableText storageKey={`${e.descKey}-period`} fallback={e.period} tag="span" className="text-xs text-gray-soft font-light tracking-wider" />
              <EditableText storageKey={`${e.descKey}-org`} fallback={e.org} tag="h3" className="mt-1 text-lg font-medium text-foreground" />
              <EditableText storageKey={`${e.descKey}-title`} fallback={e.title} tag="p" className="text-sm text-gray-soft font-light" />
              <EditableText storageKey={e.descKey} fallback={e.fallbackDesc} className="mt-2 text-sm text-gray-soft font-light leading-relaxed" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
