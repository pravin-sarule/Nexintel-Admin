import React, { useState } from 'react'; // Removed useEffect
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Removed useNavigate
import LoginPage from './components/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardContent from './pages/dashboard/DashboardContent';
import UserManagement from './pages/dashboard/UserManagement';
import ContentManagement from './pages/dashboard/ContentManagement';
import TemplateManagement from './pages/dashboard/TemplateManagement';
import './App.css';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initial authentication state
  // Removed useNavigate and useEffect

  // Placeholder for login logic
  const handleLogin = () => {
    setIsAuthenticated(true);
    // Redirection is now handled by LoginPage itself
  };

  // Placeholder for logout logic
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); // Clear token on logout
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage setAuthStatus={setIsAuthenticated} />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardContent />} /> {/* Default dashboard content */}
            <Route path="users" element={<UserManagement />} />
            <Route path="articles" element={<ContentManagement />} />
            <Route path="templates" element={<TemplateManagement />} />
          </Route>
        </Route>

        {/* Fallback for any unmatched routes */}
        <Route path="*" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
