import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Introduction.css';
import interviewImage from '../images/download.jpeg';

const Introduction = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
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
            onClick={handleGetStarted}
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
  );
};

export default Introduction; 