import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookAppointmentPage.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const BookAppointmentPage = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [allTimeSlots, setAllTimeSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const navigate = useNavigate();

  // Fetches services when the component loads
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_URL}/services`);
        setServices(res.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  // Generate time slots for the selected date
  const generateTimeSlots = () => {
    const slots = [];
    const startTime = 9; // 9 AM
    const endTime = 18; // 6 PM

    for (let hour = startTime; hour < endTime; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots;
  };

  // Check if time slot is available
  const isSlotAvailable = (slot) => {
    return !allTimeSlots.some(appointment => 
      appointment.time === slot && appointment.date === selectedDate
    );
  };

  // Handle date change and fetch booked slots
  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedSlot('');
    setLoadingSlots(true);

    try {
      const res = await axios.get(`${API_URL}/appointments?date=${date}`);
      setAllTimeSlots(res.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAllTimeSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedService || !selectedDate || !selectedSlot) {
      alert('Please fill in all fields.');
      return;
    }

    const newAppointment = {
      service: selectedService,
      date: selectedDate,
      time: selectedSlot,
      status: 'pending',
      userId: 'user123', // This would come from auth context
      customerName: 'Customer Name', // This would come from auth context
      createdAt: new Date().toISOString()
    };

    try {
      await axios.post(`${API_URL}/appointments`, newAppointment);
      alert('Appointment request sent! Await confirmation from the owner.');
      navigate('/my-appointments');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="book-appointment-container">
      <h1>Book an Appointment</h1>
      
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="service">Select Service:</label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="">Choose a service...</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name} - ₹{service.price} ({service.duration} min)
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        {selectedDate && (
          <div className="form-group">
            <label>Select Time Slot:</label>
            {loadingSlots ? (
              <p>Loading available slots...</p>
            ) : (
              <div className="time-slots">
                {generateTimeSlots().map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`time-slot ${selectedSlot === slot ? 'selected' : ''} ${
                      !isSlotAvailable(slot) ? 'unavailable' : ''
                    }`}
                    onClick={() => isSlotAvailable(slot) && setSelectedSlot(slot)}
                    disabled={!isSlotAvailable(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <button type="submit" className="book-button" disabled={!selectedService || !selectedDate || !selectedSlot}>
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointmentPage;
