import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  console.log('HomePage component rendering...'); // Debug log
  
  return (
    <div className="home-container">
      <h1 style={{ textAlign: 'center', color: '#ff6b6b', padding: '2rem' }}>
        Welcome to Salon & Spa
      </h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem' }}>
        Experience luxury and relaxation with our premium services
      </p>
      
      <div style={{ textAlign: 'center' }}>
        <Link 
          to="/services" 
          style={{
            background: '#ff6b6b',
            color: 'white',
            padding: '1rem 2rem',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          View Our Services
        </Link>
      </div>

      {/* Simple services preview */}
      <div style={{ margin: '3rem auto', maxWidth: '800px', padding: '0 1rem' }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>Our Services</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💇‍♀️</div>
            <h3 style={{ color: '#ff6b6b', marginBottom: '0.5rem' }}>Hair Styling</h3>
            <p>Expert hair styling and coloring services</p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💅</div>
            <h3 style={{ color: '#ff6b6b', marginBottom: '0.5rem' }}>Nail Care</h3>
            <p>Professional manicure and pedicure</p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💆‍♀️</div>
            <h3 style={{ color: '#ff6b6b', marginBottom: '0.5rem' }}>Spa Treatments</h3>
            <p>Relaxing massages and body treatments</p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
            <h3 style={{ color: '#ff6b6b', marginBottom: '0.5rem' }}>Facial Care</h3>
            <p>Rejuvenating facial treatments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
