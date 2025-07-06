import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaEdit, FaSave, FaTimes, FaChartLine, FaTrophy, FaFire, FaCalendarAlt } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import './Profile.css';

const Profile = ({ user, setUser }) => {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    bio: '',
    skills: [],
    experience: '',
    education: ''
  });

  const [stats, setStats] = useState({
    problemsSolved: 0,
    mcqsCompleted: 0,
    currentStreak: 0,
    totalPoints: 0,
    joinDate: new Date().toISOString().split('T')[0],
    lastActive: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Load user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        linkedin: user.linkedin || '',
        github: user.github || '',
        bio: user.bio || '',
        skills: user.skills || [],
        experience: user.experience || '',
        education: user.education || ''
      });
    }

    // Load stats from localStorage
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillsChange = (value) => {
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({
      ...prev,
      skills: skillsArray
    }));
  };

  const handleSave = () => {
    const updatedUser = { ...formData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        linkedin: user.linkedin || '',
        github: user.github || '',
        bio: user.bio || '',
        skills: user.skills || [],
        experience: user.experience || '',
        education: user.education || ''
      });
    }
    setIsEditing(false);
  };

  const handleLogin = () => {
    // Simple login simulation
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      bio: 'Passionate software developer with 3+ years of experience in full-stack development.',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
      experience: 'Software Engineer at Tech Corp',
      education: 'BS Computer Science, Stanford University'
    };
    
    setUser(userData);
    setFormData(userData);
    showToast('Welcome back!', 'success');
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="login-section">
            <div className="login-card">
              <div className="login-icon">
                <FaUser />
              </div>
              <h2>Welcome to InterviewPrep</h2>
              <p>Sign in to track your progress, save your work, and access personalized features.</p>
              
              <div className="login-features">
                <div className="feature-item">
                  <FaChartLine />
                  <span>Track your progress</span>
                </div>
                <div className="feature-item">
                  <FaTrophy />
                  <span>Earn achievements</span>
                </div>
                <div className="feature-item">
                  <FaFire />
                  <span>Maintain streaks</span>
                </div>
              </div>
              
              <button className="btn btn-primary btn-lg" onClick={handleLogin}>
                Sign In
              </button>
              
              <p className="login-note">
                This is a demo. Click "Sign In" to continue with a sample profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUser />
          </div>
          <div className="profile-info">
            <h1>{user.name || 'User'}</h1>
            <p className="profile-title">{formData.experience || 'Software Developer'}</p>
            <div className="profile-meta">
              <span><FaCalendarAlt /> Joined {new Date(stats.joinDate).toLocaleDateString()}</span>
              <span><FaMapMarkerAlt /> {formData.location || 'Location not set'}</span>
            </div>
          </div>
          <div className="profile-actions">
            {!isEditing ? (
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                <FaEdit /> Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="btn btn-success" onClick={handleSave}>
                  <FaSave /> Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-content">
          {/* Stats Section */}
          <div className="stats-section">
            <h2>Your Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon problems">
                  <FaChartLine />
                </div>
                <div className="stat-info">
                  <h3>{stats.problemsSolved}</h3>
                  <p>Problems Solved</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon mcqs">
                  <FaTrophy />
                </div>
                <div className="stat-info">
                  <h3>{stats.mcqsCompleted}</h3>
                  <p>MCQs Completed</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon streak">
                  <FaFire />
                </div>
                <div className="stat-info">
                  <h3>{stats.currentStreak}</h3>
                  <p>Day Streak</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon points">
                  <FaTrophy />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalPoints}</h3>
                  <p>Total Points</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="details-section">
            <h2>Profile Details</h2>
            <div className="details-grid">
              {/* Personal Information */}
              <div className="detail-card">
                <h3>Personal Information</h3>
                <div className="detail-form">
                  <div className="form-group">
                    <label><FaUser /> Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <span>{formData.name || 'Not set'}</span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label><FaEnvelope /> Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    ) : (
                      <span>{formData.email || 'Not set'}</span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label><FaPhone /> Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <span>{formData.phone || 'Not set'}</span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label><FaMapMarkerAlt /> Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Enter your location"
                      />
                    ) : (
                      <span>{formData.location || 'Not set'}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="detail-card">
                <h3>Social Links</h3>
                <div className="detail-form">
                  <div className="form-group">
                    <label><FaLinkedin /> LinkedIn</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        placeholder="LinkedIn profile URL"
                      />
                    ) : (
                      <span>
                        {formData.linkedin ? (
                          <a href={formData.linkedin} target="_blank" rel="noopener noreferrer">
                            {formData.linkedin}
                          </a>
                        ) : (
                          'Not set'
                        )}
                      </span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label><FaGithub /> GitHub</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        placeholder="GitHub profile URL"
                      />
                    ) : (
                      <span>
                        {formData.github ? (
                          <a href={formData.github} target="_blank" rel="noopener noreferrer">
                            {formData.github}
                          </a>
                        ) : (
                          'Not set'
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="detail-card full-width">
                <h3>Bio</h3>
                <div className="detail-form">
                  <div className="form-group">
                    {isEditing ? (
                      <textarea
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows="4"
                      />
                    ) : (
                      <p>{formData.bio || 'No bio added yet.'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="detail-card">
                <h3>Skills</h3>
                <div className="detail-form">
                  <div className="form-group">
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.skills.join(', ')}
                        onChange={(e) => handleSkillsChange(e.target.value)}
                        placeholder="JavaScript, React, Node.js (comma separated)"
                      />
                    ) : (
                      <div className="skills-list">
                        {formData.skills.length > 0 ? (
                          formData.skills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))
                        ) : (
                          <span>No skills added yet.</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="detail-card">
                <h3>Experience</h3>
                <div className="detail-form">
                  <div className="form-group">
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        placeholder="Current position and company"
                      />
                    ) : (
                      <span>{formData.experience || 'Not set'}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="detail-card">
                <h3>Education</h3>
                <div className="detail-form">
                  <div className="form-group">
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.education}
                        onChange={(e) => handleInputChange('education', e.target.value)}
                        placeholder="Degree and university"
                      />
                    ) : (
                      <span>{formData.education || 'Not set'}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;