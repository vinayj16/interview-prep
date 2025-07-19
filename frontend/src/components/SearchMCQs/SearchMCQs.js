import React, { useState } from 'react';
import './SearchMCQs.css';

const SearchMCQs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/mcqs/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchTerm }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch MCQs');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Error fetching MCQs');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-mcqs">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search MCQs..."
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search MCQs'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {results && (
        <div className="results-container">
          <h3>Search Results:</h3>
          {results.map((mcq, index) => (
            <div key={index} className="mcq-item">
              <h4>{mcq.question}</h4>
              <ul>
                {mcq.options.map((option, i) => (
                  <li key={i} className={mcq.correctAnswer === i ? 'correct' : ''}>
                    {option}
                  </li>
                ))}
              </ul>
              <p className="explanation">{mcq.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchMCQs;
