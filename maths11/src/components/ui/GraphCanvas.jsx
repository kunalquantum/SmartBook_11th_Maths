import React, { useRef, useEffect } from 'react';

export const GraphCanvas = ({ 
  width = 400, 
  height = 400, 
  domain = [-10, 10], 
  range = [-10, 10], 
  drawFunction 
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Helpers to map coordinates
    const mapX = (x) => ((x - domain[0]) / (domain[1] - domain[0])) * w;
    const mapY = (y) => h - ((y - range[0]) / (range[1] - range[0])) * h;
    const unmapX = (px) => domain[0] + (px / w) * (domain[1] - domain[0]);

    // Clear canvas
    ctx.clearRect(0, 0, w, h);

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    // Vertical grid lines
    for (let x = Math.ceil(domain[0]); x <= Math.floor(domain[1]); x++) {
      const px = mapX(x);
      ctx.moveTo(px, 0);
      ctx.lineTo(px, h);
    }
    
    // Horizontal grid lines
    for (let y = Math.ceil(range[0]); y <= Math.floor(range[1]); y++) {
      const py = mapY(y);
      ctx.moveTo(0, py);
      ctx.lineTo(w, py);
    }
    ctx.stroke();

    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // X-axis
    const y0 = mapY(0);
    if (y0 >= 0 && y0 <= h) {
      ctx.moveTo(0, y0);
      ctx.lineTo(w, y0);
    }
    // Y-axis
    const x0 = mapX(0);
    if (x0 >= 0 && x0 <= w) {
      ctx.moveTo(x0, 0);
      ctx.lineTo(x0, h);
    }
    ctx.stroke();

    // Custom drawing
    if (drawFunction) {
      drawFunction(ctx, { w, h, mapX, mapY, unmapX, domain, range });
    }
  }, [width, height, domain, range, drawFunction]);

  return (
    <div className="glass-panel" style={{ display: 'inline-block', padding: '16px', borderRadius: 'var(--radius-lg)' }}>
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height} 
        style={{ 
          background: 'var(--bg-surface-solid)', 
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
        }}
      />
    </div>
  );
};
