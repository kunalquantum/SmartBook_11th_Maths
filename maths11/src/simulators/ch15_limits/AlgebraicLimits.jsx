import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MathSlider } from '../../components/ui/MathSlider';
import { FormulaCard } from '../../components/ui/FormulaCard';

const PROBLEMS = [
  {
    id: 'factor',
    title: 'Factorization',
    fLabel: '(x² - 4)/(x - 2)',
    a: 2,
    formula: 'lim_{x→2} (x-2)(x+2)/(x-2) = lim_{x→2} (x+2)',
    eval: (x) => (x + 2), // simplified
    original: (x) => x !== 2 ? (x * x - 4) / (x - 2) : 4,
  },
  {
    id: 'rational',
    title: 'Rationalization',
    fLabel: '(√x - 1)/(x - 1)',
    a: 1,
    formula: 'lim_{x→1} (√x-1)(√x+1) / [(x-1)(√x+1)] = 1/2',
    eval: (x) => 1 / (Math.sqrt(x) + 1),
    original: (x) => x !== 1 ? (Math.sqrt(x) - 1) / (x - 1) : 0.5,
  },
  {
    id: 'infinity',
    title: 'Limit at Infinity',
    fLabel: '(2x + 1)/(x - 3)',
    a: 100, // as x -> inf
    formula: 'lim_{x→∞} (2 + 1/x)/(1 - 3/x) = 2',
    eval: (x) => (2 + 1/x) / (1 - 3/x),
    isInf: true,
  }
];

export const AlgebraicLimits = () => {
  const [probId, setProbId] = useState('factor');
  const [xVal, setXVal] = useState(2.1);

  const prob = PROBLEMS.find(p => p.id === probId);
  const result = prob.eval(xVal);

  return (
    <motion.div className="glass-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ padding: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>
          <h3 style={{ color: 'var(--coral)', marginBottom: '8px' }}>Algebraic Functions</h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            Techniques to resolve <strong>0/0</strong> indeterminate forms. Choose a method and approach the point <em>a</em>.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {PROBLEMS.map(p => (
            <motion.button key={p.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => { setProbId(p.id); setXVal(p.isInf ? 10 : p.a + 0.1); }} style={{ flex: 1, padding: '8px', background: probId === p.id ? 'var(--coral)' : 'var(--bg4)', color: probId === p.id ? 'white' : 'var(--text2)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
              {p.title}
            </motion.button>
          ))}
        </div>

        <MathSlider label={prob.isInf ? "x" : "x approaching a"} min={prob.isInf ? 1 : prob.a - 1.5} max={prob.isInf ? 100 : prob.a + 1.5} step={prob.isInf ? 1 : 0.01} value={xVal} onChange={setXVal} />

        <motion.div layout style={{ background: 'var(--bg4)', padding: '16px', borderRadius: '12px', textAlign: 'center', borderLeft: '4px solid var(--coral)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text3)', textTransform: 'uppercase' }}>f({xVal.toFixed(2)})</div>
          <div className="math-font" style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--coral)' }}>
            {result.toFixed(4)}
          </div>
        </motion.div>

        <FormulaCard title="Method" formula={prob.formula} />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center', alignItems: 'center', minHeight: '200px', background: 'var(--bg2)', borderRadius: '15px', border: '1px solid var(--border)' }}>
        <div style={{ fontSize: '1.5rem', color: 'var(--text2)', textAlign: 'center' }}>
          {prob.fLabel}
          <div style={{ fontSize: '0.8rem', color: 'var(--text3)', marginTop: '5px' }}>as x → {prob.isInf ? '∞' : prob.a}</div>
        </div>
        
        {/* Visual of 0/0 cancellation */}
        {prob.id === 'factor' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div className="math-font" style={{ fontSize: '1.1rem' }}>
              <span style={{ textDecoration: Math.abs(xVal - 2) > 0.001 ? 'line-through' : 'none', color: 'var(--text3)' }}>(x-2)</span>(x+2) / <span style={{ textDecoration: Math.abs(xVal - 2) > 0.001 ? 'line-through' : 'none', color: 'var(--text3)' }}>(x-2)</span>
            </div>
            <div style={{ color: 'var(--teal)', fontWeight: 'bold' }}>Remaining: (x + 2) &rarr; 4</div>
          </div>
        )}

        {/* Infinity trend */}
        {prob.isInf && (
          <div style={{ width: '80%', height: '100px', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="50" x2="100" y2="50" stroke="var(--gold)" strokeWidth="0.5" strokeDasharray="2 2" />
              <path d={Array.from({ length: 21 }, (_, i) => `${i === 0 ? 'M' : 'L'} ${i * 5} ${100 - (prob.eval(i * 5 + 5) / 4) * 100}`).join(' ')} fill="none" stroke="var(--coral)" strokeWidth="2" />
            </svg>
            <div style={{ position: 'absolute', top: '50%', right: '0', fontSize: '10px', color: 'var(--gold)' }}>Limit = 2</div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
