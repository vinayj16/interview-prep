import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaCheck, FaTimes, FaLightbulb, FaFilter, FaSearch, FaClock, FaTrophy, FaBookmark, FaRegBookmark, FaBuilding, FaTrash, FaPlay } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
// Remove apiService import
// import apiService from '../services/apiService';
import './MCQs.css';

// Company-specific MCQ data
const companyMCQData = {
  'google': {
    name: 'Google',
    domain: 'Software Engineering & Algorithms',
    questions: [
      {
        id: 'google_1',
        category: 'Algorithms',
        difficulty: 'Hard',
        question: 'What is the time complexity of Google\'s PageRank algorithm?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(n³)'],
        correctAnswer: 2,
        explanation: 'PageRank has O(n²) complexity due to matrix operations on the web graph.',
        hint: 'Think about matrix multiplication complexity',
        company: 'Google',
        topic: 'Algorithms'
      },
      {
        id: 'google_2',
        category: 'System Design',
        difficulty: 'Hard',
        question: 'How does Google handle distributed caching in their search infrastructure?',
        options: [
          'Only uses Redis',
          'Uses a multi-layer caching strategy with CDN, application, and database caching',
          'No caching at all',
          'Only database caching'
        ],
        correctAnswer: 1,
        explanation: 'Google uses a sophisticated multi-layer caching strategy including CDN, application-level, and database caching for optimal performance.',
        hint: 'Consider the scale of Google\'s search operations',
        company: 'Google',
        topic: 'System Design'
      },
      {
        id: 'google_3',
        category: 'Data Structures',
        difficulty: 'Medium',
        question: 'Which data structure is most efficient for Google\'s autocomplete feature?',
        options: ['Binary Tree', 'Trie (Prefix Tree)', 'Hash Table', 'Linked List'],
        correctAnswer: 1,
        explanation: 'Trie is optimal for autocomplete as it allows efficient prefix-based searches and suggestions.',
        hint: 'Think about prefix matching',
        company: 'Google',
        topic: 'Data Structures'
      }
    ]
  },
  'microsoft': {
    name: 'Microsoft',
    domain: 'Software Development & Cloud',
    questions: [
      {
        id: 'microsoft_1',
        category: 'Cloud Computing',
        difficulty: 'Medium',
        question: 'What is Azure\'s primary cloud service model?',
        options: ['IaaS only', 'PaaS only', 'SaaS only', 'All three: IaaS, PaaS, SaaS'],
        correctAnswer: 3,
        explanation: 'Azure provides all three service models: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS).',
        hint: 'Microsoft offers comprehensive cloud solutions',
        company: 'Microsoft',
        topic: 'Cloud Computing'
      },
      {
        id: 'microsoft_2',
        category: 'Software Engineering',
        difficulty: 'Medium',
        question: 'What is the primary language used for Windows development?',
        options: ['Java', 'C#', 'Python', 'JavaScript'],
        correctAnswer: 1,
        explanation: 'C# is the primary language for Windows development, especially with .NET framework.',
        hint: 'Think about Microsoft\'s development ecosystem',
        company: 'Microsoft',
        topic: 'Software Engineering'
      }
    ]
  },
  'amazon': {
    name: 'Amazon',
    domain: 'E-commerce & Cloud Services',
    questions: [
      {
        id: 'amazon_1',
        category: 'System Design',
        difficulty: 'Hard',
        question: 'How does Amazon handle high availability in their e-commerce platform?',
        options: [
          'Single server architecture',
          'Multi-region deployment with failover mechanisms',
          'Only local caching',
          'No redundancy'
        ],
        correctAnswer: 1,
        explanation: 'Amazon uses multi-region deployment with sophisticated failover mechanisms to ensure high availability.',
        hint: 'Consider the global scale of Amazon\'s operations',
        company: 'Amazon',
        topic: 'System Design'
      },
      {
        id: 'amazon_2',
        category: 'Cloud Computing',
        difficulty: 'Medium',
        question: 'What is AWS Lambda primarily used for?',
        options: [
          'Long-running batch processes',
          'Serverless computing and event-driven functions',
          'Database management only',
          'Static website hosting only'
        ],
        correctAnswer: 1,
        explanation: 'AWS Lambda is a serverless compute service that runs code in response to events.',
        hint: 'Think about serverless architecture',
        company: 'Amazon',
        topic: 'Cloud Computing'
      }
    ]
  },
  'facebook': {
    name: 'Facebook (Meta)',
    domain: 'Social Media & AI',
    questions: [
      {
        id: 'facebook_1',
        category: 'Machine Learning',
        difficulty: 'Hard',
        question: 'What type of algorithm does Facebook use for content recommendation?',
        options: [
          'Only collaborative filtering',
          'Only content-based filtering',
          'Hybrid approach combining multiple algorithms',
          'Random selection'
        ],
        correctAnswer: 2,
        explanation: 'Facebook uses a hybrid approach combining collaborative filtering, content-based filtering, and deep learning models.',
        hint: 'Modern recommendation systems use multiple approaches',
        company: 'Facebook',
        topic: 'Machine Learning'
      },
      {
        id: 'facebook_2',
        category: 'Data Engineering',
        difficulty: 'Medium',
        question: 'How does Facebook handle real-time data processing?',
        options: [
          'Only batch processing',
          'Stream processing with Apache Storm and Spark',
          'No real-time processing',
          'Only database queries'
        ],
        correctAnswer: 1,
        explanation: 'Facebook uses stream processing technologies like Apache Storm and Spark for real-time data processing.',
        hint: 'Think about real-time features like live updates',
        company: 'Facebook',
        topic: 'Data Engineering'
      }
    ]
  },
  'apple': {
    name: 'Apple',
    domain: 'Mobile Development & Hardware',
    questions: [
      {
        id: 'apple_1',
        category: 'Mobile Development',
        difficulty: 'Medium',
        question: 'What is the primary language for iOS development?',
        options: ['Java', 'Swift', 'Python', 'C++'],
        correctAnswer: 1,
        explanation: 'Swift is the primary language for iOS development, introduced by Apple in 2014.',
        hint: 'Think about Apple\'s modern development approach',
        company: 'Apple',
        topic: 'Mobile Development'
      },
      {
        id: 'apple_2',
        category: 'System Design',
        difficulty: 'Hard',
        question: 'How does Apple ensure security in their ecosystem?',
        options: [
          'Only software encryption',
          'Hardware and software security with Secure Enclave',
          'No security measures',
          'Only network security'
        ],
        correctAnswer: 1,
        explanation: 'Apple uses a combination of hardware (Secure Enclave) and software security measures.',
        hint: 'Consider Apple\'s emphasis on privacy and security',
        company: 'Apple',
        topic: 'System Design'
      }
    ]
  },
  'netflix': {
    name: 'Netflix',
    domain: 'Streaming & Content Delivery',
    questions: [
      {
        id: 'netflix_1',
        category: 'System Design',
        difficulty: 'Hard',
        question: 'How does Netflix handle content delivery optimization?',
        options: [
          'Single CDN worldwide',
          'Multi-CDN strategy with adaptive bitrate streaming',
          'No CDN usage',
          'Only local servers'
        ],
        correctAnswer: 1,
        explanation: 'Netflix uses a multi-CDN strategy with adaptive bitrate streaming for optimal content delivery.',
        hint: 'Think about global streaming requirements',
        company: 'Netflix',
        topic: 'System Design'
      },
      {
        id: 'netflix_2',
        category: 'Machine Learning',
        difficulty: 'Medium',
        question: 'What is Netflix\'s recommendation system primarily based on?',
        options: [
          'Only user ratings',
          'Viewing history, ratings, and collaborative filtering',
          'Random selection',
          'Only content metadata'
        ],
        correctAnswer: 1,
        explanation: 'Netflix uses viewing history, ratings, and collaborative filtering for recommendations.',
        hint: 'Consider multiple data points for recommendations',
        company: 'Netflix',
        topic: 'Machine Learning'
      }
    ]
  }
};

// General MCQ data
const generalMCQData = [
  {
    id: 1,
    category: 'JavaScript',
    difficulty: 'Medium',
    question: 'What is the output of: console.log(typeof typeof 1)?',
    options: ['number', 'string', 'undefined', 'NaN'],
    correctAnswer: 1,
    explanation: 'typeof 1 returns "number" (as a string), so typeof typeof 1 is evaluating typeof "number", which returns "string"',
    hint: 'Think about what typeof returns - always a string!',
    company: 'General',
    topic: 'JavaScript'
  },
  {
    id: 2,
    category: 'JavaScript',
    difficulty: 'Hard',
    question: 'What is the value of: [] == ![]?',
    options: ['false', 'true', 'undefined', 'TypeError'],
    correctAnswer: 1,
    explanation: 'Array is converted to number (0), ![] is false which is converted to 0, so 0 == 0 is true',
    hint: 'Consider type coercion in JavaScript',
    company: 'General',
    topic: 'JavaScript'
  },
  {
    id: 3,
    category: 'JavaScript',
    question: 'What is a closure in JavaScript?',
    options: [
      'A function that has access to variables in its outer scope',
      'A way to close a browser window',
      'A method to end a loop',
      'A type of error handling'
    ],
    correctAnswer: 0,
    explanation: 'A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.',
    company: 'General',
    topic: 'JavaScript'
  },
  {
    id: 4,
    category: 'React',
    question: 'What is the virtual DOM in React?',
    options: [
      'A direct copy of the real DOM',
      'A lightweight copy of the real DOM used for performance optimization',
      'A browser extension for React',
      'A type of React component'
    ],
    correctAnswer: 1,
    explanation: 'Virtual DOM is a lightweight JavaScript object that is a copy of the real DOM. React uses it to improve performance by minimizing actual DOM manipulation.',
    company: 'General',
    topic: 'React'
  },
  {
    id: 5,
    category: 'React',
    question: 'What is the purpose of useEffect hook?',
    options: [
      'To handle state in functional components',
      'To perform side effects in functional components',
      'To create new components',
      'To style components'
    ],
    correctAnswer: 1,
    explanation: 'useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.',
    company: 'General',
    topic: 'React'
  },
  {
    id: 6,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
    explanation: "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity.",
    company: "General",
    topic: "Algorithms",
    difficulty: "Medium"
  },
  {
    id: 7,
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correct: 1,
    explanation: "Stack follows LIFO principle where the last element added is the first one to be removed.",
    company: "General",
    topic: "Data Structures",
    difficulty: "Easy"
  },
  {
    id: 8,
    question: "What is the space complexity of merge sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correct: 2,
    explanation: "Merge sort requires O(n) additional space for the temporary arrays used during merging.",
    company: "General",
    topic: "Algorithms",
    difficulty: "Medium"
  },
  {
    id: 9,
    question: "In JavaScript, what does 'this' keyword refer to?",
    options: ["The global object", "The current function", "The calling object", "Undefined"],
    correct: 2,
    explanation: "In JavaScript, 'this' refers to the object that is calling the function.",
    company: "General",
    topic: "JavaScript",
    difficulty: "Medium"
  },
  {
    id: 10,
    question: "What is the worst-case time complexity of quicksort?",
    options: ["O(n log n)", "O(n²)", "O(log n)", "O(n)"],
    correct: 1,
    explanation: "Quicksort has O(n²) worst-case time complexity when the pivot is always the smallest or largest element.",
    company: "General",
    topic: "Algorithms",
    difficulty: "Hard"
  },
  {
    id: 11,
    question: "Which HTTP method is idempotent?",
    options: ["POST", "PUT", "PATCH", "All of the above"],
    correct: 1,
    explanation: "PUT is idempotent, meaning multiple identical requests should have the same effect as a single request.",
    company: "General",
    topic: "Web Development",
    difficulty: "Medium"
  },
  {
    id: 12,
    question: "What is the purpose of a hash table?",
    options: ["Sorting data", "Fast data retrieval", "Memory management", "Error handling"],
    correct: 1,
    explanation: "Hash tables provide fast data retrieval with average O(1) time complexity for search, insert, and delete operations.",
    company: "General",
    topic: "Data Structures",
    difficulty: "Easy"
  },
  {
    id: 13,
    question: "In React, what is the purpose of useEffect hook?",
    options: ["State management", "Side effects", "Event handling", "Rendering"],
    correct: 1,
    explanation: "useEffect hook is used to perform side effects in functional components, such as data fetching, subscriptions, or DOM manipulation.",
    company: "General",
    topic: "React",
    difficulty: "Medium"
  }
];

const getUser = () => JSON.parse(localStorage.getItem('user'));

const getBookmarksKey = () => {
  const user = getUser();
  return user ? `mcqBookmarks_${user.email}` : 'mcqBookmarks_guest';
};

const getBookmarkedMCQs = () => {
  const key = getBookmarksKey();
  return JSON.parse(localStorage.getItem(key) || '[]');
};
const MCQs = () => {
  const { showToast } = useToast();
  const { state, actions } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [filterCompany, setFilterCompany] = useState('all');
  const [filterTopic, setFilterTopic] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [mcqs, setMcqs] = useState(() => {
    try {
      const saved = localStorage.getItem('lastFetchedMCQs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading MCQs from localStorage:', e);
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState(getBookmarkedMCQs());
  const [showHints, setShowHints] = useState({});
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('mcqProgress');
    return saved ? JSON.parse(saved) : { completed: 0, correct: 0 };
  });

  // Combine all MCQ data sources
  const allQuestions = useMemo(() => {
    // Convert company-specific questions to the same format as general questions
    const companyQuestions = Object.values(companyMCQData).flatMap(companyData =>
      companyData.questions.map(q => ({
        ...q,
        correct: q.correctAnswer,
        id: q.id.toString()
      }))
    );

    // Combine with general questions and API-fetched questions
    return [...generalMCQData, ...companyQuestions, ...mcqs];
  }, [mcqs]);

  const companies = useMemo(() => {
    const allCompanies = new Set();
    allQuestions.forEach(q => {
      if (q.company && typeof q.company === 'string') {
        allCompanies.add(q.company);
      }
    });
    return ['all', ...Array.from(allCompanies).filter(Boolean).sort()];
  }, [allQuestions]);

  const topics = useMemo(() => {
    const allTopics = new Set();
    allQuestions.forEach(q => {
      const topic = q.topic || q.category;
      if (topic && typeof topic === 'string') {
        allTopics.add(topic);
      }
    });
    return ['all', ...Array.from(allTopics).filter(Boolean).sort()];
  }, [allQuestions]);

  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];
  
  const filterQuestions = useCallback(() => {
    let filtered = [...allQuestions];

    if (filterCompany && filterCompany !== 'all') {
      filtered = filtered.filter(q => {
        const company = q?.company || '';
        return typeof company === 'string' && 
               company.toLowerCase() === filterCompany.toLowerCase();
      });
    }

    if (filterTopic && filterTopic !== 'all') {
      filtered = filtered.filter(q => {
        const topic = q?.topic || q?.category || '';
        return typeof topic === 'string' && 
               topic.toLowerCase() === filterTopic.toLowerCase();
      });
    }

    if (filterDifficulty && filterDifficulty !== 'all') {
      filtered = filtered.filter(q => {
        const difficulty = q?.difficulty || '';
        return typeof difficulty === 'string' && 
               difficulty.toLowerCase() === filterDifficulty.toLowerCase();
      });
    }

    return filtered;
  }, [allQuestions, filterCompany, filterTopic, filterDifficulty]);

  // Initialize questions state with filtered questions
  const [questions, setQuestions] = useState(() => {
    try {
      return filterQuestions();
    } catch (error) {
      console.error('Error initializing questions:', error);
      return [];
    }
  });

  // Update questions when filters change
  useEffect(() => {
    try {
      const filtered = filterQuestions();
      setQuestions(filtered);
    } catch (error) {
      console.error('Error filtering questions:', error);
      showToast('Error loading questions. Please try again.', 'error');
    }
  }, [filterCompany, filterTopic, filterDifficulty, filterQuestions]);

  useEffect(() => {
    localStorage.setItem('mcqProgress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmitAnswer();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const fetchMCQs = async () => {
    if (!company.trim()) {
      showToast('Please enter a company name', 'error');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Check if we have cached data for this company
      const cachedData = localStorage.getItem(`mcqs_${company.toLowerCase()}`);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setMcqs(parsedData);
        localStorage.setItem('lastFetchedMCQs', JSON.stringify(parsedData));
        setLoading(false);
        showToast('Loaded cached questions', 'success');
        return;
      }

      // Use local mock data
      const companyKey = company.toLowerCase();
      if (companyMCQData[companyKey]) {
        const questions = companyMCQData[companyKey].questions;
        setMcqs(questions);
        localStorage.setItem(`mcqs_${companyKey}`, JSON.stringify(questions));
        localStorage.setItem('lastFetchedMCQs', JSON.stringify(questions));
        showToast('Questions loaded from local data', 'success');
      } else {
        setMcqs([]);
        showToast('No local questions found for this company', 'info');
      }
    } catch (error) {
      console.error('Error loading MCQs:', error);
      setError('Failed to load questions. Please try again later.');
      showToast('Error loading questions', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCompany('');
    setJobDescription('');
    setMcqs([]);
    localStorage.removeItem('lastFetchedMCQs');
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMCQs();
  };

  const startQuiz = () => {
    if (questions.length === 0) {
      showToast('No questions available. Please adjust your filters.', 'warning');
      return;
    }
    setQuizStarted(true);
    setIsActive(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setUserAnswers(Array(questions.length).fill(null));
    setTimeLeft(30);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      showToast('Please select an answer', 'warning');
      return;
    }

    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    const newUserAnswers = [...userAnswers, {
      questionId: questions[currentQuestion].id,
      selected: selectedAnswer,
      correct: questions[currentQuestion].correct,
      isCorrect
    }];

    
    setUserAnswers(newUserAnswers);
    setShowResult(true);
    setIsActive(false);

    if (isCorrect) {
      setScore(score + 1);
      setProgress(prev => ({
        ...prev,
        completed: prev.completed + 1,
        correct: prev.correct + 1
      }));
      showToast('Correct! 🎉', 'success');
    } else {
      setProgress(prev => ({
        ...prev,
        completed: prev.completed + 1
      }));
      showToast('Incorrect. Check the explanation.', 'error');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setIsActive(true);
    } else {
      handleQuizComplete();
    }
  };

  const handleTimeUp = () => {
    if (!showResult) {
      const newUserAnswers = [...userAnswers, {
        questionId: questions[currentQuestion].id,
        selected: null,
        correct: questions[currentQuestion].correct,
        isCorrect: false
      }];
      setUserAnswers(newUserAnswers);
      setShowResult(true);
      setIsActive(false);
      showToast('Time\'s up!', 'warning');
    }
  };

  const handleQuizComplete = () => {
    setQuizStarted(false);
    const percentage = (score / questions.length) * 100;

    
    // Update stats
    actions.updateStats({
      mcqsCompleted: state.stats.mcqsCompleted + questions.length,
      totalPoints: state.stats.totalPoints + (score * 5)
    });

    
    if (percentage >= 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      showToast(`Excellent! You scored ${score}/${questions.length} (${percentage.toFixed(1)}%)`, 'success');
    } else if (percentage >= 60) {
      showToast(`Good job! You scored ${score}/${questions.length} (${percentage.toFixed(1)}%)`, 'info');
    } else {
      showToast(`Keep practicing! You scored ${score}/${questions.length} (${percentage.toFixed(1)}%)`, 'warning');
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
    setIsActive(false);
  };

  const toggleBookmark = useCallback((questionId) => {
    setBookmarkedQuestions(prev => {
      let updated;
      if (prev.includes(questionId)) {
        updated = prev.filter(id => id !== questionId);
      } else {
        updated = [...prev, questionId];
      }
      localStorage.setItem(getBookmarksKey(), JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleHint = useCallback((questionId) => {
    setShowHints(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  }, []);

  const isBookmarked = (questionId) => {
    return bookmarkedQuestions.includes(questionId);
  };

  if (!quizStarted) {
  return (
      <div className="mcqs-page">
        <div className="container">
          <div className="mcqs-header">
            <h1>Multiple Choice Questions</h1>
            <p>Test your knowledge with company-specific MCQs</p>
          </div>

          {/* Fetch MCQs Section */}
          <div className="mcq-fetch-section">
      <form onSubmit={handleSubmit} className="mcq-fetch-form">
              <div className="mcq-input-group">
                <label htmlFor="company-input">Company name (e.g. Google)</label>
        <input
          type="text"
          placeholder="Company name (e.g. Google)"
          value={company}
          onChange={e => setCompany(e.target.value)}
          className="company-input"
          id="company-input"
          aria-describedby="mcq-search-desc"
          autoComplete="organization"
        />
                <label htmlFor="jobdesc-input">Paste job description here...</label>
        <textarea
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          className="jobdesc-input"
          rows={3}
        />
              </div>
              <div className="mcq-btn-row">
        <button type="submit" className="fetch-mcqs-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner"></span> Fetching...
                    </>
                  ) : 'Fetch MCQs'}
                </button>
                <button type="button" className="clear-mcqs-btn" onClick={handleClear}>
                  <FaTrash /> Clear
        </button>
              </div>
      </form>
            {error && <p className="error-message" aria-live="polite">{error}</p>}
          </div>

          {/* Filters */}
          <div className="quiz-setup">
            <div className="filters-section">
              <div className="filters-header">
                <button
                  className="filter-toggle btn btn-secondary"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                
                <button 
                  className="start-quiz-btn"
                  onClick={startQuiz}
                  disabled={questions.length === 0}
                >
                  <FaPlay /> Start Quiz ({questions.length} questions)
                </button>
              </div>

              {showFilters && (
                <div className="filters">
                  <div className="filter-group">
                    <label htmlFor="company-filter">Company:</label>
                    <select
                      id="company-filter"
                      value={filterCompany}
                      onChange={(e) => setFilterCompany(e.target.value)}
                      className="form-select"
                    >
                      <option value="all">All Companies</option>
                      {companies.filter(c => c !== 'all').map(company => (
                        <option key={company} value={company}>
                          {company}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label htmlFor="topic-filter">Topic:</label>
                    <select
                      id="topic-filter"
                      value={filterTopic}
                      onChange={(e) => setFilterTopic(e.target.value)}
                      className="form-select"
                    >
                      <option value="all">All Topics</option>
                      {topics.filter(t => t !== 'all').map(topic => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label htmlFor="difficulty-filter">Difficulty:</label>
                    <select
                      id="difficulty-filter"
                      value={filterDifficulty}
                      onChange={(e) => setFilterDifficulty(e.target.value)}
                      className="form-select"
                    >
                      <option value="all">All Difficulties</option>
                      {difficulties.filter(d => d !== 'all').map(difficulty => (
                        <option key={difficulty} value={difficulty}>
                          {difficulty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="quiz-info">
              <div className="info-card">
                <h3>Quiz Information</h3>
                <ul>
                  <li>📝 {questions.length} questions available</li>
                  <li>⏱️ 30 seconds per question</li>
                  <li>🎯 Multiple choice format</li>
                  <li>📊 Instant feedback and explanations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Question Preview */}
          {questions.length > 0 && (
            <div className="question-preview">
              <h3>Sample Questions:</h3>
              <div className="preview-list">
                {questions.slice(0, 3).map((question, index) => (
                  <div key={question.id} className="preview-item">
                    <div className="preview-header">
                      <span className="question-number">Q{index + 1}</span>
                      <div className="question-meta">
                        {question?.company && <span className="company">{question.company}</span>}
                        {(question?.topic || question?.category) && (
                          <span className="topic">{question.topic || question.category}</span>
                        )}
                        {question?.difficulty && (
                          <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
                            {question.difficulty}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="preview-question">{question.question}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="mcqs-page">
      <div className="container">
        {/* Quiz Header */}
        <div className="quiz-header">
          <div className="quiz-progress">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="quiz-stats">
            <div className="stat">
              <FaClock />
              <span className={timeLeft <= 10 ? 'time-warning' : ''}>{timeLeft}s</span>
            </div>
            <div className="stat">
              <FaTrophy />
              <span>{score}/{questions.length}</span>
            </div>
            <button
              className="bookmark-btn"
              onClick={() => toggleBookmark(currentQ.id)}
              title={isBookmarked(currentQ.id) ? 'Remove bookmark' : 'Bookmark question'}
            >
              {isBookmarked(currentQ.id) ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
        </div>

        {/* Question Card */}
        <div className="question-card">
          <div className="question-header">
            <div className="question-meta">
              {currentQ?.company && <span className="company">{currentQ.company}</span>}
              {(currentQ?.topic || currentQ?.category) && (
                <span className="topic">{currentQ.topic || currentQ.category}</span>
              )}
              <span className={`difficulty ${(currentQ?.difficulty || 'medium').toLowerCase()}`}>
                {currentQ?.difficulty || 'Medium'}
              </span>
            </div>
          </div>

          <div className="question-content">
            <h2>{currentQ.question}</h2>
          </div>

          <div className="options-list">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className={`option ${selectedAnswer === index ? 'selected' : ''} ${
                  showResult ? (
                    index === currentQ.correct ? 'correct' :
                    index === currentQ.correct ? 'correct' : 
                    selectedAnswer === index ? 'incorrect' : ''
                  ) : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
                {showResult && index === currentQ.correct && <FaCheck className="result-icon" />}
                {showResult && selectedAnswer === index && index !== currentQ.correct && (
                  <FaTimes className="result-icon" />
                )}
              </button>
            ))}
          </div>

          {showResult && currentQ.explanation && (
            <div className="explanation">
              <div className="explanation-header">
                <FaLightbulb />
                <h3>Explanation</h3>
              </div>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {showHints[currentQ.id] && currentQ.hint && (
            <div className="hint">
              <FaLightbulb /> {currentQ.hint}
            </div>
          )}

          {currentQ.hint && (
            <button
              className="hint-toggle"
              onClick={() => toggleHint(currentQ.id)}
            >
              {showHints[currentQ.id] ? 'Hide Hint' : 'Show Hint'}
            </button>
          )}

          <div className="question-actions">
            {!showResult ? (
              <button 
                className="btn btn-primary"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </button>
            ) : (
              <div className="result-actions">
                {currentQuestion < questions.length - 1 ? (
                  <button className="btn btn-primary" onClick={handleNextQuestion}>
                    Next Question
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={handleQuizComplete}>
                    Complete Quiz
                  </button>
                )}
                <button className="btn btn-secondary" onClick={resetQuiz}>
                  Restart Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQs;
