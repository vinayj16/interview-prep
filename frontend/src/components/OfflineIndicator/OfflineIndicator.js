import React from 'react';
import { useApp } from '../../context/AppContext';
import './OfflineIndicator.css';

const OfflineIndicator = () => {
  const { state } = useApp();

  // Only show if the user is offline
  if (state.isOnline) {
    return null;
  }

  return (
    <div className="offline-indicator">
      <div className="offline-content">
            <span className="offline-icon">📡</span>
            <span>You're offline. Some features may be limited.</span>
      </div>
    </div>
  );
};

export default OfflineIndicator;