import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MathSlider } from '../../components/ui/MathSlider';
import { FormulaCard } from '../../components/ui/FormulaCard';

export const ExpLogLimits = () => {
  const [xVal, setXVal] = useState(0.5);
  
  const f = (x) => x !== 0 ? (Math.pow(Math.E, x) - 1) / x : 1;
  const g = (x) => x > -1 && x !== 0 ? Math.log(1 + x) / x : 1;
  const hFn = (x) => Math.pow(1 + x, 1 / x);

  const valF = f(xVal);
  const valG = g(xVal);
  const valH = hFn(xVal);

  return (
    <motion.div className="glass-panel" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ padding: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h3 style={{ color: 'var(--coral)', marginBottom: '8px' }}>Exponential & Logarithmic Limits</h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            Limits involving <strong>e</strong> and <strong>ln</strong>. Watch how these functions behave near 0.
          </p>
        </motion.div>

        <MathSlider label="x" min={-0.5} max={1} step={0.01} value={xVal} onChange={setXVal} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ background: 'var(--bg4)', padding: '12px', borderRadius: '10px', borderLeft: '3px solid var(--coral)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>(eˣ − 1) / x</span>
            <span className="math-font" style={{ color: 'var(--coral)', fontWeight: 'bold' }}>{valF.toFixed(6)}</span>
          </div>
          <div style={{ background: 'var(--bg4)', padding: '12px', borderRadius: '10px', borderLeft: '3px solid var(--teal)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>ln(1 + x) / x</span>
            <span className="math-font" style={{ color: 'var(--teal)', fontWeight: 'bold' }}>{valG.toFixed(6)}</span>
          </div>
          <div style={{ background: 'var(--bg4)', padding: '12px', borderRadius: '10px', borderLeft: '3px solid var(--gold)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>(1 + x)^(1/x)</span>
            <span className="math-font" style={{ color: 'var(--gold)', fontWeight: 'bold' }}>{valH.toFixed(6)}</span>
          </div>
        </div>

        <FormulaCard title="Core Limits" formula="lim_{x→0} \frac{e^x - 1}{x} = 1, \quad lim_{x→0} (1+x)^{1/x} = e" />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center', background: 'var(--bg2)', borderRadius: '16px', border: '1px solid var(--border)', padding: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginBottom: '5px' }}>Convergence to e ≈ 2.71828</div>
          <div className="math-font" style={{ fontSize: '2.5rem', color: 'var(--gold)', fontWeight: 'bold' }}>{valH.toFixed(5)}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>as x → 0</div>
        </div>
        
        {/* Progress bar towards limit */}
        <div style={{ width: '100%', height: '4px', background: 'var(--bg4)', borderRadius: '2px', overflow: 'hidden' }}>
          <motion.div animate={{ width: `${(1 - Math.abs(xVal)) * 100}%` }} transition={{ type: 'spring' }} style={{ height: '100%', background: 'linear-gradient(90deg, var(--coral), var(--teal))' }} />
        </div>
        <p style={{ color: 'var(--text3)', fontSize: '0.75rem', textAlign: 'center' }}>
          When x is very small, (1+x)^(1/x) definition of 'e' becomes highly accurate.
        </p>
      </motion.div>
    </motion.div>
  );
};
