import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/Toast/Toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/Layout/Layout';
import OfflineIndicator from './components/OfflineIndicator/OfflineIndicator';
import { useApp } from './context/AppContext';

/* Import Pages */
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

// Lazy load all main route components
const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Coding = React.lazy(() => import('./components/Coding'));
const MCQs = React.lazy(() => import('./components/MCQs'));
const Resume = React.lazy(() => import('./components/Resume'));
const Roadmap = React.lazy(() => import('./components/Roadmap'));
const Reviews = React.lazy(() => import('./components/Reviews'));
const Profile = React.lazy(() => import('./components/Profile'));
const FaceToFace = React.lazy(() => import('./components/FaceToFace'));
const Services = React.lazy(() => import('./components/Services'));
const About = React.lazy(() => import('./components/About'));
const PageNotFound = React.lazy(() => import('./components/NotFound'));
const Home = React.lazy(() => import('./components/Home'));
const Contact = React.lazy(() => import('./components/Contact'));

// Wrapper component for protected routes
const ProtectedRoute = ({ children }) => {
  const { state } = useApp();
  if (state.isLoadingAuth) {
      return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading application...</p>
      </div>
    );
  }
  return state.isAuthenticated ? children : <Navigate to="/login" replace />;
};

/* Import Global Styles */
import './styles/theme.css';
import './styles/layout.css';
import './styles/typography.css';
import './styles/utilities.css';

function App() {
  console.log('App is rendering');
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppProvider>
          <ToastProvider>
            <Router>
              <div className="app">
                <OfflineIndicator />
                <Suspense fallback={<LoadingSpinner size="large" message="Loading page..." />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* Move About, Services, Contact inside Layout */}
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <Layout />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<Home />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="coding" element={<Coding />} />
                      <Route path="mcqs" element={<MCQs />} />
                      <Route path="resume" element={<Resume />} />
                      <Route path="roadmap" element={<Roadmap />} />
                      <Route path="reviews" element={<Reviews />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="face-to-face" element={<FaceToFace />} />
                      <Route path="about" element={<About />} />
                      <Route path="services" element={<Services />} />
                      <Route path="contact" element={<Contact />} />
                    </Route>
                    {/* 404 Route */}
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </Suspense>
              </div>
            </Router>
          </ToastProvider>
        </AppProvider>
        </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;