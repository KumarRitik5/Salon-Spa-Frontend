import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const res = await axios.get('http://localhost:5000/api/staff/appointments', config);
        setAppointments(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response.data);
        if (err.response.status === 403 || err.response.status === 401) {
          alert('Access Denied. You are not authorized to view this page.');
          navigate('/');
        }
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [navigate]);

  const handleUpdateStatus = async (appointmentId, status) => {
    const token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.put(
        `http://localhost:5000/api/staff/appointments/${appointmentId}/status`,
        { status },
        config
      );
      // Update the local state to reflect the change
      setAppointments(
        appointments.map((app) =>
          app._id === appointmentId ? { ...app, status } : app
        )
      );
      alert('Appointment status updated successfully!');
    } catch (err) {
      console.error(err.response.data);
      alert('Failed to update status.');
    }
  };

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <h3>All Appointments</h3>
      {appointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app._id}>
                <td>{app.customer?.name}</td>
                <td>{app.service?.name}</td>
                <td>{new Date(app.date).toLocaleDateString()}</td>
                <td>{app.slot}</td>
                <td>{app.status}</td>
                <td>
                  <button onClick={() => handleUpdateStatus(app._id, 'confirmed')}>
                    Confirm
                  </button>
                  <button onClick={() => handleUpdateStatus(app._id, 'cancelled')}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;