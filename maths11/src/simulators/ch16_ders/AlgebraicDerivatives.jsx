import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MathSlider } from '../../components/ui/MathSlider';
import { FormulaCard } from '../../components/ui/FormulaCard';

export const AlgebraicDerivatives = () => {
  const [n, setN] = useState(3);
  const [uVal, setUVal] = useState(5);
  const [vVal, setVVal] = useState(2);
  const [rule, setRule] = useState('power');

  const rules = [
    { id: 'power', label: 'Power Rule', formula: 'd/dx(xⁿ) = n·xⁿ⁻¹', result: `${n}x${n > 1 ? `<sup>${n - 1}</sup>` : ''}` },
    { id: 'sum', label: 'Sum Rule', formula: 'd/dx(u+v) = u\' + v\'', result: "u' + v'" },
    { id: 'product', label: 'Product Rule', formula: 'd/dx(uv) = uv\' + vu\'', result: "uv' + vu'" },
    { id: 'quotient', label: 'Quotient Rule', formula: 'd/dx(u/v) = (vu\' - uv\')/v²', result: "vu' - uv' / v²" },
  ];

  const activeRule = rules.find(r => r.id === rule);

  return (
    <motion.div className="glass-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ padding: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>
          <h3 style={{ color: 'var(--coral)', marginBottom: '8px' }}>Algebraic Derivatives</h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            Standard rules for differentiating algebraic combinations of functions.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {rules.map(r => (
            <motion.button key={r.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => setRule(r.id)} style={{ padding: '8px', background: rule === r.id ? 'var(--coral)' : 'var(--bg4)', color: rule === r.id ? 'white' : 'var(--text2)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
              {r.label}
            </motion.button>
          ))}
        </div>

        {rule === 'power' ? (
          <MathSlider label="Exponent n" min={-5} max={10} step={1} value={n} onChange={setN} />
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <MathSlider label="u" min={1} max={10} step={1} value={uVal} onChange={setUVal} style={{ flex: 1 }} />
            <MathSlider label="v" min={1} max={10} step={1} value={vVal} onChange={setVVal} style={{ flex: 1 }} />
          </div>
        )}

        <motion.div layout style={{ background: 'var(--bg4)', padding: '20px', borderRadius: '16px', textAlign: 'center', borderLeft: '4px solid var(--coral)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '8px' }}>Derivative Result</div>
          <div className="math-font" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--coral)' }} dangerouslySetInnerHTML={{ __html: activeRule.result }} />
        </motion.div>

        <FormulaCard title="Formula" formula={activeRule.formula} />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center', background: 'var(--bg2)', borderRadius: '16px', border: '1px solid var(--border)', padding: '20px' }}>
        <div style={{ textAlign: 'center', color: 'var(--text2)' }}>
          {rule === 'power' ? (
            <div className="math-font" style={{ fontSize: '2.5rem' }}>
              d/dx(x<sup>{n}</sup>) = {n}x<sup>{n - 1}</sup>
            </div>
          ) : (
            <div style={{ fontSize: '1.2rem' }}>
              Differentiability and continuity are required for these rules to hold correctly.
            </div>
          )}
        </div>
        <div style={{ width: '100%', padding: '15px', background: 'var(--bg4)', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--text3)' }}>
          <strong>Tip:</strong> The Power Rule works for negative and fractional exponents too! e.g., d/dx(&radic;x) = 1/(2&radic;x).
        </div>
      </motion.div>
    </motion.div>
  );
};
