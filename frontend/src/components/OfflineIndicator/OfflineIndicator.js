import React from 'react';
import { useApp } from '../../context/AppContext';
import './OfflineIndicator.css';

const OfflineIndicator = () => {
  const { state } = useApp();

  if (state.isOnline && state.backendConnected) {
    return null;
  }

  return (
    <div className="offline-indicator">
      <div className="offline-content">
        {!state.isOnline ? (
          <>
            <span className="offline-icon">📡</span>
            <span>You're offline. Some features may be limited.</span>
          </>
        ) : !state.backendConnected ? (
          <>
            <span className="offline-icon">⚠️</span>
            <span>Backend unavailable. Using offline mode.</span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default OfflineIndicator;