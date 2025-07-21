import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';

// Mock user for demo purposes
const mockUser = {
  id: 1,
  username: 'Test User',
  email: 'test@gmail.com',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  status: 'available'
};

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated, isLoading }) => {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component
const PublicRoute = ({ children, isAuthenticated, isLoading }) => {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in (simulate checking localStorage or token)
    const checkAuth = () => {
      const savedAuth = localStorage.getItem('collabspaceAuth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
        setUser(mockUser);
      }
      setIsLoading(false);
    };

    // Simulate API call delay
    setTimeout(checkAuth, 1000);
  }, []);

  const login = (credentials) => {
    // Mock login - in real app, this would call your API
    if (credentials.email === 'test@gmail.com' && credentials.password === 'test@1234') {
      localStorage.setItem('collabspaceAuth', 'true');
      setIsAuthenticated(true);
      setUser(mockUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = (userData) => {
    // Mock registration - in real app, this would call your API
    localStorage.setItem('collabspaceAuth', 'true');
    setIsAuthenticated(true);
    setUser({ ...mockUser, username: userData.username, email: userData.email });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('collabspaceAuth');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <LandingPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <LoginPage onLogin={login} />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <SignupPage onRegister={register} />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <Dashboard user={user} onLogout={logout} />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;