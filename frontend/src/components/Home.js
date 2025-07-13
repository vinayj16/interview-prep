import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import interviewImage from '../images/download.jpeg';

const CombinedHome = () => {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  // Effect for handling the redirect when showError is true
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showError, navigate]);

  // Handler for the main CTA button
  const handleMainGetStarted = () => {
    setShowError(true);
  };

  // Handler for the introduction section's button
  const handleIntroGetStarted = () => {
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="combined-home" role="main" aria-label="Home page main content" style={{ minHeight: 'calc(100vh - 140px)', paddingBottom: '40px' }}>
      {/* Introduction Section */}
      <section className="introduction">
        <div className="introduction-content">
          <div className="introduction-text">
            <h1>Welcome to GenuIQ</h1>
            <p>
              GenuIQ is your ultimate guide to ace your interviews. Whether you're preparing for a job interview,
              a college admission interview, or any other type of interview, our platform provides you with the
              tools and resources you need to succeed.
            </p>
            <p>
              Our comprehensive interview preparation materials include practice questions, expert tips, and
              in-depth guides to help you build confidence and improve your performance.
            </p>
            <ul>
              <li>Access a wide range of interview questions tailored to different industries and roles.</li>
              <li>Get expert advice and strategies to tackle common interview challenges.</li>
              <li>Practice with mock interviews to simulate real-world scenarios.</li>
              <li>Track your progress and identify areas for improvement with our performance analytics.</li>
            </ul>
            <button
              className="get-started-button"
              onClick={handleIntroGetStarted}
              aria-label="Get started with GenuIQ"
            >
              Get Started
            </button>
          </div>
          <div className="introduction-image-container">
            <img
              src={interviewImage}
              alt="Interview Preparation"
              className="introduction-image"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to Interview Preparation</h1>
        <p>Your one-stop destination for mastering technical interviews</p>
      </div>
      
      {/* Features Overview */}
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
      
      {/* CTA Section */}
      <div className="cta-section" aria-label="Call to action">
        <h2>Ready to Start?</h2>
        <p>Join thousands of successful candidates who landed their dream jobs</p>
        <button
          className="cta-button"
          onClick={handleMainGetStarted}
          aria-label="Get started button"
        >
          Get Started
        </button>
        {showError && (
          <div
            className="error-message"
            role="alert"
            style={{
              marginTop: '1rem',
              textAlign: 'center',
              background: '#fee2e2',
              color: '#b91c1c',
              borderRadius: '8px',
              padding: '0.75rem',
              fontWeight: 500
            }}
          >
            Please login to continue. Redirecting to login page...
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedHome;
