import React, { useState, useCallback } from 'react';
import { FaUser, FaGraduationCap, FaBriefcase, FaCog, FaDownload, FaRobot, FaSpinner } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
import { useApi } from '../hooks/useApi';
import apiService from '../services/apiService';
import ResumePreview from './ResumePreview/ResumePreview';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import './Resume.css';

const Resume = () => {
  const { showToast } = useToast();
  const { state } = useApp();
  const { loading, execute } = useApi();
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    personalInfo: {
      name: state.user?.name || '',
      email: state.user?.email || '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: ''
    },
    experience: [
      {
        position: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: ['']
      }
    ],
    education: [
      {
        degree: '',
        institution: '',
        location: '',
        graduationDate: '',
        gpa: ''
      }
    ],
    skills: {
      technical: [],
      languages: [],
      frameworks: [],
      tools: []
    },
    projects: [
      {
        name: '',
        description: '',
        technologies: [],
        link: '',
        github: ''
      }
    ],
    targetRole: '',
    targetCompany: '',
    summary: ''
  });

  const handleInputChange = useCallback((section, field, value, index = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (index !== null) {
        newData[section][index] = { ...newData[section][index], [field]: value };
      } else if (section === 'skills') {
        newData[section][field] = Array.isArray(value) ? value : value.split(',').map(s => s.trim()).filter(s => s);
      } else {
        newData[section][field] = value;
      }
      
      return newData;
    });
  }, []);

  const addArrayItem = useCallback((section, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], defaultItem]
    }));
  }, []);

  const removeArrayItem = useCallback((section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  }, []);

  const addResponsibility = useCallback((expIndex) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData.experience[expIndex].responsibilities.push('');
      return newData;
    });
  }, []);

  const updateResponsibility = useCallback((expIndex, respIndex, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData.experience[expIndex].responsibilities[respIndex] = value;
      return newData;
    });
  }, []);

  const removeResponsibility = useCallback((expIndex, respIndex) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData.experience[expIndex].responsibilities = 
        newData.experience[expIndex].responsibilities.filter((_, i) => i !== respIndex);
      return newData;
    });
  }, []);

  const generateAIResume = async () => {
    try {
      if (state.backendConnected) {
        const result = await execute(
          () => apiService.generateResume(formData),
          {
            showSuccessToast: true,
            successMessage: 'AI resume generated successfully!'
          }
        );
        
        if (result.success) {
          setGeneratedResume(result.data);
          setShowPreview(true);
        }
      } else {
        // Simulate AI generation for offline mode
        showToast('Generating AI-powered resume...', 'info');
        
        setTimeout(() => {
          const enhancedResume = {
            ...formData,
            summary: formData.summary || `Experienced ${formData.targetRole || 'Software Developer'} with a proven track record of delivering high-quality solutions. Passionate about technology and continuous learning, with strong problem-solving skills and the ability to work effectively in team environments.`,
            experience: formData.experience.map(exp => ({
              ...exp,
              responsibilities: exp.responsibilities.length > 0 && exp.responsibilities[0] 
                ? exp.responsibilities 
                : [
                    `Led development of key features for ${exp.company || 'the company'}`,
                    'Collaborated with cross-functional teams to deliver projects on time',
                    'Implemented best practices and improved code quality'
                  ]
            }))
          };
          
          setGeneratedResume(enhancedResume);
          setShowPreview(true);
          showToast('AI resume generated successfully!', 'success');
        }, 2000);
      }
    } catch (error) {
      console.error('Error generating resume:', error);
    }
  };

  const handlePreview = () => {
    setGeneratedResume(formData);
    setShowPreview(true);
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: FaUser },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'skills', label: 'Skills', icon: FaCog },
    { id: 'projects', label: 'Projects', icon: FaCog }
  ];

  const renderPersonalInfo = () => (
    <div className="form-section">
      <h3>Personal Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            value={formData.personalInfo.name}
            onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={formData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={formData.personalInfo.location}
            onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="url"
            value={formData.personalInfo.linkedin}
            onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        <div className="form-group">
          <label>GitHub</label>
          <input
            type="url"
            value={formData.personalInfo.github}
            onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)}
            placeholder="https://github.com/johndoe"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Target Role</label>
        <input
          type="text"
          value={formData.targetRole}
          onChange={(e) => handleInputChange('', 'targetRole', e.target.value)}
          placeholder="Software Engineer"
        />
      </div>
      
      <div className="form-group">
        <label>Target Company</label>
        <input
          type="text"
          value={formData.targetCompany}
          onChange={(e) => handleInputChange('', 'targetCompany', e.target.value)}
          placeholder="Google"
        />
      </div>
      
      <div className="form-group">
        <label>Professional Summary</label>
        <textarea
          value={formData.summary}
          onChange={(e) => handleInputChange('', 'summary', e.target.value)}
          placeholder="Brief professional summary..."
          rows="4"
        />
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Work Experience</h3>
        <button 
          className="btn btn-secondary"
          onClick={() => addArrayItem('experience', {
            position: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            responsibilities: ['']
          })}
        >
          Add Experience
        </button>
      </div>
      
      {formData.experience.map((exp, index) => (
        <div key={index} className="experience-item">
          <div className="item-header">
            <h4>Experience {index + 1}</h4>
            {formData.experience.length > 1 && (
              <button 
                className="btn btn-error btn-sm"
                onClick={() => removeArrayItem('experience', index)}
              >
                Remove
              </button>
            )}
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                placeholder="Software Engineer"
                required
              />
            </div>
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                placeholder="Tech Corp"
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => handleInputChange('experience', 'location', e.target.value, index)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                disabled={exp.current}
              />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => handleInputChange('experience', 'current', e.target.checked, index)}
                />
                Currently working here
              </label>
            </div>
          </div>
          
          <div className="responsibilities-section">
            <div className="section-header">
              <label>Responsibilities & Achievements</label>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => addResponsibility(index)}
              >
                Add Responsibility
              </button>
            </div>
            
            {exp.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} className="responsibility-item">
                <textarea
                  value={resp}
                  onChange={(e) => updateResponsibility(index, respIndex, e.target.value)}
                  placeholder="Describe your responsibility or achievement..."
                  rows="2"
                />
                {exp.responsibilities.length > 1 && (
                  <button 
                    className="btn btn-error btn-sm"
                    onClick={() => removeResponsibility(index, respIndex)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderEducation = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Education</h3>
        <button 
          className="btn btn-secondary"
          onClick={() => addArrayItem('education', {
            degree: '',
            institution: '',
            location: '',
            graduationDate: '',
            gpa: ''
          })}
        >
          Add Education
        </button>
      </div>
      
      {formData.education.map((edu, index) => (
        <div key={index} className="education-item">
          <div className="item-header">
            <h4>Education {index + 1}</h4>
            {formData.education.length > 1 && (
              <button 
                className="btn btn-error btn-sm"
                onClick={() => removeArrayItem('education', index)}
              >
                Remove
              </button>
            )}
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Degree *</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                placeholder="Bachelor of Science in Computer Science"
                required
              />
            </div>
            <div className="form-group">
              <label>Institution *</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                placeholder="University of California"
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) => handleInputChange('education', 'location', e.target.value, index)}
                placeholder="Berkeley, CA"
              />
            </div>
            <div className="form-group">
              <label>Graduation Date</label>
              <input
                type="month"
                value={edu.graduationDate}
                onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value, index)}
              />
            </div>
            <div className="form-group">
              <label>GPA</label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => handleInputChange('education', 'gpa', e.target.value, index)}
                placeholder="3.8/4.0"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="form-section">
      <h3>Skills</h3>
      
      <div className="form-group">
        <label>Technical Skills</label>
        <input
          type="text"
          value={formData.skills.technical.join(', ')}
          onChange={(e) => handleInputChange('skills', 'technical', e.target.value)}
          placeholder="JavaScript, Python, Java, C++"
        />
        <small>Separate skills with commas</small>
      </div>
      
      <div className="form-group">
        <label>Programming Languages</label>
        <input
          type="text"
          value={formData.skills.languages.join(', ')}
          onChange={(e) => handleInputChange('skills', 'languages', e.target.value)}
          placeholder="JavaScript, Python, Java"
        />
        <small>Separate languages with commas</small>
      </div>
      
      <div className="form-group">
        <label>Frameworks & Libraries</label>
        <input
          type="text"
          value={formData.skills.frameworks.join(', ')}
          onChange={(e) => handleInputChange('skills', 'frameworks', e.target.value)}
          placeholder="React, Node.js, Express, Django"
        />
        <small>Separate frameworks with commas</small>
      </div>
      
      <div className="form-group">
        <label>Tools & Technologies</label>
        <input
          type="text"
          value={formData.skills.tools.join(', ')}
          onChange={(e) => handleInputChange('skills', 'tools', e.target.value)}
          placeholder="Git, Docker, AWS, MongoDB"
        />
        <small>Separate tools with commas</small>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Projects</h3>
        <button 
          className="btn btn-secondary"
          onClick={() => addArrayItem('projects', {
            name: '',
            description: '',
            technologies: [],
            link: '',
            github: ''
          })}
        >
          Add Project
        </button>
      </div>
      
      {formData.projects.map((project, index) => (
        <div key={index} className="project-item">
          <div className="item-header">
            <h4>Project {index + 1}</h4>
            {formData.projects.length > 1 && (
              <button 
                className="btn btn-error btn-sm"
                onClick={() => removeArrayItem('projects', index)}
              >
                Remove
              </button>
            )}
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleInputChange('projects', 'name', e.target.value, index)}
                placeholder="E-commerce Platform"
                required
              />
            </div>
            <div className="form-group">
              <label>Technologies Used</label>
              <input
                type="text"
                value={Array.isArray(project.technologies) ? project.technologies.join(', ') : ''}
                onChange={(e) => handleInputChange('projects', 'technologies', e.target.value.split(',').map(s => s.trim()).filter(s => s), index)}
                placeholder="React, Node.js, MongoDB"
              />
              <small>Separate technologies with commas</small>
            </div>
            <div className="form-group">
              <label>Live Demo URL</label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => handleInputChange('projects', 'link', e.target.value, index)}
                placeholder="https://myproject.com"
              />
            </div>
            <div className="form-group">
              <label>GitHub Repository</label>
              <input
                type="url"
                value={project.github}
                onChange={(e) => handleInputChange('projects', 'github', e.target.value, index)}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Project Description *</label>
            <textarea
              value={project.description}
              onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
              placeholder="Describe your project, its features, and your role..."
              rows="3"
              required
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'personal': return renderPersonalInfo();
      case 'experience': return renderExperience();
      case 'education': return renderEducation();
      case 'skills': return renderSkills();
      case 'projects': return renderProjects();
      default: return renderPersonalInfo();
    }
  };

  return (
    <div className="resume-page">
      <div className="container">
        <div className="resume-header">
          <h1>Resume Builder</h1>
          <p>Create a professional, ATS-friendly resume with AI assistance</p>
        </div>

        <div className="resume-builder">
          {/* Navigation */}
          <div className="resume-nav">
            {sections.map(section => (
              <button
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <section.icon />
                <span>{section.label}</span>
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="resume-content">
            {renderCurrentSection()}
          </div>

          {/* Actions */}
          <div className="resume-actions">
            <button 
              className="btn btn-secondary"
              onClick={handlePreview}
            >
              <FaDownload /> Preview Resume
            </button>
            
            <button 
              className="btn btn-primary"
              onClick={generateAIResume}
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="small" message="" />
              ) : (
                <>
                  <FaRobot /> Generate AI Resume
                </>
              )}
            </button>
          </div>
        </div>

        {/* Resume Preview Modal */}
        {showPreview && generatedResume && (
          <ResumePreview 
            resumeData={generatedResume}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Resume;