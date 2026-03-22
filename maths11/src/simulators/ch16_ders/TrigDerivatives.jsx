import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormulaCard } from '../../components/ui/FormulaCard';

export const TrigDerivatives = () => {
  const [func, setFunc] = useState('sin');

  const funcs = [
    { id: 'sin', label: 'sin x', deriv: 'cos x', formula: 'd/dx(sin x) = cos x' },
    { id: 'cos', label: 'cos x', deriv: '-sin x', formula: 'd/dx(cos x) = -sin x' },
    { id: 'tan', label: 'tan x', deriv: 'sec²x', formula: 'd/dx(tan x) = sec²x' },
    { id: 'sec', label: 'sec x', deriv: 'sec x tan x', formula: 'd/dx(sec x) = sec x tan x' },
  ];

  const active = funcs.find(f => f.id === func);

  return (
    <motion.div className="glass-panel" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ padding: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h3 style={{ color: 'var(--teal)', marginBottom: '8px' }}>Trigonometric Derivatives</h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            Derivatives of standard trigonometric functions.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {funcs.map(f => (
            <motion.button key={f.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => setFunc(f.id)} style={{ padding: '10px', background: func === f.id ? 'var(--teal)' : 'var(--bg4)', color: func === f.id ? 'white' : 'var(--text2)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
              {f.label}
            </motion.button>
          ))}
        </div>

        <motion.div layout style={{ background: 'var(--bg4)', padding: '20px', borderRadius: '16px', textAlign: 'center', borderLeft: '4px solid var(--teal)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '8px' }}>Result</div>
          <div className="math-font" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--teal)' }}>
            {active.deriv}
          </div>
        </motion.div>

        <FormulaCard title="Trig Derivative" formula={active.formula} />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center', background: 'var(--bg2)', borderRadius: '16px', border: '1px solid var(--border)', padding: '20px' }}>
        <div style={{ fontSize: '1.2rem', color: 'var(--text2)', textAlign: 'center' }}>
          Circular periodicity means these derivatives follow patterns!
        </div>
        <div style={{ width: '100%', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ padding: '8px 12px', background: 'var(--bg4)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text3)' }}>sin &rarr; cos</div>
          <div style={{ padding: '8px 12px', background: 'var(--bg4)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text3)' }}>cos &rarr; &minus;sin</div>
          <div style={{ padding: '8px 12px', background: 'var(--bg4)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text3)' }}>tan &rarr; sec&sup2;</div>
        </div>
        <p style={{ color: 'var(--text3)', fontSize: '0.8rem', textAlign: 'center' }}>
          Derivatives measure the rate of change. For sin x, the rate of change is cos x.
        </p>
      </motion.div>
    </motion.div>
  );
};
