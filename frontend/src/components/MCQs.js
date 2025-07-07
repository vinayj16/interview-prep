import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaLightbulb, FaFilter, FaSearch, FaClock, FaTrophy } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import './MCQs.css';

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
  const [showFilters, setShowFilters] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  // Mock MCQ data
  const [allQuestions] = useState([
    {
      id: 1,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correct: 1,
      explanation: "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity.",
      company: "Google",
      topic: "Algorithms",
      difficulty: "Medium"
    },
    {
      id: 2,
      question: "Which data structure uses LIFO (Last In, First Out) principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correct: 1,
      explanation: "Stack follows LIFO principle where the last element added is the first one to be removed.",
      company: "Amazon",
      topic: "Data Structures",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "What is the space complexity of merge sort?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correct: 2,
      explanation: "Merge sort requires O(n) additional space for the temporary arrays used during merging.",
      company: "Microsoft",
      topic: "Algorithms",
      difficulty: "Medium"
    },
    {
      id: 4,
      question: "In JavaScript, what does 'this' keyword refer to?",
      options: ["The global object", "The current function", "The calling object", "Undefined"],
      correct: 2,
      explanation: "In JavaScript, 'this' refers to the object that is calling the function.",
      company: "Facebook",
      topic: "JavaScript",
      difficulty: "Medium"
    },
    {
      id: 5,
      question: "What is the worst-case time complexity of quicksort?",
      options: ["O(n log n)", "O(n²)", "O(log n)", "O(n)"],
      correct: 1,
      explanation: "Quicksort has O(n²) worst-case time complexity when the pivot is always the smallest or largest element.",
      company: "Apple",
      topic: "Algorithms",
      difficulty: "Hard"
    },
    {
      id: 6,
      question: "Which HTTP method is idempotent?",
      options: ["POST", "PUT", "PATCH", "All of the above"],
      correct: 1,
      explanation: "PUT is idempotent, meaning multiple identical requests should have the same effect as a single request.",
      company: "Netflix",
      topic: "Web Development",
      difficulty: "Medium"
    },
    {
      id: 7,
      question: "What is the purpose of a hash table?",
      options: ["Sorting data", "Fast data retrieval", "Memory management", "Error handling"],
      correct: 1,
      explanation: "Hash tables provide fast data retrieval with average O(1) time complexity for search, insert, and delete operations.",
      company: "Google",
      topic: "Data Structures",
      difficulty: "Easy"
    },
    {
      id: 8,
      question: "In React, what is the purpose of useEffect hook?",
      options: ["State management", "Side effects", "Event handling", "Rendering"],
      correct: 1,
      explanation: "useEffect hook is used to perform side effects in functional components, such as data fetching, subscriptions, or DOM manipulation.",
      company: "Facebook",
      topic: "React",
      difficulty: "Medium"
    }
  ]);

  const companies = ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "Netflix"];
  const topics = ["Algorithms", "Data Structures", "JavaScript", "Web Development", "React", "System Design"];

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    filterQuestions();
  }, [filterCompany, filterTopic, allQuestions]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const filterQuestions = () => {
    let filtered = allQuestions;
    
    if (filterCompany !== 'all') {
      filtered = filtered.filter(q => q.company === filterCompany);
    }
    
    if (filterTopic !== 'all') {
      filtered = filtered.filter(q => q.topic === filterTopic);
    }
    
    setQuestions(filtered);
  };

  const startQuiz = () => {
    if (questions.length === 0) {
      showToast('No questions available with current filters', 'warning');
      return;
    }
    
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
    setIsActive(true);
    showToast('Quiz started! Good luck!', 'info');
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
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
      showToast('Correct! 🎉', 'success');
    } else {
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

  if (!quizStarted) {
    return (
      <div className="mcqs-page">
        <div className="container">
          <div className="mcqs-header">
            <h1>Multiple Choice Questions</h1>
            <p>Test your knowledge with company-specific MCQs</p>
          </div>

          {/* Filters */}
          <div className="quiz-setup">
            <div className="filters-section">
              <button 
                className="filter-toggle btn btn-secondary"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter /> Filters
              </button>
              
              {showFilters && (
                <div className="filters">
                  <div className="filter-group">
                    <label>Company:</label>
                    <select 
                      value={filterCompany} 
                      onChange={(e) => setFilterCompany(e.target.value)}
                    >
                      <option value="all">All Companies</option>
                      {companies.map(company => (
                        <option key={company} value={company}>{company}</option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Topic:</label>
                    <select 
                      value={filterTopic} 
                      onChange={(e) => setFilterTopic(e.target.value)}
                    >
                      <option value="all">All Topics</option>
                      {topics.map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
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

            <button 
              className="btn btn-primary btn-lg start-quiz-btn"
              onClick={startQuiz}
              disabled={questions.length === 0}
            >
              Start Quiz ({questions.length} questions)
            </button>
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
                        <span className="company">{question.company}</span>
                        <span className="topic">{question.topic}</span>
                        <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
                          {question.difficulty}
                        </span>
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
          </div>
        </div>

        {/* Question Card */}
        <div className="question-card">
          <div className="question-header">
            <div className="question-meta">
              <span className="company">{currentQ.company}</span>
              <span className="topic">{currentQ.topic}</span>
              <span className={`difficulty ${currentQ.difficulty.toLowerCase()}`}>
                {currentQ.difficulty}
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
                    selectedAnswer === index ? 'incorrect' : ''
                  ) : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
                {showResult && index === currentQ.correct && <FaCheck className="result-icon" />}
                {showResult && selectedAnswer === index && index !== currentQ.correct && 
                  <FaTimes className="result-icon" />}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="explanation">
              <div className="explanation-header">
                <FaLightbulb />
                <h3>Explanation</h3>
              </div>
              <p>{currentQ.explanation}</p>
            </div>
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