import React, { useState, useCallback } from 'react';
<<<<<<< HEAD
import { FaUser, FaGraduationCap, FaBriefcase, FaCog, FaDownload, FaRobot, FaSpinner, FaTrophy, FaUsers, FaFileAlt, FaDollarSign, FaBook } from 'react-icons/fa';
=======
import { FaUser, FaGraduationCap, FaBriefcase, FaCog, FaDownload, FaRobot, FaSpinner } from 'react-icons/fa';
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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
<<<<<<< HEAD
      website: '',
      dob: '',
      address: '',
=======
      website: ''
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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
<<<<<<< HEAD
        gpa: '',
        coursework: '',
        thesis: ''
=======
        gpa: ''
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
      }
    ],
    skills: {
      technical: [],
<<<<<<< HEAD
      soft: [],
      domain: [],
=======
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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
<<<<<<< HEAD
    summary: '',
    certifications: [
      {
        name: '',
        organization: '',
        date: '',
        id: '',
        url: ''
      }
    ],
    awards: [
      {
        title: '',
        issuer: '',
        date: '',
        description: ''
      }
    ],
    languages: [
      {
        language: '',
        proficiency: ''
      }
    ],
    volunteering: [
      {
        role: '',
        organization: '',
        date: '',
        description: ''
      }
    ],
    publications: [
      {
        title: '',
        publisher: '',
        date: '',
        url: ''
      }
    ],
    achievements: [
      {
        title: '',
        type: '',
        date: '',
        description: ''
      }
    ],
    coCurricular: [
      {
        activity: '',
        organization: '',
        date: '',
        description: ''
      }
    ],
    extraCurricular: [
      {
        activity: '',
        organization: '',
        date: '',
        description: ''
      }
    ],
    socialWork: [
      {
        activity: '',
        organization: '',
        date: '',
        description: ''
      }
    ],
    leadership: [
      {
        role: '',
        organization: '',
        date: '',
        description: ''
      }
    ],
    interests: '',
    references: '',
    workAuthorization: '',
    expectedSalary: '',
    onlineCourses: [
      {
        title: '',
        provider: '',
        date: '',
        url: ''
      }
    ],
    freelance: [
      {
        project: '',
        client: '',
        date: '',
        description: ''
      }
    ],
    patents: [
      {
        title: '',
        number: '',
        date: '',
        url: ''
      }
    ],
=======
    summary: ''
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
  });

  const handleInputChange = useCallback((section, field, value, index = null) => {
    setFormData(prev => {
      const newData = { ...prev };
<<<<<<< HEAD
      if (section === '') {
        // Update root-level fields
        newData[field] = value;
      } else if (index !== null) {
=======
      
      if (index !== null) {
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
        newData[section][index] = { ...newData[section][index], [field]: value };
      } else if (section === 'skills') {
        newData[section][field] = Array.isArray(value) ? value : value.split(',').map(s => s.trim()).filter(s => s);
      } else {
        newData[section][field] = value;
      }
<<<<<<< HEAD
=======
      
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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
<<<<<<< HEAD
    { id: 'projects', label: 'Projects', icon: FaCog },
    { id: 'certifications', label: 'Certifications', icon: FaGraduationCap },
    { id: 'awards', label: 'Awards', icon: FaTrophy },
    { id: 'languages', label: 'Languages', icon: FaUser },
    { id: 'volunteering', label: 'Volunteering', icon: FaUsers },
    { id: 'publications', label: 'Publications', icon: FaFileAlt },
    { id: 'achievements', label: 'Achievements', icon: FaTrophy },
    { id: 'coCurricular', label: 'Co-Curricular Activities', icon: FaUsers },
    { id: 'extraCurricular', label: 'Extra-Curricular Activities', icon: FaUsers },
    { id: 'socialWork', label: 'Social Work', icon: FaUsers },
    { id: 'leadership', label: 'Leadership', icon: FaTrophy },
    { id: 'interests', label: 'Personal Interests', icon: FaUser },
    { id: 'references', label: 'References', icon: FaFileAlt },
    { id: 'workAuthorization', label: 'Work Authorization', icon: FaUser },
    { id: 'expectedSalary', label: 'Expected Salary', icon: FaDollarSign },
    { id: 'onlineCourses', label: 'Online Courses', icon: FaBook },
    { id: 'freelance', label: 'Freelance/Consulting', icon: FaUser },
    { id: 'patents', label: 'Patents', icon: FaFileAlt },
=======
    { id: 'projects', label: 'Projects', icon: FaCog }
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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
<<<<<<< HEAD
            gpa: '',
            coursework: '',
            thesis: ''
=======
            gpa: ''
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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

<<<<<<< HEAD
  const renderCertifications = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Certifications</h3>
        <button className="btn btn-secondary" onClick={() => addArrayItem('certifications', { name: '', organization: '', date: '', id: '', url: '' })}>Add Certification</button>
      </div>
      {formData.certifications.map((cert, index) => (
        <div key={index} className="certification-item">
          <div className="item-header">
            <h4>Certification {index + 1}</h4>
            {formData.certifications.length > 1 && (
              <button className="btn btn-error btn-sm" onClick={() => removeArrayItem('certifications', index)}>Remove</button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Name *</label>
              <input type="text" value={cert.name} onChange={e => handleInputChange('certifications', 'name', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Organization *</label>
              <input type="text" value={cert.organization} onChange={e => handleInputChange('certifications', 'organization', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="month" value={cert.date} onChange={e => handleInputChange('certifications', 'date', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Certificate ID</label>
              <input type="text" value={cert.id} onChange={e => handleInputChange('certifications', 'id', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Certificate URL</label>
              <input type="url" value={cert.url} onChange={e => handleInputChange('certifications', 'url', e.target.value, index)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAwards = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Awards & Achievements</h3>
        <button className="btn btn-secondary" onClick={() => addArrayItem('awards', { title: '', issuer: '', date: '', description: '' })}>Add Award</button>
      </div>
      {formData.awards.map((award, index) => (
        <div key={index} className="award-item">
          <div className="item-header">
            <h4>Award {index + 1}</h4>
            {formData.awards.length > 1 && (
              <button className="btn btn-error btn-sm" onClick={() => removeArrayItem('awards', index)}>Remove</button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Title *</label>
              <input type="text" value={award.title} onChange={e => handleInputChange('awards', 'title', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Issuer</label>
              <input type="text" value={award.issuer} onChange={e => handleInputChange('awards', 'issuer', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="month" value={award.date} onChange={e => handleInputChange('awards', 'date', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={award.description} onChange={e => handleInputChange('awards', 'description', e.target.value, index)} rows="2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLanguages = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Languages</h3>
        <button className="btn btn-secondary" onClick={() => addArrayItem('languages', { language: '', proficiency: '' })}>Add Language</button>
      </div>
      {formData.languages.map((lang, index) => (
        <div key={index} className="language-item">
          <div className="item-header">
            <h4>Language {index + 1}</h4>
            {formData.languages.length > 1 && (
              <button className="btn btn-error btn-sm" onClick={() => removeArrayItem('languages', index)}>Remove</button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Language *</label>
              <input type="text" value={lang.language} onChange={e => handleInputChange('languages', 'language', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Proficiency</label>
              <input type="text" value={lang.proficiency} onChange={e => handleInputChange('languages', 'proficiency', e.target.value, index)} placeholder="Fluent, Native, Basic, etc." />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderVolunteering = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Volunteering / Leadership</h3>
        <button className="btn btn-secondary" onClick={() => addArrayItem('volunteering', { role: '', organization: '', date: '', description: '' })}>Add Activity</button>
      </div>
      {formData.volunteering.map((vol, index) => (
        <div key={index} className="volunteering-item">
          <div className="item-header">
            <h4>Activity {index + 1}</h4>
            {formData.volunteering.length > 1 && (
              <button className="btn btn-error btn-sm" onClick={() => removeArrayItem('volunteering', index)}>Remove</button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Role *</label>
              <input type="text" value={vol.role} onChange={e => handleInputChange('volunteering', 'role', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Organization</label>
              <input type="text" value={vol.organization} onChange={e => handleInputChange('volunteering', 'organization', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="month" value={vol.date} onChange={e => handleInputChange('volunteering', 'date', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={vol.description} onChange={e => handleInputChange('volunteering', 'description', e.target.value, index)} rows="2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPublications = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Publications</h3>
        <button className="btn btn-secondary" onClick={() => addArrayItem('publications', { title: '', publisher: '', date: '', url: '' })}>Add Publication</button>
      </div>
      {formData.publications.map((pub, index) => (
        <div key={index} className="publication-item">
          <div className="item-header">
            <h4>Publication {index + 1}</h4>
            {formData.publications.length > 1 && (
              <button className="btn btn-error btn-sm" onClick={() => removeArrayItem('publications', index)}>Remove</button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Title *</label>
              <input type="text" value={pub.title} onChange={e => handleInputChange('publications', 'title', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Publisher</label>
              <input type="text" value={pub.publisher} onChange={e => handleInputChange('publications', 'publisher', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="month" value={pub.date} onChange={e => handleInputChange('publications', 'date', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>URL</label>
              <input type="url" value={pub.url} onChange={e => handleInputChange('publications', 'url', e.target.value, index)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAchievements = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Achievements</h3>
        <button className="btn btn-secondary" onClick={() => addArrayItem('achievements', { title: '', type: '', date: '', description: '' })}>Add Achievement</button>
      </div>
      {formData.achievements.map((award, index) => (
        <div key={index} className="award-item">
          <div className="item-header">
            <h4>Achievement {index + 1}</h4>
            {formData.achievements.length > 1 && (
              <button className="btn btn-error btn-sm" onClick={() => removeArrayItem('achievements', index)}>Remove</button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Title *</label>
              <input type="text" value={award.title} onChange={e => handleInputChange('achievements', 'title', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Type</label>
              <input type="text" value={award.type} onChange={e => handleInputChange('achievements', 'type', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="month" value={award.date} onChange={e => handleInputChange('achievements', 'date', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={award.description} onChange={e => handleInputChange('achievements', 'description', e.target.value, index)} rows="2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCoCurricular = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Co-Curricular Activities</h3>
        <button className="btn btn-secondary" onClick={() => addArrayItem('coCurricular', { activity: '', organization: '', date: '', description: '' })}>Add Activity</button>
      </div>
      {formData.coCurricular.map((activity, index) => (
        <div key={index} className="activity-item">
          <div className="item-header">
            <h4>Activity {index + 1}</h4>
            {formData.coCurricular.length > 1 && (
              <button className="btn btn-error btn-sm" onClick={() => removeArrayItem('coCurricular', index)}>Remove</button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Activity *</label>
              <input type="text" value={activity.activity} onChange={e => handleInputChange('coCurricular', 'activity', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Organization</label>
              <input type="text" value={activity.organization} onChange={e => handleInputChange('coCurricular', 'organization', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="month" value={activity.date} onChange={e => handleInputChange('coCurricular', 'date', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={activity.description} onChange={e => handleInputChange('coCurricular', 'description', e.target.value, index)} rows="2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderExtraCurricular = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Extra-Curricular Activities</h3>
        <button className="btn btn-secondary" onClick={() => addArrayItem('extraCurricular', { activity: '', organization: '', date: '', description: '' })}>Add Activity</button>
      </div>
      {formData.extraCurricular.map((activity, index) => (
        <div key={index} className="activity-item">
          <div className="item-header">
            <h4>Activity {index + 1}</h4>
            {formData.extraCurricular.length > 1 && (
              <button className="btn btn-error btn-sm" onClick={() => removeArrayItem('extraCurricular', index)}>Remove</button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Activity *</label>
              <input type="text" value={activity.activity} onChange={e => handleInputChange('extraCurricular', 'activity', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Organization</label>
              <input type="text" value={activity.organization} onChange={e => handleInputChange('extraCurricular', 'organization', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="month" value={activity.date} onChange={e => handleInputChange('extraCurricular', 'date', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={activity.description} onChange={e => handleInputChange('extraCurricular', 'description', e.target.value, index)} rows="2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSocialWork = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Social Work</h3>
        <button className="btn btn-secondary" onClick={() => addArrayItem('socialWork', { activity: '', organization: '', date: '', description: '' })}>Add Activity</button>
      </div>
      {formData.socialWork.map((activity, index) => (
        <div key={index} className="activity-item">
          <div className="item-header">
            <h4>Activity {index + 1}</h4>
            {formData.socialWork.length > 1 && (
              <button className="btn btn-error btn-sm" onClick={() => removeArrayItem('socialWork', index)}>Remove</button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Activity *</label>
              <input type="text" value={activity.activity} onChange={e => handleInputChange('socialWork', 'activity', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Organization</label>
              <input type="text" value={activity.organization} onChange={e => handleInputChange('socialWork', 'organization', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="month" value={activity.date} onChange={e => handleInputChange('socialWork', 'date', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={activity.description} onChange={e => handleInputChange('socialWork', 'description', e.target.value, index)} rows="2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLeadership = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Leadership</h3>
        <button className="btn btn-secondary" onClick={() => addArrayItem('leadership', { role: '', organization: '', date: '', description: '' })}>Add Leadership</button>
      </div>
      {formData.leadership.map((leadership, index) => (
        <div key={index} className="leadership-item">
          <div className="item-header">
            <h4>Leadership {index + 1}</h4>
            {formData.leadership.length > 1 && (
              <button className="btn btn-error btn-sm" onClick={() => removeArrayItem('leadership', index)}>Remove</button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Role *</label>
              <input type="text" value={leadership.role} onChange={e => handleInputChange('leadership', 'role', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Organization</label>
              <input type="text" value={leadership.organization} onChange={e => handleInputChange('leadership', 'organization', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="month" value={leadership.date} onChange={e => handleInputChange('leadership', 'date', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={leadership.description} onChange={e => handleInputChange('leadership', 'description', e.target.value, index)} rows="2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderInterests = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Personal Interests</h3>
        <textarea
          value={formData.interests}
          onChange={(e) => handleInputChange('', 'interests', e.target.value)}
          placeholder="Describe your personal interests..."
          rows="4"
        />
      </div>
    </div>
  );

  const renderReferences = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>References</h3>
        <textarea
          value={formData.references}
          onChange={(e) => handleInputChange('', 'references', e.target.value)}
          placeholder="List your references..."
          rows="4"
        />
      </div>
    </div>
  );

  const renderWorkAuthorization = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Work Authorization</h3>
        <textarea
          value={formData.workAuthorization}
          onChange={(e) => handleInputChange('', 'workAuthorization', e.target.value)}
          placeholder="Describe your work authorization..."
          rows="4"
        />
      </div>
    </div>
  );

  const renderExpectedSalary = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Expected Salary</h3>
        <input
          type="text"
          value={formData.expectedSalary}
          onChange={(e) => handleInputChange('', 'expectedSalary', e.target.value)}
          placeholder="$0.00"
        />
      </div>
    </div>
  );

  const renderOnlineCourses = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Online Courses</h3>
        <button className="btn btn-secondary" onClick={() => addArrayItem('onlineCourses', { title: '', provider: '', date: '', url: '' })}>Add Course</button>
      </div>
      {formData.onlineCourses.map((course, index) => (
        <div key={index} className="course-item">
          <div className="item-header">
            <h4>Course {index + 1}</h4>
            {formData.onlineCourses.length > 1 && (
              <button className="btn btn-error btn-sm" onClick={() => removeArrayItem('onlineCourses', index)}>Remove</button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Title *</label>
              <input type="text" value={course.title} onChange={e => handleInputChange('onlineCourses', 'title', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Provider</label>
              <input type="text" value={course.provider} onChange={e => handleInputChange('onlineCourses', 'provider', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="month" value={course.date} onChange={e => handleInputChange('onlineCourses', 'date', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>URL</label>
              <input type="url" value={course.url} onChange={e => handleInputChange('onlineCourses', 'url', e.target.value, index)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFreelance = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Freelance/Consulting</h3>
        <button className="btn btn-secondary" onClick={() => addArrayItem('freelance', { project: '', client: '', date: '', description: '' })}>Add Project</button>
      </div>
      {formData.freelance.map((project, index) => (
        <div key={index} className="project-item">
          <div className="item-header">
            <h4>Project {index + 1}</h4>
            {formData.freelance.length > 1 && (
              <button className="btn btn-error btn-sm" onClick={() => removeArrayItem('freelance', index)}>Remove</button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Project *</label>
              <input type="text" value={project.project} onChange={e => handleInputChange('freelance', 'project', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Client</label>
              <input type="text" value={project.client} onChange={e => handleInputChange('freelance', 'client', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="month" value={project.date} onChange={e => handleInputChange('freelance', 'date', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={project.description} onChange={e => handleInputChange('freelance', 'description', e.target.value, index)} rows="2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPatents = () => (
    <div className="form-section">
      <div className="section-header">
        <h3>Patents</h3>
        <button className="btn btn-secondary" onClick={() => addArrayItem('patents', { title: '', number: '', date: '', url: '' })}>Add Patent</button>
      </div>
      {formData.patents.map((patent, index) => (
        <div key={index} className="patent-item">
          <div className="item-header">
            <h4>Patent {index + 1}</h4>
            {formData.patents.length > 1 && (
              <button className="btn btn-error btn-sm" onClick={() => removeArrayItem('patents', index)}>Remove</button>
            )}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Title *</label>
              <input type="text" value={patent.title} onChange={e => handleInputChange('patents', 'title', e.target.value, index)} required />
            </div>
            <div className="form-group">
              <label>Patent Number</label>
              <input type="text" value={patent.number} onChange={e => handleInputChange('patents', 'number', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="month" value={patent.date} onChange={e => handleInputChange('patents', 'date', e.target.value, index)} />
            </div>
            <div className="form-group">
              <label>URL</label>
              <input type="url" value={patent.url} onChange={e => handleInputChange('patents', 'url', e.target.value, index)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

=======
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'personal': return renderPersonalInfo();
      case 'experience': return renderExperience();
      case 'education': return renderEducation();
      case 'skills': return renderSkills();
      case 'projects': return renderProjects();
<<<<<<< HEAD
      case 'certifications': return renderCertifications();
      case 'awards': return renderAwards();
      case 'languages': return renderLanguages();
      case 'volunteering': return renderVolunteering();
      case 'publications': return renderPublications();
      case 'achievements': return renderAchievements();
      case 'coCurricular': return renderCoCurricular();
      case 'extraCurricular': return renderExtraCurricular();
      case 'socialWork': return renderSocialWork();
      case 'leadership': return renderLeadership();
      case 'interests': return renderInterests();
      case 'references': return renderReferences();
      case 'workAuthorization': return renderWorkAuthorization();
      case 'expectedSalary': return renderExpectedSalary();
      case 'onlineCourses': return renderOnlineCourses();
      case 'freelance': return renderFreelance();
      case 'patents': return renderPatents();
=======
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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