import React, { useState } from 'react';
import './SearchCodingQuestions.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SearchCodingQuestions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/coding-questions/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: searchTerm,
          difficulty
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch coding questions');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Error fetching coding questions');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-coding-questions">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-controls">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search coding questions..."
            className="search-input"
          />
          <select 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="difficulty-select"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search Questions'}
          </button>
        </div>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {results && (
        <div className="results-container">
          <h3>Search Results:</h3>
          {results.map((question, index) => (
            <div key={index} className="question-item">
              <h4>{question.title}</h4>
              <p className="difficulty">
                Difficulty: <span className={`difficulty-${question.difficulty}`}>
                  {question.difficulty}
                </span>
              </p>
              <div className="question-content">
                <p>{question.description}</p>
                
                {question.examples && question.examples.length > 0 && (
                  <div className="examples">
                    <h5>Examples:</h5>
                    {question.examples.map((example, i) => (
                      <div key={i} className="example">
                        <p><strong>Input:</strong> {example.input}</p>
                        <p><strong>Output:</strong> {example.output}</p>
                        {example.explanation && (
                          <p><strong>Explanation:</strong> {example.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {question.constraints && question.constraints.length > 0 && (
                  <div className="constraints">
                    <h5>Constraints:</h5>
                    <ul>
                      {question.constraints.map((constraint, i) => (
                        <li key={i}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {question.solution && (
                  <div className="solution">
                    <h5>Solution:</h5>
                    <div className="code-block">
                      <SyntaxHighlighter 
                        language={question.language || 'javascript'}
                        style={vscDarkPlus}
                        showLineNumbers
                      >
                        {question.solution}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                )}
                
                {question.timeComplexity && (
                  <p className="complexity">
                    <strong>Time Complexity:</strong> {question.timeComplexity}
                  </p>
                )}
                
                {question.spaceComplexity && (
                  <p className="complexity">
                    <strong>Space Complexity:</strong> {question.spaceComplexity}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCodingQuestions;
