import React, { forwardRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaCode, FaQuestionCircle, FaFileAlt, FaRoute, 
  FaUser, FaCog, FaLifeRing, FaQuestion, FaBell, FaStar,
  FaSignOutAlt, FaBars, FaTimes
} from 'react-icons/fa';
import { useApp } from '../../context/AppContext';
import './Sidebar.css';

const Sidebar = forwardRef(({ isOpen, onClose }, ref) => {
  const navigate = useNavigate();
  const { logout } = useApp();
  const location = useLocation();
  
  console.log('Sidebar rendering, isOpen:', isOpen);
  
  // Log when isOpen prop changes
  useEffect(() => {
    console.log('Sidebar isOpen prop changed to:', isOpen);
  }, [isOpen]);
  
  // Close sidebar when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('sidebar-open');
    };
  }, [isOpen, onClose]);

  const menuItems = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/coding', icon: FaCode, label: 'Coding Problems' },
    { path: '/mcqs', icon: FaQuestionCircle, label: 'MCQ Tests' },
    { 
      path: '/resume', 
      icon: FaFileAlt, 
      label: 'Resume Builder',
      // Match any route that starts with /resume
      match: (path) => path.startsWith('/resume')
    },
    { path: '/roadmap', icon: FaRoute, label: 'Learning Roadmap' },
    { path: '/face-to-face', icon: FaUser, label: 'Mock Interviews' },
    { path: '/reviews', icon: FaStar, label: 'Reviews' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
    { path: '/settings', icon: FaCog, label: 'Settings' },
    { path: '/support', icon: FaLifeRing, label: 'Support' },
    { path: '/help-center', icon: FaQuestion, label: 'Help Center' },
    { path: '/notifications', icon: FaBell, label: 'Notifications' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  return (
    <>
      <aside 
        ref={ref}
        className={`sidebar ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
        aria-label="Main navigation"
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Link to="/" onClick={onClose}>
              <span className="logo-text">InterviewPrep</span>
            </Link>
          </div>
          <button 
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.match 
                ? item.match(location.pathname)
                : location.pathname === item.path;
              
              return (
                <li key={item.path} className="nav-item">
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <Icon className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;