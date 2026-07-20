'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeading from '@/components/section-heading';
import EditableText from '@/components/editable-text';

const skillGroups = [
  {
    name: '设计', key: 'skills-g0',
    skills: [
      { name: '品牌识别', key: 'sg0-0' },
      { name: '编辑排版', key: 'sg0-1' },
      { name: '海报设计', key: 'sg0-2' },
      { name: 'UI/UX', key: 'sg0-3' },
    ],
  },
  {
    name: '艺术', key: 'skills-g1',
    skills: [
      { name: '丙烯绘画', key: 'sg1-0' },
      { name: '综合材料', key: 'sg1-1' },
      { name: '水墨', key: 'sg1-2' },
      { name: '数码版画', key: 'sg1-3' },
    ],
  },
  {
    name: '摄影', key: 'skills-g2',
    skills: [
      { name: '静物摄影', key: 'sg2-0' },
      { name: '建筑摄影', key: 'sg2-1' },
      { name: '后期处理', key: 'sg2-2' },
      { name: '胶片摄影', key: 'sg2-3' },
    ],
  },
  {
    name: '工具', key: 'skills-g3',
    skills: [
      { name: 'Figma / Sketch', key: 'sg3-0' },
      { name: 'Adobe Suite', key: 'sg3-1' },
      { name: 'Capture One', key: 'sg3-2' },
      { name: 'Blender', key: 'sg3-3' },
    ],
  },
];

export default function Skills() {
  const { ref } = useScrollReveal(0.1);

  return (
    <section id="skills" ref={ref} className="py-28 md:py-36 px-6 story-bg border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <SectionHeading title="技能" center />
        </div>

        <div className="grid md:grid-cols-4 gap-10 md:gap-8">
          {skillGroups.map((group, gi) => (
            <div key={group.key} className="reveal" style={{ transitionDelay: `${gi * 0.1}s` }}>
              <EditableText storageKey={group.key} fallback={group.name} tag="h3" className="text-sm font-medium text-foreground mb-5 tracking-wide text-center md:text-left" />
              <ul className="space-y-3">
                {group.skills.map((s) => (
                  <li key={s.key} className="border-l-2 border-border pl-4">
                    <EditableText
                      storageKey={s.key}
                      fallback={s.name}
                      tag="span"
                      className="text-sm text-foreground font-normal"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
