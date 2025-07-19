import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'md', color = 'primary', text = '' }) => {
  return (
    <div className={`loading-spinner-container ${size}`}>
      <div className={`loading-spinner ${size} ${color}`}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;