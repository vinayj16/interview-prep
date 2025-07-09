import React, { useState } from 'react';
import { generateInterviewQuestions } from '../services/apiService';
import './InterviewQuestions.css';

const initialForm = {
  company: '',
  role: '',
  experienceLevel: '',
  skills: '',
  industry: '',
  additionalContext: '',
};

function InterviewQuestionsAI() {
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
      const response = await generateInterviewQuestions(form.company, form.role);
      if (response.success === false) {
        setError(response.error || 'Failed to generate interview questions.');
      } else {
        setResult(response);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="interview-questions-ai-container">
      <h2>AI Interview Questions Generator</h2>
      <form className="interview-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="company">Company Name</label>
          <input type="text" id="company" name="company" value={form.company} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="role">Job Role</label>
          <input type="text" id="role" name="role" value={form.role} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="experienceLevel">Experience Level</label>
          <select id="experienceLevel" name="experienceLevel" value={form.experienceLevel} onChange={handleChange}>
            <option value="">Select Experience Level</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
            <option value="lead">Lead/Manager</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="skills">Key Skills (comma separated)</label>
          <input type="text" id="skills" name="skills" value={form.skills} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input type="text" id="industry" name="industry" value={form.industry} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="additionalContext">Additional Context</label>
          <textarea id="additionalContext" name="additionalContext" value={form.additionalContext} onChange={handleChange} rows={2} />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Generating...' : 'Generate Interview Questions'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {result && (
        <div className="interview-result">
          <h3>AI-Generated Interview Questions</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default InterviewQuestionsAI; 