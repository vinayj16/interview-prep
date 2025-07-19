import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaLaptopCode, FaBook, FaUserTie, FaChartLine } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <FaCode className="feature-icon" />,
      title: 'Coding Challenges',
      description: 'Practice with real interview questions from top tech companies.',
      link: '/coding'
    },
    {
      icon: <FaLaptopCode className="feature-icon" />,
      title: 'System Design',
      description: 'Learn to design scalable systems with real-world examples.',
      link: '/system-design'
    },
    {
      icon: <FaBook className="feature-icon" />,
      title: 'MCQ Tests',
      description: 'Test your knowledge with multiple-choice questions on various topics.',
      link: '/mcqs'
    },
    {
      icon: <FaUserTie className="feature-icon" />,
      title: 'Interview Prep',
      description: 'Get ready for technical interviews with comprehensive guides.',
      link: '/interview-prep'
    },
    {
      icon: <FaChartLine className="feature-icon" />,
      title: 'Progress Tracking',
      description: 'Track your learning progress and identify areas for improvement.',
      link: '/dashboard'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Master Your Next Technical Interview</h1>
          <p className="hero-subtitle">
            Practice with real interview questions, get detailed solutions, and track your progress
            to land your dream tech job.
          </p>
          <div className="cta-buttons">
            <Link to="/coding" className="btn btn-primary">
              Start Practicing
            </Link>
            <Link to="/about" className="btn btn-outline">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="code-snippet">
            <pre>{`// Sample code snippet
function findSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`}</pre>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>What We Offer</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-container">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <Link to={feature.link} className="feature-link">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <span className="stat-number">1000+</span>
          <span className="stat-label">Coding Problems</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50+</span>
          <span className="stat-label">System Design Questions</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">10,000+</span>
          <span className="stat-label">Active Users</span>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to ace your next interview?</h2>
        <p>Join thousands of developers who have improved their interview skills with us.</p>
        <Link to="/register" className="btn btn-primary btn-large">
          Get Started for Free
        </Link>
      </section>
    </div>
  );
};

export default Home;
