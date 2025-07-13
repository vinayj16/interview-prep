import React, { useState, useEffect } from 'react';
import './BackendTest.css';

function BackendTest() {
  // Remove all backend connection state and logic
  return (
    <div className="backend-test-container">
      <h2>Offline Mode Test</h2>
      <div className="test-section">
        <h3>This app is fully offline and does not require a backend server.</h3>
        <div className="test-buttons">
          <button className="test-btn" disabled>
            Test Health Check (Offline)
          </button>
          <button className="test-btn" disabled>
            Test Resume Generation (Offline)
          </button>
        </div>
        <div className="health-data">
          <h4>Offline Mode:</h4>
          <pre>All features work with local data and localStorage. No backend required.</pre>
        </div>
      </div>
      <div className="info-section">
        <h3>App Information</h3>
        <ul>
          <li><strong>Mode:</strong> Offline-first, fully functional without a server</li>
          <li><strong>Data:</strong> All data is stored locally in your browser</li>
          <li><strong>Backend:</strong> <span style={{color: 'var(--success-color)'}}>Not required</span></li>
        </ul>
      </div>
    </div>
  );
}

export default BackendTest; 