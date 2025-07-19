import React, { useState } from 'react';
import { FaMoon, FaSun, FaBell, FaUserShield, FaSignOutAlt, FaPalette } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../shared/Toast/Toast';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { state, logout } = useApp();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyDigest: false,
    productUpdates: true
  });
  const [userData, setUserData] = useState({
    name: state.user?.name || 'John Doe',
    email: state.user?.email || 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate password fields if changing password
    if (userData.newPassword || userData.confirmPassword) {
      if (!userData.currentPassword) {
        showToast('Current password is required to change password', 'error');
        return;
      }
      if (userData.newPassword !== userData.confirmPassword) {
        showToast('New passwords do not match', 'error');
        return;
      }
      if (userData.newPassword.length < 6) {
        showToast('New password must be at least 6 characters', 'error');
        return;
      }
    }
    
    // Handle form submission
    console.log('Settings updated:', { userData, notifications });
    showToast('Settings saved successfully!', 'success');
    
    // Clear password fields after successful save
    setUserData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (window.confirm('This will permanently delete all your data. Are you absolutely sure?')) {
        logout();
        showToast('Account deleted successfully', 'info');
        navigate('/login');
      }
    }
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      
      <div className="settings-sections">
        {/* Account Settings */}
        <div className="settings-section">
          <h2><FaUserShield className="section-icon" /> Account Settings</h2>
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="form-control"
                disabled
              />
            </div>
            
            <div className="form-group">
              <label>Change Password</label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={userData.currentPassword}
                onChange={handleInputChange}
                className="form-control"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={userData.newPassword}
                onChange={handleInputChange}
                className="form-control"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={userData.confirmPassword}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            
            <button type="submit" className="btn-save">Save Changes</button>
          </form>
        </div>
        
        {/* Notification Settings */}
        <div className="settings-section">
          <h2><FaBell className="section-icon" /> Notifications</h2>
          <div className="notification-settings">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Email Notifications</h3>
                <p>Receive email notifications</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  name="email"
                  checked={notifications.email}
                  onChange={handleNotificationChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Push Notifications</h3>
                <p>Receive browser notifications</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  name="push"
                  checked={notifications.push}
                  onChange={handleNotificationChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Weekly Digest</h3>
                <p>Get a weekly summary of your activity</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  name="weeklyDigest"
                  checked={notifications.weeklyDigest}
                  onChange={handleNotificationChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Product Updates</h3>
                <p>Get notified about new features</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  name="productUpdates"
                  checked={notifications.productUpdates}
                  onChange={handleNotificationChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Theme Settings */}
        <div className="settings-section">
          <h2><FaPalette className="section-icon" /> Appearance</h2>
          <div className="theme-settings">
            <div className="theme-option">
              <div className="theme-preview light">
                <FaSun className="theme-icon" />
                <span>Light</span>
              </div>
              <button 
                className={`theme-toggle ${theme === 'light' ? 'active' : ''}`}
                onClick={() => theme !== 'light' && toggleTheme()}
              >
                {theme === 'light' ? 'Active' : 'Switch to Light'}
              </button>
            </div>
            
            <div className="theme-option">
              <div className="theme-preview dark">
                <FaMoon className="theme-icon" />
                <span>Dark</span>
              </div>
              <button 
                className={`theme-toggle ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => theme !== 'dark' && toggleTheme()}
              >
                {theme === 'dark' ? 'Active' : 'Switch to Dark'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="danger-zone">
        <h2>Danger Zone</h2>
        <div className="danger-actions">
          <button className="btn-delete" onClick={handleDeleteAccount}>
            <FaSignOutAlt /> Delete My Account
          </button>
          <p className="danger-note">
            Warning: This action cannot be undone. All your data will be permanently deleted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;