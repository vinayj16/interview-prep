import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
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
=======
import { Link } from 'react-router-dom';
import { FaCode, FaQuestionCircle, FaFileAlt, FaRoad, FaStar, FaFire, FaTrophy, FaCalendarAlt, FaChartLine, FaUsers } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
import './Dashboard.css';

const Dashboard = () => {
  const { showToast } = useToast();
  const { state, actions } = useApp();
  const [dailyChallenge, setDailyChallenge] = useState({
    title: "Two Sum",
    difficulty: "Easy",
    completed: false,
    description: "Find two numbers in an array that add up to a target sum."
  });

  const [recentActivity, setRecentActivity] = useState([
    { type: 'coding', title: 'Array Rotation', time: '2 hours ago', status: 'completed' },
    { type: 'mcq', title: 'JavaScript Fundamentals', time: '1 day ago', status: 'completed' },
    { type: 'resume', title: 'Resume Updated', time: '2 days ago', status: 'completed' }
  ]);

  useEffect(() => {
    // Check if it's a new day for daily challenge
    const lastChallengeDate = localStorage.getItem('lastChallengeDate');
    const today = new Date().toDateString();
    
    if (lastChallengeDate !== today) {
      setDailyChallenge(prev => ({ ...prev, completed: false }));
    }
  }, []);

  const handleDailyChallengeComplete = () => {
    if (!dailyChallenge.completed) {
      setDailyChallenge(prev => ({ ...prev, completed: true }));
      
      const newStats = {
        currentStreak: state.stats.currentStreak + 1,
        totalPoints: state.stats.totalPoints + 50,
        problemsSolved: state.stats.problemsSolved + 1
      };
      
      actions.updateStats(newStats);
      localStorage.setItem('lastChallengeDate', new Date().toDateString());
      
      // Celebration effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      showToast('Daily challenge completed! 🎉', 'success');
    }
  };

  const quickStats = [
    { label: 'Problems Solved', value: state.stats.problemsSolved, icon: FaCode, color: '#3b82f6' },
    { label: 'MCQs Completed', value: state.stats.mcqsCompleted, icon: FaQuestionCircle, color: '#10b981' },
    { label: 'Current Streak', value: state.stats.currentStreak, icon: FaFire, color: '#f59e0b' },
    { label: 'Total Points', value: state.stats.totalPoints, icon: FaTrophy, color: '#ef4444' }
  ];

  const quickActions = [
    { title: 'Start Coding', description: 'Practice coding problems', link: '/coding', icon: FaCode, color: '#3b82f6' },
    { title: 'Take MCQs', description: 'Test your knowledge', link: '/mcqs', icon: FaQuestionCircle, color: '#10b981' },
    { title: 'Build Resume', description: 'Create AI-powered resume', link: '/resume', icon: FaFileAlt, color: '#8b5cf6' },
    { title: 'Study Roadmap', description: 'Follow learning path', link: '/roadmap', icon: FaRoad, color: '#f59e0b' }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome back{state.user?.name ? `, ${state.user.name}` : ''}! 👋</h1>
          <p>Ready to ace your next interview? Let's continue your preparation journey.</p>
        </div>

        {/* Daily Challenge */}
        <div className="daily-challenge card">
          <div className="challenge-header">
            <div className="challenge-info">
              <h2><FaCalendarAlt /> Daily Challenge</h2>
              <div className="challenge-details">
                <h3>{dailyChallenge.title}</h3>
                <span className={`difficulty ${dailyChallenge.difficulty.toLowerCase()}`}>
                  {dailyChallenge.difficulty}
                </span>
              </div>
              <p>{dailyChallenge.description}</p>
            </div>
            <div className="challenge-action">
              {dailyChallenge.completed ? (
                <div className="completed-badge">
                  <FaTrophy />
                  <span>Completed!</span>
                </div>
              ) : (
                <Link 
                  to="/coding" 
                  className="btn btn-primary"
                  onClick={handleDailyChallengeComplete}
                >
                  Start Challenge
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <h2>Your Progress</h2>
          <div className="stats-grid">
            {quickStats.map((stat, index) => (
              <div key={index} className="stat-card card">
                <div className="stat-icon" style={{ color: stat.color }}>
                  <stat.icon />
                </div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link} className="action-card card">
                <div className="action-icon" style={{ color: action.color }}>
                  <action.icon />
                </div>
                <div className="action-info">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2><FaChartLine /> Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item card">
                <div className="activity-icon">
                  {activity.type === 'coding' && <FaCode />}
                  {activity.type === 'mcq' && <FaQuestionCircle />}
                  {activity.type === 'resume' && <FaFileAlt />}
                </div>
                <div className="activity-info">
                  <h4>{activity.title}</h4>
                  <p>{activity.time}</p>
                </div>
                <div className={`activity-status ${activity.status}`}>
                  {activity.status === 'completed' && <FaTrophy />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Streak */}
        <div className="study-streak card">
          <div className="streak-content">
            <div className="streak-icon">
              <FaFire />
            </div>
            <div className="streak-info">
              <h3>{state.stats.currentStreak} Day Streak!</h3>
              <p>Keep it up! Consistency is key to success.</p>
            </div>
            <div className="streak-visual">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className={`streak-day ${i < state.stats.currentStreak ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="community-section">
          <h2><FaUsers /> Community Highlights</h2>
          <div className="community-grid">
            <div className="community-card card">
              <h3>Top Performers</h3>
              <div className="leaderboard">
                <div className="leader-item">
                  <span className="rank">#1</span>
                  <span className="name">Alex Chen</span>
                  <span className="points">2,450 pts</span>
                </div>
                <div className="leader-item">
                  <span className="rank">#2</span>
                  <span className="name">Sarah Kim</span>
                  <span className="points">2,380 pts</span>
                </div>
                <div className="leader-item">
                  <span className="rank">#3</span>
                  <span className="name">Mike Johnson</span>
                  <span className="points">2,290 pts</span>
                </div>
              </div>
            </div>
            
            <div className="community-card card">
              <h3>Recent Discussions</h3>
              <div className="discussions">
                <div className="discussion-item">
                  <h4>Best practices for system design interviews</h4>
                  <p>24 replies • 2 hours ago</p>
                </div>
                <div className="discussion-item">
                  <h4>Dynamic Programming patterns</h4>
                  <p>18 replies • 5 hours ago</p>
                </div>
                <div className="discussion-item">
                  <h4>Mock interview experiences at FAANG</h4>
                  <p>31 replies • 1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
    </div>
  );
};

export default Dashboard;