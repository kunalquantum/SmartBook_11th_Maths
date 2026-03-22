import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormulaCard } from '../../components/ui/FormulaCard';

export const InductionPrinciple = () => {
  const [n, setN] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fallenCount, setFallenCount] = useState(0);

  const maxDominoes = 12;

  useEffect(() => {
    if (!isAnimating) return;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setFallenCount(count);
      if (count >= maxDominoes) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleStart = () => {
    setFallenCount(0);
    setIsAnimating(true);
  };

  return (
    <motion.div className="glass-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ padding: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>
          <h3 style={{ color: 'var(--teal)', marginBottom: '8px' }}>Principle of Mathematical Induction</h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            Like a row of dominoes: if the first falls (P(1) is true) and each falling domino knocks the next (P(k) ⇒ P(k+1)), then all will fall.
          </p>
        </motion.div>

        <div style={{ background: 'var(--bg4)', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: isAnimating || fallenCount > 0 ? 'var(--teal)' : 'var(--text3)' }}>Step 1: P(1) is true</span>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: fallenCount >= 1 ? 'var(--teal)' : 'var(--bg2)', border: '1px solid var(--border)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: fallenCount > 1 ? 'var(--gold)' : 'var(--text3)' }}>Step 2: P(k) is true</span>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: fallenCount > 1 ? 'var(--gold)' : 'var(--bg2)', border: '1px solid var(--border)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: fallenCount > 2 ? 'var(--coral)' : 'var(--text3)' }}>Step 3: P(k+1) is true</span>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: fallenCount > 2 ? 'var(--coral)' : 'var(--bg2)', border: '1px solid var(--border)' }} />
          </div>
        </div>

        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={handleStart} style={{ padding: '12px', background: 'var(--teal)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
          {isAnimating ? 'Falling...' : 'Start Chain Reaction'}
        </motion.button>

        <FormulaCard title="The Principle" formula="P(1) ∧ (∀k, P(k) → P(k+1)) ⇒ ∀n, P(n)" />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', background: 'var(--bg2)', borderRadius: '16px', border: '1px solid var(--border)', position: 'relative' }}>
        <div style={{ display: 'flex', gap: '15px', padding: '20px', alignItems: 'flex-end' }}>
          {Array.from({ length: maxDominoes }).map((_, i) => {
            const isFallen = i < fallenCount;
            return (
              <motion.div
                key={i}
                animate={{ 
                  rotate: isFallen ? 75 : 0,
                  x: isFallen ? i * 2 : 0,
                }}
                transition={{ type: 'spring', damping: 12, stiffness: 100 }}
                style={{
                  width: '12px',
                  height: '60px',
                  background: isFallen ? 'var(--teal)' : 'var(--bg4)',
                  borderRadius: '3px',
                  boxShadow: isFallen ? '0 0 10px var(--teal)' : 'none',
                  originX: 0.5,
                  originY: 1,
                  position: 'relative',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', fontSize: '8px', color: 'var(--text3)', rotate: isFallen ? -75 : 0 }}>
                  {i + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {fallenCount > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '0.7rem', color: 'var(--teal)', fontWeight: 'bold' }}>
            Proved up to n = {fallenCount}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
