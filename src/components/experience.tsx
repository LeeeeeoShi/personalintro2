'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeading from '@/components/section-heading';
import EditableText from '@/components/editable-text';

const entries = [
  { period: '2023 — 至今', title: '独立创作者', org: '自由职业', descKey: 'exp-desc-0', fallbackDesc: '从事艺术创作、品牌设计与摄影项目，服务客户涵盖文化机构与商业品牌。' },
  { period: '2020 — 2023', title: '高级设计师', org: 'XX 设计事务所 · 台北', descKey: 'exp-desc-1', fallbackDesc: '负责品牌识别系统与编辑设计，主导多个国际客户的视觉项目。' },
  { period: '2018 — 2020', title: '平面设计师', org: 'XX 创意工作室 · 东京', descKey: 'exp-desc-2', fallbackDesc: '参与海报、书籍与展览视觉设计，学习日本设计的精细与克制。' },
  { period: '2017 — 2018', title: '设计助理', org: 'XX 设计公司 · 柏林', descKey: 'exp-desc-3', fallbackDesc: '协助完成商业设计与摄影后期，积累跨文化工作方法与审美。' },
  { period: '2013 — 2017', title: '视觉传达设计', org: '国立台湾艺术大学', descKey: 'exp-desc-4', fallbackDesc: '主修视觉传达，副修摄影。毕业论文研究极简主义在当代设计中的运用。' },
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
              <EditableText storageKey={`${e.descKey}-title`} fallback={e.title} tag="h3" className="mt-1 text-lg font-medium text-foreground" />
              <EditableText storageKey={`${e.descKey}-org`} fallback={e.org} tag="p" className="text-sm text-gray-soft font-light" />
              <EditableText storageKey={e.descKey} fallback={e.fallbackDesc} className="mt-2 text-sm text-gray-soft font-light leading-relaxed" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
