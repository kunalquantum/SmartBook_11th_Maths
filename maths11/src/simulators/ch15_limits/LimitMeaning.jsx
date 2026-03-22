import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MathSlider } from '../../components/ui/MathSlider';
import { FormulaCard } from '../../components/ui/FormulaCard';

export const LimitMeaning = () => {
  const [xVal, setXVal] = useState(2.1);
  const target = 2; // limit as x -> 2
  const f = (x) => 2 * x + 1; // 2x + 1, limit is 5
  
  const L = f(target);
  const delta = Math.abs(xVal - target);
  const epsilon = Math.abs(f(xVal) - L);

  const w = 360, h = 240;
  const padding = 40;
  const graphW = w - 2 * padding;
  const graphH = h - 2 * padding;

  const mx = (x) => padding + (x / 4) * graphW;
  const my = (y) => h - padding - (y / 8) * graphH;

  const points = [];
  for (let x = 0; x <= 4; x += 0.1) points.push([x, f(x)]);

  return (
    <motion.div className="glass-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ padding: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>
          <h3 style={{ color: 'var(--teal)', marginBottom: '8px' }}>Concept of Limit</h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            As <strong>x</strong> approaches <em>a</em>, <strong>f(x)</strong> approaches <em>L</em>. Slide x towards 2 and watch f(x) get closer to 5.
          </p>
        </motion.div>

        <MathSlider label="Value of x" min={1.5} max={2.5} step={0.01} value={xVal} onChange={setXVal} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <motion.div layout style={{ background: 'var(--bg4)', padding: '12px', borderRadius: '10px', textAlign: 'center', borderLeft: '3px solid var(--teal)' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text3)' }}>|x − 2| &lt; δ</div>
            <div className="math-font" style={{ color: 'var(--teal)', fontWeight: 'bold' }}>δ = {delta.toFixed(3)}</div>
          </motion.div>
          <motion.div layout style={{ background: 'var(--bg4)', padding: '12px', borderRadius: '10px', textAlign: 'center', borderLeft: '3px solid var(--gold)' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text3)' }}>|f(x) − 5| &lt; ε</div>
            <div className="math-font" style={{ color: 'var(--gold)', fontWeight: 'bold' }}>ε = {epsilon.toFixed(3)}</div>
          </motion.div>
        </div>

        <FormulaCard title="ε-δ Definition" formula="∀ε > 0, ∃δ > 0 : 0 < |x−a| < δ ⇒ |f(x)−L| < ε" />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width={w} height={h} style={{ background: 'var(--bg2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          {/* Axes */}
          <line x1={padding} y1={h - padding} x2={w - 10} y2={h - padding} stroke="var(--border)" strokeWidth="1" />
          <line x1={padding} y1={padding / 2} x2={padding} y2={h - padding} stroke="var(--border)" strokeWidth="1" />
          
          {/* Curve */}
          <path d={points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${mx(p[0])} ${my(p[1])}`).join(' ')} fill="none" stroke="var(--text3)" strokeWidth="1.5" opacity="0.3" />

          {/* Limit Point (Target) */}
          <circle cx={mx(target)} cy={my(L)} r={4} fill="var(--coral)" />
          <line x1={mx(target)} y1={my(L)} x2={padding} y2={my(L)} stroke="var(--coral)" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
          <line x1={mx(target)} y1={my(L)} x2={mx(target)} y2={h - padding} stroke="var(--coral)" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />

          {/* Current Point */}
          <circle cx={mx(xVal)} cy={my(f(xVal))} r={6} fill="var(--teal)">
            <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <line x1={mx(xVal)} y1={my(f(xVal))} x2={padding} y2={my(f(xVal))} stroke="var(--teal)" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1={mx(xVal)} y1={my(f(xVal))} x2={mx(xVal)} y2={h - padding} stroke="var(--teal)" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Labels */}
          <text x={mx(target)} y={h - 15} fill="var(--coral)" fontSize="10" textAnchor="middle">a=2</text>
          <text x={padding - 10} y={my(L)} fill="var(--coral)" fontSize="10" textAnchor="end" dominantBaseline="middle">L=5</text>
          <text x={mx(xVal)} y={h - 5} fill="var(--teal)" fontSize="10" textAnchor="middle">x</text>
          <text x={padding - 5} y={my(f(xVal))} fill="var(--teal)" fontSize="10" textAnchor="end" dominantBaseline="middle">f(x)</text>
        </svg>
      </motion.div>
    </motion.div>
  );
};
