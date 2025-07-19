import React, { useState } from 'react';
import { FaPlus, FaTrash, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Forms.css';

const ProjectsForm = ({ onSave, initialData = [] }) => {
  const [projects, setProjects] = useState(
    initialData.length > 0 ? initialData : [{
      id: Date.now(),
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      highlights: ['']
    }]
  );

  const handleChange = (id, e) => {
    const { name, value, type, checked } = e.target;
    
    setProjects(projects.map(project => {
      if (project.id === id) {
        return {
          ...project,
          [name]: type === 'checkbox' ? checked : value
        };
      }
      return project;
    }));
  };

  const handleTechChange = (id, tech, index) => {
    setProjects(projects.map(project => {
      if (project.id === id) {
        const newTech = [...project.technologies];
        newTech[index] = tech;
        return { ...project, technologies: newTech };
      }
      return project;
    }));
  };

  const addTech = (id) => {
    setProjects(projects.map(project => {
      if (project.id === id) {
        return {
          ...project,
          technologies: [...project.technologies, '']
        };
      }
      return project;
    }));
  };

  const removeTech = (projectId, techIndex) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const newTech = [...project.technologies];
        newTech.splice(techIndex, 1);
        return { ...project, technologies: newTech };
      }
      return project;
    }));
  };

  const handleHighlightChange = (id, value, index) => {
    setProjects(projects.map(project => {
      if (project.id === id) {
        const newHighlights = [...project.highlights];
        newHighlights[index] = value;
        return { ...project, highlights: newHighlights };
      }
      return project;
    }));
  };

  const addHighlight = (id) => {
    setProjects(projects.map(project => {
      if (project.id === id) {
        return {
          ...project,
          highlights: [...project.highlights, '']
        };
      }
      return project;
    }));
  };

  const removeHighlight = (projectId, highlightIndex) => {
    setProjects(projects.map(project => {
      if (project.id === projectId && project.highlights.length > 1) {
        const newHighlights = [...project.highlights];
        newHighlights.splice(highlightIndex, 1);
        return { ...project, highlights: newHighlights };
      }
      return project;
    }));
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now() + Math.random(),
        title: '',
        description: '',
        technologies: [],
        githubUrl: '',
        liveUrl: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        highlights: ['']
      }
    ]);
  };

  const removeProject = (id) => {
    if (projects.length > 1) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(projects);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>Projects</h3>
      
      {projects.map((project, projectIndex) => (
        <div key={project.id} className="form-section project-section">
          {projectIndex > 0 && (
            <button 
              type="button" 
              className="remove-btn"
              onClick={() => removeProject(project.id)}
              aria-label="Remove project"
            >
              <FaTrash />
            </button>
          )}
          
          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label>Project Title *</label>
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={(e) => handleChange(project.id, e)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="month"
                name="startDate"
                value={project.startDate}
                onChange={(e) => handleChange(project.id, e)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>{project.isCurrent ? 'Ongoing' : 'End Date'}</label>
              <input
                type="month"
                name="endDate"
                value={project.endDate}
                onChange={(e) => handleChange(project.id, e)}
                disabled={project.isCurrent}
                required={!project.isCurrent}
              />
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id={`current-${project.id}`}
                  name="isCurrent"
                  checked={project.isCurrent}
                  onChange={(e) => handleChange(project.id, e)}
                />
                <label htmlFor={`current-${project.id}`}>Currently working</label>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={project.description}
              onChange={(e) => handleChange(project.id, e)}
              rows="3"
              placeholder="Brief description of the project..."
              required
            />
          </div>
          
          <div className="form-group">
            <label>Technologies Used</label>
            <div className="tech-tags">
              {project.technologies.map((tech, index) => (
                <div key={index} className="tech-tag">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleTechChange(project.id, e.target.value, index)}
                    placeholder="e.g., React, Node.js"
                  />
                  <button 
                    type="button" 
                    className="remove-tech"
                    onClick={() => removeTech(project.id, index)}
                    aria-label="Remove technology"
                  >
                    <FaTrash size={10} />
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                className="add-tech"
                onClick={() => addTech(project.id)}
              >
                <FaPlus size={12} /> Add Technology
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Project Highlights</label>
            <div className="highlights">
              {project.highlights.map((highlight, index) => (
                <div key={index} className="highlight-item">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleHighlightChange(project.id, e.target.value, index)}
                    placeholder="Project highlight or achievement"
                  />
                  {project.highlights.length > 1 && (
                    <button 
                      type="button" 
                      className="remove-highlight"
                      onClick={() => removeHighlight(project.id, index)}
                      aria-label="Remove highlight"
                    >
                      <FaTrash size={10} />
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                className="add-highlight"
                onClick={() => addHighlight(project.id)}
              >
                <FaPlus size={12} /> Add Highlight
              </button>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>
                <FaGithub /> GitHub Repository
              </label>
              <input
                type="url"
                name="githubUrl"
                value={project.githubUrl}
                onChange={(e) => handleChange(project.id, e)}
                placeholder="https://github.com/username/repo"
              />
            </div>
            
            <div className="form-group">
              <label>
                <FaExternalLinkAlt /> Live Demo
              </label>
              <input
                type="url"
                name="liveUrl"
                value={project.liveUrl}
                onChange={(e) => handleChange(project.id, e)}
                placeholder="https://your-project-demo.com"
              />
            </div>
          </div>
        </div>
      ))}
      
      <button 
        type="button" 
        className="add-item-btn"
        onClick={addProject}
      >
        <FaPlus /> Add Another Project
      </button>
      
      <div className="form-actions">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={!projects.some(p => p.title && p.description)}
        >
          Save Projects
        </button>
      </div>
    </form>
  );
};

export default ProjectsForm;
