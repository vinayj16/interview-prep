import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaGraduationCap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import './Forms.css';

const EducationForm = () => {
  const navigate = useNavigate();
  const { resumeData, updateResumeData } = useResume();
  const [educations, setEducations] = useState(
    resumeData.education?.length > 0 ? resumeData.education : [{
      id: Date.now(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      gpa: ''
    }]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (resumeData.education) {
      setEducations(resumeData.education);
    }
  }, [resumeData.education]);

  const handleChange = (id, e) => {
    const { name, value, type, checked } = e.target;
    
    setEducations(educations.map(edu => {
      if (edu.id === id) {
        const updatedEdu = {
          ...edu,
          [name]: type === 'checkbox' ? checked : value
        };
        
        if (name === 'isCurrent' && checked) {
          updatedEdu.endDate = '';
        }
        
        return updatedEdu;
      }
      return edu;
    }));
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now() + Math.random(),
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
        gpa: ''
      }
    ]);
  };

  const removeEducation = (id) => {
    if (educations.length > 1) {
      setEducations(educations.filter(edu => edu.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      await updateResumeData({ education: educations });
      navigate('/resume/preview');
    } catch (error) {
      console.error('Error saving education:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate('/resume/experience');
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Education</h2>
        <p>Add your educational background</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {educations.map((edu, index) => (
          <div key={edu.id} className="education-card">
            <div className="card-header">
              <h3>
                <FaGraduationCap /> 
                {edu.institution || `Education ${index + 1}`}
              </h3>
              {educations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="btn-icon danger"
                  aria-label="Remove education"
                >
                  <FaTrash />
                </button>
              )}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Institution *</label>
                <input
                  type="text"
                  name="institution"
                  value={edu.institution}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="e.g., University of Technology"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Degree *</label>
                <input
                  type="text"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="e.g., Bachelor's in Computer Science"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Field of Study</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="e.g., Computer Science"
                />
              </div>
              
              <div className="form-group">
                <label>GPA</label>
                <input
                  type="text"
                  name="gpa"
                  value={edu.gpa}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="e.g., 3.8/4.0"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="month"
                  name="startDate"
                  value={edu.startDate}
                  onChange={(e) => handleChange(edu.id, e)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>{edu.isCurrent ? 'Currently Studying' : 'End Date'}</label>
                <div className="date-container">
                  <input
                    type={edu.isCurrent ? 'text' : 'month'}
                    name="endDate"
                    value={edu.isCurrent ? 'Present' : edu.endDate}
                    onChange={(e) => handleChange(edu.id, e)}
                    disabled={edu.isCurrent}
                    required={!edu.isCurrent}
                  />
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id={`current-${edu.id}`}
                      name="isCurrent"
                      checked={edu.isCurrent}
                      onChange={(e) => handleChange(edu.id, e)}
                    />
                    <label htmlFor={`current-${edu.id}`}>Currently studying</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={edu.description}
                onChange={(e) => handleChange(edu.id, e)}
                placeholder="Brief description of your studies, achievements, or relevant coursework"
                rows="3"
              />
            </div>
          </div>
        ))}
        
        <div className="add-more">
          <button
            type="button"
            onClick={addEducation}
            className="btn btn-outline"
          >
            <FaPlus /> Add Another Education
          </button>
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            onClick={handleBack}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Back
          </button>
          <div className="action-buttons">
            <button
              type="submit"
              className="btn btn-outline"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save & Exit'}
            </button>
            <button
              type="button"
              onClick={() => {
                handleSubmit({ preventDefault: () => {} });
                handleNext();
              }}
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save & Next'}
              <FaArrowRight style={{ marginLeft: '8px' }} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;