<<<<<<< HEAD
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import { ResumeProvider } from './contexts/ResumeContext';
import Layout from './layout/Layout/Layout';
import LoadingSpinner from './shared/LoadingSpinner/LoadingSpinner';
import './App.css';
=======
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/Toast/Toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/Layout/Layout';
import OfflineIndicator from './components/OfflineIndicator/OfflineIndicator';
import { useApp } from './context/AppContext';
>>>>>>> 5d8d04ad0f03bb6d7dc77391509ce82b5d34bc8d

// Import components directly for now to avoid lazy loading issues
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Coding from './pages/Coding/Coding';
import MCQs from './pages/MCQs/MCQs';
import Resume from './pages/Resume/Resume';
import Roadmap from './pages/Roadmap/Roadmap';
import FaceToFace from './pages/FaceToFace/FaceToFace';
import Reviews from './pages/Reviews/Reviews';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import Support from './pages/Support/Support';
import HelpCenter from './pages/HelpCenter/HelpCenter';
import Notifications from './pages/Notifications/Notifications';

// Loading component for Suspense fallback
const PageLoading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '50vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <LoadingSpinner size="md" />
    <p>Loading page...</p>
  </div>
);

<<<<<<< HEAD
// Protected Route component
const ProtectedRoute = ({ children, requireAuth = true }) => {
=======
// Wrapper component for protected routes
const ProtectedRoute = ({ children }) => {
>>>>>>> 5d8d04ad0f03bb6d7dc77391509ce82b5d34bc8d
  const { state } = useApp();
  const location = useLocation();

  // Show loading state while checking auth
  if (state.isLoadingAuth) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        width: '100%',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        backgroundColor: 'var(--bg-color, #f8f9fa)',
        color: 'var(--text-color, #333)'
      }}>
        <LoadingSpinner size="lg" />
        <p>Checking authentication status...</p>
        <small style={{ opacity: 0.7 }}>Current path: {location.pathname}</small>
      </div>
    );
  }

  // If authentication is required but user is not authenticated, redirect to login
  if (requireAuth && !state.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authentication is not required but user is authenticated, redirect to home
  if (!requireAuth && state.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // If we get here, render the protected content
  // Just return children directly (works with nested routes)
  return children;
};

// App content component that uses the context
function AppContent() {
  const { state } = useApp();
  const location = useLocation();

  // Don't show layout for auth pages
  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  // Show loading state while auth is checking
  if (state.isLoadingAuth) {
    return (
      <div className="app-loading" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: '#f8f9fa'
      }}>
        <LoadingSpinner size="lg" />
        <p>Loading application...</p>
      </div>
    );
  }

<<<<<<< HEAD
=======
/* Import Global Styles */
import './styles/theme.css';
import './styles/layout.css';
import './styles/typography.css';
import './styles/utilities.css';

function App() {
  console.log('App is rendering');
>>>>>>> 5d8d04ad0f03bb6d7dc77391509ce82b5d34bc8d
  return (
    <ResumeProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        } />
        
        {/* Protected routes with layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="coding" element={<Coding />} />
            <Route path="mcqs" element={<MCQs />} />
            {/* Resume Builder Route */}
            <Route path="resume" element={<Resume />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="face-to-face" element={<FaceToFace />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
            <Route path="help-center" element={<HelpCenter />} />
            <Route path="notifications" element={<Notifications />} />
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
      </Routes>
    </ResumeProvider>
  );
}

// Main App component
function App() {
  return <AppContent />;
}

export default App;