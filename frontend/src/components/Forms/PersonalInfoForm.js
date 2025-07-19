import React, { useState, useEffect } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import Button from '../shared/Button/Button';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import './Forms.css';

const PersonalInfoForm = () => {
  const { resumeData, updateResumeData, isLoading } = useResume();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Initialize form with existing data when resumeData is loaded
  useEffect(() => {
    if (resumeData.personalInfo) {
      setFormData(prev => ({
        ...prev,
        ...resumeData.personalInfo,
        fullName: resumeData.personalInfo.fullName || '',
        email: resumeData.personalInfo.email || '',
        phone: resumeData.personalInfo.phone || '',
        address: resumeData.personalInfo.address || '',
        linkedin: resumeData.personalInfo.linkedin || '',
        github: resumeData.personalInfo.github || '',
        portfolio: resumeData.personalInfo.portfolio || '',
        summary: resumeData.personalInfo.summary || ''
      }));
    }
  }, [resumeData.personalInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const success = await updateResumeData({
        personalInfo: {
          ...formData,
          // Ensure required fields are not empty
          fullName: formData.fullName.trim(),
          email: formData.email.trim()
        }
      });
      
      if (!success) {
        throw new Error('Failed to save personal information');
      }
      
      // Show success message or navigate to next step
    } catch (err) {
      console.error('Error saving personal info:', err);
      setError('Failed to save personal information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading && !resumeData.personalInfo) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px'
      }}>
        <LoadingSpinner size="md" />
      </div>
    );
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 style={{
        color: '#2c3e50',
        marginBottom: '1.5rem',
        paddingBottom: '0.5rem',
        borderBottom: '2px solid #f0f0f0'
      }}>Personal Information</h2>
      
      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <i className="fas fa-exclamation-circle"></i>
          <span>{error}</span>
        </div>
      )}
      
      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
            marginTop: '0.25rem'
          }}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              marginTop: '0.25rem'
            }}
          />
        </div>
        
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              marginTop: '0.25rem'
            }}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
            marginTop: '0.25rem'
          }}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              marginTop: '0.25rem'
            }}
          />
        </div>
        
        <div className="form-group">
          <label>GitHub</label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/username"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              marginTop: '0.25rem'
            }}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Portfolio/Website</label>
        <input
          type="url"
          name="portfolio"
          value={formData.portfolio}
          onChange={handleChange}
          placeholder="https://yourportfolio.com"
        />
      </div>

      <div className="form-group">
        <label>Professional Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          rows="4"
          disabled={isSubmitting}
          placeholder="A brief summary about yourself and your career objectives..."
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
            marginTop: '0.25rem',
            minHeight: '120px',
            resize: 'vertical'
          }}
        />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '2rem',
        paddingTop: '1rem',
        borderTop: '1px solid #eee'
      }}>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          style={{
            minWidth: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <i className="fas fa-save"></i>
              <span>Save Changes</span>
            </>
          )}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
