'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: '关于', href: '#about' },
  { label: '履历', href: '#experience' },
  { label: '技能', href: '#skills' },
  { label: '作品', href: '#projects' },
  { label: 'Thinking', href: '#thinking' },
  { label: '相册', href: '#gallery' },
  { label: '咖啡', href: '#coffee' },
  { label: '阅读', href: '#reading' },
  { label: '联系', href: '#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => setOpen(false);
    window.addEventListener('scroll', onScroll, { once: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-14">
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-6">
        <a href="#" className="text-sm font-medium tracking-tight text-foreground hover:text-gray-soft transition-colors">
          Leoshi 施仲勋
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="footer-link text-xs tracking-wider uppercase">
              {l.label}
            </a>
          ))}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block text-sm text-foreground hover:text-gray-soft transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
