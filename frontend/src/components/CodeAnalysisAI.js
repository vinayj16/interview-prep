import React, { useState } from 'react';
import { analyzeCode } from '../services/apiService';
import './CodeAnalysis.css';

const initialForm = {
  code: '',
  language: '',
  problemDescription: '',
  codeComplexity: '',
  focusAreas: '',
  additionalContext: '',
};

function CodeAnalysisAI() {
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
      const response = await analyzeCode(form.code, form.language, form.problemDescription);
      if (response.success === false) {
        setError(response.error || 'Failed to analyze code.');
      } else {
        setResult(response);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="code-analysis-ai-container">
      <h2>AI Code Analysis</h2>
      <form className="code-analysis-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="language">Programming Language</label>
          <select id="language" name="language" value={form.language} onChange={handleChange} required>
            <option value="">Select Language</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="swift">Swift</option>
            <option value="kotlin">Kotlin</option>
            <option value="typescript">TypeScript</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="problemDescription">Problem Description</label>
          <textarea id="problemDescription" name="problemDescription" value={form.problemDescription} onChange={handleChange} rows={3} required />
        </div>
        <div className="form-group">
          <label htmlFor="codeComplexity">Code Complexity</label>
          <select id="codeComplexity" name="codeComplexity" value={form.codeComplexity} onChange={handleChange}>
            <option value="">Select Complexity</option>
            <option value="simple">Simple</option>
            <option value="moderate">Moderate</option>
            <option value="complex">Complex</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="focusAreas">Focus Areas (comma separated)</label>
          <input type="text" id="focusAreas" name="focusAreas" value={form.focusAreas} onChange={handleChange} placeholder="e.g., performance, security, readability" />
        </div>
        <div className="form-group">
          <label htmlFor="code">Your Code</label>
          <textarea id="code" name="code" value={form.code} onChange={handleChange} rows={10} required placeholder="Paste your code here..." />
        </div>
        <div className="form-group">
          <label htmlFor="additionalContext">Additional Context</label>
          <textarea id="additionalContext" name="additionalContext" value={form.additionalContext} onChange={handleChange} rows={2} placeholder="Any additional information about your code or requirements" />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Analyzing...' : 'Analyze Code'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {result && (
        <div className="code-analysis-result">
          <h3>AI Code Analysis Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CodeAnalysisAI; 