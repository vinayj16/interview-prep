import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaLock, FaGoogle, FaGithub } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../shared/Toast/Toast';
import './Auth.css';

const Login = () => {
  const { login } = useApp();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the redirect path from location state
  const from = location.state?.from?.pathname || '/dashboard';

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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call - in real app, this would call your authentication API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user data - in real app, this would come from the API response
      const userData = {
        id: '1',
        name: formData.email.split('@')[0], // Use email prefix as name for demo
        email: formData.email,
        token: 'mock-jwt-token-' + Date.now(),
        avatar: null
      };
      
      // Use the login function from AppContext
      const success = login(userData);
      
      if (success) {
        showToast('Login successful! Welcome back.', 'success');
        navigate(from, { replace: true });
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('Login failed. Please check your credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // In a real app, this would redirect to the OAuth provider
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to InterviewPrep</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-group">
              <span className="input-icon">
                <FaUser />
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
            <div className="form-group-header">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
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
                placeholder="Enter your password"
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          
          <div className="divider">
            <span>OR</span>
          </div>
          
          <div className="social-login">
            <button 
              type="button" 
              className="btn btn-outline btn-social"
              onClick={() => handleSocialLogin('Google')}
            >
              <FaGoogle className="social-icon" />
              Continue with Google
            </button>
            
            <button 
              type="button" 
              className="btn btn-outline btn-social"
              onClick={() => handleSocialLogin('GitHub')}
            >
              <FaGithub className="social-icon" />
              Continue with GitHub
            </button>
          </div>
          
          <div className="auth-footer">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </div>
        </form>
      </div>
      
      <div className="auth-illustration">
        <h2>Master Your Interview Skills</h2>
        <p>Join thousands of developers who have successfully prepared for their technical interviews with us.</p>
      </div>
    </div>
  );
};

export default Login;
