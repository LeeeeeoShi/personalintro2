'use client';

import { useEffect, useMemo, useState } from 'react';

const U = 48;
const C = Math.cos(Math.PI / 6);
const S = 0.5;
const OX = 330;
const OY = 445;

function iso(w: number, d: number, h: number) {
  return { x: OX + (w - d) * U * C, y: OY + (w + d) * U * S - h * U };
}

function ln(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
}

interface Vol { w: [number, number]; d: [number, number]; h: [number, number] }

function volEdges(v: Vol) {
  const { w: [w0, w1], d: [d0, d1], h: [h0, h1] } = v;
  const p = (a: number, b: number, c: number) => iso(a, b, c);
  return [
    ln(p(w0, d0, h0), p(w1, d0, h0)),
    ln(p(w1, d0, h0), p(w1, d1, h0)),
    ln(p(w1, d1, h0), p(w0, d1, h0)),
    ln(p(w0, d1, h0), p(w0, d0, h0)),
    ln(p(w0, d0, h1), p(w1, d0, h1)),
    ln(p(w1, d0, h1), p(w1, d1, h1)),
    ln(p(w1, d1, h1), p(w0, d1, h1)),
    ln(p(w0, d1, h1), p(w0, d0, h1)),
    ln(p(w0, d0, h0), p(w0, d0, h1)),
    ln(p(w1, d0, h0), p(w1, d0, h1)),
    ln(p(w1, d1, h0), p(w1, d1, h1)),
    ln(p(w0, d1, h0), p(w0, d1, h1)),
  ];
}

/* ───────────── BUILDING SCENE (unchanged) ───────────── */

const bVolumes: (Vol & { fF?: string; fR?: string; fT?: string })[] = [
  { w: [-3, 3], d: [-2, 2], h: [0, 3.5], fF: 'var(--wall-front)', fR: 'var(--wall-right)', fT: 'var(--wall-top)' },
  { w: [-3, 0], d: [-2, 0.5], h: [0, 6], fF: 'var(--wall-front)', fR: 'var(--wall-right)', fT: 'var(--wall-top)' },
  { w: [0.5, 3], d: [1, 3.5], h: [0, 2.2], fF: 'var(--wall-dark)', fR: 'var(--wall-front)', fT: 'var(--wall-top)' },
  { w: [-1.5, 1.5], d: [0.5, 2], h: [3.5, 3.7], fF: 'var(--wall-top)', fR: 'var(--wall-top)', fT: 'var(--wall-top)' },
  { w: [-2.5, -0.5], d: [-1.5, 0.5], h: [3.8, 4], fF: 'var(--wall-top)', fR: 'var(--wall-top)', fT: 'var(--wall-top)' },
];

const bGlass: (Vol & { fF?: string; fR?: string })[] = [
  { w: [-1.5, 1.5], d: [1, 2], h: [0, 3.5], fF: 'url(#glassF)', fR: 'url(#glassR)' },
  { w: [0.5, 1.8], d: [-0.5, 1], h: [2.2, 4.5], fF: 'url(#glassF)', fR: 'url(#glassR)' },
];

const bGuides = [
  'M 190 340 L 320 260 L 500 340',
  'M 320 260 L 320 150',
  'M 270 190 L 360 190',
  'M 370 250 L 480 300',
];
const bAccentGuides = [
  'M 190 340 L 190 440',
  'M 420 300 L 420 440',
];
const bAnnots = [
  { x: 178, y: 338, label: '6.0m' },
  { x: 508, y: 342, label: '5.0m' },
  { x: 178, y: 290, label: '±0.00' },
  { x: 265, y: 185, label: '12.0m' },
];

/* ───────────── COFFEE SCENE — V60 Dripper + Gooseneck Kettle ───────────── */

const coffeeStrokes: { d: string; delay?: number; dur?: number; cls?: string }[] = [
  // ── V60 Dripper (large, centered) ──
  // Top ellipse (wide opening)
  { d: 'M 180 180 C 180 148, 460 148, 460 180 C 460 212, 180 212, 180 180 Z', delay: 0.08, dur: 0.7 },
  // Bottom ellipse (narrow base)
  { d: 'M 250 300 C 250 284, 390 284, 390 300 C 390 316, 250 316, 250 300 Z', delay: 0.18, dur: 0.7 },
  // Left outer edge
  { d: 'M 180 180 L 250 300', delay: 0.03, dur: 0.4 },
  // Right outer edge
  { d: 'M 460 180 L 390 300', delay: 0.06, dur: 0.4 },
  // V60 spiral ribs
  { d: 'M 200 202 C 240 228, 370 228, 440 202', delay: 0.35, dur: 0.5, cls: 'hero-stroke-dim' },
  { d: 'M 210 230 C 248 252, 360 252, 430 230', delay: 0.4, dur: 0.5, cls: 'hero-stroke-dim' },
  { d: 'M 220 258 C 255 276, 350 276, 420 258', delay: 0.45, dur: 0.5, cls: 'hero-stroke-dim' },
  { d: 'M 235 284 C 262 298, 340 298, 405 284', delay: 0.5, dur: 0.5, cls: 'hero-stroke-dim' },
  // Rib center line
  { d: 'M 320 180 L 320 300', delay: 0.3, dur: 0.4, cls: 'hero-stroke-dim' },
  // Coffee grounds surface
  { d: 'M 195 212 C 240 200, 380 200, 445 212', delay: 0.55, dur: 0.4, cls: 'hero-stroke-dim' },

  // ── Dripper stand / base ring ──
  { d: 'M 240 328 C 240 318, 400 318, 400 328 C 400 338, 240 338, 240 328 Z', delay: 0.48, dur: 0.4, cls: 'hero-stroke-dim' },
  { d: 'M 240 328 L 235 345', delay: 0.52, dur: 0.3, cls: 'hero-stroke-dim' },
  { d: 'M 400 328 L 405 345', delay: 0.54, dur: 0.3, cls: 'hero-stroke-dim' },
  { d: 'M 235 345 C 235 354, 405 354, 405 345', delay: 0.56, dur: 0.3, cls: 'hero-stroke-dim' },

  // ── Server (carafe) below dripper (enlarged) ──
  { d: 'M 265 355 C 265 345, 375 345, 375 355 C 375 365, 265 365, 265 355 Z', delay: 0.22, dur: 0.5 },
  { d: 'M 250 440 C 250 428, 390 428, 390 440 C 390 452, 250 452, 250 440 Z', delay: 0.32, dur: 0.5 },
  { d: 'M 265 355 L 250 440', delay: 0.12, dur: 0.4 },
  { d: 'M 375 355 L 390 440', delay: 0.15, dur: 0.4 },
  // Coffee liquid level
  { d: 'M 257 405 C 278 396, 362 396, 383 405', delay: 0.6, dur: 0.4, cls: 'hero-stroke-dim' },
  // Carafe handle (right side)
  { d: 'M 375 365 C 405 365, 405 410, 380 420', delay: 0.4, dur: 0.5 },
];

const coffeeGuides = [
  'M 475 180 L 530 155',
  'M 410 300 L 460 325',
  'M 240 455 L 200 485',
  'M 400 455 L 440 485',
];

const coffeeAnnots = [
  { x: 532, y: 153, label: 'V60' },
  { x: 462, y: 325, label: '92°C' },
  { x: 178, y: 490, label: '1:16' },
  { x: 440, y: 490, label: 'Ethiopia' },
];

/* ───────────── CAMERA SCENE — Rangefinder Camera + Lens ───────────── */

/* ───────────── TURNTABLE SCENE (isometric 3D) ───────────── */

const turntableVolEdges = [
  ...volEdges({ w: [-4.5, 4.5], d: [-3.5, 3.5], h: [0, 0.6] }),
  ...volEdges({ w: [3, 4.2], d: [-3.5, -2], h: [0.6, 0.9] }),
  ...volEdges({ w: [3.2, 3.8], d: [2, 2.8], h: [0.6, 1.2] }),
];

// Helper: isometric ellipse for a circle at (w, d, h) with radius r
function isoEllipse(w: number, d: number, h: number, r: number) {
  const c = iso(w, d, h);
  return { cx: c.x, cy: c.y, rx: r * U * C, ry: r * U * S };
}

// Platter + record center
const platterTop = isoEllipse(0, 0, 0.9, 3.2);
const platterBot = isoEllipse(0, 0, 0.6, 3.2);
const recordTop = isoEllipse(0, 0, 1.0, 3.5);
const recordBot = isoEllipse(0, 0, 0.9, 3.5);
const labelE = isoEllipse(0, 0, 1.0, 1.0);

const turntableCustomStrokes: { d: string; delay?: number; dur?: number; cls?: string }[] = [
  // ── Platter (cylinder) ──
  // Bottom ellipse
  { d: `M ${platterBot.cx - platterBot.rx} ${platterBot.cy} A ${platterBot.rx} ${platterBot.ry} 0 1 0 ${platterBot.cx + platterBot.rx} ${platterBot.cy} A ${platterBot.rx} ${platterBot.ry} 0 1 0 ${platterBot.cx - platterBot.rx} ${platterBot.cy}`, delay: 0.15, dur: 0.5 },
  // Top ellipse
  { d: `M ${platterTop.cx - platterTop.rx} ${platterTop.cy} A ${platterTop.rx} ${platterTop.ry} 0 1 0 ${platterTop.cx + platterTop.rx} ${platterTop.cy} A ${platterTop.rx} ${platterTop.ry} 0 1 0 ${platterTop.cx - platterTop.rx} ${platterTop.cy}`, delay: 0.25, dur: 0.5 },
  // Side lines
  { d: `M ${platterBot.cx - platterBot.rx} ${platterBot.cy} L ${platterTop.cx - platterTop.rx} ${platterTop.cy}`, delay: 0.2, dur: 0.3 },
  { d: `M ${platterBot.cx + platterBot.rx} ${platterBot.cy} L ${platterTop.cx + platterTop.rx} ${platterTop.cy}`, delay: 0.22, dur: 0.3 },

  // ── Record ──
  // Bottom ellipse (hidden mostly, just show visible arc)
  { d: `M ${recordBot.cx - recordBot.rx} ${recordBot.cy} A ${recordBot.rx} ${recordBot.ry} 0 0 0 ${recordBot.cx + recordBot.rx} ${recordBot.cy}`, delay: 0.2, dur: 0.5 },
  // Top ellipse
  { d: `M ${recordTop.cx - recordTop.rx} ${recordTop.cy} A ${recordTop.rx} ${recordTop.ry} 0 1 0 ${recordTop.cx + recordTop.rx} ${recordTop.cy} A ${recordTop.rx} ${recordTop.ry} 0 1 0 ${recordTop.cx - recordTop.rx} ${recordTop.cy}`, delay: 0.3, dur: 0.5 },
  // Record side (visible arc on right)
  { d: `M ${recordBot.cx + recordBot.rx} ${recordBot.cy} A ${recordBot.rx} ${recordBot.ry} 0 0 0 ${recordTop.cx + recordTop.rx} ${recordTop.cy}`, delay: 0.28, dur: 0.3 },

  // ── Grooves (concentric on record top) ──
  ...[3.0, 2.6, 2.2, 1.8, 1.4].map((r, i) => {
    const e = isoEllipse(0, 0, 1.0, r);
    return { d: `M ${e.cx - e.rx} ${e.cy} A ${e.rx} ${e.ry} 0 1 0 ${e.cx + e.rx} ${e.cy} A ${e.rx} ${e.ry} 0 1 0 ${e.cx - e.rx} ${e.cy}`, delay: 0.5 + i * 0.08, dur: 0.4, cls: 'hero-stroke-dim' as const };
  }),

  // ── Record label ──
  { d: `M ${labelE.cx - labelE.rx} ${labelE.cy} A ${labelE.rx} ${labelE.ry} 0 1 0 ${labelE.cx + labelE.rx} ${labelE.cy} A ${labelE.rx} ${labelE.ry} 0 1 0 ${labelE.cx - labelE.rx} ${labelE.cy}`, delay: 0.4, dur: 0.3 },
  // Label text lines
  { d: `M ${labelE.cx - labelE.rx * 0.5} ${labelE.cy - 4} L ${labelE.cx + labelE.rx * 0.5} ${labelE.cy - 4}`, delay: 0.7, dur: 0.2, cls: 'hero-stroke-dim' },
  { d: `M ${labelE.cx - labelE.rx * 0.4} ${labelE.cy + 4} L ${labelE.cx + labelE.rx * 0.4} ${labelE.cy + 4}`, delay: 0.72, dur: 0.2, cls: 'hero-stroke-dim' },
  // Spindle hole
  { d: `M ${labelE.cx - 3} ${labelE.cy} A 3 2 0 1 0 ${labelE.cx + 3} ${labelE.cy} A 3 2 0 1 0 ${labelE.cx - 3} ${labelE.cy}`, delay: 0.45, dur: 0.2 },

  // ── Tonearm ──
  // Arm tube (from pivot toward record)
  { d: `M ${iso(3.5, 2.4, 1.0).x} ${iso(3.5, 2.4, 1.0).y} C ${iso(2, 1.5, 1.0).x} ${iso(2, 1.5, 1.0).y}, ${iso(1, 0.5, 1.0).x} ${iso(1, 0.5, 1.0).y}, ${iso(1.2, -0.5, 0.9).x} ${iso(1.2, -0.5, 0.9).y}`, delay: 0.35, dur: 0.6 },
  // Headshell
  { d: `M ${iso(1.2, -0.5, 0.9).x} ${iso(1.2, -0.5, 0.9).y} L ${iso(0.8, -0.8, 0.9).x} ${iso(0.8, -0.8, 0.9).y} L ${iso(0.5, -0.5, 0.85).x} ${iso(0.5, -0.5, 0.85).y} L ${iso(0.9, -0.2, 0.85).x} ${iso(0.9, -0.2, 0.85).y} Z`, delay: 0.42, dur: 0.4 },

  // ── Guide lines ──
  { d: `M ${iso(-5, -3.5, 0).x} ${iso(-5, -3.5, 0).y} L ${iso(-5, -4.5, 0).x} ${iso(-5, -4.5, 0).y}`, delay: 0.6, dur: 0.3, cls: 'hero-guide' as const },
  { d: `M ${iso(1, 0, 0).x} ${iso(1, 0, 0).y} L ${iso(1, -1.5, 0).x} ${iso(1, -1.5, 0).y}`, delay: 0.65, dur: 0.3, cls: 'hero-guide' as const },
  { d: `M ${iso(4.5, 3.5, 0).x} ${iso(4.5, 3.5, 0).y} L ${iso(5.5, 4, 0).x} ${iso(5.5, 4, 0).y}`, delay: 0.7, dur: 0.3, cls: 'hero-guide' as const },
];

const turntableAnnots = [
  { x: iso(-5, -5, 0).x - 20, y: iso(-5, -5, 0).y, label: '33 ⅓' },
  { x: iso(1, -1.5, 0).x - 15, y: iso(1, -1.5, 0).y + 15, label: 'LP' },
  { x: iso(5.5, 4, 0).x - 5, y: iso(5.5, 4, 0).y - 5, label: 'Jazz' },
];

/* ───────── SCENE RENDERERS ───────── */

function BuildingSVG({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 1000);
    return () => { clearTimeout(t1); };
  }, [active]);
  const drawing = active && phase === 0;
  const floating = active && phase >= 1;
  const phaseClass = [
    drawing ? 'hero-drawing' : '',
    floating ? 'hero-float' : '',
  ].filter(Boolean).join(' ');
  const mainEdges = useMemo(() => bVolumes.flatMap(v => volEdges(v)), []);
  const glassEdges = useMemo(() => bGlass.flatMap(v => volEdges(v)), []);
  return (
    <div className={phaseClass} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="-60 -80 760 800" className="w-full h-full max-w-[680px] max-h-[720px]">
        {bGuides.map((d, i) => (
          <path key={`g-${i}`} d={d} className="hero-guide" pathLength="1" strokeDasharray="1"
            style={{ '--guide-dur': '0.6s', '--guide-delay': `${0.5 + i * 0.2}s` } as React.CSSProperties} />
        ))}
        {bAccentGuides.map((d, i) => (
          <path key={`ag-${i}`} d={d} className="hero-guide-accent" pathLength="1" strokeDasharray="1"
            style={{ '--guide-dur': '0.5s', '--guide-delay': `${1 + i * 0.3}s` } as React.CSSProperties} />
        ))}
        {mainEdges.map((d, i) => (
          <path key={`e-${i}`} d={d} className="hero-stroke hero-stroke-main" pathLength="1" strokeDasharray="1"
            style={{ '--draw-dur': `${0.2 + (i % 10) * 0.03}s`, '--draw-delay': `${i * 0.02}s` } as React.CSSProperties} />
        ))}
        {glassEdges.map((d, i) => (
          <path key={`ge-${i}`} d={d} className="hero-stroke hero-stroke-dim" pathLength="1" strokeDasharray="1"
            style={{ '--draw-dur': `${0.15 + (i % 6) * 0.03}s`, '--draw-delay': `${0.7 + i * 0.03}s` } as React.CSSProperties} />
        ))}
        <path d="M 330 260 L 330 185" className="hero-stroke hero-stroke-accent" pathLength="1" strokeDasharray="1"
          style={{ '--draw-dur': '0.4s', '--draw-delay': '0.6s' } as React.CSSProperties} />
        {bAnnots.map((a, i) => (
          <text key={`a-${i}`} x={a.x} y={a.y} className="hero-annot"
            style={{ '--annot-delay': `${1.5 + i * 0.2}s` } as React.CSSProperties}>{a.label}</text>
        ))}
      </svg>
    </div>
  );
}

function CoffeeSVG({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 1000);
    return () => { clearTimeout(t1); };
  }, [active]);
  const drawing = active && phase === 0;
  const floating = active && phase >= 1;
  const phaseClass = [
    drawing ? 'hero-drawing' : '',
    floating ? 'hero-float' : '',
  ].filter(Boolean).join(' ');
  return (
    <div className={phaseClass} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="-60 -80 760 800" className="w-full h-full max-w-[680px] max-h-[720px]">
        {coffeeGuides.map((d, i) => (
          <path key={`cg-${i}`} d={d} className="hero-guide" pathLength="1" strokeDasharray="1"
            style={{ '--guide-dur': '0.5s', '--guide-delay': `${0.6 + i * 0.2}s` } as React.CSSProperties} />
        ))}
        {coffeeStrokes.map((s, i) => (
          <path key={`cs-${i}`} d={s.d}
            className={`hero-stroke ${s.cls || 'hero-stroke-main'}`}
            pathLength="1" strokeDasharray="1"
            style={{ '--draw-dur': `${s.dur || 0.35}s`, '--draw-delay': `${s.delay || i * 0.04}s` } as React.CSSProperties} />
        ))}
        {coffeeAnnots.map((a, i) => (
          <text key={`ca-${i}`} x={a.x} y={a.y} className="hero-annot"
            style={{ '--annot-delay': `${1.8 + i * 0.2}s` } as React.CSSProperties}>{a.label}</text>
        ))}
      </svg>
    </div>
  );
}

function TurntableSVG({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 1000);
    return () => { clearTimeout(t1); };
  }, [active]);
  const drawing = active && phase === 0;
  const floating = active && phase >= 1;
  const phaseClass = [
    drawing ? 'hero-drawing' : '',
    floating ? 'hero-float' : '',
  ].filter(Boolean).join(' ');

  const mainEdges = useMemo(() => turntableVolEdges, []);

  return (
    <div className={phaseClass} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="-60 -80 760 800" className="w-full h-full max-w-[680px] max-h-[720px]">
        {/* Volume edges */}
        {mainEdges.map((d, i) => (
          <path key={`te-${i}`} d={d} className="hero-stroke hero-stroke-main" pathLength="1" strokeDasharray="1"
            style={{ '--draw-dur': `${0.2 + (i % 10) * 0.03}s`, '--draw-delay': `${i * 0.02}s` } as React.CSSProperties} />
        ))}

        {/* Custom strokes (platter, record, arm) */}
        {turntableCustomStrokes.map((s, i) => (
          <path key={`ts-${i}`} d={s.d}
            className={`${s.cls || 'hero-stroke hero-stroke-main'}`}
            pathLength="1" strokeDasharray="1"
            style={{ '--draw-dur': `${s.dur || 0.35}s`, '--draw-delay': `${s.delay || i * 0.03}s` } as React.CSSProperties} />
        ))}

        {/* Annotations */}
        {turntableAnnots.map((a, i) => (
          <text key={`ta-${i}`} x={a.x} y={a.y} className="hero-annot"
            style={{ '--annot-delay': `${1.8 + i * 0.2}s` } as React.CSSProperties}>{a.label}</text>
        ))}
      </svg>
    </div>
  );
}

/* ───────── EXPORT ───────── */

export function SceneBuilding({ active }: { active: boolean }) {
  return <BuildingSVG active={active} />;
}

export function SceneCoffee({ active }: { active: boolean }) {
  return <CoffeeSVG active={active} />;
}

export function SceneCamera({ active }: { active: boolean }) {
  return <TurntableSVG active={active} />;
}
