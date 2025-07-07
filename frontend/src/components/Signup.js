import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt, FaGoogle, FaGithub } from 'react-icons/fa';
import './Auth.css';
import axios from 'axios';

const Signup = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password
      };
      const response = await axios.post('/api/auth/register', payload);
      if (response.data && response.data.success) {
        const { token, user } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser && setUser(user);
        navigate('/');
      } else {
        setError(response.data.message || (response.data.errors && response.data.errors[0]) || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        (err.response?.data?.errors && err.response.data.errors[0]) ||
        'Signup failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // TODO: Implement social login
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className={`signup-container ${isDark ? 'dark' : 'light'}`}>
      <div className="signup-card">
        <h2>Create Account</h2>
        <p className="signup-subtitle">Sign up to get started</p>
        <div className="signup-error" style={{ color: 'orange', marginBottom: 16 }}>
          Signup is currently unavailable. Please try again later.
        </div>
        {/*
        {error && <div className="signup-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          ...existing form fields...
        </form>
        */}
        <div className="signup-footer">
          <span>Already have an account? <Link to="/login">Sign In</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
