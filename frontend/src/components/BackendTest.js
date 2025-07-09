import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import './BackendTest.css';

function BackendTest() {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [healthData, setHealthData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    try {
      setConnectionStatus('Testing connection...');
      const response = await apiService.healthCheck();
      setHealthData(response);
      setConnectionStatus('Connected successfully!');
      setError(null);
    } catch (err) {
      setConnectionStatus('Connection failed');
      setError(err.message);
      console.error('Backend connection test failed:', err);
    }
  };

  const testResumeGeneration = async () => {
    try {
      setConnectionStatus('Testing resume generation...');
      const testData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        summary: 'Experienced software developer',
        skills: 'JavaScript, React, Node.js',
        experience: '5 years of web development',
        education: 'BS Computer Science',
        certifications: 'AWS Certified',
        projects: 'E-commerce platform',
        languages: 'English, Spanish'
      };
      
      const response = await apiService.generateResume(testData);
      setHealthData(response);
      setConnectionStatus('Resume generation test successful!');
      setError(null);
    } catch (err) {
      setConnectionStatus('Resume generation test failed');
      setError(err.message);
      console.error('Resume generation test failed:', err);
    }
  };

  return (
    <div className="backend-test-container">
      <h2>Backend Connection Test</h2>
      
      <div className="test-section">
        <h3>Connection Status: {connectionStatus}</h3>
        
        <div className="test-buttons">
          <button onClick={testBackendConnection} className="test-btn">
            Test Health Check
          </button>
          <button onClick={testResumeGeneration} className="test-btn">
            Test Resume Generation
          </button>
        </div>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {healthData && (
          <div className="health-data">
            <h4>Response Data:</h4>
            <pre>{JSON.stringify(healthData, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="info-section">
        <h3>Backend Information</h3>
        <ul>
          <li><strong>Backend URL:</strong> http://localhost:5000</li>
          <li><strong>Frontend URL:</strong> http://localhost:3000</li>
          <li><strong>Proxy Configuration:</strong> ✅ Configured in package.json</li>
          <li><strong>CORS:</strong> ✅ Enabled for localhost:3000</li>
        </ul>
      </div>
    </div>
  );
}

export default BackendTest; 