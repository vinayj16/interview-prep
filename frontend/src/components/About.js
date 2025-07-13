import React, { memo } from 'react';
import { useTheme } from '../context/ThemeContext';
import './About.css';

const About = memo(() => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="container about-page">
        <h1 className="section-title">About Us</h1>
        <div className="about-content">
          <div className="about-text">
            <h2>Your Path to Success</h2>
            <p>
              Welcome to our comprehensive interview preparation platform. We are dedicated to helping
              you achieve your career goals through expert guidance and practical resources.
            </p>
            <p>
              Our team of experienced professionals has helped thousands of candidates succeed in
              their interviews across various industries and roles.
            </p>
            <div className="about-features">
              <div className="feature">
                <h3>Expert Guidance</h3>
                <p>Learn from industry professionals with years of experience.</p>
              </div>
              <div className="feature">
                <h3>Comprehensive Resources</h3>
                <p>Access a wide range of materials tailored to your needs.</p>
              </div>
              <div className="feature">
                <h3>Practical Approach</h3>
                <p>Get hands-on experience with real interview scenarios.</p>
              </div>
            </div>
          </div>
          
          <div className="about-stats">
            <div className="stat">
              <h3>5000+</h3>
              <p>Success Stories</p>
            </div>
            <div className="stat">
              <h3>100+</h3>
              <p>Expert Mentors</p>
            </div>
            <div className="stat">
              <h3>95%</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </div>

        <div className="features-section">
          <h2>Our Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>MCQ Practice</h3>
              <p>
                Test your knowledge with our extensive collection of multiple-choice questions
                covering various programming concepts and technologies.
              </p>
            </div>

            <div className="feature-card">
              <h3>Coding Challenges</h3>
              <p>
                Practice coding problems with our interactive code editor, supporting multiple
                programming languages and providing instant feedback.
              </p>
            </div>

            <div className="feature-card">
              <h3>Mock Interviews</h3>
              <p>
                Simulate real interview experiences with our AI-powered mock interview system
                and get detailed feedback on your performance.
              </p>
            </div>

            <div className="feature-card">
              <h3>Resume Builder</h3>
              <p>
                Create ATS-friendly resumes with our intelligent resume builder, designed to
                help you stand out to recruiters.
              </p>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="/images/team1.jpg" alt="Team Member" className="member-photo" />
              <h3>John Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <img src="/images/team2.jpg" alt="Team Member" className="member-photo" />
              <h3>Jane Smith</h3>
              <p>Head of Content</p>
            </div>
            <div className="team-member">
              <img src="/images/team3.jpg" alt="Team Member" className="member-photo" />
              <h3>Mike Johnson</h3>
              <p>Technical Lead</p>
            </div>
          </div>
        </div>

        <div className="testimonials-section">
          <h2>What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Interview Prep helped me land my dream job at Google. The practice problems and mock interviews were invaluable."</p>
              <cite>- Sarah K., Software Engineer</cite>
            </div>
            <div className="testimonial-card">
              <p>"The MCQ practice and coding challenges helped me build confidence before my technical interviews."</p>
              <cite>- Alex M., Frontend Developer</cite>
            </div>
            <div className="testimonial-card">
              <p>"The resume builder helped me create a professional resume that caught recruiters' attention."</p>
              <cite>- David R., Full Stack Developer</cite>
          </div>
        </div>
      </div>
    </div>
  );
});

export default About;
