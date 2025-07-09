import React, { useState, useRef, useEffect, memo } from 'react';
import { FaCheck, FaTimes, FaLightbulb, FaFilter, FaSearch, FaClock, FaTrophy, FaVideo, FaMicrophone, FaMicrophoneSlash, FaCamera, FaVideoSlash, FaRedo, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useToast } from './Toast/Toast';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import './FaceToFaceInterview.css';

const FaceToFaceInterview = memo(() => {
  const { showToast } = useToast();
  const { state, actions } = useApp();
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [microphoneActive, setMicrophoneActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [showHints, setShowHints] = useState(false);
  const [feedback, setFeedback] = useState({
    strengths: [],
    improvements: [],
    overallScore: 0,
    metrics: {
      eyeContact: 0,
      speechClarity: 0,
      confidence: 0,
      responseQuality: 0
    }
  });
  const [analysis, setAnalysis] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  // Interview questions with enhanced details
  const interviewQuestions = [
    {
      id: 1,
      question: 'Tell me about yourself.',
      expectedAnswer: 'A brief introduction about yourself, focusing on professional background and achievements.',
      timeLimit: 120,
      tips: [
        'Keep your answer under 2 minutes',
        'Focus on your professional background and achievements',
        'Mention what makes you unique'
      ],
      category: 'Behavioral',
      difficulty: 'Easy'
    },
    {
      id: 2,
      question: 'What are your greatest strengths?',
      expectedAnswer: 'Mention 2-3 key strengths with specific examples.',
      timeLimit: 90,
      tips: [
        'Choose 2-3 key strengths',
        'Provide specific examples',
        'Relate to the job requirements'
      ],
      category: 'Behavioral',
      difficulty: 'Medium'
    },
    {
      id: 3,
      question: 'Describe a challenging situation and how you handled it.',
      expectedAnswer: 'Use the STAR method to describe the situation, task, action, and result.',
      timeLimit: 120,
      tips: [
        'Use the STAR method (Situation, Task, Action, Result)',
        'Focus on your problem-solving skills',
        'Show what you learned'
      ],
      category: 'Behavioral',
      difficulty: 'Hard'
    },
    {
      id: 4,
      question: 'Where do you see yourself in 5 years?',
      expectedAnswer: 'Show ambition while being realistic and connecting to the company\'s growth.',
      timeLimit: 60,
      tips: [
        'Show ambition but be realistic',
        'Connect to the company\'s growth',
        'Mention skill development'
      ],
      category: 'Career',
      difficulty: 'Medium'
    },
    {
      id: 5,
      question: 'Do you have any questions for us?',
      expectedAnswer: 'Prepare 2-3 thoughtful questions about the team, projects, or company.',
      timeLimit: 90,
      tips: [
        'Prepare 2-3 thoughtful questions',
        'Ask about team dynamics or projects',
        'Show your research about the company'
      ],
      category: 'Closing',
      difficulty: 'Easy'
    },
    {
      id: 6,
      question: 'Explain a complex technical concept to a non-technical person.',
      expectedAnswer: 'Use simple analogies and avoid technical jargon.',
      timeLimit: 180,
      tips: [
        'Use simple analogies',
        'Avoid technical jargon',
        'Focus on the impact or benefit'
      ],
      category: 'Technical',
      difficulty: 'Hard'
    },
    {
      id: 7,
      question: 'How do you handle conflicts in a team?',
      expectedAnswer: 'Describe your approach to conflict resolution and teamwork.',
      timeLimit: 120,
      tips: [
        'Show your communication skills',
        'Highlight your teamwork approach',
        'Mention a successful resolution'
      ],
      category: 'Behavioral',
      difficulty: 'Medium'
    }
  ];

  // Start the interview and initialize camera and microphone
  const startInterview = async () => {
    try {
      setIsLoading(true);
      await startCamera();
      await startMicrophone();
      setIsInterviewStarted(true);
      startTimer();
      showToast('Interview started! Good luck!', 'info');
    } catch (error) {
      console.error('Error starting interview:', error);
      showToast('Could not access camera or microphone. Please check permissions.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Start camera stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      throw err;
    }
  };

  // Start microphone
  const startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophoneActive(true);
      startRecording(stream);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      throw err;
    }
  };

  // Start video recording
  const startRecording = (stream) => {
    try {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = analyzeRecording;
      mediaRecorder.start(1000); // Collect data every second
      setRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  };

  // Analyze the recording (simulated)
  const analyzeRecording = () => {
    // In a real app, this would send the recording to an analysis API
    setTimeout(() => {
      const mockAnalysis = {
        strengths: [
          'Good eye contact and engagement',
          'Clear and well-structured responses',
          'Confident body language'
        ],
        improvements: [
          'Could provide more specific examples',
          'Try to reduce filler words (um, uh)',
          'Consider varying your tone more'
        ],
        overallScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        metrics: {
          eyeContact: Math.floor(Math.random() * 30) + 70,
          speechClarity: Math.floor(Math.random() * 30) + 70,
          confidence: Math.floor(Math.random() * 30) + 70,
          responseQuality: Math.floor(Math.random() * 30) + 70
        }
      };

      setFeedback(mockAnalysis);
      setShowFeedback(true);

      // Update stats
      actions.updateStats({
        interviewsCompleted: state.stats.interviewsCompleted + 1,
        totalPoints: state.stats.totalPoints + mockAnalysis.overallScore
      });

      if (mockAnalysis.overallScore >= 85) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        showToast(`Excellent performance! You scored ${mockAnalysis.overallScore}%`, 'success');
      } else if (mockAnalysis.overallScore >= 70) {
        showToast(`Good job! You scored ${mockAnalysis.overallScore}%`, 'info');
      } else {
        showToast(`Keep practicing! You scored ${mockAnalysis.overallScore}%`, 'warning');
      }
    }, 2000);
  };

  // Start the interview timer
  const startTimer = () => {
    setElapsedTime(0);
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => {
        const currentTime = prev + 1;
        // Auto-advance questions based on time limit
        const currentQuestion = interviewQuestions[currentQuestionIndex];
        if (currentQuestion && currentTime >= currentQuestion.timeLimit) {
          nextQuestion();
          return 0; // Reset timer for next question
        }
        return currentTime;
      });
    }, 1000);
  };

  // Clean up resources
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Toggle bookmark for a question
  const toggleBookmark = (questionId) => {
    setBookmarkedQuestions(prev => {
      const updated = prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId];
      localStorage.setItem('interviewBookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  // Toggle hints visibility
  const toggleHints = () => {
    setShowHints(!showHints);
  };

  // Check if a question is bookmarked
  const isBookmarked = (questionId) => {
    return bookmarkedQuestions.includes(questionId);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage for current question
  const getProgress = () => {
    const currentQuestion = interviewQuestions[currentQuestionIndex];
    if (!currentQuestion) return 0;
    return (elapsedTime / currentQuestion.timeLimit) * 100;
  };

  // Get the current question
  const currentQuestion = interviewQuestions[currentQuestionIndex];

  // Handle next question or end interview
  const nextQuestion = () => {
    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setCurrentQuestionIndex(prev => {
        const nextIndex = prev + 1;
        setElapsedTime(0); // Reset timer for next question
        return nextIndex;
      });
    } else {
      endInterview();
    }
  };

  // End the interview
  const endInterview = () => {
    // Stop recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Stop camera and microphone
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setCameraActive(false);
      setMicrophoneActive(false);
    }

    setShowFeedback(true);
  };

  // Reset the interview
  const resetInterview = () => {
    // Stop any ongoing recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Reset all states
    setIsInterviewStarted(false);
    setCurrentQuestionIndex(0);
    setShowFeedback(false);
    setCameraActive(false);
    setMicrophoneActive(false);
    setElapsedTime(0);
    setRecording(false);
    setFeedback({
      strengths: [],
      improvements: [],
      overallScore: 0,
      metrics: {
        eyeContact: 0,
        speechClarity: 0,
        confidence: 0,
        responseQuality: 0
      }
    });
  };

  // Get difficulty color for styling
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  // Get category color for styling
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'behavioral': return '#3b82f6';
      case 'technical': return '#8b5cf6';
      case 'career': return '#10b981';
      case 'closing': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  if (!isInterviewStarted) {
    return (
      <div className="face-to-face-interview">
        <div className="interview-header">
          <h1>Face-to-Face Interview Practice</h1>
          <p>Prepare for your interviews with our AI-powered mock interview simulator</p>
        </div>

        <div className="interview-instructions">
          <div className="instructions-card">
            <h2>How It Works</h2>
            <ol>
              <li>Click "Start Interview" to begin</li>
              <li>Answer each question within the time limit</li>
              <li>Maintain good eye contact with the camera</li>
              <li>Speak clearly and confidently</li>
              <li>Review your performance at the end</li>
            </ol>
          </div>

          <div className="interview-tips">
            <h2>Tips for Success</h2>
            <ul>
              <li>Dress professionally as you would for a real interview</li>
              <li>Find a quiet, well-lit space</li>
              <li>Structure your answers clearly</li>
              <li>Use the STAR method for behavioral questions</li>
              <li>Practice good posture and body language</li>
            </ul>
          </div>
        </div>

        <div className="interview-preview">
          <h2>Sample Questions</h2>
          <div className="question-preview-list">
            {interviewQuestions.slice(0, 3).map((question) => (
              <div key={question.id} className="preview-question">
                <div className="question-header">
                  <span className="question-category" style={{ backgroundColor: getCategoryColor(question.category) }}>
                    {question.category}
                  </span>
                  <span className="question-difficulty" style={{ backgroundColor: getDifficultyColor(question.difficulty) }}>
                    {question.difficulty}
                  </span>
                  <button
                    className="bookmark-btn"
                    onClick={() => toggleBookmark(question.id)}
                    title={isBookmarked(question.id) ? 'Remove bookmark' : 'Bookmark question'}
                  >
                    {isBookmarked(question.id) ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                </div>
                <p className="question-text">{question.question}</p>
                {showHints && (
                  <div className="question-tips">
                    <h4>Tips:</h4>
                    <ul>
                      {question.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="toggle-hints-btn" onClick={toggleHints}>
            {showHints ? 'Hide Tips' : 'Show Tips'}
          </button>
        </div>

        <button className="start-interview-btn" onClick={startInterview} disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner"></span> Starting Interview...
            </>
          ) : 'Start Interview'}
        </button>
      </div>
    );
  }

  return (
    <div className="face-to-face-interview">
      {!showFeedback ? (
        <div className="interview-container">
          <div className="questions-container">
            <div className="question-header">
              <div className="question-meta">
                <span className="question-category" style={{ backgroundColor: getCategoryColor(currentQuestion.category) }}>
                  {currentQuestion.category}
                </span>
                <span className="question-difficulty" style={{ backgroundColor: getDifficultyColor(currentQuestion.difficulty) }}>
                  {currentQuestion.difficulty}
                </span>
                <span className="question-timer">
                  <FaClock /> {formatTime(elapsedTime)} / {formatTime(currentQuestion.timeLimit)}
                </span>
              </div>
              <div className="question-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>
                <span>Question {currentQuestionIndex + 1} of {interviewQuestions.length}</span>
              </div>
            </div>

            <div className="question-content">
              <h2>{currentQuestion.question}</h2>
            </div>

            <div className="question-tips">
              <button className="toggle-tips-btn" onClick={toggleHints}>
                {showHints ? <><FaTimes /> Hide Tips</> : <><FaLightbulb /> Show Tips</>}
              </button>
              {showHints && (
                <ul>
                  {currentQuestion.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="question-actions">
              <button
                className="next-question-btn"
                onClick={nextQuestion}
                disabled={elapsedTime < 10} // Prevent too quick advancement
              >
                {currentQuestionIndex < interviewQuestions.length - 1 ? 'Next Question' : 'Finish Interview'}
              </button>
            </div>
          </div>

          <div className="video-container">
            <div className="video-header">
              <h3>
                {cameraActive ? <><FaCamera /> Camera Active</> : <><FaVideoSlash /> Camera Off</>}
                {microphoneActive ? <><FaMicrophone /> Microphone Active</> : <><FaMicrophoneSlash /> Microphone Off</>}
                {recording && <span className="recording-indicator">● REC</span>}
              </h3>
            </div>
            <div className="video-feed">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="interview-video"
              />
              {!cameraActive && (
                <div className="camera-loading">
                  <div className="spinner"></div>
                  <p>Initializing camera...</p>
                </div>
              )}
            </div>
            <div className="video-controls">
              <button
                className="end-interview-btn"
                onClick={endInterview}
              >
                <FaTimes /> End Interview
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="feedback-container">
          <div className="feedback-header">
            <h2>Interview Completed! 🎉</h2>
            <div className="feedback-score">
              <div className="score-circle">
                <span>{feedback.overallScore}</span>
                <div className="score-label">Score</div>
              </div>
              <div className="score-details">
                <h3>Overall Performance</h3>
                <p>You did {feedback.overallScore >= 80 ? 'great' : feedback.overallScore >= 60 ? 'well' : 'okay'}. Keep practicing!</p>
              </div>
            </div>
          </div>

          <div className="feedback-metrics">
            <h3>Performance Metrics</h3>
            <div className="metrics-grid">
              {Object.entries(feedback.metrics).map(([key, value]) => (
                <div key={key} className="metric-item">
                  <div className="metric-label">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </div>
                  <div className="metric-value">
                    <div className="metric-bar">
                      <div
                        className="metric-fill"
                        style={{
                          width: `${value}%`,
                          backgroundColor: value >= 70 ? '#10b981' :
                                           value >= 40 ? '#f59e0b' : '#ef4444'
                        }}
                      ></div>
                    </div>
                    <span>{value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="feedback-details">
            <div className="feedback-section strengths">
              <h3>Strengths</h3>
              <ul>
                {feedback.strengths.map((item, index) => (
                  <li key={`strength-${index}`} className="strength-item">
                    <FaCheck /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="feedback-section improvements">
              <h3>Areas for Improvement</h3>
              <ul>
                {feedback.improvements.map((item, index) => (
                  <li key={`improvement-${index}`} className="improvement-item">
                    <FaLightbulb /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="feedback-actions">
            <button className="restart-btn" onClick={resetInterview}>
              <FaRedo /> Practice Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default FaceToFaceInterview;
