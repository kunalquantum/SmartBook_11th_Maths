import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MathSlider } from '../../components/ui/MathSlider';
import { FormulaCard } from '../../components/ui/FormulaCard';

export const TrigLimits = () => {
  const [xVal, setXVal] = useState(0.5);
  
  const f = (x) => x !== 0 ? Math.sin(x) / x : 1;
  const g = (x) => x !== 0 ? (1 - Math.cos(x)) / x : 0;
  
  const valF = f(xVal);
  const valG = g(xVal);

  const pointsF = [];
  const pointsG = [];
  for (let x = -4; x <= 4; x += 0.1) {
    pointsF.push([x, f(x)]);
    pointsG.push([x, g(x)]);
  }

  const w = 360, h = 240, p = 40;
  const mx = (x) => p + ((x + 4) / 8) * (w - 2 * p);
  const my = (y) => h - p - (y * (h - 2 * p));

  return (
    <motion.div className="glass-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ padding: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>
          <h3 style={{ color: 'var(--teal)', marginBottom: '8px' }}>Trigonometric Limits</h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            The fundamental limit: <strong>lim<sub>x&rarr;0</sub> (sin x / x) = 1</strong>. Watch the ratio as x approaches 0.
          </p>
        </motion.div>

        <MathSlider label="x (radians)" min={-3.14} max={3.14} step={0.01} value={xVal} onChange={setXVal} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ background: 'var(--bg4)', padding: '12px', borderRadius: '10px', borderLeft: '3px solid var(--teal)' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text3)' }}>sin(x) / x</div>
            <div className="math-font" style={{ color: 'var(--teal)', fontWeight: 'bold' }}>{valF.toFixed(5)}</div>
          </div>
          <div style={{ background: 'var(--bg4)', padding: '12px', borderRadius: '10px', borderLeft: '3px solid var(--gold)' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text3)' }}>(1 − cos x) / x</div>
            <div className="math-font" style={{ color: 'var(--gold)', fontWeight: 'bold' }}>{valG.toFixed(5)}</div>
          </div>
        </div>

        <FormulaCard title="Important Trig Limits" formula="lim_{x→0} \frac{\sin x}{x} = 1, \quad lim_{x→0} \frac{1-\cos x}{x} = 0" />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width={w} height={h} style={{ background: 'var(--bg2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <line x1={p} y1={h - p} x2={w - p} y2={h - p} stroke="var(--border)" strokeWidth="0.5" />
          <line x1={p + (w - 2 * p) / 2} y1={p} x2={p + (w - 2 * p) / 2} y2={h - p} stroke="var(--border)" strokeWidth="0.5" />
          
          <path d={pointsF.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${mx(pt[0])} ${my(pt[1])}`).join(' ')} fill="none" stroke="var(--teal)" strokeWidth="2" />
          <path d={pointsG.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${mx(pt[0])} ${my(pt[1])}`).join(' ')} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Current x indicator */}
          <line x1={mx(xVal)} y1={p} x2={mx(xVal)} y2={h - p} stroke="white" strokeWidth="0.5" opacity="0.3" />
          <circle cx={mx(xVal)} cy={my(valF)} r={4} fill="var(--teal)" />
          
          <text x={w / 2} y={h - 10} fill="var(--text3)" fontSize="10" textAnchor="middle">Fundamental limit at x=0 is 1</text>
        </svg>
      </motion.div>
    </motion.div>
  );
};
