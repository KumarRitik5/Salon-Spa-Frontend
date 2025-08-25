
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
        const res = await axios.get('http://localhost:5000/services');
        setServices(res.data);
        setLoading(false);
      } catch (err) {
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
        <div className="loading">Loading services...</div>
      ) : error ? (
        <div className="error">{error}</div>
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