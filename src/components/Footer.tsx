import React from 'react';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--bg-color)', padding: '50px 5%', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'center', transition: 'background-color 0.5s ease, border-color 0.5s ease' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ color: 'var(--text-color)', fontSize: '1.5rem' }}>My Corporate Cars</h3>
        <p>Premium Chauffeur Service in Sydney, Australia.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="tel:+61451002525" style={{ color: 'var(--text-color)', textDecoration: 'underline' }}>+61 451 002 525</a>
          <a href="mailto:zakki@zubs.dev" style={{ color: 'var(--text-color)', textDecoration: 'underline' }}>zakki@zubs.dev</a>
        </div>
        <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} My Corporate Cars. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
