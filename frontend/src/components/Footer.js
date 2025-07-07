import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>InterviewPrep</h3>
            <p>
              Your comprehensive platform for technical interview preparation. 
              Practice coding problems, take MCQs, build resumes, and ace your next interview.
            </p>
            <div className="social-links">
              <a href="https://github.com" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="mailto:contact@interviewprep.com" className="social-link">
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Features</h3>
            <ul className="footer-links">
              <li><Link to="/coding">Coding Practice</Link></li>
              <li><Link to="/mcqs">MCQ Tests</Link></li>
              <li><Link to="/resume">Resume Builder</Link></li>
              <li><Link to="/roadmap">Learning Roadmaps</Link></li>
              <li><Link to="/reviews">Interview Reviews</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><a href="#" target="_blank" rel="noopener noreferrer">Documentation</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">API Reference</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Tutorials</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Blog</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Community</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><a href="#" target="_blank" rel="noopener noreferrer">Help Center</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Bug Reports</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Feature Requests</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Status Page</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2024 InterviewPrep. Made with <FaHeart className="heart" /> for developers.
          </p>
          <div className="footer-bottom-links">
            <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;