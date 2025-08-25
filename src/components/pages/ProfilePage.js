import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';


const ProfilePage = () => {
  const { user, deactivateAccount, deleteAccount, logout } = useAuth();
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deactivateReason, setDeactivateReason] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Permanently delete account
  const handleDeleteAccount = async () => {
    await deleteAccount();
    setShowDeactivateModal(false);
    setDeleteConfirm(false);
  };

  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fffbe6', borderRadius: 12, boxShadow: '0 2px 16px #ffecb366', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>My Profile</h2>
      <div style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role || 'Customer'}</p>
        <p><strong>Status:</strong> <span style={{ color: user.active === false ? '#ff3333' : '#00875a', fontWeight: 600 }}>{user.active === false ? 'Deactivated' : 'Active'}</span></p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button
          onClick={() => setShowDeactivateModal(true)}
          style={{
            background: '#ff3333',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.7rem 1.2rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '1rem',
            boxShadow: '0 2px 8px #ff333322'
          }}
        >
          Deactivate / Delete Account
        </button>
        <button
          onClick={logout}
          style={{
            background: '#ffb300',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.7rem 1.2rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '1rem',
            boxShadow: '0 2px 8px #ffb30022'
          }}
        >
          Logout
        </button>
      </div>

      {/* Deactivate/Delete Modal */}
      {showDeactivateModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: 12, padding: '2rem', minWidth: 340, boxShadow: '0 4px 32px #0002', textAlign: 'center' }}>
            <h2 style={{ color: '#ff3333', marginBottom: 16 }}>Account Action</h2>
            <p style={{ marginBottom: 16 }}>Please let us know why you want to deactivate or delete your account:</p>
            <textarea
              rows={3}
              style={{ width: '100%', borderRadius: 6, border: '1px solid #ddd', padding: 8, marginBottom: 16 }}
              placeholder="Reason (optional, helps us improve)"
              value={deactivateReason}
              onChange={e => setDeactivateReason(e.target.value)}
            />
            {!deleteConfirm ? (
              <>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to deactivate your account? You can reactivate by contacting support.')) {
                      deactivateAccount();
                      setShowDeactivateModal(false);
                    }
                  }}
                  style={{ background: '#ffb300', color: 'white', border: 'none', borderRadius: 6, padding: '0.6rem 1.5rem', fontWeight: 600, cursor: 'pointer', marginRight: 10 }}
                >
                  Deactivate
                </button>
                <button
                  onClick={() => setDeleteConfirm(true)}
                  style={{ background: '#ff3333', color: 'white', border: 'none', borderRadius: 6, padding: '0.6rem 1.5rem', fontWeight: 600, cursor: 'pointer', marginRight: 10 }}
                >
                  Delete Permanently
                </button>
                <button
                  onClick={() => setShowDeactivateModal(false)}
                  style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 6, padding: '0.6rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p style={{ color: '#ff3333', marginBottom: 12, fontWeight: 600 }}>Are you sure? This action cannot be undone.</p>
                <button
                  onClick={handleDeleteAccount}
                  style={{ background: '#ff3333', color: 'white', border: 'none', borderRadius: 6, padding: '0.6rem 1.5rem', fontWeight: 600, cursor: 'pointer', marginRight: 10 }}
                >
                  Yes, Delete My Account
                </button>
                <button
                  onClick={() => setDeleteConfirm(false)}
                  style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 6, padding: '0.6rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Back
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
