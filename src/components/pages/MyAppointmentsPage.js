
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';


const MyAppointmentsPage = () => {
  const { deactivateAccount } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [feedbackStars, setFeedbackStars] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [activeAppId, setActiveAppId] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      // Get user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        // Fetch appointments for this user
        const res = await axios.get(`http://localhost:5000/appointments?userId=${user.id}`);
        setAppointments(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }



  // Open cancel modal
  const openCancelModal = (id) => {
    setActiveAppId(id);
    setCancelReason('');
    setShowCancelModal(true);
  };

  // Open feedback modal
  const openFeedbackModal = (id) => {
    setActiveAppId(id);
    setFeedbackStars(0);
    setFeedbackText('');
    setShowFeedbackModal(true);
  };

  // Submit cancellation
  const submitCancel = async () => {
    if (!cancelReason) {
      alert('Cancellation reason is required.');
      return;
    }
    try {
      await axios.patch(`http://localhost:5000/appointments/${activeAppId}`, { status: 'cancelled', cancellationReason: cancelReason });
      setAppointments((prev) => prev.map(app => app.id === activeAppId ? { ...app, status: 'cancelled', cancellationReason: cancelReason } : app));
      setShowCancelModal(false);
    } catch (err) {
      alert('Failed to cancel appointment.');
    }
  };

  // Submit feedback
  const submitFeedback = async () => {
    if (feedbackStars === 0 || !feedbackText) {
      alert('Please provide a star rating and feedback.');
      return;
    }
    try {
      await axios.patch(`http://localhost:5000/appointments/${activeAppId}`, { status: 'completed', feedback: feedbackText, stars: feedbackStars });
      setAppointments((prev) => prev.map(app => app.id === activeAppId ? { ...app, status: 'completed', feedback: feedbackText, stars: feedbackStars } : app));
      setShowFeedbackModal(false);
    } catch (err) {
      alert('Failed to mark appointment as completed.');
    }
  };



  return (
    <div>
      <h1>My Appointments</h1>
      <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to deactivate your account? This will log you out and disable your login.')) {
              deactivateAccount();
            }
          }}
          style={{
            background: '#ff3333',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem 1.2rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '1rem',
            boxShadow: '0 2px 8px #ff333322'
          }}
        >
          Deactivate Account
        </button>
      </div>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((app) => (
            <li key={app.id || app._id} style={{ marginBottom: '2rem', border: '1px solid #eee', borderRadius: '10px', padding: '1rem', background: '#fffbe6' }}>
              <p>Service: {app.serviceName || (app.service && app.service.name)}</p>
              <p>Date: {app.date ? new Date(app.date).toLocaleDateString() : ''}</p>
              <p>Slot: {app.slot}</p>
              <p>Status: <span style={{ color: app.status === 'cancelled' ? '#ff3333' : app.status === 'completed' ? '#00875a' : '#ff6b6b', fontWeight: 600 }}>{app.status}</span></p>
              {app.price && (
                <p>Price: ₹{app.price}</p>
              )}
              {app.status === 'completed' && (app.stars || app.feedback) && (
                <div style={{ margin: '0.5rem 0' }}>
                  <strong>Feedback:</strong>
                  <span style={{ marginLeft: 8 }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: i < (app.stars || 0) ? '#FFD700' : '#ccc', fontSize: '1.2em' }}>★</span>
                    ))}
                  </span>
                  <div style={{ marginTop: 4 }}>{app.feedback}</div>
                </div>
              )}
              {app.status === 'cancelled' && app.cancellationReason && (
                <p><strong>Cancellation Reason:</strong> {app.cancellationReason}</p>
              )}
              {app.status === 'confirmed' && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                  <button onClick={() => openCancelModal(app.id)} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                  <button onClick={() => openFeedbackModal(app.id)} style={{ background: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Mark as Completed</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no appointments booked yet.</p>
      )}
      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: 12, padding: '2rem', minWidth: 320, boxShadow: '0 4px 32px #0002', textAlign: 'center' }}>
            <h2 style={{ color: '#4CAF50', marginBottom: 16 }}>Rate Your Experience</h2>
            <div style={{ marginBottom: 16 }}>
              {[1,2,3,4,5].map((star) => (
                <span
                  key={star}
                  style={{ fontSize: '2em', color: feedbackStars >= star ? '#FFD700' : '#ccc', cursor: 'pointer', marginRight: 4 }}
                  onClick={() => setFeedbackStars(star)}
                >★</span>
              ))}
            </div>
            <textarea
              rows={4}
              style={{ width: '100%', borderRadius: 6, border: '1px solid #ddd', padding: 8, marginBottom: 16 }}
              placeholder="Write your feedback..."
              value={feedbackText}
              onChange={e => setFeedbackText(e.target.value)}
            />
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={submitFeedback} style={{ background: '#4CAF50', color: 'white', border: 'none', borderRadius: 6, padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}>Submit</button>
              <button onClick={() => setShowFeedbackModal(false)} style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 6, padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: 12, padding: '2rem', minWidth: 320, boxShadow: '0 4px 32px #0002', textAlign: 'center' }}>
            <h2 style={{ color: '#ff3333', marginBottom: 16 }}>Cancel Appointment</h2>
            <textarea
              rows={3}
              style={{ width: '100%', borderRadius: 6, border: '1px solid #ddd', padding: 8, marginBottom: 16 }}
              placeholder="Please provide a reason for cancellation..."
              value={cancelReason}
              onChange={e => setCancelReason(e.target.value)}
            />
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={submitCancel} style={{ background: '#ff3333', color: 'white', border: 'none', borderRadius: 6, padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}>Submit</button>
              <button onClick={() => setShowCancelModal(false)} style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 6, padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointmentsPage;
