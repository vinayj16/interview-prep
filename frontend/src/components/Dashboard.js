import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ApiService from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const [dashboardResponse, statsResponse, usersResponse] = await Promise.all([
        ApiService.getDashboardData(),
        ApiService.getDashboardStats(),
        ApiService.getAllUsers()
      ]);
      
      setDashboardData(dashboardResponse);
      setDashboardStats(statsResponse);
      setAllUsers(usersResponse.users || []);
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Dashboard data error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleRefresh = () => {
    fetchAllData();
  };

  const handleHealthCheck = async () => {
    try {
      const health = await ApiService.healthCheck();
      alert(`Server Status: ${health.status}\nDatabase: ${health.database.connection_status}`);
    } catch (error) {
      alert(`Health check failed: ${error.message}`);
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
          {user && (
            <span>Welcome, {user.username}!</span>
          )}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      {/* Tab Navigation */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          All Users
        </button>
        <button 
          className={`nav-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
      </nav>

      <main className="dashboard-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="dashboard-grid">
            {dashboardData && (
              <div className="dashboard-card">
                <h3>System Overview</h3>
                <p><strong>Database:</strong> {dashboardData.database_info?.database_name}</p>
                <p><strong>Collection:</strong> {dashboardData.database_info?.collection_name}</p>
                <p><strong>Total Users:</strong> {dashboardData.total_users}</p>
                <p><strong>Status:</strong> {dashboardData.status}</p>
                <p><strong>Last Login:</strong> {new Date(dashboardData.last_login).toLocaleString()}</p>
              </div>
            )}

            <div className="dashboard-card">
              <h3>Quick Actions</h3>
              <button className="action-btn" onClick={handleRefresh}>
                Refresh Data
              </button>
              <button className="action-btn" onClick={handleHealthCheck}>
                Health Check
              </button>
              <button className="action-btn" onClick={() => window.location.reload()}>
                Reload Page
              </button>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && user && (
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Profile Information</h3>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Member since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="dashboard-card">
            <h3>All Users ({allUsers.length})</h3>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((userData) => (
                    <tr key={userData.id}>
                      <td>{userData.username}</td>
                      <td>{userData.email}</td>
                      <td>{userData.created_at ? new Date(userData.created_at).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && dashboardStats && (
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>User Statistics</h3>
              <p><strong>Total Users:</strong> {dashboardStats.total_users}</p>
              <p><strong>New Users (30 days):</strong> {dashboardStats.recent_users_30_days}</p>
              <p><strong>Users Today:</strong> {dashboardStats.users_registered_today}</p>
              <p><strong>Database:</strong> {dashboardStats.database_name}</p>
              <p><strong>Collection:</strong> {dashboardStats.collection_name}</p>
              <p><strong>Last Updated:</strong> {new Date(dashboardStats.last_updated).toLocaleString()}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;