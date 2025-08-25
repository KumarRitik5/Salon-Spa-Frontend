import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">

      {/* Offers Banner */}
      <section className="offers-banner" style={{marginBottom: '2rem', textAlign: 'center'}}>
        <div className="offers-banner-inner" style={{
          display: 'inline-block',
          background: 'linear-gradient(90deg, #ffb347 0%, #ff6b6b 100%)',
          color: 'white',
          padding: '0.8rem 2.5rem',
          borderRadius: '30px',
          fontWeight: 700,
          fontSize: '1.15rem',
          letterSpacing: '1px',
          boxShadow: '0 4px 16px rgba(255,107,107,0.10)',
          animation: 'pulse 1.5s infinite alternate'
        }}>
          🎉 Summer Offer: Get 20% OFF on all spa services! Use code <b>SUMMER20</b>
        </div>
      </section>

      <section className="hero">
        <h1>
          <span className="animated-greeting">Welcome to Salon & Spa</span>
        </h1>
        <p>Experience luxury and relaxation with our premium services</p>
        <Link to="/book" className="cta-button">Book Now</Link>
      </section>

      <section className="features">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">💇‍♀️</div>
            <h3>Hair Styling</h3>
            <p>Expert hair styling and coloring services</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💅</div>
            <h3>Nail Care</h3>
            <p>Professional manicure and pedicure</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💆‍♀️</div>
            <h3>Spa Treatments</h3>
            <p>Relaxing massages and body treatments</p>
          </div>
          <div className="service-card">
            <div className="service-icon">✨</div>
            <h3>Facial Care</h3>
            <p>Rejuvenating facial treatments</p>
          </div>
        </div>
      </section>


      <section className="why-us">
        <h2>Why Choose Us?</h2>
        <div className="benefits">
          <div className="benefit">
            <h3>Professional Staff</h3>
            <p>Experienced and certified professionals</p>
          </div>
          <div className="benefit">
            <h3>Quality Products</h3>
            <p>Premium products for the best results</p>
          </div>
          <div className="benefit">
            <h3>Relaxing Environment</h3>
            <p>Peaceful and comfortable atmosphere</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" style={{margin: '3rem 0'}}>
        <h2 style={{textAlign: 'center', color: '#ff6b6b', fontWeight: 700, marginBottom: '2rem'}}>What Our Clients Say</h2>
        <div className="testimonials-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem'}}>
          <div className="testimonial-card" style={{background: 'white', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem', textAlign: 'center'}}>
            <div style={{fontSize: '2.2rem', marginBottom: '0.7rem'}}>🌟</div>
            <p style={{fontStyle: 'italic', color: '#666'}}>"Absolutely loved the spa experience! The staff was so friendly and professional. Highly recommended!"</p>
            <div style={{marginTop: '1rem', fontWeight: 600, color: '#ff6b6b'}}>Priya Sharma</div>
          </div>
          <div className="testimonial-card" style={{background: 'white', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem', textAlign: 'center'}}>
            <div style={{fontSize: '2.2rem', marginBottom: '0.7rem'}}>🌟</div>
            <p style={{fontStyle: 'italic', color: '#666'}}>"Best salon in town! The ambiance is so relaxing and the services are top-notch."</p>
            <div style={{marginTop: '1rem', fontWeight: 600, color: '#ff6b6b'}}>Rahul Verma</div>
          </div>
          <div className="testimonial-card" style={{background: 'white', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem', textAlign: 'center'}}>
            <div style={{fontSize: '2.2rem', marginBottom: '0.7rem'}}>🌟</div>
            <p style={{fontStyle: 'italic', color: '#666'}}>"I booked a facial and it was amazing! Will definitely come back again."</p>
            <div style={{marginTop: '1rem', fontWeight: 600, color: '#ff6b6b'}}>Simran Kaur</div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
