import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin, setUser }) => {
  const [email, setEmail] = useState(() => {
    // Prefill email if user just signed up
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        return parsed.email || '';
      } catch {
        return '';
      }
    }
    return '';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/login', {
        email: email.trim(),
        password
      });

      if (response.data && response.data.success) {
        const { token, user } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser && setUser(user);
        onLogin && onLogin(user);
        navigate('/');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error:', err);
    }
  };

  return (
    <div className={`login-container ${isDark ? 'dark' : 'light'}`}>
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Sign in to continue to your account</p>
        <div className="login-error" style={{ color: 'orange', marginBottom: 16 }}>
          Login is currently unavailable. Please try again later.
        </div>
        {/*
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          ...existing form fields...
        </form>
        */}
        <div className="login-footer">
          <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Login;