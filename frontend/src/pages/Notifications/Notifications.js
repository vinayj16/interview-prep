import React, { useState } from 'react';
import { FaBell, FaCheck, FaTimes, FaCog, FaFilter, FaTrash, FaEye, FaEyeSlash, FaEnvelope, FaExclamationTriangle, FaInfoCircle, FaStar } from 'react-icons/fa';
import { useToast } from '../../shared/Toast/Toast';
import './Notifications.css';

const Notifications = () => {
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Practice session completed!',
      message: 'Great job! You completed your JavaScript MCQ practice session with 85% accuracy.',
      timestamp: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'New learning path available',
      message: 'A new React.js learning path has been added to your recommended courses.',
      timestamp: '1 hour ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Study reminder',
      message: 'You haven\'t practiced coding in 3 days. Keep up the momentum!',
      timestamp: '3 hours ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'success',
      title: 'Achievement unlocked!',
      message: 'Congratulations! You\'ve earned the "Problem Solver" badge for completing 50 coding challenges.',
      timestamp: '1 day ago',
      read: true,
      priority: 'high'
    },
    {
      id: 5,
      type: 'info',
      title: 'System maintenance',
      message: 'Scheduled maintenance will occur tonight from 2-4 AM. Some features may be temporarily unavailable.',
      timestamp: '2 days ago',
      read: true,
      priority: 'low'
    },
    {
      id: 6,
      type: 'warning',
      title: 'Profile incomplete',
      message: 'Complete your profile to get personalized interview preparation recommendations.',
      timestamp: '3 days ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 7,
      type: 'success',
      title: 'Interview scheduled',
      message: 'Your mock interview with John Smith has been scheduled for tomorrow at 2:00 PM.',
      timestamp: '4 days ago',
      read: true,
      priority: 'high'
    },
    {
      id: 8,
      type: 'info',
      title: 'New feature available',
      message: 'Try our new AI-powered resume builder to create professional resumes in minutes.',
      timestamp: '1 week ago',
      read: true,
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    studyReminders: true,
    achievementAlerts: true,
    systemUpdates: false
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheck />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'info':
        return <FaInfoCircle />;
      default:
        return <FaBell />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    showToast('Notification marked as read', 'success');
  };

  const markAllAsRead = () => {
    const unreadCount = notifications.filter(n => !n.read).length;
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    showToast(`${unreadCount} notifications marked as read`, 'success');
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    showToast('Notification deleted', 'info');
  };

  const clearAllRead = () => {
    const readCount = notifications.filter(n => n.read).length;
    setNotifications(prev => prev.filter(notification => !notification.read));
    showToast(`${readCount} read notifications cleared`, 'info');
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div className="header-left">
          <h1>Notifications</h1>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </div>
        <div className="header-actions">
          <button 
            className="settings-button"
            onClick={toggleSettings}
          >
            <FaCog />
          </button>
        </div>
      </div>

      <div className="notifications-content">
        <div className="notifications-sidebar">
          <div className="filter-section">
            <h3>Filters</h3>
            <div className="filter-buttons">
              <button 
                className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({notifications.length})
              </button>
              <button 
                className={`filter-button ${filter === 'unread' ? 'active' : ''}`}
                onClick={() => setFilter('unread')}
              >
                Unread ({unreadCount})
              </button>
              <button 
                className={`filter-button ${filter === 'read' ? 'active' : ''}`}
                onClick={() => setFilter('read')}
              >
                Read ({notifications.length - unreadCount})
              </button>
            </div>
          </div>

          <div className="type-filters">
            <h4>By Type</h4>
            <div className="type-filter-buttons">
              <button 
                className={`type-filter-button ${filter === 'success' ? 'active' : ''}`}
                onClick={() => setFilter('success')}
              >
                <FaCheck /> Success
              </button>
              <button 
                className={`type-filter-button ${filter === 'warning' ? 'active' : ''}`}
                onClick={() => setFilter('warning')}
              >
                <FaExclamationTriangle /> Warning
              </button>
              <button 
                className={`type-filter-button ${filter === 'info' ? 'active' : ''}`}
                onClick={() => setFilter('info')}
              >
                <FaInfoCircle /> Info
              </button>
            </div>
          </div>

          <div className="bulk-actions">
            <h4>Bulk Actions</h4>
            <div className="bulk-action-buttons">
              <button 
                className="bulk-action-button"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark All Read
              </button>
              <button 
                className="bulk-action-button danger"
                onClick={clearAllRead}
                disabled={notifications.filter(n => n.read).length === 0}
              >
                Clear Read
              </button>
            </div>
          </div>
        </div>

        <div className="notifications-main">
          {showSettings && (
            <div className="settings-panel">
              <h3>Notification Settings</h3>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Email Notifications</label>
                    <p>Receive notifications via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Push Notifications</label>
                    <p>Receive browser push notifications</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => updateSetting('pushNotifications', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Study Reminders</label>
                    <p>Get reminded to practice regularly</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.studyReminders}
                      onChange={(e) => updateSetting('studyReminders', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Achievement Alerts</label>
                    <p>Get notified when you earn badges</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.achievementAlerts}
                      onChange={(e) => updateSetting('achievementAlerts', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <label>System Updates</label>
                    <p>Receive system maintenance notifications</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.systemUpdates}
                      onChange={(e) => updateSetting('systemUpdates', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="notifications-list">
            {filteredNotifications.length === 0 ? (
              <div className="no-notifications">
                <FaBell className="no-notifications-icon" />
                <h3>No notifications</h3>
                <p>You're all caught up! Check back later for new updates.</p>
              </div>
            ) : (
              filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? 'read' : 'unread'} ${getPriorityColor(notification.priority)}`}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <div className="notification-header">
                      <h4>{notification.title}</h4>
                      <div className="notification-meta">
                        <span className="notification-time">{notification.timestamp}</span>
                        {notification.priority === 'high' && (
                          <span className="priority-indicator">
                            <FaStar />
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="notification-message">{notification.message}</p>
                  </div>
                  <div className="notification-actions">
                    {!notification.read && (
                      <button 
                        className="action-button"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <FaEye />
                      </button>
                    )}
                    <button 
                      className="action-button danger"
                      onClick={() => deleteNotification(notification.id)}
                      title="Delete notification"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 