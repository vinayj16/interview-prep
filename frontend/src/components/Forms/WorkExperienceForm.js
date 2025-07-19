import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import './Forms.css';

const WorkExperienceForm = ({ onSave, initialData = [] }) => {
  const [experiences, setExperiences] = useState(
    initialData.length > 0 ? initialData : [{
      id: Date.now(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: ''
    }]
  );

  const handleChange = (id, e) => {
    const { name, value, type, checked } = e.target;
    
    setExperiences(experiences.map(exp => ({
      ...exp,
      [name]: type === 'checkbox' ? checked : value
    })));
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now() + Math.random(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: ''
      }
    ]);
  };

  const removeExperience = (id) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(experiences);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>Work Experience</h3>
      
      {experiences.map((exp, index) => (
        <div key={exp.id} className="form-section">
          {index > 0 && (
            <button 
              type="button" 
              className="remove-btn"
              onClick={() => removeExperience(exp.id)}
              aria-label="Remove experience"
            >
              <FaTrash />
            </button>
          )}
          
          <div className="form-row">
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleChange(exp.id, e)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                name="position"
                value={exp.position}
                onChange={(e) => handleChange(exp.id, e)}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={exp.location}
                onChange={(e) => handleChange(exp.id, e)}
              />
            </div>
            
            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleChange(exp.id, e)}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>End Date {!exp.isCurrent && '*'}</label>
              <input
                type="date"
                name="endDate"
                value={exp.endDate}
                onChange={(e) => handleChange(exp.id, e)}
                disabled={exp.isCurrent}
                required={!exp.isCurrent}
              />
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  name="isCurrent"
                  checked={exp.isCurrent}
                  onChange={(e) => handleChange(exp.id, e)}
                />
                <label htmlFor={`current-${exp.id}`}>I currently work here</label>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={exp.description}
              onChange={(e) => handleChange(exp.id, e)}
              rows="4"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        </div>
      ))}
      
      <button 
        type="button" 
        className="add-item-btn"
        onClick={addExperience}
      >
        <FaPlus /> Add Another Position
      </button>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Save Experience
        </button>
      </div>
    </form>
  );
};

export default WorkExperienceForm;
