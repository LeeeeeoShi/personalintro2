'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEditMode } from '@/hooks/useEditMode';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import SectionHeading from '@/components/section-heading';
import EditableText from '@/components/editable-text';

const tabs = [
  { key: 'books', label: '读书' },
  { key: 'films', label: '电影' },
];

const defaultBooks: Array<{ title: string; author: string; rating: number; key: string }> = [];

const defaultFilms: Array<{ title: string; author: string; rating: number; key: string }> = [];

const defaultReviews: Record<string, string> = {};

function genBookId() {
  return 'book-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function genFilmId() {
  return 'film-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export default function Reading() {
  const [tab, setTab] = useState('books');
  const { editing } = useEditMode();
  const { ref } = useScrollReveal(0.1);
  const [books, setBooks] = useLocalStorage('reading-books', defaultBooks);
  const [films, setFilms] = useLocalStorage('reading-films', defaultFilms);

  const items = tab === 'books' ? books : films;

  const addItem = () => {
    if (tab === 'books') {
      const key = genBookId();
      setBooks((prev) => [...prev, { title: '新书', author: '作者', rating: 3, key }]);
    } else {
      const key = genFilmId();
      setFilms((prev) => [...prev, { title: '新电影', author: '导演', rating: 3, key }]);
    }
  };

  const removeItem = (key: string) => {
    if (tab === 'books') {
      setBooks((prev) => prev.filter((b) => b.key !== key));
    } else {
      setFilms((prev) => prev.filter((f) => f.key !== key));
    }
  };

  return (
    <section id="reading" ref={ref} className="py-28 md:py-36 px-6 story-bg border-y border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <SectionHeading title="阅读与观影" center />
        </div>

        <div className="reveal flex justify-center gap-2 mb-12">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`tab-btn ${tab === t.key ? 'active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {items.map((item, i) => (
            <div
              key={item.key}
              className="reveal relative"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {editing && (
                <button
                  onClick={() => removeItem(item.key)}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                >
                  <X size={12} />
                </button>
              )}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <EditableText storageKey={`${item.key}-title`} fallback={item.title} tag="h3" className="text-base font-medium text-foreground" />
                  <EditableText storageKey={`${item.key}-author`} fallback={item.author} tag="p" className="text-xs text-gray-soft/60 font-light mt-0.5" />
                </div>
                <div className="flex-shrink-0 text-xs text-gray-soft/50 font-light">
                  {'★'.repeat(Math.floor(item.rating))}
                </div>
              </div>
              <EditableText storageKey={`${item.key}-review`} fallback={defaultReviews[item.key] || ''} className="mt-2 text-sm text-gray-soft font-light leading-relaxed" />
            </div>
          ))}

          {editing && (
            <button
              onClick={addItem}
              className="reveal w-full rounded-2xl border-2 border-dashed border-border py-12 flex flex-col items-center justify-center text-gray-soft/40 hover:text-gray-soft/70 hover:border-gray-soft/30 transition-all"
            >
              <Plus size={24} />
              <span className="mt-2 text-xs font-light">{tab === 'books' ? '添加书籍' : '添加电影'}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
