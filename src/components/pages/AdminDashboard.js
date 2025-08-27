import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const AdminDashboard = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        // For now, let's just show a placeholder since we don't have a specific owners endpoint
        // You may need to create this endpoint in your backend or adjust the logic
        const res = await api.get('/api/auth/users?role=owner');
        setOwners(res.data);
      } catch (error) {
        console.error('Error fetching owners:', error);
        setOwners([]);
      }
      setLoading(false);
    };
    fetchOwners();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '2rem', background: '#fffbe6', borderRadius: 16, boxShadow: '0 2px 16px #ffecb366' }}>
      <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 32 }}>Admin Dashboard</h2>
      <h3 style={{ color: '#333', marginBottom: 16 }}>All Owners</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 8 }}>
        <thead>
          <tr style={{ background: '#e3f2fd' }}>
            <th style={{ padding: 10 }}>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {owners.length === 0 ? (
            <tr><td colSpan={4} style={{ textAlign: 'center', padding: 20 }}>No owners found.</td></tr>
          ) : (
            owners.map(owner => (
              <tr key={owner.id}>
                <td>{owner.name}</td>
                <td>{owner.email}</td>
                <td>{owner.phone || '-'}</td>
                <td>{owner.createdAt ? new Date(owner.createdAt).toLocaleString() : '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
