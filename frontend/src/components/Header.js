import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaSun, 
  FaMoon, 
  FaUser, 
  FaBars,
  FaTimes,
  FaSignOutAlt, 
  FaHome, 
  FaLaptopCode, 
  FaQuestionCircle, 
  FaFileAlt, 
  FaRoad, 
  FaStar,
  FaChevronDown,
  FaChevronLeft,
  FaTools,
  FaInfoCircle,
  FaSignInAlt, 
  FaUserPlus, 
  FaEnvelope,
  FaVideo,
  FaLaptopHouse,
  FaUserCircle,
  FaCog
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

// Avatar component with fallback
const Avatar = ({ src, alt, username, size = 40 }) => {
  const [imgError, setImgError] = useState(false);
  
  if (imgError || !src) {
    return (
      <div 
        className="avatar-fallback" 
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          fontSize: `${size * 0.4}px`
        }}
      >
        {username ? username.charAt(0).toUpperCase() : <FaUser />}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || 'User avatar'}
      className="user-avatar"
      style={{ width: `${size}px`, height: `${size}px` }}
      onError={() => setImgError(true)}
    />
  );
};

const Header = ({ isSidebarOpen, onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const { state, actions } = useApp();
  const { theme, toggleTheme } = useTheme();
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
  };
  }, []);

  const handleLogout = () => {
    actions.setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    navigate('/login');
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Theme handling is now managed by ThemeContext

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Use the provided onToggleSidebar if available, otherwise use a no-op
  const handleSidebarToggle = onToggleSidebar || (() => {});

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  // Navigation items for the header
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isAuthenticated = !!state.user;

  return (
    <header className="header" role="banner">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo" aria-label="Home">
            <svg width="40" height="40" viewBox="0 0 40 40" className="logo-icon" aria-hidden="true">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary-color)" />
                  <stop offset="100%" stopColor="var(--primary-dark)" />
                </linearGradient>
              </defs>
              <rect width="40" height="40" rx="8" fill="url(#logoGradient)" />
              <path d="M12 14h16v2H12v-2zm0 4h16v2H12v-2zm0 4h12v2H12v-2z" fill="white" />
              <circle cx="30" cy="26" r="3" fill="white" opacity="0.8" />
            </svg>
            <span className="logo-text">InterviewPrep</span>
          </Link>
        </div>
        <nav className="nav-menu">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  aria-label={item.label}
              >
                {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <button 
            className="theme-toggle" 
              onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          {!isAuthenticated && (
            <>
              <button
                className="btn btn-secondary header-auth-btn"
                onClick={() => navigate('/login')}
                style={{ marginLeft: '1rem' }}
              >
                Login
              </button>
              <button
                className="btn btn-primary header-auth-btn"
                onClick={() => navigate('/register')}
                style={{ marginLeft: '0.5rem' }}
              >
                Sign Up
              </button>
            </>
          )}
          {isAuthenticated && (
            <button
              className="btn btn-secondary header-auth-btn"
              onClick={handleLogout}
              style={{ marginLeft: '1rem' }}
            >
              <FaSignOutAlt style={{ marginRight: '0.5rem' }} /> Logout
            </button>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;