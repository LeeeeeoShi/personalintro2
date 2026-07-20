'use client';

import { Plus, X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEditMode } from '@/hooks/useEditMode';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import SectionHeading from '@/components/section-heading';
import EditableText from '@/components/editable-text';

const defaultPosts = [
  { key: 't0', title: '极简主义的十个思考片段', date: '2026-06-15', tags: ['设计', '思考'] },
  { key: 't1', title: '东京建筑漫步笔记', date: '2026-04-02', tags: ['摄影', '建筑'] },
  { key: 't2', title: '如何观看一张照片', date: '2026-01-20', tags: ['摄影', '教程'] },
  { key: 't3', title: '工具与方法：我的设计工作流', date: '2025-10-08', tags: ['设计', '工具'] },
  { key: 't4', title: '柏林工作室实习回忆', date: '2025-07-14', tags: ['生活', '设计'] },
];

const defaultExcerpts: Record<string, string> = {
  't0': '关于减法、空白与精确的十则随笔——记录创作过程中的一些反复出现的念头。',
  't1': '在东京待了一周，拍了无数张照片。这篇笔记整理了最触动我的几个建筑空间。',
  't2': '读图时代，我们看得太快。试着放慢速度，从构图、光线与质感来重新观看。',
  't3': '从灵感到交付，我使用的工具与方法论分享——Figma、Capture One 与 Notebook 的组合。',
  't4': '那段在柏林的日子塑造了我对设计与工艺的理解——关于精确、关于耐心。',
};

function genId() {
  return 't' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export default function Thinking() {
  const { editing } = useEditMode();
  const { ref } = useScrollReveal(0.1);
  const [posts, setPosts] = useLocalStorage('thinking-posts', defaultPosts);

  const addPost = () => {
    const key = genId();
    setPosts((prev) => [...prev, { key, title: '新文章', date: new Date().toISOString().slice(0, 10), tags: ['思考'] }]);
  };

  const removePost = (key: string) => {
    setPosts((prev) => prev.filter((p) => p.key !== key));
  };

  return (
    <section id="thinking" ref={ref} className="py-28 md:py-36 px-6 story-bg border-y border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <SectionHeading title="Thinking" center />
        </div>

        <div className="space-y-10">
          {posts.map((post, i) => (
            <article
              key={post.key}
              className="reveal border-b border-border pb-8 last:border-0 relative"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {editing && (
                <button
                  onClick={() => removePost(post.key)}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                >
                  <X size={12} />
                </button>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[10px] tracking-wider text-gray-soft/60 uppercase">
                    #{tag}
                  </span>
                ))}
              </div>
              <EditableText storageKey={`${post.key}-title`} fallback={post.title} tag="h3" className="text-lg font-medium text-foreground leading-snug" />
              <EditableText storageKey={`${post.key}-excerpt`} fallback={defaultExcerpts[post.key] || ''} className="mt-2 text-sm text-gray-soft font-light leading-relaxed" />
              <span className="mt-2 block text-xs text-gray-soft/50 font-light">{post.date}</span>
            </article>
          ))}

          {editing && (
            <button
              onClick={addPost}
              className="reveal w-full rounded-2xl border-2 border-dashed border-border py-12 flex flex-col items-center justify-center text-gray-soft/40 hover:text-gray-soft/70 hover:border-gray-soft/30 transition-all"
            >
              <Plus size={24} />
              <span className="mt-2 text-xs font-light">添加文章</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
