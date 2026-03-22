import React, { useState } from 'react';
import { GraphCanvas, HtmlLabel } from '../../components/ui/GraphCanvas';
import { MathSlider } from '../../components/ui/MathSlider';
import { FormulaCard } from '../../components/ui/FormulaCard';

const FocusSVG = ({ mapX, mapY, conic, variant, param, isSvg }) => {
  if (!isSvg || !mapX || !mapY) return null;

  const points = [];
  const steps = 200;

  if (conic === 'parabola') {
    const a = param;
    for (let i = -steps; i <= steps; i++) {
      const t = (i / steps) * 8;
      let x, y;
      if (variant === 0) { y = t; x = t * t / (4 * a); }       // y²=4ax (right)
      else if (variant === 1) { y = t; x = -t * t / (4 * a); }  // y²=−4ax (left)
      else if (variant === 2) { x = t; y = t * t / (4 * a); }   // x²=4ay (up)
      else { x = t; y = -t * t / (4 * a); }                     // x²=−4ay (down)
      if (Math.abs(x) <= 9.5 && Math.abs(y) <= 9.5) points.push([x, y]);
    }
  } else if (conic === 'ellipse') {
    const a = param;
    const b = param * 0.6;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * 2 * Math.PI;
      let x, y;
      if (variant === 0) { x = a * Math.cos(t); y = b * Math.sin(t); }  // x-major
      else { x = b * Math.cos(t); y = a * Math.sin(t); }                // y-major
      points.push([x, y]);
    }
  } else {
    const a = param;
    const b = param * 0.7;
    // Draw both branches
    for (let i = -steps / 2; i <= steps / 2; i++) {
      const t = (i / (steps / 2)) * 1.2;
      const secT = 1 / Math.cos(t);
      const tanT = Math.tan(t);
      let x, y;
      if (variant === 0) { x = a * secT; y = b * tanT; }  // x-axis
      else { x = b * tanT; y = a * secT; }                 // y-axis
      if (Math.abs(x) <= 9.5 && Math.abs(y) <= 9.5) points.push([x, y]);
    }
    // Left / bottom branch
    for (let i = -steps / 2; i <= steps / 2; i++) {
      const t = (i / (steps / 2)) * 1.2;
      const secT = 1 / Math.cos(t);
      const tanT = Math.tan(t);
      let x, y;
      if (variant === 0) { x = -a * secT; y = -b * tanT; }
      else { x = -b * tanT; y = -a * secT; }
      if (Math.abs(x) <= 9.5 && Math.abs(y) <= 9.5) points.push([x, y]);
    }
  }

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${mapX(p[0])} ${mapY(p[1])}`).join(' ');
  
  // Focus positions
  let foci = [];
  if (conic === 'parabola') {
    const a = param;
    if (variant === 0) foci = [[a, 0]];
    else if (variant === 1) foci = [[-a, 0]];
    else if (variant === 2) foci = [[0, a]];
    else foci = [[0, -a]];
  } else if (conic === 'ellipse') {
    const a = param;
    const b = param * 0.6;
    const c = Math.sqrt(a * a - b * b);
    if (variant === 0) foci = [[c, 0], [-c, 0]];
    else foci = [[0, c], [0, -c]];
  } else {
    const a = param;
    const b = param * 0.7;
    const c = Math.sqrt(a * a + b * b);
    if (variant === 0) foci = [[c, 0], [-c, 0]];
    else foci = [[0, c], [0, -c]];
  }

  // Directrix for parabola
  let dirLine = null;
  if (conic === 'parabola') {
    const a = param;
    if (variant === 0) dirLine = <line x1={mapX(-a)} y1={mapY(-10)} x2={mapX(-a)} y2={mapY(10)} stroke="var(--text3)" strokeWidth="1.5" strokeDasharray="5 3" />;
    else if (variant === 1) dirLine = <line x1={mapX(a)} y1={mapY(-10)} x2={mapX(a)} y2={mapY(10)} stroke="var(--text3)" strokeWidth="1.5" strokeDasharray="5 3" />;
    else if (variant === 2) dirLine = <line x1={mapX(-10)} y1={mapY(-a)} x2={mapX(10)} y2={mapY(-a)} stroke="var(--text3)" strokeWidth="1.5" strokeDasharray="5 3" />;
    else dirLine = <line x1={mapX(-10)} y1={mapY(a)} x2={mapX(10)} y2={mapY(a)} stroke="var(--text3)" strokeWidth="1.5" strokeDasharray="5 3" />;
  }

  const color = conic === 'parabola' ? 'var(--coral)' : conic === 'ellipse' ? 'var(--teal)' : 'var(--blue)';

  return (
    <g>
      {dirLine}
      <path d={pathD} fill="none" stroke={color} strokeWidth="3" />
      {foci.map((f, i) => (
        <circle key={i} cx={mapX(f[0])} cy={mapY(f[1])} r={5} fill="var(--coral)" />
      ))}
      <circle cx={mapX(0)} cy={mapY(0)} r={3} fill="white" />
    </g>
  );
};

const VARIANTS = {
  parabola: [
    { label: 'y² = 4ax', desc: 'Opens right' },
    { label: 'y² = −4ax', desc: 'Opens left' },
    { label: 'x² = 4ay', desc: 'Opens up' },
    { label: 'x² = −4ay', desc: 'Opens down' },
  ],
  ellipse: [
    { label: 'x²/a² + y²/b² = 1', desc: 'Major axis along x' },
    { label: 'x²/b² + y²/a² = 1', desc: 'Major axis along y' },
  ],
  hyperbola: [
    { label: 'x²/a² − y²/b² = 1', desc: 'Transverse along x' },
    { label: 'y²/a² − x²/b² = 1', desc: 'Transverse along y' },
  ],
};

export const FocusEquations = () => {
  const [conic, setConic] = useState('parabola');
  const [variant, setVariant] = useState(0);
  const [param, setParam] = useState(2);

  const variants = VARIANTS[conic];

  const handleConicChange = (c) => {
    setConic(c);
    setVariant(0);
  };

  // Build focus description
  let focusText = '';
  if (conic === 'parabola') {
    const a = param.toFixed(1);
    if (variant === 0) focusText = `Focus: (${a}, 0)  |  Directrix: x = −${a}`;
    else if (variant === 1) focusText = `Focus: (−${a}, 0)  |  Directrix: x = ${a}`;
    else if (variant === 2) focusText = `Focus: (0, ${a})  |  Directrix: y = −${a}`;
    else focusText = `Focus: (0, −${a})  |  Directrix: y = ${a}`;
  } else if (conic === 'ellipse') {
    const a = param;
    const b = param * 0.6;
    const c = Math.sqrt(a * a - b * b).toFixed(2);
    const e = (Math.sqrt(a * a - b * b) / a).toFixed(3);
    focusText = variant === 0 ? `Foci: (±${c}, 0)  |  e = ${e}` : `Foci: (0, ±${c})  |  e = ${e}`;
  } else {
    const a = param;
    const b = param * 0.7;
    const c = Math.sqrt(a * a + b * b).toFixed(2);
    const e = (Math.sqrt(a * a + b * b) / a).toFixed(3);
    focusText = variant === 0 ? `Foci: (±${c}, 0)  |  e = ${e}` : `Foci: (0, ±${c})  |  e = ${e}`;
  }

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h3 style={{ color: 'var(--blue)', marginBottom: '8px' }}>Standard Equations & Focus</h3>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            Explore all standard forms of each conic. See how the orientation changes the focus and directrix positions.
          </p>
        </div>

        {/* Conic type tabs */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['parabola', 'ellipse', 'hyperbola'].map(c => (
            <button key={c} onClick={() => handleConicChange(c)} style={{ flex: 1, padding: '10px', background: conic === c ? (c === 'parabola' ? 'var(--coral)' : c === 'ellipse' ? 'var(--teal)' : 'var(--blue)') : 'var(--bg4)', color: conic === c ? 'white' : 'var(--text2)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, textTransform: 'capitalize' }}>
              {c}
            </button>
          ))}
        </div>

        {/* Variant selector */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${variants.length > 2 ? 2 : variants.length}, 1fr)`, gap: '6px' }}>
          {variants.map((v, i) => (
            <button key={i} onClick={() => setVariant(i)} style={{ padding: '10px 8px', background: variant === i ? 'rgba(255,255,255,0.1)' : 'var(--bg4)', color: variant === i ? 'white' : 'var(--text3)', border: variant === i ? '1px solid var(--border2)' : '1px solid transparent', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'center' }}>
              <div className="math-font" style={{ fontWeight: 600 }}>{v.label}</div>
              <div style={{ fontSize: '0.7rem', marginTop: '2px', opacity: 0.7 }}>{v.desc}</div>
            </button>
          ))}
        </div>

        <MathSlider label="Parameter (a)" min={1} max={5} step={0.5} value={param} onChange={setParam} />

        <FormulaCard 
          title="Current Form"
          formula={variants[variant].label.replace(/a/g, param.toFixed(1)).replace(/b/g, conic === 'ellipse' ? (param * 0.6).toFixed(1) : (param * 0.7).toFixed(1))}
          description={focusText}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <GraphCanvas width={340} height={340} domain={[-10, 10]} range={[-10, 10]}>
          <FocusSVG isSvg conic={conic} variant={variant} param={param} />
          <HtmlLabel isHtml x={0} y={-8.5} style={{ color: 'white', fontWeight: 'bold', fontSize: '0.85rem' }}>
            {variants[variant].desc}
          </HtmlLabel>
        </GraphCanvas>
      </div>
    </div>
  );
};
