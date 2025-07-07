import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, Grid, Avatar, CircularProgress, Alert, useTheme } from '@mui/material';
import { FaCode, FaQuestionCircle, FaFileAlt, FaRoad, FaStar, FaFire, FaTrophy, FaCalendarAlt, FaChartLine, FaUsers } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { useToast } from './Toast/Toast';
import './Dashboard.css';
import axios from 'axios';

function Dashboard({ user, setUser }) {
  const theme = useTheme();
  const [stats, setStats] = useState({
    problemsSolved: 15,
    mcqsCompleted: 10,
    currentStreak: 7,
    totalPoints: 1250,
    rank: 'Intermediate',
    dailyChallenge: {
      title: "Two Sum",
      difficulty: "Easy",
      completed: false,
      description: "Find two numbers in an array that add up to a target sum."
    }
  });

  const { showToast } = useToast();

  const [recentActivity] = useState([
    { type: 'coding', title: 'Array Rotation', time: '2 hours ago', status: 'completed' },
    { type: 'mcq', title: 'JavaScript Fundamentals', time: '1 day ago', status: 'completed' },
    { type: 'resume', title: 'Resume Updated', time: '2 days ago', status: 'completed' }
  ]);

  const [profile, setProfile] = useState(user);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user stats from localStorage
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    // Check if it's a new day for daily challenge
    const lastChallengeDate = localStorage.getItem('lastChallengeDate');
    const today = new Date().toDateString();
    
    if (lastChallengeDate !== today) {
      setStats(prev => ({
        ...prev,
        dailyChallenge: {
          ...prev.dailyChallenge,
          completed: false
        }
      }));
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await axios.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data && response.data.success) {
          setProfile(response.data.data);
          setUser && setUser(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch profile.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [setUser]);

  const handleDailyChallengeComplete = () => {
    if (!stats.dailyChallenge.completed) {
      setStats(prev => ({
        ...prev,
        currentStreak: prev.currentStreak + 1,
        totalPoints: prev.totalPoints + 50,
        problemsSolved: prev.problemsSolved + 1,
        dailyChallenge: {
          ...prev.dailyChallenge,
          completed: true
        }
      }));
      
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

  const quickStats = useMemo(() => [
    { label: 'Problems Solved', value: stats.problemsSolved, icon: FaCode, color: '#3b82f6' },
    { label: 'MCQs Completed', value: stats.mcqsCompleted, icon: FaQuestionCircle, color: '#10b981' },
    { label: 'Current Streak', value: stats.currentStreak, icon: FaFire, color: '#f59e0b' },
    { label: 'Total Points', value: stats.totalPoints, icon: FaTrophy, color: '#ef4444' }
  ], [stats]);

  const quickActions = useMemo(() => [
    { title: 'Start Coding', description: 'Practice coding problems', link: '/coding', icon: FaCode, color: '#3b82f6' },
    { title: 'Take MCQs', description: 'Test your knowledge', link: '/mcqs', icon: FaQuestionCircle, color: '#10b981' },
    { title: 'Build Resume', description: 'Create AI-powered resume', link: '/resume', icon: FaFileAlt, color: '#8b5cf6' },
    { title: 'Study Roadmap', description: 'Follow learning path', link: '/roadmap', icon: FaRoad, color: '#f59e0b' }
  ], []);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
  if (error) return <Box p={3}><Alert severity="error">{error}</Alert></Box>;

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
      {/* Welcome Section */}
      <Box mb={4} textAlign="center">
        <Typography variant="h4" fontWeight={700} mb={1}>
          Welcome back{profile?.name ? `, ${profile.name}` : ''}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ready to ace your next interview? Let's continue your preparation journey.
        </Typography>
      </Box>

      {/* Daily Challenge */}
      <Card sx={{ mb: 4, background: theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc' }} elevation={2}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight={600} mb={1} display="flex" alignItems="center" gap={1}>
                <FaCalendarAlt /> Daily Challenge
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Typography variant="h6">{stats.dailyChallenge.title}</Typography>
                <Box
                  sx={{
                    px: 2, py: 0.5, borderRadius: 2, fontWeight: 600,
                    bgcolor: stats.dailyChallenge.difficulty === 'Easy' ? '#d1fae5' : stats.dailyChallenge.difficulty === 'Medium' ? '#fef9c3' : '#fee2e2',
                    color: stats.dailyChallenge.difficulty === 'Easy' ? '#10b981' : stats.dailyChallenge.difficulty === 'Medium' ? '#f59e0b' : '#ef4444',
                  }}
                >
                  {stats.dailyChallenge.difficulty}
                </Box>
              </Box>
              <Typography color="text.secondary" mb={2}>{stats.dailyChallenge.description}</Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign={{ xs: 'left', md: 'right' }}>
              {stats.dailyChallenge.completed ? (
                <Button variant="outlined" color="success" startIcon={<FaTrophy />} disabled>
                  Completed!
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDailyChallengeComplete}
                  component={Link}
                  to="/coding"
                  sx={{ minWidth: 160 }}
                >
                  Start Challenge
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight={600} mb={2}>Your Progress</Typography>
        <Grid container spacing={2}>
          {quickStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <Card elevation={1} sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 2 }}>
                <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48 }}>{<stat.icon />}</Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>{stat.value}</Typography>
                  <Typography color="text.secondary">{stat.label}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Quick Actions */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight={600} mb={2}>Quick Actions</Typography>
        <Grid container spacing={2}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={action.title}>
              <Card
                component={Link}
                to={action.link}
                elevation={2}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}
              >
                <Avatar sx={{ bgcolor: action.color, width: 48, height: 48, mb: 1 }}>{<action.icon />}</Avatar>
                <Typography variant="h6" fontWeight={600}>{action.title}</Typography>
                <Typography color="text.secondary" textAlign="center">{action.description}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recent Activity */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight={600} mb={2} display="flex" alignItems="center" gap={1}>
          <FaChartLine /> Recent Activity
        </Typography>
        <Grid container spacing={2}>
          {recentActivity.map((activity, index) => (
            <Grid item xs={12} sm={6} md={4} key={activity.title + index}>
              <Card elevation={1} sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 2 }}>
                <Avatar sx={{ bgcolor: '#e0e7ef', color: '#1976d2', width: 40, height: 40 }}>
                  {activity.type === 'coding' && <FaCode />}
                  {activity.type === 'mcq' && <FaQuestionCircle />}
                  {activity.type === 'resume' && <FaFileAlt />}
                </Avatar>
                <Box flex={1}>
                  <Typography fontWeight={600}>{activity.title}</Typography>
                  <Typography color="text.secondary">{activity.time}</Typography>
                </Box>
                <Box>
                  {activity.status === 'completed' && <FaTrophy color="#10b981" />}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Study Streak */}
      <Card sx={{ mb: 4, background: theme.palette.mode === 'dark' ? '#f59e0b' : '#fffbe6' }} elevation={2}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
            <Avatar sx={{ bgcolor: '#f59e0b', width: 56, height: 56 }}><FaFire /></Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700}>{stats.currentStreak} Day Streak!</Typography>
              <Typography color="text.secondary">Keep it up! Consistency is key to success.</Typography>
            </Box>
            <Box display="flex" gap={1} ml="auto">
              {[...Array(7)].map((_, i) => (
                <Box
                  key={i}
                  sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: i < stats.currentStreak ? '#fbbf24' : '#fde68a', border: '2px solid #f59e0b' }}
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Community Section */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight={600} mb={2} display="flex" alignItems="center" gap={1}>
          <FaUsers /> Community Highlights
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>Top Performers</Typography>
              <Box>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Typography fontWeight={700} color="primary">#1</Typography>
                  <Typography flex={1}>Alex Chen</Typography>
                  <Typography color="text.secondary">2,450 pts</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Typography fontWeight={700} color="primary">#2</Typography>
                  <Typography flex={1}>Sarah Kim</Typography>
                  <Typography color="text.secondary">2,380 pts</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography fontWeight={700} color="primary">#3</Typography>
                  <Typography flex={1}>Mike Johnson</Typography>
                  <Typography color="text.secondary">2,290 pts</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>Recent Discussions</Typography>
              <Box>
                <Box mb={2}>
                  <Typography fontWeight={600}>Best practices for system design interviews</Typography>
                  <Typography color="text.secondary">24 replies • 2 hours ago</Typography>
                </Box>
                <Box mb={2}>
                  <Typography fontWeight={600}>Dynamic Programming patterns</Typography>
                  <Typography color="text.secondary">18 replies • 5 hours ago</Typography>
                </Box>
                <Box>
                  <Typography fontWeight={600}>Mock interview experiences at FAANG</Typography>
                  <Typography color="text.secondary">31 replies • 1 day ago</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;