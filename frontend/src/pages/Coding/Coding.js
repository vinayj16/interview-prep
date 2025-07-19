import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaSort, 
  FaCheck, 
  FaLock, 
  FaStar, 
  FaRegStar,
  FaCode,
  FaChartLine,
  FaLightbulb,
  FaRobot,
  FaSpinner
} from 'react-icons/fa';
import { useApp } from '../../context/AppContext';
import geminiService from '../../services/geminiService';
import { useToast } from '../../shared/Toast/Toast';
import './Coding.css';

const Coding = () => {
  const { state, updateStats } = useApp();
  const { showToast } = useToast();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    difficulty: 'all',
    status: 'all',
    tags: []
  });
  const [sortBy, setSortBy] = useState('recent');
  const [expandedProblem, setExpandedProblem] = useState(null);
  const [aiHints, setAiHints] = useState({});
  const [loadingHints, setLoadingHints] = useState({});

  // Available tags
  const availableTags = [
    'Array', 'String', 'Hash Table', 'Dynamic Programming', 
    'Math', 'Sorting', 'Greedy', 'Depth-First Search',
    'Binary Search', 'Breadth-First Search', 'Tree', 'Graph'
  ];

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockProblems = [
      {
        id: 1,
        title: 'Two Sum',
        difficulty: 'Easy',
        acceptance: '45.5%',
        frequency: 1.2,
        tags: ['Array', 'Hash Table'],
        description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
        status: 'solved',
        premium: false,
        lastAttempted: '2023-07-10'
      },
      {
        id: 2,
        title: 'Add Two Numbers',
        difficulty: 'Medium',
        acceptance: '34.1%',
        frequency: 0.8,
        tags: ['Linked List', 'Math'],
        description: 'You are given two non-empty linked lists representing two non-negative integers...',
        status: 'attempted',
        premium: false,
        lastAttempted: '2023-07-08'
      },
      {
        id: 3,
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        acceptance: '30.2%',
        frequency: 1.5,
        tags: ['Hash Table', 'Two Pointers', 'String', 'Sliding Window'],
        description: 'Given a string, find the length of the longest substring without repeating characters.',
        status: 'todo',
        premium: false,
        lastAttempted: null
      },
      {
        id: 4,
        title: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        acceptance: '29.9%',
        frequency: 0.9,
        tags: ['Array', 'Binary Search', 'Divide and Conquer'],
        description: 'There are two sorted arrays nums1 and nums2 of size m and n respectively...',
        status: 'todo',
        premium: true,
        lastAttempted: null
      },
      {
        id: 5,
        title: 'Longest Palindromic Substring',
        difficulty: 'Medium',
        acceptance: '29.7%',
        frequency: 1.1,
        tags: ['String', 'Dynamic Programming'],
        description: 'Given a string s, find the longest palindromic substring in s...',
        status: 'solved',
        premium: false,
        lastAttempted: '2023-07-05'
      },
      {
        id: 6,
        title: 'ZigZag Conversion',
        difficulty: 'Medium',
        acceptance: '36.5%',
        frequency: 0.7,
        tags: ['String'],
        description: 'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows...',
        status: 'attempted',
        premium: false,
        lastAttempted: '2023-07-01'
      },
      {
        id: 7,
        title: 'Reverse Integer',
        difficulty: 'Easy',
        acceptance: '25.9%',
        frequency: 1.3,
        tags: ['Math'],
        description: 'Given a 32-bit signed integer, reverse digits of an integer.',
        status: 'solved',
        premium: false,
        lastAttempted: '2023-06-28'
      },
      {
        id: 8,
        title: 'String to Integer (atoi)',
        difficulty: 'Medium',
        acceptance: '15.4%',
        frequency: 0.6,
        tags: ['Math', 'String'],
        description: 'Implement atoi which converts a string to an integer.',
        status: 'todo',
        premium: true,
        lastAttempted: null
      },
      {
        id: 9,
        title: 'Container With Most Water',
        difficulty: 'Medium',
        acceptance: '50.2%',
        frequency: 1.0,
        tags: ['Array', 'Two Pointers'],
        description: 'Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai)...',
        status: 'attempted',
        premium: false,
        lastAttempted: '2023-06-25'
      },
      {
        id: 10,
        title: 'Regular Expression Matching',
        difficulty: 'Hard',
        acceptance: '26.9%',
        frequency: 0.5,
        tags: ['String', 'Dynamic Programming', 'Backtracking'],
        description: 'Given an input string (s) and a pattern (p), implement regular expression matching with support for...',
        status: 'todo',
        premium: false,
        lastAttempted: null
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setProblems(mockProblems);
      setLoading(false);
    }, 800);
  }, []);

  // Filter and sort problems
  const filteredProblems = problems.filter(problem => {
    // Search term filter
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Difficulty filter
    const matchesDifficulty = filters.difficulty === 'all' || 
      problem.difficulty.toLowerCase() === filters.difficulty;
    
    // Status filter
    const matchesStatus = filters.status === 'all' || 
      problem.status === filters.status;
    
    // Tags filter
    const matchesTags = filters.tags.length === 0 || 
      filters.tags.every(tag => problem.tags.includes(tag));
    
    return matchesSearch && matchesDifficulty && matchesStatus && matchesTags;
  }).sort((a, b) => {
    // Sort logic
    switch(sortBy) {
      case 'difficulty':
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case 'acceptance':
        return parseFloat(b.acceptance) - parseFloat(a.acceptance);
      case 'frequency':
        return b.frequency - a.frequency;
      case 'recent':
      default:
        if (!a.lastAttempted) return 1;
        if (!b.lastAttempted) return -1;
        return new Date(b.lastAttempted) - new Date(a.lastAttempted);
    }
  });

  const toggleTag = (tag) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const toggleProblemExpand = (id) => {
    setExpandedProblem(expandedProblem === id ? null : id);
  };

  // Get AI hints for a problem
  const getAIHints = async (problemId) => {
    const problem = problems.find(p => p.id === problemId);
    if (!problem || loadingHints[problemId]) return;

    try {
      setLoadingHints(prev => ({ ...prev, [problemId]: true }));
      
      const hints = await geminiService.generateHints(problem.description, '');
      setAiHints(prev => ({ ...prev, [problemId]: hints.hints || [] }));
      
      showToast('AI hints generated successfully!', 'success');
    } catch (error) {
      console.error('Error getting AI hints:', error);
      showToast('Failed to generate hints. Please try again.', 'error');
    } finally {
      setLoadingHints(prev => ({ ...prev, [problemId]: false }));
    }
  };

  // Bookmark a problem
  const toggleBookmark = (problemId) => {
    const { addBookmark, removeBookmark, state } = useApp();
    
    if (state.bookmarks.has(problemId)) {
      removeBookmark(problemId);
      showToast('Problem removed from bookmarks', 'info');
    } else {
      addBookmark(problemId);
      showToast('Problem bookmarked!', 'success');
    }
  };

  if (loading) {
    return (
      <div className="coding-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading problems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="coding-container">
      <div className="coding-header">
        <h1>Coding Problems</h1>
        <p>Practice coding problems to prepare for your next interview</p>
      </div>
      
      <div className="coding-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters-container">
          <div className="filter-group">
            <label><FaFilter className="filter-icon" /> Difficulty:</label>
            <select 
              value={filters.difficulty}
              onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
            >
              <option value="all">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All</option>
              <option value="todo">Todo</option>
              <option value="attempted">Attempted</option>
              <option value="solved">Solved</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label><FaSort className="sort-icon" /> Sort by:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Recently Attempted</option>
              <option value="difficulty">Difficulty</option>
              <option value="acceptance">Acceptance</option>
              <option value="frequency">Frequency</option>
            </select>
          </div>
        </div>
        
        <div className="tags-filter">
          <h4>Filter by Tags:</h4>
          <div className="tags-container">
            {availableTags.map(tag => (
              <button
                key={tag}
                className={`tag ${filters.tags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="problems-list">
        <div className="problems-header">
          <div className="header-title">Title</div>
          <div className="header-difficulty">Difficulty</div>
          <div className="header-acceptance">Acceptance</div>
          <div className="header-frequency">Frequency</div>
          <div className="header-status">Status</div>
        </div>
        
        {filteredProblems.length === 0 ? (
          <div className="no-results">
            <FaSearch className="no-results-icon" />
            <h3>No problems found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredProblems.map(problem => (
            <div 
              key={problem.id} 
              className={`problem-item ${problem.status} ${expandedProblem === problem.id ? 'expanded' : ''}`}
            >
              <div className="problem-main" onClick={() => toggleProblemExpand(problem.id)}>
                <div className="problem-title">
                  {problem.premium && <span className="premium-badge">Premium</span>}
                  <span>{problem.title}</span>
                  {problem.premium && <FaLock className="premium-lock" />}
                </div>
                <div className={`problem-difficulty ${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </div>
                <div className="problem-acceptance">
                  {problem.acceptance}
                </div>
                <div className="problem-frequency">
                  <div className="frequency-bar" style={{ width: `${problem.frequency * 50}%` }}></div>
                </div>
                <div className="problem-status">
                  {problem.status === 'solved' && (
                    <span className="status-solved"><FaCheck /> Solved</span>
                  )}
                  {problem.status === 'attempted' && (
                    <span className="status-attempted">Attempted</span>
                  )}
                  {problem.status === 'todo' && (
                    <span className="status-todo">To Do</span>
                  )}
                </div>
              </div>
              
              {expandedProblem === problem.id && (
                <div className="problem-details">
                  <div className="problem-description">
                    <h4>Description</h4>
                    <p>{problem.description}</p>
                    <div className="problem-tags">
                      {problem.tags.map(tag => (
                        <span key={tag} className="problem-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="problem-actions">
                    <Link 
                      to={`/coding/${problem.id}`} 
                      className="btn btn-primary"
                    >
                      <FaCode /> Solve Problem
                    </Link>
                    <button 
                      className={`btn btn-outline ${state.bookmarks.has(problem.id) ? 'bookmarked' : ''}`}
                      onClick={() => toggleBookmark(problem.id)}
                    >
                      {state.bookmarks.has(problem.id) ? <FaStar /> : <FaRegStar />} 
                      {state.bookmarks.has(problem.id) ? 'Bookmarked' : 'Bookmark'}
                    </button>
                    <button 
                      className="btn btn-outline"
                      onClick={() => getAIHints(problem.id)}
                      disabled={loadingHints[problem.id]}
                    >
                      {loadingHints[problem.id] ? <FaSpinner className="spinning" /> : <FaLightbulb />}
                      Get AI Hints
                    </button>
                  </div>
                  
                  {/* AI Hints Section */}
                  {aiHints[problem.id] && aiHints[problem.id].length > 0 && (
                    <div className="ai-hints-section">
                      <h4><FaRobot /> AI Generated Hints</h4>
                      <div className="hints-list">
                        {aiHints[problem.id].map((hint, index) => (
                          <div key={index} className="hint-item">
                            <span className="hint-number">{index + 1}.</span>
                            <span className="hint-text">{hint}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="pagination">
        <button className="btn btn-outline" disabled>Previous</button>
        <div className="page-numbers">
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>10</span>
        </div>
        <button className="btn btn-outline">Next</button>
      </div>
      
      <div className="coding-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaCode />
          </div>
          <div className="stat-content">
            <h3>Problems Solved</h3>
            <p className="stat-value">{state.stats.problemsSolved}</p>
            <p className="stat-change">+12 this week</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-content">
            <h3>Total Points</h3>
            <p className="stat-value">{state.stats.totalPoints}</p>
            <p className="stat-change">+{Math.floor(state.stats.totalPoints * 0.1)} this month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coding;
