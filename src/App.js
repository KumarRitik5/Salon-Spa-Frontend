import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/pages/HomePage';
import ServicesPage from './components/pages/ServicesPage';
import BookAppointmentPage from './components/pages/BookAppointmentPage';
import MyAppointmentsPage from './components/pages/MyAppointmentsPage';
import ProfilePage from './components/pages/ProfilePage';
import NotFoundPage from './components/pages/NotFoundPage';
import OwnerDashboard from './components/pages/OwnerDashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              

              {/* Protected Routes for Customers */}
              <Route element={<ProtectedRoute requiredRole="user" />}>
                <Route path="/book" element={<BookAppointmentPage />} />
                <Route path="/my-appointments" element={<MyAppointmentsPage />} />
              </Route>

              {/* Protected Route for Owners */}
              <Route element={<ProtectedRoute requiredRole="owner" />}>
                <Route path="/owner" element={<OwnerDashboard />} />
              </Route>

              {/* Profile is available to all authenticated users */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              {/* Admin Protected Route */}
              <Route element={<ProtectedRoute requiredRole="admin" />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
              {/* 404 Not Found Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;