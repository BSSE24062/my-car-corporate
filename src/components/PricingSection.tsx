import React from 'react';

const PricingSection = () => {
  const plans = [
    { name: "Airport Transfer", price: "From $150", details: "Fixed rate, meet & greet included" },
    { name: "Hourly Charter", price: "$120 / hr", details: "Minimum 3 hours, unlimited stops" },
    { name: "Wedding Package", price: "From $500", details: "Half-day service, red carpet, ribbon" }
  ];

  return (
    <section id="pricing" style={{ padding: '100px 5%', background: 'var(--bg-color)', color: 'var(--text-color)', textAlign: 'center', transition: 'background-color 0.5s ease, color 0.5s ease' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Transparent Pricing</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '50px' }}>Premium service at competitive rates.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          {plans.map((plan, idx) => (
            <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '40px 20px', borderRadius: '12px', border: '1px solid var(--border-color)', transition: 'background-color 0.5s ease, border-color 0.5s ease' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{plan.name}</h3>
              <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>{plan.price}</div>
              <p style={{ color: 'var(--text-muted)' }}>{plan.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
