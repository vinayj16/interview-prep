import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <FaExclamationTriangle />
        </div>
        <h1>404 - Page Not Found</h1>
        <p className="not-found-text">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="home-link">
          <FaHome className="home-icon" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
