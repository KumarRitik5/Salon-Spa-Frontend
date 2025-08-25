import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Salon & Spa</Link>
      </div>
      <nav className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        {isAuthenticated ? (
          <>
            {user.role === 'user' && <>
              <Link to="/book">Book Appointment</Link>
              <Link to="/my-appointments">My Appointments</Link>
            </>}
            {user.role === 'owner' && <Link to="/owner">Owner Dashboard</Link>}
            {isAdmin && <Link to="/admin" className="admin-link">Admin Dashboard</Link>}
            <Link to="/profile">Profile</Link>
            <span className="user-name">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
