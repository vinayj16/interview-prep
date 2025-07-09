import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus, FaTrash, FaDownload, FaFilePdf, FaImage } from 'react-icons/fa';
import { useToast } from '../App';
import { generateResumeWithAI } from '../services/geminiService';
import ResumePreview from './ResumePreview';
import './Profile.css';

const initialUserData = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
  experience: [
    {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ],
  education: [
    {
      id: Date.now() + 1,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: ''
    }
  ],
  skills: [],
  projects: [
    {
      id: Date.now() + 2,
      name: '',
      description: '',
      technologies: ''
    }
  ],
  links: {
    github: '',
    linkedin: '',
    portfolio: '',
    leetcode: '',
    codeforces: ''
  },
  certifications: []
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('userProfileData');
    return savedData ? JSON.parse(savedData) : initialUserData;
  });
  const [jobDescription, setJobDescription] = useState('');
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [resumeContent, setResumeContent] = useState('');
  const [showResumePreview, setShowResumePreview] = useState(false);
  const showToast = useToast();

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProfileData', JSON.stringify(userData));
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setUserData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (arrayName, newItem) => {
    setUserData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { ...newItem, id: Date.now() }]
    }));
  };

  const removeArrayItem = (arrayName, id) => {
    setUserData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter(item => item.id !== id)
    }));
  };

  const handleSkillChange = (e) => {
    const { value } = e.target;
    if (e.key === 'Enter' && value.trim()) {
      setUserData(prev => ({
        ...prev,
        skills: [...new Set([...prev.skills, value.trim()])]
      }));
      e.target.value = '';
    }
  };

  const removeSkill = (skillToRemove) => {
    setUserData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Profile saved successfully!');
    setIsEditing(false);
  };

  const generateResume = async () => {
    if (!jobDescription.trim()) {
      showToast('Please enter a job description');
      return;
    }

    setIsGeneratingResume(true);
    try {
      const response = await generateResumeWithAI(userData, jobDescription);
      setResumeContent(response);
      setShowResumePreview(true);
    } catch (error) {
      console.error('Error generating resume:', error);
      showToast('Failed to generate resume. Please try again.');
    } finally {
      setIsGeneratingResume(false);
    }
  };

  const renderResumeTab = () => (
    <div className="resume-tab">
      <h2>AI-Powered Resume Builder</h2>
      <div className="form-group">
        <label>Paste the Job Description</label>
        <textarea
          className="form-control"
          rows="6"
          placeholder="Paste the job description here to generate a tailored resume..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button
          className="btn btn-primary"
          onClick={generateResume}
          disabled={isGeneratingResume}
        >
          {isGeneratingResume ? 'Generating...' : 'Generate Resume'}
        </button>
      </div>
      
      {showResumePreview && (
        <ResumePreview
          content={resumeContent}
          onClose={() => setShowResumePreview(false)}
        />
      )}
    </div>
  );

  // ... [rest of the component code remains the same]
  
  return (
    <div className="profile-container">
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`tab-btn ${activeTab === 'resume' ? 'active' : ''}`}
          onClick={() => setActiveTab('resume')}
        >
          Resume Builder
        </button>
      </div>
      
      <div className="profile-content">
        {activeTab === 'profile' ? (
          <div className="profile-info">
            {isEditing ? (
              <form onSubmit={handleSave}>
                {/* Profile form fields will go here */}
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-view">
                <div className="profile-header">
                  <div>
                    <h2>{userData.fullName || 'Your Name'}</h2>
                    <p className="text-muted">{userData.summary || 'Professional summary'}</p>
                  </div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaEdit /> Edit Profile
                  </button>
                </div>
                {/* Profile view content will go here */}
              </div>
            )}
          </div>
        ) : (
          renderResumeTab()
        )}
      </div>
    </div>
  );
};

export default Profile;
