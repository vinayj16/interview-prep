import React from 'react';
import './Introduction.css';
import interviewImage from '../images/download.jpeg';

const Introduction = () => {
  return (
    <section className="introduction">
      <div className="introduction-content">
        <div className="introduction-text">
          <h1>Welcome to GenuIQ</h1>
          <p>
            GenuIQ is your ultimate guide to ace your interviews. Whether you're preparing for a job interview, a college admission interview, or any other type of interview, our platform provides you with the tools and resources you need to succeed.
          </p>
          <p>
            Our comprehensive interview preparation materials include practice questions, expert tips, and in-depth guides to help you build confidence and improve your performance. With GenuIQ, you can:
          </p>
          <ul>
            <li>Access a wide range of interview questions tailored to different industries and roles.</li>
            <li>Get expert advice and strategies to tackle common interview challenges.</li>
            <li>Practice with mock interviews to simulate real-world scenarios.</li>
            <li>Track your progress and identify areas for improvement with our performance analytics.</li>
          </ul>
          <p>
            Join thousands of users who have boosted their interview performance with GenuIQ. Start your journey to success today!
          </p>
          <button className="get-started-button" onClick={() => alert('Please login first.')}>Get Started</button>
        </div>
        <div className="introduction-image-container">
          <img src={interviewImage} alt="Interview Preparation" className="introduction-image" loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default Introduction;
