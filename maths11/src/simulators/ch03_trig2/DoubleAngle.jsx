import React, { useState } from 'react';
import { MathSlider } from '../../components/ui/MathSlider';
import { FormulaCard } from '../../components/ui/FormulaCard';

export const DoubleAngle = () => {
  const [angle, setAngle] = useState(30);
  
  const rad = angle * Math.PI / 180;
  const sinA = Math.round(Math.sin(rad) * 1000) / 1000;
  const cosA = Math.round(Math.cos(rad) * 1000) / 1000;
  
  const sin2A = Math.round(Math.sin(2 * rad) * 1000) / 1000;
  const expSin2A = Math.round((2 * sinA * cosA) * 1000) / 1000;

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ color: 'var(--teal)', marginBottom: '8px' }}>Double Angle Identity</h3>
        <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
          Verify the formula: sin(2A) = 2 sin A cos A
        </p>
      </div>

      <MathSlider label="Angle A (θ)" min={0} max={180} value={angle} onChange={setAngle} unit="°" />
      
      <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        <FormulaCard 
          title="Actual Value"
          formula={`sin(2 × ${angle}°) = sin(${2 * angle}°) = ${sin2A}`}
        />
        <FormulaCard 
          title="Formula Expansion"
          formula={`2 × sin(${angle}°) × cos(${angle}°)`}
          description={`2 × ${sinA} × ${cosA} = ${expSin2A}`}
        />
      </div>
    </div>
  );
};
