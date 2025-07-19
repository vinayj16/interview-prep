import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCode, 
  FaQuestionCircle, 
  FaChartLine, 
  FaCalendarAlt,
  FaTrophy,
  FaBookOpen,
  FaMapMarkedAlt,
  FaFileAlt,
  FaSpinner
} from 'react-icons/fa';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../shared/Toast/Toast';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import './Dashboard.css';

const Dashboard = () => {
  const { state } = useApp();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);

  // Use real stats from AppContext
  const stats = [
    { 
      icon: <FaCode className="stat-icon" />, 
      label: 'Problems Solved', 
      value: state.stats.problemsSolved.toString(), 
      change: '+12%' 
    },
    { 
      icon: <FaQuestionCircle className="stat-icon" />, 
      label: 'MCQs Completed', 
      value: state.stats.mcqsCompleted.toString(), 
      change: '+8%' 
    },
    { 
      icon: <FaChartLine className="stat-icon" />, 
      label: 'Total Points', 
      value: state.stats.totalPoints.toString(), 
      change: '+5%' 
    },
    { 
      icon: <FaTrophy className="stat-icon" />, 
      label: 'Current Streak', 
      value: `${state.stats.currentStreak} days`, 
      change: '🔥' 
    },
  ];

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Mock recent activities - in real app, fetch from API
        const mockActivities = [
          { id: 1, type: 'Solved', title: 'Two Sum', difficulty: 'Easy', time: '2 hours ago' },
          { id: 2, type: 'Attempted', title: 'Add Two Numbers', difficulty: 'Medium', time: '5 hours ago' },
          { id: 3, type: 'Completed', title: 'System Design: URL Shortener', difficulty: 'Hard', time: '1 day ago' },
          { id: 4, type: 'Started', title: 'React Hooks Quiz', difficulty: 'Medium', time: '2 days ago' },
        ];
        
        // Mock upcoming interviews - in real app, fetch from API
        const mockInterviews = [
          { id: 1, company: 'Tech Corp', role: 'Frontend Developer', date: 'Jul 25, 2023', time: '10:00 AM' },
          { id: 2, company: 'Soft Systems', role: 'Full Stack Engineer', date: 'Aug 2, 2023', time: '2:30 PM' },
        ];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setRecentActivities(mockActivities);
        setUpcomingInterviews(mockInterviews);
        
        // Show welcome toast
        showToast(`Welcome back, ${state.user?.name || 'User'}!`, 'success');
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        showToast('Failed to load dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Loading your dashboard...</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return <div style={{color: 'red', fontSize: 32}}>HELLO WORLD</div>;
};

export default Dashboard;
