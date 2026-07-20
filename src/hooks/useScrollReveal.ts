'use client';
import { useEffect, useRef, useState } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const revealed = useRef(new Set<Element>());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.querySelectorAll('.reveal').forEach((target) => {
      if (revealed.current.has(target)) {
        target.classList.add('visible');
      }
    });

    const targets = Array.from(el.querySelectorAll('.reveal')).filter(
      (t) => !revealed.current.has(t)
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealed.current.add(entry.target);
            observer.unobserve(entry.target);
          }
        });
        if (entries.some((e) => e.isIntersecting)) setIsVisible(true);
      },
      { threshold }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  });

  return { ref, isVisible };
}
