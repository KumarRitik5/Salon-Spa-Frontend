
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookAppointmentPage.css';

const BookAppointmentPage = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const navigate = useNavigate();

  // Fetches services when the component loads
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/services');
        setServices(res.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  // Fetch available slots when service or date changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedService || !selectedDate) {
        setAvailableSlots([]);
        return;
      }
      setLoadingSlots(true);
      try {
        // Example slots
        const allSlots = [
          '09:00 AM - 10:00 AM',
          '10:00 AM - 11:00 AM',
          '11:00 AM - 12:00 PM',
          '12:00 PM - 01:00 PM',
          '01:00 PM - 02:00 PM',
          '02:00 PM - 03:00 PM',
          '03:00 PM - 04:00 PM',
          '04:00 PM - 05:00 PM',
        ];
        // Fetch booked slots for this service and date
        const res = await axios.get(`http://localhost:5000/appointments?serviceId=${selectedService}&date=${selectedDate}`);
        const bookedSlots = res.data.map(app => app.slot);
        const freeSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
        setAvailableSlots(freeSlots);
      } catch (err) {
        setAvailableSlots([]);
      }
      setLoadingSlots(false);
    };
    fetchSlots();
  }, [selectedService, selectedDate]);

  const handleBooking = async (e) => {
    e.preventDefault();
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      alert('You must be logged in to book an appointment.');
      return;
    }
    try {
      // Find the selected service details
      const service = services.find(s => (s.id || s._id).toString() === selectedService.toString());
      if (!service) {
        alert('Invalid service selected.');
        return;
      }
      const newAppointment = {
        userId: user.id,
        serviceId: selectedService,
        serviceName: service.name,
        price: service.price,
        date: selectedDate,
        slot: selectedSlot,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      await axios.post('http://localhost:5000/appointments', newAppointment);
      alert('Appointment request sent! Await confirmation from the owner.');
      navigate('/my-appointments');
    } catch (err) {
      console.error('Booking error:', err);
      alert('Booking failed. Please try again.');
    }
  };

  // Helper: get today's date in yyyy-mm-dd
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className='booking-container'>
      <h1>Book an Appointment</h1>
      <form onSubmit={handleBooking}>
        <div className='form-group'>
          <label>Select Service:</label>
          <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} required>
            <option value=''>-- Choose a service --</option>
            {services.map((service) => (
              <option key={service.id || service._id} value={service.id || service._id}>
                {service.name} (₹{service.price})
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label>Select Date:</label>
          <input
            type='date'
            value={selectedDate}
            min={getToday()}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Select Time Slot:</label>
          {loadingSlots ? (
            <div>Loading slots...</div>
          ) : (
            <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} required disabled={!selectedDate || !selectedService}>
              <option value=''>-- Choose a slot --</option>
              {availableSlots.length === 0 && selectedDate && selectedService ? (
                <option value='' disabled>No slots available</option>
              ) : (
                availableSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))
              )}
            </select>
          )}
        </div>
        <button type='submit' disabled={!selectedService || !selectedDate || !selectedSlot}>Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookAppointmentPage;