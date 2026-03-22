import React, { useState } from 'react';
import { GraphCanvas } from '../components/ui/GraphCanvas';
import { MathSlider } from '../components/ui/MathSlider';
import { FormulaCard } from '../components/ui/FormulaCard';
import { ValueCard } from '../components/ui/ValueCard';
import { Activity, Waves } from 'lucide-react';

// Chapter 3: Trigonometric Functions Simulator
const TrigSimulator = () => {
  const [amplitude, setAmplitude] = useState(1);
  const [frequency, setFrequency] = useState(1);
  const [phase, setPhase] = useState(0);

  const drawTrig = (ctx, { w, h, mapX, mapY, domain }) => {
    ctx.strokeStyle = 'var(--accent)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = domain[0]; x <= domain[1]; x += 0.05) {
      const px = mapX(x);
      // y = A * sin(B * x + C)
      const y = amplitude * Math.sin(frequency * x + phase);
      const py = mapY(y);
      if (x === domain[0]) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '32px' }}>
      <div>
        <GraphCanvas 
          width={500} height={300} 
          domain={[-2 * Math.PI, 2 * Math.PI]} 
          range={[-3, 3]} 
          drawFunction={drawTrig} 
        />
        <div style={{ marginTop: '24px' }}>
          <FormulaCard 
            title="General Sine Wave"
            formula={`y = ${amplitude.toFixed(1)} \\sin(${frequency.toFixed(1)}x ${phase >= 0 ? '+' : '-'} ${Math.abs(phase).toFixed(1)})`}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>Parameters</h3>
        <MathSlider label="Amplitude (A)" min={0.1} max={3} step={0.1} value={amplitude} onChange={setAmplitude} />
        <MathSlider label="Frequency (B)" min={0.5} max={5} step={0.1} value={frequency} onChange={setFrequency} />
        <MathSlider label="Phase (C)" min={-Math.PI} max={Math.PI} step={0.1} value={phase} onChange={setPhase} />
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <ValueCard label="Period" value={(2 * Math.PI / frequency).toFixed(2)} icon={Waves} color="var(--info)" />
          <ValueCard label="Max Height" value={amplitude.toFixed(2)} icon={Activity} color="var(--accent)" />
        </div>
      </div>
    </div>
  );
};

// Map chapter to Simulator
export const Simulators = {
  '3': TrigSimulator,
  // More can be added here
};
