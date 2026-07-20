'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, ArrowUp } from 'lucide-react';

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-border py-10 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-sm font-medium text-foreground tracking-tight">
              Leoshi 施仲勋
            </span>
            <span className="text-xs text-gray-soft ml-3 font-light">
              &copy; {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="footer-link">关于</a>
            <a href="#experience" className="footer-link">履历</a>
            <a href="#projects" className="footer-link">作品</a>
            <a href="#contact" className="footer-link">联系</a>
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="footer-link flex items-center gap-1.5"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-[11px] text-gray-soft font-light tracking-wider">
            以克制设计 — 以目的建造
          </p>
        </div>
      </div>

      {showTop && (
        <button
          onClick={scrollTop}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-40"
          aria-label="回到顶部"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </footer>
  );
}
