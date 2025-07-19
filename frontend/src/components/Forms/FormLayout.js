import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button/Button';
import './FormLayout.css';

const FormLayout = ({ 
  title, 
  description, 
  children, 
  onSave, 
  isSaving = false,
  nextPath,
  prevPath,
  isFirst = false,
  isLast = false
}) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSave) {
      await onSave();
    }
    if (nextPath) {
      navigate(nextPath);
    }
  };

  const handleBack = () => {
    if (prevPath) {
      navigate(prevPath);
    } else {
      navigate(-1);
    }
  };

  const handleNext = () => {
    if (nextPath) {
      navigate(nextPath);
    }
  };

  return (
    <div className="form-layout">
      <div className="form-header">
        <h2>{title}</h2>
        {description && <p className="form-description">{description}</p>}
      </div>
      
      <form onSubmit={handleSubmit} className="resume-form">
        <div className="form-content">
          {children}
        </div>
        
        <div className="form-actions">
          {!isFirst && (
            <Button 
              type="button" 
              onClick={handleBack}
              variant="outline"
              disabled={isSaving}
            >
              Back
            </Button>
          )}
          
          <div className="form-actions-right">
            <Button 
              type="submit" 
              variant="primary"
              loading={isSaving}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save & Continue'}
            </Button>
            
            {!isLast && (
              <Button 
                type="button" 
                onClick={handleNext}
                variant="text"
                disabled={isSaving}
              >
                Skip for now <i className="fas fa-arrow-right"></i>
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormLayout;
