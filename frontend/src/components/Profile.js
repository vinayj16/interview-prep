import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaEdit, FaSave, FaTimes, FaChartLine, FaTrophy, FaFire, FaCalendarAlt } from 'react-icons/fa';
import { Box, Card, CardContent, Typography, Button, Grid, Avatar, TextField, Alert, Chip, CircularProgress, Tooltip } from '@mui/material';
import { useToast } from './Toast/Toast';
import axios from 'axios';

const Profile = ({ user, setUser }) => {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', location: '', linkedin: '', github: '', bio: '', skills: [], experience: '', education: ''
  });
  const [stats, setStats] = useState({
    problemsSolved: 0, mcqsCompleted: 0, currentStreak: 0, totalPoints: 0,
    joinDate: new Date().toISOString().split('T')[0], lastActive: new Date().toISOString().split('T')[0]
  });
  const [profile, setProfile] = useState(user);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '', email: user.email || '', phone: user.phone || '', location: user.location || '',
        linkedin: user.linkedin || '', github: user.github || '', bio: user.bio || '', skills: user.skills || [],
        experience: user.experience || '', education: user.education || ''
      });
    }
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) setStats(JSON.parse(savedStats));
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
  }, [setUser, user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSkillsChange = (value) => {
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({ ...prev, skills: skillsArray }));
    setFormErrors(prev => ({ ...prev, skills: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required.';
    if (!formData.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) errors.email = 'Valid email is required.';
    if (formData.linkedin && !/^https?:\/\//.test(formData.linkedin)) errors.linkedin = 'Enter a valid URL.';
    if (formData.github && !/^https?:\/\//.test(formData.github)) errors.github = 'Enter a valid URL.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    const updatedUser = { ...formData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '', email: user.email || '', phone: user.phone || '', location: user.location || '',
        linkedin: user.linkedin || '', github: user.github || '', bio: user.bio || '', skills: user.skills || [],
        experience: user.experience || '', education: user.education || ''
      });
    }
    setIsEditing(false);
    setFormErrors({});
  };

  const handleLogin = () => {
    const userData = {
      name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567', location: 'San Francisco, CA',
      linkedin: 'https://linkedin.com/in/johndoe', github: 'https://github.com/johndoe',
      bio: 'Passionate software developer with 3+ years of experience in full-stack development.',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
      experience: 'Software Engineer at Tech Corp', education: 'BS Computer Science, Stanford University'
    };
    setUser(userData);
    setFormData(userData);
    showToast('Welcome back!', 'success');
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
  if (error) return <Box p={3}><Alert severity="error">{error}</Alert></Box>;

  if (!user) {
    return (
      <Box minHeight="60vh" display="flex" alignItems="center" justifyContent="center">
        <Card sx={{ maxWidth: 400, p: 4, textAlign: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mx: 'auto', mb: 2 }}><FaUser size={32} /></Avatar>
          <Typography variant="h5" fontWeight={700} mb={1}>Welcome to InterviewPrep</Typography>
          <Typography color="text.secondary" mb={2}>Sign in to track your progress, save your work, and access personalized features.</Typography>
          <Box mb={2}>
            <Box display="flex" alignItems="center" gap={1} mb={1}><FaChartLine /><span>Track your progress</span></Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}><FaTrophy /><span>Earn achievements</span></Box>
            <Box display="flex" alignItems="center" gap={1}><FaFire /><span>Maintain streaks</span></Box>
          </Box>
          <Button variant="contained" color="primary" size="large" fullWidth onClick={handleLogin} sx={{ mb: 2 }}>Sign In</Button>
          <Typography color="text.secondary" fontSize={14}>This is a demo. Click "Sign In" to continue with a sample profile.</Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, maxWidth: 1100, mx: 'auto' }}>
      {/* Profile Header */}
      <Card sx={{ display: 'flex', alignItems: 'center', p: 3, mb: 4, flexWrap: 'wrap', gap: 3 }} elevation={2}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, fontSize: 40 }}><FaUser /></Avatar>
        <Box flex={1} minWidth={200}>
          <Typography variant="h4" fontWeight={700}>{profile.name || 'User'}</Typography>
          <Typography color="text.secondary" mb={1}>{formData.experience || 'Software Developer'}</Typography>
          <Box display="flex" gap={2} flexWrap="wrap" color="text.secondary">
            <Box display="flex" alignItems="center" gap={0.5}><FaCalendarAlt /> Joined {new Date(stats.joinDate).toLocaleDateString()}</Box>
            <Box display="flex" alignItems="center" gap={0.5}><FaMapMarkerAlt /> {formData.location || 'Location not set'}</Box>
          </Box>
        </Box>
        <Box>
          {!isEditing ? (
            <Button variant="contained" color="primary" startIcon={<FaEdit />} onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          ) : (
            <Box display="flex" gap={1}>
              <Button variant="contained" color="success" startIcon={<FaSave />} onClick={handleSave}>Save</Button>
              <Button variant="outlined" color="secondary" startIcon={<FaTimes />} onClick={handleCancel}>Cancel</Button>
            </Box>
          )}
        </Box>
      </Card>

      {/* Stats Section */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight={600} mb={2}>Your Statistics</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={1} sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 2 }}>
              <Avatar sx={{ bgcolor: '#3b82f6', width: 48, height: 48 }}><FaChartLine /></Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700}>{stats.problemsSolved}</Typography>
                <Typography color="text.secondary">Problems Solved</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={1} sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 2 }}>
              <Avatar sx={{ bgcolor: '#10b981', width: 48, height: 48 }}><FaTrophy /></Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700}>{stats.mcqsCompleted}</Typography>
                <Typography color="text.secondary">MCQs Completed</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={1} sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 2 }}>
              <Avatar sx={{ bgcolor: '#f59e0b', width: 48, height: 48 }}><FaFire /></Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700}>{stats.currentStreak}</Typography>
                <Typography color="text.secondary">Day Streak</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={1} sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 2 }}>
              <Avatar sx={{ bgcolor: '#8b5cf6', width: 48, height: 48 }}><FaTrophy /></Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700}>{stats.totalPoints}</Typography>
                <Typography color="text.secondary">Total Points</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Profile Details */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight={600} mb={2}>Profile Details</Typography>
        <Grid container spacing={2}>
          {/* Personal Information */}
          <Grid item xs={12} md={6}>
            <Card elevation={1} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>Personal Information</Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Full Name"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  fullWidth
                  InputProps={{ startAdornment: <FaUser style={{ marginRight: 8 }} /> }}
                />
                <TextField
                  label="Email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  fullWidth
                  InputProps={{ startAdornment: <FaEnvelope style={{ marginRight: 8 }} /> }}
                />
                <TextField
                  label="Phone"
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  fullWidth
                  InputProps={{ startAdornment: <FaPhone style={{ marginRight: 8 }} /> }}
                />
                <TextField
                  label="Location"
                  value={formData.location}
                  onChange={e => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                  fullWidth
                  InputProps={{ startAdornment: <FaMapMarkerAlt style={{ marginRight: 8 }} /> }}
                />
              </Box>
            </Card>
          </Grid>
          {/* Social Links */}
          <Grid item xs={12} md={6}>
            <Card elevation={1} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>Social Links</Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="LinkedIn"
                  value={formData.linkedin}
                  onChange={e => handleInputChange('linkedin', e.target.value)}
                  disabled={!isEditing}
                  error={!!formErrors.linkedin}
                  helperText={formErrors.linkedin}
                  fullWidth
                  InputProps={{ startAdornment: <FaLinkedin style={{ marginRight: 8 }} /> }}
                />
                <TextField
                  label="GitHub"
                  value={formData.github}
                  onChange={e => handleInputChange('github', e.target.value)}
                  disabled={!isEditing}
                  error={!!formErrors.github}
                  helperText={formErrors.github}
                  fullWidth
                  InputProps={{ startAdornment: <FaGithub style={{ marginRight: 8 }} /> }}
                />
              </Box>
            </Card>
          </Grid>
          {/* Bio */}
          <Grid item xs={12}>
            <Card elevation={1} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>Bio</Typography>
              <TextField
                label="Bio"
                value={formData.bio}
                onChange={e => handleInputChange('bio', e.target.value)}
                disabled={!isEditing}
                multiline
                minRows={3}
                fullWidth
              />
            </Card>
          </Grid>
          {/* Skills */}
          <Grid item xs={12} md={6}>
            <Card elevation={1} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>Skills</Typography>
              {isEditing ? (
                <TextField
                  label="Skills (comma separated)"
                  value={formData.skills.join(', ')}
                  onChange={e => handleSkillsChange(e.target.value)}
                  error={!!formErrors.skills}
                  helperText={formErrors.skills}
                  fullWidth
                />
              ) : (
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {formData.skills.length > 0 ? (
                    formData.skills.map((skill, idx) => (
                      <Chip key={idx} label={skill} color="primary" variant="outlined" />
                    ))
                  ) : (
                    <Typography color="text.secondary">No skills added yet.</Typography>
                  )}
                </Box>
              )}
            </Card>
          </Grid>
          {/* Experience */}
          <Grid item xs={12} md={6}>
            <Card elevation={1} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>Experience</Typography>
              <TextField
                label="Experience"
                value={formData.experience}
                onChange={e => handleInputChange('experience', e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
            </Card>
          </Grid>
          {/* Education */}
          <Grid item xs={12} md={6}>
            <Card elevation={1} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>Education</Typography>
              <TextField
                label="Education"
                value={formData.education}
                onChange={e => handleInputChange('education', e.target.value)}
                disabled={!isEditing}
                fullWidth
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;