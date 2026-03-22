import React, { useState } from 'react';
import { MathSlider } from '../../components/ui/MathSlider';
import { FormulaCard } from '../../components/ui/FormulaCard';

export const SumDifference = () => {
  const [angleA, setAngleA] = useState(45);
  const [angleB, setAngleB] = useState(30);

  const radA = angleA * Math.PI / 180;
  const radB = angleB * Math.PI / 180;

  const sinA = Math.round(Math.sin(radA) * 1000) / 1000;
  const cosA = Math.round(Math.cos(radA) * 1000) / 1000;
  const sinB = Math.round(Math.sin(radB) * 1000) / 1000;
  const cosB = Math.round(Math.cos(radB) * 1000) / 1000;

  const term1 = Math.round((sinA * cosB) * 1000) / 1000;
  const term2 = Math.round((cosA * sinB) * 1000) / 1000;
  const sinSumExp = Math.round((term1 + term2) * 1000) / 1000;
  
  const sinSumActual = Math.round(Math.sin(radA + radB) * 1000) / 1000;

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ color: 'var(--indigo)', marginBottom: '8px' }}>Sum of Angles</h3>
        <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
          Explore the compound angle formula: sin(A + B) = sin A cos B + cos A sin B
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <MathSlider label="Angle A (θ)" min={0} max={90} value={angleA} onChange={setAngleA} unit="°" />
        <MathSlider label="Angle B (φ)" min={0} max={90} value={angleB} onChange={setAngleB} unit="°" />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        <FormulaCard 
          title={`Step 1: Calculate individual terms`}
          formula={`sin(${angleA}°) = ${sinA}, cos(${angleB}°) = ${cosB}`}
          description={`cos(${angleA}°) = ${cosA}, sin(${angleB}°) = ${sinB}`}
        />
        <FormulaCard 
          title="Step 2: Apply Formula (sin A cos B + cos A sin B)"
          formula={`(${sinA})(${cosB}) + (${cosA})(${sinB})`}
          description={`${term1} + ${term2} = ${sinSumExp}`}
        />
        <FormulaCard 
          title={`Step 3: Verify with actual sin(${angleA + angleB}°)`}
          formula={`sin(${angleA + angleB}°) = ${sinSumActual}`}
          description={Math.abs(sinSumActual - sinSumExp) < 0.05 ? "Matches perfectly!" : "Matches within rounding error."}
        />
      </div>
    </div>
  );
};
