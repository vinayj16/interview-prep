import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Full-stack developer with 5+ years of experience in React, Node.js, and Python. Passionate about clean code and user experience.',
    skills: ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB'],
    experience: '5+ years',
    education: 'Bachelor of Computer Science',
    github: 'github.com/johndoe',
    linkedin: 'linkedin.com/in/johndoe'
  });

  const [editForm, setEditForm] = useState(profile);

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <div className="profile-actions">
          {!isEditing ? (
            <button className="btn btn-primary" onClick={handleEdit}>
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
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              <FaUser />
            </div>
          </div>

          <div className="profile-info">
            {!isEditing ? (
              <>
                <h2>{profile.name}</h2>
                <p className="profile-bio">{profile.bio}</p>
                
                <div className="profile-details">
                  <div className="detail-item">
                    <FaEnvelope />
                    <span>{profile.email}</span>
                  </div>
                  <div className="detail-item">
                    <FaPhone />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="detail-item">
                    <FaMapMarkerAlt />
                    <span>{profile.location}</span>
                  </div>
                </div>

                <div className="profile-stats">
                  <div className="stat">
                    <span className="stat-value">{profile.experience}</span>
                    <span className="stat-label">Experience</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{profile.skills.length}</span>
                    <span className="stat-label">Skills</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">127</span>
                    <span className="stat-label">Problems Solved</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="edit-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="profile-sections">
          <div className="section">
            <h3>Skills</h3>
            <div className="skills-grid">
              {profile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>

          <div className="section">
            <h3>Education</h3>
            <p>{profile.education}</p>
          </div>

          <div className="section">
            <h3>Social Links</h3>
            <div className="social-links">
              <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 