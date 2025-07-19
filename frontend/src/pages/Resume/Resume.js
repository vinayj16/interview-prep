import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import { useToast } from '../../shared/Toast/Toast';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import { FaUser, FaGraduationCap, FaBriefcase, FaCode, FaProjectDiagram, FaCertificate, FaEye, FaArrowLeft, FaChevronRight, FaPlus, FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import './Resume.css';

const Resume = () => {
  const navigate = useNavigate();
  const { resumeData, isLoading, updateResumeData } = useResume();
  const { showToast } = useToast();
  const [activeSection, setActiveSection] = useState('personal');
  const [formData, setFormData] = useState({
    personalInfo: resumeData?.personalInfo || {},
    education: resumeData?.education || [],
    workExperience: resumeData?.workExperience || [],
    skills: resumeData?.skills || [],
    projects: resumeData?.projects || [],
    certifications: resumeData?.certifications || []
  });

  const sections = [
    { id: 'personal', icon: <FaUser />, label: 'Personal Information' },
    { id: 'education', icon: <FaGraduationCap />, label: 'Education' },
    { id: 'experience', icon: <FaBriefcase />, label: 'Work Experience' },
    { id: 'skills', icon: <FaCode />, label: 'Skills' },
    { id: 'projects', icon: <FaProjectDiagram />, label: 'Projects' },
    { id: 'certifications', icon: <FaCertificate />, label: 'Certifications' },
    { id: 'preview', icon: <FaEye />, label: 'Preview', variant: 'primary' }
  ];

  const isSectionActive = (sectionId) => {
    return activeSection === sectionId;
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleSave = async () => {
    try {
      await updateResumeData(formData);
      showToast('Resume saved successfully!', 'success');
    } catch (error) {
      showToast('Failed to save resume', 'error');
    }
  };
  
  const calculateCompletion = () => {
    // Simple completion calculation based on filled fields
    if (!resumeData) return 0;
    
    const fields = [
      resumeData.personalInfo?.firstName,
      resumeData.personalInfo?.lastName,
      resumeData.personalInfo?.email,
      resumeData.education?.length > 0,
      resumeData.workExperience?.length > 0,
      resumeData.skills?.length > 0,
      resumeData.projects?.length > 0,
      resumeData.certifications?.length > 0
    ];
    
    const filledFields = fields.filter(Boolean).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <LoadingSpinner size="lg" />
        <p>Loading your resume data...</p>
      </div>
    );
  }

  const renderPersonalInfoForm = () => (
    <div>
      <h2>Personal Information</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={formData.personalInfo.firstName || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, firstName: e.target.value }
            }))}
            className="form-input"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={formData.personalInfo.lastName || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, lastName: e.target.value }
            }))}
            className="form-input"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={formData.personalInfo.email || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, email: e.target.value }
            }))}
            className="form-input"
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="tel"
            value={formData.personalInfo.phone || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, phone: e.target.value }
            }))}
            className="form-input"
          />
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfoForm();
      case 'education':
        return <div><h2>Education</h2><p>Education form coming soon...</p></div>;
      case 'experience':
        return <div><h2>Work Experience</h2><p>Work experience form coming soon...</p></div>;
      case 'skills':
        return <div><h2>Skills</h2><p>Skills form coming soon...</p></div>;
      case 'projects':
        return <div><h2>Projects</h2><p>Projects form coming soon...</p></div>;
      case 'certifications':
        return <div><h2>Certifications</h2><p>Certifications form coming soon...</p></div>;
      case 'preview':
        return <div><h2>Resume Preview</h2><p>Resume preview coming soon...</p></div>;
      default:
        return renderPersonalInfoForm();
    }
  };

  return (
    <div className="resume-builder">
      <div className="resume-header">
        <h1>Resume Builder</h1>
        <p>Complete each section to build your perfect resume</p>
      </div>
      
      <div className="resume-content">
        <aside className="resume-sidebar">
          <div className="progress-section">
            <h3>Your Progress</h3>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${calculateCompletion()}%` }}
              ></div>
            </div>
            <p className="progress-text">{calculateCompletion()}% Complete</p>
          </div>
          
          <nav className="resume-nav">
            <ul>
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleSectionClick(section.id)}
                    className={`nav-button ${isSectionActive(section.id) ? 'active' : ''}`}
                  >
                    <span className="nav-icon">{section.icon}</span>
                    <span className="nav-label">{section.label}</span>
                    {isSectionActive(section.id) && <FaChevronRight className="nav-arrow" />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="sidebar-actions">
            <button 
              className="btn btn-outline"
              onClick={() => navigate('/dashboard')}
            >
              <FaArrowLeft /> Back to Dashboard
            </button>
          </div>
        </aside>
        
        <main className="resume-main">
          <div className="section-content">
            {renderCurrentSection()}
          </div>
          
          <div className="section-actions">
            <button 
              className="btn btn-primary"
              onClick={handleSave}
            >
              <FaSave /> Save Progress
            </button>
          </div>
        </main>
      </div>
    </div>
  );
  
  // The calculateCompletion function is already defined above and being used in the component
};

export default Resume;
