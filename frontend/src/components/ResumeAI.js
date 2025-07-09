import React, { useState } from 'react';
import { generateResume } from '../services/apiService';
import './Resume.css';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  summary: '',
  skills: '',
  experience: '',
  education: '',
  certifications: '',
  projects: '',
  languages: '',
};

function ResumeAI() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateResume(form);
      if (response.success === false) {
        setError(response.error || 'Failed to generate resume.');
      } else {
        setResult(response);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="resume-ai-container">
      <h2>AI Resume Generator</h2>
      <form className="resume-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="summary">Professional Summary</label>
          <textarea id="summary" name="summary" value={form.summary} onChange={handleChange} rows={3} required />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Key Skills (comma separated)</label>
          <input type="text" id="skills" name="skills" value={form.skills} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Work Experience</label>
          <textarea id="experience" name="experience" value={form.experience} onChange={handleChange} rows={3} required />
        </div>
        <div className="form-group">
          <label htmlFor="education">Education</label>
          <textarea id="education" name="education" value={form.education} onChange={handleChange} rows={2} required />
        </div>
        <div className="form-group">
          <label htmlFor="certifications">Certifications</label>
          <input type="text" id="certifications" name="certifications" value={form.certifications} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="projects">Projects</label>
          <textarea id="projects" name="projects" value={form.projects} onChange={handleChange} rows={2} />
        </div>
        <div className="form-group">
          <label htmlFor="languages">Languages</label>
          <input type="text" id="languages" name="languages" value={form.languages} onChange={handleChange} />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Generating...' : 'Generate Resume'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {result && (
        <div className="resume-result">
          <h3>AI-Generated Resume</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ResumeAI; 