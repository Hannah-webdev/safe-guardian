import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { simulateLogin, simulateRegister } from '../utils/authAPI';
import { AuthContext } from './AuthContext';

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data and session on app load
    const storedUser = localStorage.getItem('user');
    const sessionData = localStorage.getItem('sessionData');
    
    if (storedUser && sessionData) {
      try {
        const user = JSON.parse(storedUser);
        const session = JSON.parse(sessionData);
        
        // Check if session is still valid (24 hours)
        const now = new Date().getTime();
        const sessionExpiry = session.loginTime + (24 * 60 * 60 * 1000); // 24 hours
        
        if (now < sessionExpiry) {
          setUser(user);
          console.log('Session restored successfully');
        } else {
          // Session expired, clear data
          console.log('Session expired, clearing user data');
          localStorage.removeItem('user');
          localStorage.removeItem('sessionData');
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('sessionData');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      setLoading(true);
      
      // Simulate API call - in real app, this would be an actual API call
      const response = await simulateLogin(email, password, role);
      
      if (response.success) {
        setUser(response.user);
        
        // Save user data and session information
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('sessionData', JSON.stringify({
          loginTime: new Date().getTime(),
          expiryTime: new Date().getTime() + (24 * 60 * 60 * 1000), // 24 hours
          userAgent: navigator.userAgent,
          loginMethod: 'email'
        }));
        
        toast.success('Login successful! Session saved.');
        return { success: true };
      } else {
        toast.error(response.message || 'Login failed');
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return { success: false, message: 'An error occurred during login' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Simulate API call
      const response = await simulateRegister(userData);
      
      if (response.success) {
        toast.success('Registration successful! Please login.');
        return { success: true };
      } else {
        toast.error(response.message || 'Registration failed');
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration');
      return { success: false, message: 'An error occurred during registration' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionData');
    toast.success('Logged out successfully. Session cleared.');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
