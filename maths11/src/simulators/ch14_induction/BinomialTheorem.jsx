import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MathSlider } from '../../components/ui/MathSlider';
import { FormulaCard } from '../../components/ui/FormulaCard';

export const BinomialTheorem = () => {
  const [n, setN] = useState(4);
  const [a, setA] = useState('x');
  const [b, setB] = useState('y');

  const factorial = (num) => {
    if (num <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  const nCr = (nn, rr) => factorial(nn) / (factorial(rr) * factorial(nn - rr));

  const expansion = [];
  for (let k = 0; k <= n; k++) {
    const coeff = nCr(n, k);
    const aPow = n - k;
    const bPow = k;
    expansion.push({ coeff, aPow, bPow });
  }

  return (
    <motion.div className="glass-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ padding: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>
          <h3 style={{ color: 'var(--coral)', marginBottom: '8px' }}>Binomial Theorem</h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            Expands <strong>(a + b)ⁿ</strong> into a sum involving terms like <strong>nCr · aⁿ⁻ʳ · bʳ</strong>.
          </p>
        </motion.div>

        <MathSlider label="Power (n)" min={0} max={8} step={1} value={n} onChange={setN} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ background: 'var(--bg4)', padding: '8px', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text3)' }}>Term a</span>
            <input value={a} onChange={e => setA(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', fontSize: '1.1rem', textAlign: 'center' }} />
          </div>
          <div style={{ background: 'var(--bg4)', padding: '8px', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text3)' }}>Term b</span>
            <input value={b} onChange={e => setB(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', fontSize: '1.1rem', textAlign: 'center' }} />
          </div>
        </div>

        <motion.div layout style={{ background: 'var(--bg4)', padding: '16px', borderRadius: '12px', textAlign: 'center', borderLeft: '4px solid var(--coral)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '8px' }}>Expansion of ({a} + {b})^{n}</div>
          <div className="math-font" style={{ fontSize: '0.95rem', color: 'white', lineHeight: '1.6', overflowX: 'auto', padding: '5px' }}>
            {expansion.map((item, i) => (
              <span key={i}>
                {item.coeff > 1 ? item.coeff : ''}
                {item.aPow > 0 ? (item.aPow === 1 ? a : `${a}<sup>${item.aPow}</sup>`) : ''}
                {item.bPow > 0 ? (item.bPow === 1 ? b : `${b}<sup>${item.bPow}</sup>`) : ''}
                {i < expansion.length - 1 ? ' + ' : ''}
              </span>
            ))}
          </div>
        </motion.div>

        <FormulaCard title="General Term" formula="Tᵣ₊₁ = ⁿCᵣ · aⁿ⁻ʳ · bʳ" />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
        {/* Pascal's Triangle (Visualizing coeffs) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          {Array.from({ length: Math.min(n + 2, 8) }).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '6px' }}>
              {Array.from({ length: i + 1 }).map((_, j) => {
                const isActiveRow = i === n;
                return (
                  <motion.div
                    key={j}
                    animate={{ scale: isActiveRow ? 1.15 : 1, backgroundColor: isActiveRow ? 'var(--coral)' : 'var(--bg4)', opacity: i > n ? 0.3 : 1 }}
                    style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.7rem', color: isActiveRow ? 'white' : 'var(--text3)', border: '1px solid var(--border)' }}
                  >
                    {nCr(i, j)}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text3)', textAlign: 'center', marginTop: '10px' }}>
          The coefficients match row {n} of Pascal's Triangle
        </div>
      </motion.div>
    </motion.div>
  );
};
