import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHome,
  FaCode,
  FaQuestionCircle,
  FaFileAlt,
  FaRoad,
  FaSearch,
  FaMoon,
  FaSun,
  FaCog,
  FaSignOutAlt,
  FaTimes
} from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../shared/Toast/Toast';
import Logo from '../../shared/ui/Logo';
import './Header.css';

const Header = ({ onToggleSidebar, isSidebarOpen }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { state, logout } = useApp();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const quickNavItems = [
    { icon: FaHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FaCode, label: 'Coding', path: '/coding' },
    { icon: FaQuestionCircle, label: 'MCQs', path: '/mcqs' },
    { icon: FaFileAlt, label: 'Resume', path: '/resume' },
    { icon: FaRoad, label: 'Roadmap', path: '/roadmap' },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
    navigate('/login');
    setShowUserMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 shadow-sm h-16 md:h-20 transition-all duration-300">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none"
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search problems, topics, or concepts..."
                value={searchQuery}
                onChange={handleSearchChange}
                ref={searchInputRef}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={clearSearch}
                >
                  <FaTimes className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            className="md:hidden p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            onClick={() => searchInputRef.current?.focus()}
            aria-label="Search"
          >
            <FaSearch className="h-5 w-5" />
          </button>
          <button 
            className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <FaMoon className="h-5 w-5" />
            ) : (
              <FaSun className="h-5 w-5" />
            )}
          </button>
          <div className="relative" ref={userMenuRef}>
            <button 
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="User menu"
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {state.user?.name?.charAt(0) || 'G'}
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-200">
                {state.user?.name || 'Guest'}
              </span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden z-20 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-5 text-center border-b border-gray-200 dark:border-gray-700">
                  <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                    {state.user?.name?.charAt(0) || 'G'}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {state.user?.name || 'Guest User'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {state.user?.email || 'guest@example.com'}
                  </p>
                </div>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Quick Links
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {quickNavItems.map((item, index) => (
                      <Link 
                        key={index}
                        to={item.path}
                        className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <item.icon className="h-5 w-5 mb-1" />
                        <span className="text-xs">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="py-1">
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <FaCog className="mr-3 h-5 w-5 text-gray-400" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                  >
                    <FaSignOutAlt className="mr-3 h-5 w-5" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
