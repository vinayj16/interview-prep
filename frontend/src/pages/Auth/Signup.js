import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter and one special character';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Signup attempt with:', {
        name: formData.name,
        email: formData.email,
        // Don't log password in production
        password: '********'
      });
      
      setIsLoading(false);
      
      // For demo purposes, navigate to verification page
      navigate('/verify-email');
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create an Account</h2>
          <p>Join thousands of developers preparing for interviews</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-group">
              <span className="input-icon">
                <FaUser />
              </span>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-group">
              <span className="input-icon">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <span className="input-icon">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Create a password"
              />
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
            <div className="password-hint">
              Must be at least 8 characters with 1 uppercase and 1 special character
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-group">
              <span className="input-icon">
                <FaLock />
              </span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
              />
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>
          
          <div className="form-group checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={errors.agreeToTerms ? 'error' : ''}
              />
              <span className="checkmark"></span>
              I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </label>
            {errors.agreeToTerms && (
              <span className="error-message">{errors.agreeToTerms}</span>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : (
              <>
                <FaUserPlus className="btn-icon" />
                Create Account
              </>
            )}
          </button>
          
          <div className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </div>
        </form>
      </div>
      
      <div className="auth-illustration">
        <h2>Start Your Interview Journey</h2>
        <p>Get access to hundreds of coding challenges, system design questions, and mock interviews to help you land your dream job.</p>
        
        <div className="benefits">
          <div className="benefit-item">
            <span className="benefit-icon">✓</span>
            <span>Personalized learning paths</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">✓</span>
            <span>Real interview questions</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">✓</span>
            <span>Progress tracking</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">✓</span>
            <span>Expert support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
