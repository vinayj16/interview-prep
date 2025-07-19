import React, { useEffect, useState } from 'react';
import './OfflineIndicator.css';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

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