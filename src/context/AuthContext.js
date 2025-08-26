import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

// Create and export the context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      
      // Store user data with token
      const userToStore = {
        ...user,
        token
      };

      localStorage.setItem('user', JSON.stringify(userToStore));
      setUser(userToStore);
      return userToStore;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      
      // After successful registration, automatically log in
      return await login(userData.email, userData.password);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Deactivate account function
  const deactivateAccount = async () => {
    if (!user) return;
    try {
      await api.patch(`/api/auth/me`, { active: false });
      logout();
      alert('Your account has been deactivated.');
    } catch (err) {
      alert('Failed to deactivate account.');
    }
  };

  // Permanently delete account
  const deleteAccount = async () => {
    if (!user) return;
    try {
      await api.delete(`/api/auth/me`);
      logout();
      alert('Your account has been permanently deleted.');
    } catch (err) {
      alert('Failed to delete account.');
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    deactivateAccount,
    deleteAccount,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
