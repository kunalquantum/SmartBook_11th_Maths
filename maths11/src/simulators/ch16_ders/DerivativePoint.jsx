import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MathSlider } from '../../components/ui/MathSlider';
import { FormulaCard } from '../../components/ui/FormulaCard';

export const DerivativePoint = () => {
  const [xVal, setXVal] = useState(1);
  const f = (x) => 0.5 * x * x; // f(x) = 0.5x^2
  const df = (x) => x; // f'(x) = x

  const slope = df(xVal);
  const yVal = f(xVal);

  const w = 360, h = 240, p = 40;
  const mx = (x) => p + ((x + 2) / 4) * (w - 2 * p);
  const my = (y) => h - p - (y / 4) * (h - 2 * p);

  const points = [];
  for (let x = -2; x <= 2; x += 0.1) points.push([x, f(x)]);

  // Tangent line points
  const t1 = [xVal - 1, yVal - slope];
  const t2 = [xVal + 1, yVal + slope];

  return (
    <motion.div className="glass-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ padding: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>
          <h3 style={{ color: 'var(--teal)', marginBottom: '8px' }}>Derivative at a Point</h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            The derivative represents the <strong>slope</strong> of the tangent line at a specific point.
          </p>
        </motion.div>

        <MathSlider label="Point x" min={-1.8} max={1.8} step={0.1} value={xVal} onChange={setXVal} />

        <motion.div layout style={{ background: 'var(--bg4)', padding: '16px', borderRadius: '12px', textAlign: 'center', borderLeft: '4px solid var(--teal)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text3)', textTransform: 'uppercase' }}>Slope (f'(x))</div>
          <div className="math-font" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--teal)' }}>
            m = {slope.toFixed(2)}
          </div>
        </motion.div>

        <FormulaCard title="Derivative Definition" formula="f'(a) = lim_{h&rarr;0} \frac{f(a+h) - f(a)}{h}" />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width={w} height={h} style={{ background: 'var(--bg2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <line x1={0} y1={h - p} x2={w} y2={h - p} stroke="var(--border)" strokeWidth="0.5" />
          <line x1={w / 2} y1={0} x2={w / 2} y2={h} stroke="var(--border)" strokeWidth="0.5" />
          
          <path d={points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${mx(pt[0])} ${my(pt[1])}`).join(' ')} fill="none" stroke="var(--text3)" strokeWidth="1" opacity="0.3" />

          {/* Tangent Line */}
          <motion.line
            animate={{ x1: mx(t1[0]), y1: my(t1[1]), x2: mx(t2[0]), y2: my(t2[1]) }}
            stroke="var(--teal)" strokeWidth="2"
          />

          {/* Point */}
          <motion.circle
            animate={{ cx: mx(xVal), cy: my(yVal) }}
            r={5} fill="var(--teal)"
          />
          
          <text x={w - 10} y={h - p + 15} fill="var(--text3)" fontSize="10" textAnchor="end">f(x) = 0.5x&sup2;</text>
        </svg>
      </motion.div>
    </motion.div>
  );
};
