import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MathSlider } from '../../components/ui/MathSlider';
import { FormulaCard } from '../../components/ui/FormulaCard';

const EXAMPLES = [
  {
    id: 'sum_n',
    title: 'Sum of first n integers',
    formula: '1 + 2 + ... + n = n(n+1)/2',
    fn: (n) => (n * (n + 1)) / 2,
    terms: (n) => Array.from({ length: n }, (_, i) => i + 1),
  },
  {
    id: 'sum_n2',
    title: 'Sum of first n squares',
    formula: '1² + 2² + ... + n² = n(n+1)(2n+1)/6',
    fn: (n) => (n * (n + 1) * (2 * n + 1)) / 6,
    terms: (n) => Array.from({ length: n }, (_, i) => (i + 1) ** 2),
  },
  {
    id: 'sum_odds',
    title: 'Sum of first n odd numbers',
    formula: '1 + 3 + ... + (2n-1) = n²',
    fn: (n) => n * n,
    terms: (n) => Array.from({ length: n }, (_, i) => 2 * i + 1),
  }
];

export const InductionApplications = () => {
  const [n, setN] = useState(5);
  const [exId, setExId] = useState('sum_n');

  const ex = EXAMPLES.find(e => e.id === exId);
  const result = ex.fn(n);
  const terms = ex.terms(n);

  return (
    <motion.div className="glass-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ padding: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '8px' }}>Applications of Induction</h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            Induction is used to prove formulas for sums, products, and divisibility.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {EXAMPLES.map(e => (
            <motion.button key={e.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => setExId(e.id)} style={{ flex: 1, padding: '8px 12px', background: exId === e.id ? 'var(--gold)' : 'var(--bg4)', color: exId === e.id ? 'white' : 'var(--text2)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
              {e.title}
            </motion.button>
          ))}
        </div>

        <MathSlider label="n" min={1} max={15} step={1} value={n} onChange={setN} />

        <motion.div layout style={{ background: 'var(--bg4)', padding: '16px', borderRadius: '12px', textAlign: 'center', borderLeft: '4px solid var(--gold)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '4px' }}>LHS Sum</div>
          <div className="math-font" style={{ color: 'var(--gold)', fontWeight: 'bold' }}>
            {terms.slice(0, 5).join(' + ')}{n > 5 ? ' + ...' : ''} = <span style={{ fontSize: '1.4rem' }}>{result}</span>
          </div>
        </motion.div>

        <FormulaCard title="Identity" formula={ex.formula} />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', background: 'var(--bg2)', padding: '15px', borderRadius: '12px' }}>
          {terms.map((t, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.04 }}
              style={{ padding: '8px 12px', background: 'var(--bg4)', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{ fontSize: '0.6rem', color: 'var(--text3)' }}>i={i + 1}</div>
              <div className="math-font" style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--gold)' }}>{t}</div>
            </motion.div>
          ))}
        </div>
        
        {/* Visual proof area (bars) */}
        <div style={{ height: '150px', display: 'flex', alignItems: 'flex-end', gap: '4px', padding: '10px' }}>
          {terms.map((t, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: (t / Math.max(...terms)) * 130 }}
              style={{ flex: 1, background: 'var(--gold)', borderRadius: '2px', opacity: 0.5 + (i / n) * 0.5 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
