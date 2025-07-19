import React, { useState, useEffect } from 'react';
import { FaRandom, FaSearch, FaTimes, FaFilter, FaBookmark, FaBookmark as FaBookmarkSolid, FaClock, FaStar, FaBuilding, FaBriefcase } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../shared/Toast/Toast';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import './MCQs.css';

// Mock data for questions
const mockQuestions = [
  {
    id: 1,
    question: 'What is the output of `typeof null` in JavaScript?',
    options: ['null', 'object', 'undefined', 'string'],
    correctAnswer: 1,
    explanation: 'In JavaScript, `typeof null` returns "object". This is a known bug in JavaScript that can\'t be fixed because it would break existing code.',
    category: 'JavaScript',
    difficulty: 'Medium',
    tags: ['Variables', 'Type System'],
    lastAttempted: '2023-07-12',
    status: 'unattempted',
    isBookmarked: false,
    company: 'Google',
    jobRole: 'Frontend Developer'
  },
  {
    id: 2,
    question: 'Which method is used to add an element at the end of an array in JavaScript?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 0,
    explanation: 'The push() method adds one or more elements to the end of an array and returns the new length of the array.',
    category: 'JavaScript',
    difficulty: 'Easy',
    tags: ['Arrays', 'Methods'],
    lastAttempted: '2023-07-10',
    status: 'correct',
    isBookmarked: true,
    company: 'Microsoft',
    jobRole: 'Software Engineer'
  },
  {
    id: 3,
    question: 'What is the purpose of the `useEffect` hook in React?',
    options: ['To manage state', 'To handle side effects', 'To create components', 'To handle events'],
    correctAnswer: 1,
    explanation: 'useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.',
    category: 'React',
    difficulty: 'Medium',
    tags: ['Hooks', 'Side Effects'],
    lastAttempted: '2023-07-08',
    status: 'incorrect',
    isBookmarked: false,
    company: 'Facebook',
    jobRole: 'React Developer'
  },
  {
    id: 4,
    question: 'Which CSS property is used to create space between elements?',
    options: ['margin', 'padding', 'border', 'spacing'],
    correctAnswer: 0,
    explanation: 'The margin property is used to create space around elements, outside of any defined borders.',
    category: 'CSS',
    difficulty: 'Easy',
    tags: ['Layout', 'Spacing'],
    lastAttempted: '2023-07-05',
    status: 'correct',
    isBookmarked: false,
    company: 'Amazon',
    jobRole: 'UI Developer'
  },
  {
    id: 5,
    question: 'What is the time complexity of binary search?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 1,
    explanation: 'Binary search has a time complexity of O(log n) as it divides the search space in half with each iteration.',
    category: 'Algorithms',
    difficulty: 'Hard',
    tags: ['Search', 'Complexity'],
    lastAttempted: '2023-07-03',
    status: 'unattempted',
    isBookmarked: true,
    company: 'Apple',
    jobRole: 'Algorithm Engineer'
  }
];

const MCQs = () => {
  const { state, addBookmark, removeBookmark, updateStats } = useApp();
  const { showToast } = useToast();
  const [questions] = useState(mockQuestions);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedJobRole, setSelectedJobRole] = useState('all');
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  
  // Get unique values for filters
  const categories = ['all', ...new Set(questions.map(q => q.category))];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];
  const companies = ['all', ...new Set(questions.map(q => q.company))];
  const jobRoles = ['all', ...new Set(questions.map(q => q.jobRole))];
  
  // Filter questions based on search and filters
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         question.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.jobRole.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
    const matchesCompany = selectedCompany === 'all' || question.company === selectedCompany;
    const matchesJobRole = selectedJobRole === 'all' || question.jobRole === selectedJobRole;
    const matchesBookmarked = !showBookmarked || state.bookmarks.has(question.id);

    return matchesSearch && matchesCategory && matchesDifficulty && matchesCompany && matchesJobRole && matchesBookmarked;
  });

  // Sort questions
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.lastAttempted) - new Date(a.lastAttempted);
      case 'oldest':
        return new Date(a.lastAttempted) - new Date(b.lastAttempted);
      case 'difficulty':
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedCompany('all');
    setSelectedJobRole('all');
    setShowBookmarked(false);
    setSortBy('newest');
  };

  // Toggle bookmark
  const toggleBookmark = (questionId) => {
    if (state.bookmarks.has(questionId)) {
      removeBookmark(questionId);
      showToast('Question removed from bookmarks', 'info');
    } else {
      addBookmark(questionId);
      showToast('Question bookmarked!', 'success');
    }
  };

  // Simulate loading questions
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Timer effect for quiz mode
  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Handle quiz completion when time is up
      setQuizStarted(false);
    }
    
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft]);

  // Handle starting a new quiz
  const handleStartQuiz = (numQuestions) => {
    setQuizStarted(true);
    setTimeLeft(10 * 60); // 10 minutes timer
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="mcqs-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mcqs-container">
      <div className="mcqs-header">
        <div>
          <h1>MCQ Bank</h1>
          <p>Practice interview questions and test your knowledge</p>
        </div>
        <div className="quiz-actions">
          <button 
            className="btn btn-primary"
            onClick={() => handleStartQuiz(10)}
          >
            <FaRandom /> Start Quiz (10 Questions)
          </button>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="search-filters-section">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search questions, tags, companies, or job roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="clear-search">
              <FaTimes />
            </button>
          )}
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Difficulty:</label>
            <select 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="filter-select"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Difficulties' : difficulty}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Company:</label>
            <select 
              value={selectedCompany} 
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="filter-select"
            >
              {companies.map(company => (
                <option key={company} value={company}>
                  {company === 'all' ? 'All Companies' : company}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Job Role:</label>
            <select 
              value={selectedJobRole} 
              onChange={(e) => setSelectedJobRole(e.target.value)}
              className="filter-select"
            >
              {jobRoles.map(role => (
                <option key={role} value={role}>
                  {role === 'all' ? 'All Roles' : role}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showBookmarked}
                onChange={(e) => setShowBookmarked(e.target.checked)}
              />
              Bookmarked Only
            </label>
          </div>

          <div className="filter-group">
            <label>Sort By:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="difficulty">Difficulty</option>
              <option value="category">Category</option>
            </select>
          </div>

          <button onClick={clearFilters} className="clear-filters-btn">
            <FaTimes /> Clear All
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <p>
          Showing {sortedQuestions.length} of {questions.length} questions
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Questions List */}
      <div className="questions-list">
        {sortedQuestions.length === 0 ? (
          <div className="no-results">
            <FaSearch className="no-results-icon" />
            <h3>No questions found</h3>
            <p>Try adjusting your search terms or filters</p>
            <button onClick={clearFilters} className="browse-all-btn">
              Browse All Questions
            </button>
          </div>
        ) : (
          sortedQuestions.map(question => (
            <div key={question.id} className="question-card">
              <div className="question-header">
                <div className="question-meta">
                  <span className={`difficulty-badge ${question.difficulty.toLowerCase()}`}>
                    {question.difficulty}
                  </span>
                  <span className="category-badge">{question.category}</span>
                  <span className="company-badge">
                    <FaBuilding /> {question.company}
                  </span>
                  <span className="role-badge">
                    <FaBriefcase /> {question.jobRole}
                  </span>
                </div>
                <div className="question-actions">
                  <button 
                    className="bookmark-btn"
                    onClick={() => toggleBookmark(question.id)}
                    title={state.bookmarks.has(question.id) ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    {state.bookmarks.has(question.id) ? <FaBookmarkSolid /> : <FaBookmark />}
                  </button>
                </div>
              </div>

              <div className="question-content">
                <h3 className="question-text">{question.question}</h3>
                <div className="question-options">
                  {question.options.map((option, index) => (
                    <div key={index} className="option-item">
                      <span className="option-label">{String.fromCharCode(65 + index)}.</span>
                      <span className="option-text">{option}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="question-footer">
                <div className="question-tags">
                  {question.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="question-stats">
                  <span className="last-attempted">
                    <FaClock /> Last attempted: {question.lastAttempted}
                  </span>
                  <span className={`status-badge ${question.status}`}>
                    {question.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quiz Timer (when quiz is active) */}
      {quizStarted && (
        <div className="quiz-timer">
          <FaClock />
          <span>Time remaining: {formatTime(timeLeft)}</span>
        </div>
      )}
    </div>
  );
};

export default MCQs;