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

const defaultBooks = [
  { title: '设计的生态学', author: '后藤武', rating: 4.5, key: 'book-0' },
  { title: 'Wabi-Sabi: 给设计师的侘寂之美', author: 'Leonard Koren', rating: 4.0, key: 'book-1' },
  { title: 'The Nature of Order', author: 'Christopher Alexander', rating: 5.0, key: 'book-2' },
  { title: '透明性', author: '柯林·罗 / 罗伯特·斯拉茨基', rating: 4.5, key: 'book-3' },
  { title: '论摄影', author: '苏珊·桑塔格', rating: 4.5, key: 'book-4' },
];

const defaultFilms = [
  { title: '帕特森', author: '吉姆·贾木许', rating: 4.5, key: 'film-0' },
  { title: '春夏秋冬又一春', author: '金基德', rating: 4.0, key: 'film-1' },
  { title: '穆赫兰道', author: '大卫·林奇', rating: 3.5, key: 'film-2' },
];

const defaultReviews: Record<string, string> = {
  'book-0': '从环境与感知的角度重新理解设计，影响了我对空间与物的看法。',
  'book-1': '简洁而深刻的一本小书，关于不完美的美学。',
  'book-2': '关于秩序的鸿篇巨制，每次重读都有新的收获。',
  'book-3': '建筑与艺术中的透明性概念——现象透明与字面透明。',
  'book-4': '摄影伦理与美学的经典文本，常读常新。',
  'film-0': '日常的诗意——一部关于司机与诗人的电影，安静而有力。',
  'film-1': '四季轮回中的修行与欲望，画面极美。',
  'film-2': '超现实的梦境叙事，视觉符号丰富。',
};

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
