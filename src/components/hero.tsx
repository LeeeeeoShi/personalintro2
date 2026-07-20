'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { SceneBuilding, SceneCoffee, SceneCamera } from '@/components/scenes';

const SCENES = ['building', 'coffee', 'camera'] as const;
const SCENE_DURATION = 1600;
const CROSSFADE = 500;

export default function Hero() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const current = SCENES[sceneIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setSceneIndex((prev) => {
        setPrevIndex(prev);
        setTimeout(() => setPrevIndex(null), CROSSFADE);
        return (prev + 1) % SCENES.length;
      });
    }, SCENE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const goToScene = (i: number) => {
    if (i === sceneIndex) return;
    setPrevIndex(sceneIndex);
    setSceneIndex(i);
    setTimeout(() => setPrevIndex(null), CROSSFADE);
  };

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--hero-bg)' }}>
      <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] min-h-screen">
        {/* ── Left — Text ── */}
        <div className="order-2 md:order-1 flex items-center justify-center px-8 md:px-12 lg:px-16 xl:px-20 pb-16 md:pb-0">
          <div className="w-full max-w-md">
            <h1 className="hero-name text-[clamp(2.6rem,5.5vw,4.2rem)] font-light tracking-tight text-foreground leading-[1.05]">
              Leoshi
              <span className="block text-gray-soft font-light mt-1">施仲勋</span>
            </h1>
            <p className="hero-slogan mt-5 text-[clamp(1rem,1.8vw,1.25rem)] font-light tracking-[0.05em] text-gray-soft leading-relaxed">
              Art, <span style={{ color: 'var(--terracotta)' }}>design</span> and photography
            </p>
            <div className="hero-ctas flex flex-col sm:flex-row gap-3 mt-10">
              <a
                href="#projects"
                className="inline-flex items-center justify-center h-11 rounded-full px-7 text-sm font-medium text-white transition-all duration-300"
                style={{ backgroundColor: 'var(--terracotta)' }}
              >
                浏览作品
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center h-11 rounded-full px-7 text-sm font-normal transition-all duration-300"
                style={{ border: '1px solid var(--sage)', color: 'var(--foreground)' }}
              >
                联系我
              </a>
            </div>
            {/* Scene indicator dots */}
            <div className="hero-ctas flex gap-2 mt-8 justify-center md:justify-start">
              {SCENES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToScene(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === sceneIndex ? 'bg-terracotta w-5' : 'bg-border hover:bg-gray-soft/40'
                  }`}
                  aria-label={`Scene ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right — Animated Scenes ── */}
        <div className="order-1 md:order-2 relative flex items-center justify-center h-[50vh] md:h-screen pt-10 md:pt-0">
          {/* Ambient layer */}
          <svg viewBox="-60 -80 760 800" className="absolute inset-0 w-full h-full max-w-[680px] max-h-[720px] pointer-events-none" style={{ zIndex: 0 }}>
            <ellipse cx="330" cy="300" rx="160" ry="60" className="ambient-ring"
              fill="none" stroke="var(--guide-color)" strokeWidth="0.8" strokeDasharray="8 12" />
            <circle cx="180" cy="220" r="8" className="ambient-pulse"
              fill="none" stroke="var(--guide-accent)" strokeWidth="1" />
            <circle cx="180" cy="220" r="8" className="ambient-pulse"
              fill="none" stroke="var(--guide-accent)" strokeWidth="1" />
            <circle cx="180" cy="220" r="8" className="ambient-pulse"
              fill="none" stroke="var(--guide-accent)" strokeWidth="1" />
            <circle cx="140" cy="380" r="2" className="ambient-dot" fill="var(--terracotta)" opacity="0.3" />
            <circle cx="500" cy="350" r="1.5" className="ambient-dot" fill="var(--sage)" opacity="0.25" />
            <circle cx="450" cy="200" r="1.8" className="ambient-dot" fill="var(--terracotta)" opacity="0.2" />
            <circle cx="250" cy="420" r="1.2" className="ambient-dot" fill="var(--sage)" opacity="0.3" />
            <circle cx="520" cy="280" r="1.5" className="ambient-dot" fill="var(--terracotta)" opacity="0.2" />
          </svg>

          {/* Scene container */}
          <div className="relative w-full h-full flex items-center justify-center" style={{ zIndex: 1 }}>
            {prevIndex !== null && (
              <div key={`prev-${prevIndex}`} className="scene-fade-out absolute inset-0 flex items-center justify-center">
                {SCENES[prevIndex] === 'building' && <SceneBuilding active={false} />}
                {SCENES[prevIndex] === 'coffee' && <SceneCoffee active={false} />}
                {SCENES[prevIndex] === 'camera' && <SceneCamera active={false} />}
              </div>
            )}
            <div key={current} className="scene-fade-in w-full h-full flex items-center justify-center">
              {current === 'building' && <SceneBuilding active={true} />}
              {current === 'coffee' && <SceneCoffee active={true} />}
              {current === 'camera' && <SceneCamera active={true} />}
            </div>
          </div>

          {/* Floating cubes in front */}
          <svg viewBox="-60 -80 760 800" className="absolute inset-0 w-full h-full max-w-[680px] max-h-[720px] pointer-events-none" style={{ zIndex: 2 }}>
            <g className="ambient-cube" transform="translate(20, -10)">
              <path d="M 3 3 L 6 1.5 L 9 3 L 6 4.5 Z" fill="none" stroke="var(--guide-accent)" strokeWidth="0.8" opacity="0.5" />
            </g>
            <g className="ambient-cube" transform="translate(-30, 25)">
              <path d="M 2 2 L 5 0.5 L 8 2 L 5 3.5 Z" fill="none" stroke="var(--guide-color)" strokeWidth="0.7" opacity="0.4" />
            </g>
            <g className="ambient-cube" transform="translate(40, -15)">
              <path d="M 2.5 2.5 L 5.5 1 L 8.5 2.5 L 5.5 4 Z" fill="none" stroke="var(--guide-accent)" strokeWidth="0.6" opacity="0.35" />
            </g>
          </svg>
        </div>
      </div>

      {/* ── Scroll Hint ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-light text-gray-soft/35 tracking-[0.2em] uppercase">向下滚动</span>
        <ChevronDown size={16} className="text-gray-soft/25" style={{ animation: 'scroll-hint 2.5s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
