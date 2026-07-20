'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEditMode } from '@/hooks/useEditMode';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import SectionHeading from '@/components/section-heading';
import EditableText from '@/components/editable-text';

const defaultProjects = [
  { id: 'p1', title: '几何抽象系列', desc: '以几何简化为手段探索空间构成关系的系列绘画。', tags: ['丙烯', '画布'], gradient: 'from-[#f0ede8] to-[#e5e0d8] dark:from-[#222] dark:to-[#1a1a1c]', cat: 'art' },
  { id: 'p2', title: 'NORD 品牌识别', desc: '为概念建筑事务所打造的精致视觉系统，涵盖标志、色彩与应用规范。', tags: ['品牌', '视觉系统'], gradient: 'from-[#e8e4dc] to-[#ddd7cc] dark:from-[#222] dark:to-[#1a1a1c]', cat: 'design' },
  { id: 'p3', title: '光的研究', desc: '透过透明层叠与阴影探讨自然光在物体表面的行为。', tags: ['综合材料', '摄影'], gradient: 'from-[#e8e6e2] to-[#ddd9d0] dark:from-[#1e1e20] dark:to-[#18181a]', cat: 'art' },
  { id: 'p4', title: '博物馆导视系统', desc: '为当代美术馆设计的简洁明了的环境标识系统。', tags: ['环境设计', '导视'], gradient: 'from-[#ece8e0] to-[#e0d8cc] dark:from-[#202022] dark:to-[#18181a]', cat: 'design' },
  { id: 'p5', title: '静物 — 容器', desc: '日常器皿被还原为本质的几何形态，以光线勾勒质感。', tags: ['静物', '摄影'], gradient: 'from-[#f0ece4] to-[#e5dfd4] dark:from-[#222224] dark:to-[#1c1c1e]', cat: 'photo' },
  { id: 'p6', title: '海报系列 — 空间中的形式', desc: '文字与几何在网格系统中的三部曲编排实验。', tags: ['海报', '编辑设计'], gradient: 'from-[#f2eee8] to-[#e8e2d8] dark:from-[#242426] dark:to-[#1c1c1e]', cat: 'design' },
];

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'design', label: '设计' },
  { key: 'art', label: '艺术' },
  { key: 'photo', label: '摄影' },
];

function genId() {
  return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const { editing } = useEditMode();
  const { ref } = useScrollReveal(0.1);
  const [projects, setProjects] = useLocalStorage('projects-data', defaultProjects);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.cat === filter);

  const addProject = () => {
    setProjects((prev) => [...prev, {
      id: genId(),
      title: '新项目',
      desc: '项目描述',
      tags: ['新标签'],
      gradient: 'from-[#f0ede8] to-[#e5e0d8] dark:from-[#222] dark:to-[#1a1a1c]',
      cat: 'design',
    }]);
  };

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section id="projects" ref={ref} className="py-28 md:py-36 px-6 story-bg border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <SectionHeading title="作品" />
          <div className="flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                className={`tab-btn ${filter === t.key ? 'active' : ''}`}
                onClick={() => setFilter(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="reveal rounded-2xl overflow-hidden card-hover relative"
              style={{
                transitionDelay: `${i * 0.08}s`,
                boxShadow: '0 2px 12px var(--card-shadow)',
                background: 'var(--card-bg)',
              }}
            >
              {editing && (
                <button
                  onClick={() => removeProject(p.id)}
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                >
                  <X size={12} />
                </button>
              )}
              <div className={`aspect-[4/3] bg-gradient-to-br ${p.gradient} flex items-end p-5`}>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-background/60 text-gray-soft font-light">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5 space-y-2">
                <EditableText storageKey={`proj-${p.id}-title`} fallback={p.title} tag="h3" className="text-base font-medium text-foreground leading-snug" />
                <EditableText storageKey={`proj-${p.id}-desc`} fallback={p.desc} className="text-sm text-gray-soft font-light leading-relaxed" />
              </div>
            </div>
          ))}

          {editing && (
            <button
              onClick={addProject}
              className="reveal rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center min-h-[280px] text-gray-soft/40 hover:text-gray-soft/70 hover:border-gray-soft/30 transition-all"
            >
              <Plus size={24} />
              <span className="mt-2 text-xs font-light">添加项目</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
