import React from 'react';

export const Factorization = () => {
  const formulae = [
    { title: 'Sum of Sines', eq: 'sin C + sin D = 2 sin( (C+D)/2 ) cos( (C-D)/2 )' },
    { title: 'Difference of Sines', eq: 'sin C - sin D = 2 cos( (C+D)/2 ) sin( (C-D)/2 )' },
    { title: 'Sum of Cosines', eq: 'cos C + cos D = 2 cos( (C+D)/2 ) cos( (C-D)/2 )' },
    { title: 'Difference of Cosines', eq: 'cos C - cos D = -2 sin( (C+D)/2 ) sin( (C-D)/2 )' }
  ];

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ color: 'var(--blue)', marginBottom: '8px' }}>Factorization Formulae</h3>
        <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
          Converting Sum and Difference to Product formats.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {formulae.map((f, i) => (
          <div key={i} style={{ 
            background: 'var(--bg-surface-solid)', 
            padding: '16px', 
            borderRadius: 'var(--radius-sm)',
            borderLeft: '4px solid var(--blue)'
          }}>
            <div style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {f.title}
            </div>
            <div className="math-font" style={{ fontSize: '1.2rem', color: 'var(--text1)' }}>
              {f.eq}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
