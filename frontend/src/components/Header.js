import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = ({ theme, toggleTheme, user, setUser }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <svg width="40" height="40" viewBox="0 0 40 40" className="logo-icon">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <rect width="40" height="40" rx="8" fill="url(#logoGradient)" />
            <path d="M12 14h16v2H12v-2zm0 4h16v2H12v-2zm0 4h12v2H12v-2z" fill="white" />
            <circle cx="30" cy="26" r="3" fill="white" opacity="0.8" />
          </svg>
          <span className="logo-text">InterviewPrep</span>
        </Link>

        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>
          <Link 
            to="/coding" 
            className={`nav-link ${isActive('/coding') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Coding
          </Link>
          <Link 
            to="/mcqs" 
            className={`nav-link ${isActive('/mcqs') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            MCQs
          </Link>
          <Link 
            to="/resume" 
            className={`nav-link ${isActive('/resume') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Resume
          </Link>
          <Link 
            to="/roadmap" 
            className={`nav-link ${isActive('/roadmap') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Roadmap
          </Link>
          <Link 
            to="/reviews" 
            className={`nav-link ${isActive('/reviews') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Reviews
          </Link>
        </nav>

        <div className="header-actions">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>

          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="user-profile" onClick={closeMobileMenu}>
                <FaUser />
                <span className="user-name">{user.name || 'User'}</span>
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/profile" className="login-btn" onClick={closeMobileMenu}>
              <FaUser />
              Login
            </Link>
          )}

          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;