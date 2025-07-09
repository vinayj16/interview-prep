import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [showError, navigate]);

  const handleGetStarted = () => {
    setShowError(true);
  };
  return (
    <div className="home" role="main" aria-label="Home page main content">
      <div className="hero-section">
        <h1>Welcome to Interview Preparation</h1>
        <p>Your one-stop destination for mastering technical interviews</p>
        {/* Example image usage: */}
        {/* <img src="../images/logo.svg" alt="Interview Preparation Logo" loading="lazy" /> */}
      </div>
      
      <div className="features-overview" aria-label="Features overview">
        <div className="feature-item">
          <h3>Practice Questions</h3>
          <p>Access hundreds of curated questions across different topics</p>
        </div>
        
        <div className="feature-item">
          <h3>Mock Interviews</h3>
          <p>Simulate real interview experiences with our AI-powered system</p>
        </div>
        
        <div className="feature-item">
          <h3>Study Resources</h3>
          <p>Comprehensive learning materials and guides</p>
        </div>
      </div>
      
      <div className="cta-section" aria-label="Call to action">
        <h2>Ready to Start?</h2>
        <p>Join thousands of successful candidates who landed their dream jobs</p>
        <button className="cta-button" onClick={handleGetStarted} aria-label="Get started button">
          Get Started
        </button>
        {showError && (
          <div className="error-message" role="alert">
            Please login to continue. Redirecting to login page...
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
