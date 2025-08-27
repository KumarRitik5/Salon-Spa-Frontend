
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
        // Determine day of week
        const dateObj = new Date(selectedDate);
        const day = dateObj.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        let openHour, closeHour;
        if (day === 0) { // Sunday
          openHour = 10;
          closeHour = 17;
        } else if (day === 6) { // Saturday
          openHour = 9;
          closeHour = 18;
        } else { // Mon-Fri
          openHour = 9;
          closeHour = 20;
        }
        // Get selected service duration in minutes
        const service = services.find(s => (s.id || s._id).toString() === selectedService.toString());
        const duration = service && service.duration ? parseInt(service.duration) : 60;
        // Generate slots based on duration
        const allSlots = [];
        const startTime = new Date(dateObj);
        startTime.setHours(openHour, 0, 0, 0);
        const endTime = new Date(dateObj);
        endTime.setHours(closeHour, 0, 0, 0);
        const format = (d) => {
          let hour = d.getHours();
          const ampm = hour >= 12 ? 'PM' : 'AM';
          hour = hour % 12;
          if (hour === 0) hour = 12;
          return `${hour.toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} ${ampm}`;
        };
        let slotStart = new Date(startTime);
        const now = new Date();
        while (slotStart.getTime() + duration * 60000 <= endTime.getTime()) {
          const slotEnd = new Date(slotStart.getTime() + duration * 60000);
          // For today, only allow slots after the current time
          let isPast = false;
          if (selectedDate === now.toISOString().split('T')[0]) {
            if (slotStart.getTime() <= now.getTime()) {
              isPast = true;
            }
          }
          allSlots.push({
            value: `${format(slotStart)} - ${format(slotEnd)}`,
            isPast
          });
          slotStart = new Date(slotStart.getTime() + duration * 60000);
        }
        // Fetch booked slots for this service and date
  const res = await axios.get(`http://localhost:5000/appointments?serviceId=${selectedService}&date=${selectedDate}`);
        // Only consider slots as booked if status is not 'completed' or 'cancelled'
        const bookedSlots = res.data.filter(app => app.status !== 'completed' && app.status !== 'cancelled').map(app => app.slot);
        setAvailableSlots(allSlots.map(slotObj => ({
          value: slotObj.value,
          disabled: bookedSlots.includes(slotObj.value) || slotObj.isPast
        })));
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
        createdAt: new Date().toISOString(),
        bookedAt: new Date().toISOString()
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
                availableSlots.map((slotObj) => (
                  <option key={slotObj.value} value={slotObj.value} disabled={slotObj.disabled} style={slotObj.disabled ? { color: '#aaa', background: '#eee' } : {}}>
                    {slotObj.value} {slotObj.disabled ? '(Booked)' : ''}
                  </option>
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