import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ApiService from '../services/api';
import { useApp } from '../context/AppContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { actions } = useApp();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message when component unmounts
      return () => {
        window.history.replaceState({}, document.title);
      };
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await ApiService.login(formData.email, formData.password);
      if (!response) {
        throw new Error('No response received from server');
      }
      if (response.success) {
        const { data } = response;
        const userData = data || response;
        const userToStore = {
          id: userData._id || '',
          name: userData.name || userData.full_name || formData.email.split('@')[0],
          email: userData.email || formData.email
        };
        actions.login(userToStore); // Use context action
        navigate('/dashboard', { replace: true });
      } else {
        const errorMessage = response.message || 'Login failed. Please try again.';
        throw new Error(errorMessage);
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)' }}>
      <div className="login-card" style={{ maxWidth: 400, width: '100%', background: 'var(--bg-primary)', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: '2.5rem 2rem', margin: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Login</h2>
        {error && <div className="error-message" aria-live="polite">{error}</div>}
        {successMessage && <div className="success-message" aria-live="polite">{successMessage}</div>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
              disabled={loading}
              placeholder="Enter your email"
              aria-describedby={error ? 'login-error' : undefined}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
              disabled={loading}
              placeholder="Enter your password"
              aria-describedby={error ? 'login-error' : undefined}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="auth-footer" style={{ marginTop: '1.5rem', textAlign: 'center', width: '100%' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)' }}>Register here</Link>
          </p>
          <p>
            <Link to="/forgot-password" style={{ color: 'var(--text-secondary)' }}>Forgot password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;