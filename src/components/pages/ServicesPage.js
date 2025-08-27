
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css';

const serviceIcons = [
  '💇‍♂️', // Haircut
  '💅',   // Manicure
  '💆‍♀️', // Facial
  '💆',   // Massage
  '🧖‍♀️', // Spa
  '🧴',   // Skincare
  '💄',   // Makeup
  '🦷',   // Dental
];

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log('Fetching services...'); // Debug log
  const res = await api.get('/api/services');
        console.log('Services fetched successfully:', res.data); // Debug log
        setServices(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load services:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError('Failed to load services.');
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="services-container">
      <h1>Our Services</h1>
      {loading ? (
        <div className="loading">
          <p>Loading services...</p>
          <p style={{fontSize: '14px', color: '#666', marginTop: '10px'}}>
            This may take a moment if the server is starting up...
          </p>
        </div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="service-list">
          {services.length === 0 ? (
            <p>No services available.</p>
          ) : (
            services.map((service, idx) => (
              <div key={service.id || service._id} className="service-card">
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>
                  {serviceIcons[idx % serviceIcons.length]}
                </div>
                <h2>{service.name}</h2>
                <div className="service-description" style={{ marginBottom: 10 }}>
                  {service.description || 'No description available.'}
                </div>
                <div className="service-details">
                  <span className="duration">⏱ {service.duration} min</span>
                  <span className="price">₹{service.price}</span>
                </div>
                <button
                  className="book-button"
                  onClick={() => navigate('/book', { state: { serviceId: service.id || service._id } })}
                >
                  Book Now
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
