import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, Grid, Chip, LinearProgress, Alert, IconButton, Tooltip, Avatar
} from '@mui/material';
import { FaCheck, FaTimes, FaLightbulb, FaFilter, FaSearch, FaClock, FaTrophy, FaVideo, FaStop, FaRedo, FaStar } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import confetti from 'canvas-confetti';
import './MCQs.css';

const MCQs = ({ user }) => {
  const { showToast } = useToast();
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
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showInterviewPanel, setShowInterviewPanel] = useState(false);
  const [interviewFeedback, setInterviewFeedback] = useState(null);
  const [currentInterviewQuestion, setCurrentInterviewQuestion] = useState('');
  const [interviewQuestions] = useState([
    'How would you approach solving this problem?',
    'Can you explain your thought process?',
    'What is the time complexity of your solution?',
    'How would you optimize this solution?',
    'What edge cases should we consider?'
  ]);

  const startInterview = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setShowInterviewPanel(true);
        setCurrentInterviewQuestion(interviewQuestions[0]);
      }
    } catch (err) {
      showToast('Error accessing camera/microphone', 'error');
    }
  };
  const stopInterview = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setShowInterviewPanel(false);
      setInterviewFeedback({
        rating: Math.floor(Math.random() * 5) + 1,
        mistakes: [
          'You hesitated while explaining your approach',
          'Could improve time complexity analysis',
          'Consider more edge cases in your solution'
        ],
        suggestions: [
          'Practice explaining your thought process more clearly',
          'Work on time complexity analysis',
          'Consider all possible edge cases in your solutions'
        ]
      });
    }
  };
  const nextQuestion = () => {
    const currentIndex = interviewQuestions.indexOf(currentInterviewQuestion);
    if (currentIndex < interviewQuestions.length - 1) {
      setCurrentInterviewQuestion(interviewQuestions[currentIndex + 1]);
    } else {
      stopInterview();
    }
  };
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

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
  useEffect(() => { filterQuestions(); }, [filterCompany, filterTopic, allQuestions]);
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => { setTimeLeft(timeLeft => timeLeft - 1); }, 1000);
    } else if (timeLeft === 0) { handleTimeUp(); }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);
  const filterQuestions = () => {
    let filtered = allQuestions;
    if (filterCompany !== 'all') filtered = filtered.filter(q => q.company === filterCompany);
    if (filterTopic !== 'all') filtered = filtered.filter(q => q.topic === filterTopic);
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
  const handleAnswerSelect = (answerIndex) => { if (showResult) return; setSelectedAnswer(answerIndex); };
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) { showToast('Please select an answer', 'warning'); return; }
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
    } else { handleQuizComplete(); }
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
    if (percentage >= 80) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
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
      <Box sx={{ maxWidth: 700, mx: 'auto', p: { xs: 1, sm: 3 } }}>
        <Card elevation={2} sx={{ mb: 3, p: 3 }}>
          <Typography variant="h4" fontWeight={700} mb={1}>Multiple Choice Questions</Typography>
          <Typography color="text.secondary" mb={2}>Test your knowledge with company-specific MCQs</Typography>
          <Button
            variant="outlined"
            color="info"
            startIcon={<FaFilter />}
                onClick={() => setShowFilters(!showFilters)}
            sx={{ mb: 2 }}
              >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
              {showFilters && (
            <Box mb={2} display="flex" gap={2} flexWrap="wrap">
              <Box>
                <Typography fontWeight={600}>Company:</Typography>
                <select value={filterCompany} onChange={e => setFilterCompany(e.target.value)} style={{ minWidth: 120, padding: 6 }}>
                      <option value="all">All Companies</option>
                      {companies.map(company => (
                        <option key={company} value={company}>{company}</option>
                      ))}
                    </select>
              </Box>
              <Box>
                <Typography fontWeight={600}>Topic:</Typography>
                <select value={filterTopic} onChange={e => setFilterTopic(e.target.value)} style={{ minWidth: 120, padding: 6 }}>
                      <option value="all">All Topics</option>
                      {topics.map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                      ))}
                    </select>
              </Box>
            </Box>
              )}
          <Box mb={2}>
            <Typography fontWeight={600}>Quiz Information</Typography>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>📝 {questions.length} questions available</li>
                  <li>⏱️ 30 seconds per question</li>
                  <li>🎯 Multiple choice format</li>
                  <li>📊 Instant feedback and explanations</li>
                </ul>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
              onClick={startQuiz}
              disabled={questions.length === 0}
            sx={{ mb: 2 }}
            >
              Start Quiz ({questions.length} questions)
          </Button>
          {questions.length > 0 && (
            <Box>
              <Typography fontWeight={600} mb={1}>Sample Questions:</Typography>
                {questions.slice(0, 3).map((question, index) => (
                <Card key={question.id} variant="outlined" sx={{ mb: 1, p: 1 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip label={question.company} size="small" />
                    <Chip label={question.topic} size="small" />
                    <Chip label={question.difficulty} size="small" />
                  </Box>
                  <Typography>{question.question}</Typography>
                </Card>
                ))}
            </Box>
          )}
        </Card>
      </Box>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', p: { xs: 1, sm: 3 } }}>
      {/* Mock Interview Section */}
      <Card elevation={2} sx={{ mb: 3, p: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={1}>Mock Interview Mode</Typography>
        <Typography color="text.secondary" mb={2}>Practice answering questions on camera with real-time feedback</Typography>
        {!showInterviewPanel ? (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FaVideo />}
            onClick={startInterview}
            disabled={isRecording}
            sx={{ mb: 2 }}
          >
            Start Mock Interview
          </Button>
        ) : (
          <Box mb={2}>
            <Box mb={1}>
              <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', borderRadius: 8, background: '#222' }} />
            </Box>
            <Box display="flex" gap={2} mb={1}>
              <Button variant="contained" color="error" startIcon={<FaStop />} onClick={stopInterview}>Stop Interview</Button>
              <Button variant="outlined" color="info" endIcon={<FaRedo />} onClick={nextQuestion}>Next Question</Button>
            </Box>
            <Box>
              <Typography fontWeight={600}>Question:</Typography>
              <Typography>{currentInterviewQuestion}</Typography>
            </Box>
          </Box>
        )}
        {interviewFeedback && (
          <Box mt={2}>
            <Typography fontWeight={700}>Interview Feedback</Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography>Performance Rating:</Typography>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < interviewFeedback.rating ? '#f59e0b' : '#e0e0e0'} />
              ))}
            </Box>
            <Box mb={1}>
              <Typography fontWeight={600}>Areas for Improvement:</Typography>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {interviewFeedback.mistakes.map((mistake, idx) => (
                  <li key={idx}><FaTimes style={{ color: '#ef4444', marginRight: 4 }} /> {mistake}</li>
                ))}
              </ul>
            </Box>
            <Box mb={1}>
              <Typography fontWeight={600}>Suggestions:</Typography>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {interviewFeedback.suggestions.map((suggestion, idx) => (
                  <li key={idx}><FaCheck style={{ color: '#10b981', marginRight: 4 }} /> {suggestion}</li>
                ))}
              </ul>
            </Box>
            <Button variant="outlined" color="primary" onClick={() => setInterviewFeedback(null)}>Try Again</Button>
          </Box>
        )}
      </Card>
      {/* Quiz Section */}
      <Card elevation={2} sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography fontWeight={600}>Question {currentQuestion + 1} of {questions.length}</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={0.5}><FaClock /> <Typography color={timeLeft <= 10 ? 'error.main' : 'text.primary'}>{timeLeft}s</Typography></Box>
            <Box display="flex" alignItems="center" gap={0.5}><FaTrophy /> <Typography>{score}/{questions.length}</Typography></Box>
          </Box>
        </Box>
        <LinearProgress variant="determinate" value={((currentQuestion + 1) / questions.length) * 100} sx={{ mb: 2 }} />
        <Box mb={2}>
          <Box display="flex" gap={1} mb={1}>
            <Chip label={currentQ.company} size="small" />
            <Chip label={currentQ.topic} size="small" />
            <Chip label={currentQ.difficulty} size="small" />
          </Box>
          <Typography variant="h6" fontWeight={700}>{currentQ.question}</Typography>
        </Box>
        <Grid container spacing={2}>
            {currentQ.options.map((option, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Button
                fullWidth
                variant={selectedAnswer === index ? 'contained' : 'outlined'}
                color={showResult ? (index === currentQ.correct ? 'success' : selectedAnswer === index ? 'error' : 'primary') : 'primary'}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                sx={{ justifyContent: 'flex-start', mb: 1 }}
                aria-label={`Option ${String.fromCharCode(65 + index)}`}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography fontWeight={600}>{String.fromCharCode(65 + index)}.</Typography>
                  <Typography>{option}</Typography>
                  {showResult && index === currentQ.correct && <FaCheck style={{ color: '#10b981', marginLeft: 8 }} />}
                  {showResult && selectedAnswer === index && index !== currentQ.correct && <FaTimes style={{ color: '#ef4444', marginLeft: 8 }} />}
                </Box>
              </Button>
            </Grid>
            ))}
        </Grid>
          {showResult && (
          <Alert severity={selectedAnswer === currentQ.correct ? 'success' : 'info'} sx={{ mt: 2, mb: 1 }} icon={<FaLightbulb />}>
            <Typography fontWeight={700}>Explanation</Typography>
            <Typography>{currentQ.explanation}</Typography>
          </Alert>
          )}
        <Box display="flex" gap={2} mt={2}>
            {!showResult ? (
            <Button
              variant="contained"
              color="primary"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              aria-label="Submit Answer"
              >
                Submit Answer
            </Button>
            ) : (
            <>
                {currentQuestion < questions.length - 1 ? (
                <Button variant="contained" color="primary" onClick={handleNextQuestion}>Next Question</Button>
                ) : (
                <Button variant="contained" color="success" onClick={handleQuizComplete}>Complete Quiz</Button>
                )}
              <Button variant="outlined" color="secondary" onClick={resetQuiz}>Restart Quiz</Button>
            </>
            )}
        </Box>
      </Card>
    </Box>
  );
};

export default MCQs;