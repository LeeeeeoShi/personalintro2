'use client';

import { Plus, X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEditMode } from '@/hooks/useEditMode';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import SectionHeading from '@/components/section-heading';
import EditableText from '@/components/editable-text';

const defaultPosts: Array<{ key: string; title: string; date: string; tags: string[] }> = [];

const defaultExcerpts: Record<string, string> = {};

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
