import type { CSSProperties } from 'react';

const shellStyle: CSSProperties = {
  display: 'grid',
  gap: '1.5rem',
  padding: '2rem',
  borderRadius: '24px',
  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(30, 41, 59, 0.88))',
  border: '1px solid rgba(148, 163, 184, 0.2)',
  boxShadow: '0 20px 45px rgba(15, 23, 42, 0.45)',
  color: '#e2e8f0',
  maxWidth: '920px',
  margin: '0 auto',
};

const contentStyle: CSSProperties = {
  display: 'grid',
  gap: '0.85rem',
};

const eyebrowStyle: CSSProperties = {
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  fontSize: '0.7rem',
  color: '#8b5cf6',
  fontWeight: 700,
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  lineHeight: 1.1,
};

const bodyStyle: CSSProperties = {
  margin: 0,
  lineHeight: 1.7,
  color: '#cbd5e1',
  fontSize: '1rem',
};

const previewStyle: CSSProperties = {
  position: 'relative',
  minHeight: '260px',
  borderRadius: '20px',
  background: 'radial-gradient(circle at top, rgba(96, 165, 250, 0.22), transparent 35%), linear-gradient(135deg, rgba(14, 116, 144, 0.32), rgba(30, 41, 59, 0.8))',
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
  border: '1px solid rgba(148, 163, 184, 0.18)',
};

const screenStyle: CSSProperties = {
  width: 'min(88%, 520px)',
  minHeight: '180px',
  borderRadius: '18px',
  background: 'rgba(15, 23, 42, 0.72)',
  border: '1px solid rgba(96, 165, 250, 0.2)',
  boxShadow: '0 18px 35px rgba(2, 6, 23, 0.5)',
  padding: '1.25rem',
  display: 'grid',
  alignContent: 'space-between',
};

const statusRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '0.8rem',
  color: '#cbd5e1',
};

const dotStyle: CSSProperties = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: '#34d399',
  boxShadow: '0 0 12px rgba(52, 211, 153, 0.9)',
};

const previewButtonStyle: CSSProperties = {
  border: 'none',
  borderRadius: '999px',
  padding: '0.85rem 1.25rem',
  fontSize: '0.9rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #60a5fa, #8b5cf6)',
  color: '#fff',
  cursor: 'pointer',
  width: 'fit-content',
};

const pulseStyle: CSSProperties = {
  width: '90px',
  height: '90px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4), rgba(96, 165, 250, 0.06) 55%, transparent 70%)',
  margin: '0 auto',
  animation: 'pulse 2.5s infinite ease-in-out',
};

const metaStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'end',
  gap: '1rem',
};

export default function IntroVideo() {
  return (
    <section style={shellStyle}>
      <div style={contentStyle}>
        <p style={eyebrowStyle}>Launch experience</p>
        <h2 style={titleStyle}>AI Array System</h2>
        <p style={bodyStyle}>
          Voice-driven workflows, image-rich search, deep research tooling, and specialized labs that turn
          complex AI tasks into clear, actionable outcomes.
        </p>
        <button type="button" style={previewButtonStyle}>
          Start exploring
        </button>
      </div>

      <div style={previewStyle} aria-label="AI Array preview screen">
        <div style={screenStyle}>
          <div style={statusRowStyle}>
            <span>Live system</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={dotStyle} />
              Online
            </span>
          </div>

          <div style={pulseStyle} />

          <div style={metaStyle}>
            <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Voice + vision</span>
            <strong style={{ fontSize: '1.1rem' }}>Research mode</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
