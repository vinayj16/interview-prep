import React, { useState } from 'react';
import { generateHints } from '../services/apiService';
import './HintsGeneration.css';

const initialForm = {
  problemDescription: '',
  currentCode: '',
  difficultyLevel: '',
  hintType: '',
  additionalContext: '',
};

function HintsGenerationAI() {
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
      const response = await generateHints(form.problemDescription, form.currentCode);
      if (response.success === false) {
        setError(response.error || 'Failed to generate hints.');
      } else {
        setResult(response);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="hints-generation-ai-container">
      <h2>AI Hints Generator</h2>
      <form className="hints-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="problemDescription">Problem Description</label>
          <textarea id="problemDescription" name="problemDescription" value={form.problemDescription} onChange={handleChange} rows={4} required placeholder="Describe the coding problem you're trying to solve..." />
        </div>
        <div className="form-group">
          <label htmlFor="currentCode">Current Code (Optional)</label>
          <textarea id="currentCode" name="currentCode" value={form.currentCode} onChange={handleChange} rows={8} placeholder="Paste your current code here if you have any..." />
        </div>
        <div className="form-group">
          <label htmlFor="difficultyLevel">Difficulty Level</label>
          <select id="difficultyLevel" name="difficultyLevel" value={form.difficultyLevel} onChange={handleChange}>
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="hintType">Hint Type Preference</label>
          <select id="hintType" name="hintType" value={form.hintType} onChange={handleChange}>
            <option value="">Select Hint Type</option>
            <option value="algorithm">Algorithm</option>
            <option value="data-structure">Data Structure</option>
            <option value="logic">Logic</option>
            <option value="syntax">Syntax</option>
            <option value="optimization">Optimization</option>
            <option value="general">General</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="additionalContext">Additional Context</label>
          <textarea id="additionalContext" name="additionalContext" value={form.additionalContext} onChange={handleChange} rows={2} placeholder="Any additional information that might help generate better hints..." />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Generating Hints...' : 'Generate Hints'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {result && (
        <div className="hints-result">
          <h3>AI-Generated Hints</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default HintsGenerationAI; 