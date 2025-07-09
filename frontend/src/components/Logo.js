import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = ({ size = 'medium' }) => {
  const sizeMap = {
    small: '32px',
    medium: '48px',
    large: '64px'
  };

  const height = sizeMap[size] || sizeMap.medium;
  const width = height; // Keep it square

  return (
    <Link to="/" className="logo-link">
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="logo-svg"
      >
        {/* Main diamond shape */}
        <path 
          d="M24 4L44 24L24 44L4 24L24 4Z" 
          fill="url(#paint0_linear)" 
          stroke="var(--primary-color)" 
          strokeWidth="2"
        />
        
        {/* Code brackets */}
        <path 
          d="M18 16L14 24L18 32M30 16L34 24L30 32" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        <defs>
          <linearGradient 
            id="paint0_linear" 
            x1="24" 
            y1="4" 
            x2="24" 
            y2="44" 
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--primary-color)" />
            <stop offset="1" stopColor="var(--primary-dark)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="logo-text">CodePrep</span>
    </Link>
  );
};

export default Logo;
