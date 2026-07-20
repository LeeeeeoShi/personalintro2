'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeading from '@/components/section-heading';
import EditableText from '@/components/editable-text';

const skillGroups = [
  {
    name: '摄影与影视', key: 'skills-g0',
    skills: [
      { name: '摄影及后期', key: 'sg0-0' },
      { name: '胶片摄影', key: 'sg0-1' },
      { name: '影视制作与编导', key: 'sg0-2' },
      { name: 'AI 视频制作', key: 'sg0-3' },
    ],
  },
  {
    name: '技术与开发', key: 'skills-g1',
    skills: [
      { name: 'Python / 前端', key: 'sg1-0' },
      { name: 'Vibecoding', key: 'sg1-1' },
      { name: 'AI 训练与 Prompt', key: 'sg1-2' },
      { name: 'PCB 设计 / 嵌入式', key: 'sg1-3' },
    ],
  },
  {
    name: '无人机', key: 'skills-g2',
    skills: [
      { name: '无人机定制组装', key: 'sg2-0' },
      { name: '穿越机（FPV）', key: 'sg2-1' },
      { name: '课程培训', key: 'sg2-2' },
      { name: '出口贸易与电商', key: 'sg2-3' },
    ],
  },
  {
    name: '创意与其他', key: 'skills-g3',
    skills: [
      { name: '3D 建模', key: 'sg3-0' },
      { name: '写作与内容运营', key: 'sg3-1' },
      { name: '播音与主持', key: 'sg3-2' },
      { name: '播客制作与运营', key: 'sg3-3' },
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
