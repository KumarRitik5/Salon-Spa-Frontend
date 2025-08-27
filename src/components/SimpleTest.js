import React from 'react';

const SimpleTest = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉 Salon & Spa</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Your Beauty Destination</p>
      <div style={{
        background: 'rgba(255,255,255,0.2)',
        padding: '1rem 2rem',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)'
      }}>
        <p>Site is loading... Please wait!</p>
      </div>
    </div>
  );
};

export default SimpleTest;
