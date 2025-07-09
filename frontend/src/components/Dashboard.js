import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/api';
import './Dashboard.css';

const Dashboard = ({ setIsAuthenticated }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
    fetchUserProfile();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await ApiService.getDashboardData();
      setDashboardData(data);
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Dashboard data error:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const profile = await ApiService.getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      setError('Failed to load user profile');
      console.error('User profile error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await ApiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and update auth state
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          {userProfile && (
            <span>Welcome, {userProfile.username}!</span>
          )}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main className="dashboard-content">
        <div className="dashboard-grid">
          {/* User Profile Section */}
          {userProfile && (
            <div className="dashboard-card">
              <h3>Profile Information</h3>
              <p><strong>Username:</strong> {userProfile.username}</p>
              <p><strong>Email:</strong> {userProfile.email}</p>
              <p><strong>Member since:</strong> {new Date(userProfile.created_at).toLocaleDateString()}</p>
            </div>
          )}

          {/* Dashboard Data Section */}
          {dashboardData && (
            <div className="dashboard-card">
              <h3>Dashboard Statistics</h3>
              {Object.entries(dashboardData).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {value}
                </p>
              ))}
            </div>
          )}

          {/* Additional sections can be added here */}
          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <button className="action-btn" onClick={() => window.location.reload()}>
              Refresh Data
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;