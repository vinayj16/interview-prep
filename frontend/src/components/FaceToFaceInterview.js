import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button, CircularProgress, Paper, LinearProgress } from '@mui/material';
import './FaceToFaceInterview.css';

const FaceToFaceInterview = () => {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [recording, setRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const timerRef = useRef(null);

  const questions = [
    {
      text: "Tell me about yourself.",
      timeLimit: 120, // seconds
      tips: [
        "Keep your answer under 2 minutes",
        "Focus on your professional background and achievements",
        "Mention what makes you unique"
      ]
    },
    {
      text: "What are your greatest strengths?",
      timeLimit: 90,
      tips: [
        "Choose 2-3 key strengths",
        "Provide specific examples",
        "Relate to the job requirements"
      ]
    },
    {
      text: "Describe a challenging situation and how you handled it.",
      timeLimit: 120,
      tips: [
        "Use the STAR method (Situation, Task, Action, Result)",
        "Focus on your problem-solving skills",
        "Show what you learned"
      ]
    },
    {
      text: "Where do you see yourself in 5 years?",
      timeLimit: 60,
      tips: [
        "Show ambition but be realistic",
        "Connect to the company's growth",
        "Mention skill development"
      ]
    },
    {
      text: "Do you have any questions for us?",
      timeLimit: 90,
      tips: [
        "Prepare 2-3 thoughtful questions",
        "Ask about team dynamics or projects",
        "Show your research about the company"
      ]
    }
  ];

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

  // Start the interview and initialize camera
  const startInterview = async () => {
    try {
      setIsLoading(true);
      await startCamera();
      setInterviewStarted(true);
      startTimer();
    } catch (error) {
      console.error('Error starting interview:', error);
      alert('Could not access camera. Please check permissions and try again.');
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
        },
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        startRecording(stream);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
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
        overallScore: 82,
        metrics: {
          eyeContact: 85,
          speechClarity: 78,
          confidence: 80,
          responseQuality: 85
        }
      };
      
      setFeedback(mockAnalysis);
      setShowFeedback(true);
    }, 2000);
  };

  // Start the interview timer
  const startTimer = () => {
    setElapsedTime(0);
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => {
        const currentTime = prev + 1;
        // Auto-advance questions based on time limit
        const currentQuestion = questions[currentQuestionIndex];
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

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => {
        const nextIndex = prev + 1;
        setElapsedTime(0); // Reset timer for next question
        return nextIndex;
      });
    } else {
      // Stop recording and show feedback
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setShowFeedback(true);
    }
  };

  const resetInterview = () => {
    // Stop any ongoing recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Stop camera stream
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    
    // Reset all states
    setInterviewStarted(false);
    setCurrentQuestionIndex(0);
    setShowFeedback(false);
    setCameraActive(false);
    setElapsedTime(0);
    setAnalysis(null);
    setRecording(false);
  };
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage for current question
  const getProgress = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return 0;
    return (elapsedTime / currentQuestion.timeLimit) * 100;
  };

  return (
    <Box className={`face-to-face-interview ${isDark ? 'dark' : 'light'}`}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        color: isDark ? 'primary.light' : 'primary.main',
        mb: 4,
        fontWeight: 'bold'
      }}>
        Face-to-Face Interview Practice
      </Typography>
      
      {isLoading ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
          <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
          <Typography variant="h6">Setting up your interview...</Typography>
        </Box>
      ) : !interviewStarted ? (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>Welcome to Your Mock Interview</Typography>
          <Typography variant="body1" paragraph>
            Practice your interview skills with our AI-powered face-to-face interview simulator. 
            The system will analyze your responses, body language, and speech patterns to provide 
            detailed feedback on your performance.
          </Typography>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>How it works:</Typography>
          <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: '80%' }}>
            <li>Answer each question within the time limit</li>
            <li>Maintain good eye contact with the camera</li>
            <li>Speak clearly and confidently</li>
            <li>Review your performance at the end</li>
          </ul>
          <Button 
            variant="contained" 
            size="large" 
            onClick={startInterview}
            sx={{ mt: 3, px: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            Start Interview
          </Button>
        </Paper>
      ) : !showFeedback ? (
        <Box className="interview-container">
          <Box className="questions-container">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {formatTime(elapsedTime)} / {formatTime(questions[currentQuestionIndex]?.timeLimit || 0)}
              </Typography>
            </Box>
            
            <LinearProgress 
              variant="determinate" 
              value={getProgress()} 
              sx={{ height: 8, borderRadius: 5, mb: 3 }} 
            />
            
            <Paper elevation={2} sx={{ p: 3, mb: 3, minHeight: '120px' }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 500 }}>
                {questions[currentQuestionIndex]?.text}
              </Typography>
            </Paper>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                TIPS FOR THIS QUESTION:
              </Typography>
              <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                {questions[currentQuestionIndex]?.tips?.map((tip, index) => (
                  <Typography component="li" key={`tip-${index}`} variant="body2" sx={{ mb: 1 }}>
                    {tip}
                  </Typography>
                ))}
              </Box>
            </Box>
            
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={nextQuestion}
                size="large"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
              </Button>
            </Box>
          </Box>
          
          <Box className="video-container">
            <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Your Camera Feed {recording && <span className="recording-indicator">● REC</span>}
              </Typography>
              <Box 
                ref={videoRef}
                component="video"
                autoPlay 
                playsInline 
                muted 
                className="interview-video"
                sx={{
                  width: '100%',
                  maxHeight: '400px',
                  backgroundColor: '#000',
                  borderRadius: 1,
                  flexGrow: 1,
                  transform: 'scaleX(-1)' // Mirror the video
                }}
              />
              {!cameraActive && (
                <Box 
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: 'white',
                    zIndex: 1
                  }}
                >
                  <CircularProgress color="inherit" />
                  <Typography>Initializing camera...</Typography>
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      ) : (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" component="h2" gutterBottom>
              Interview Completed! 🎉
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
              Your Overall Score: {feedback.overallScore}%
            </Typography>
            <Box sx={{ width: '100%', maxWidth: 300, height: 12, bgcolor: 'grey.200', borderRadius: 6, overflow: 'hidden', mx: 'auto', mb: 4 }}>
              <Box 
                sx={{
                  height: '100%',
                  width: `${feedback.overallScore}%`,
                  bgcolor: feedback.overallScore >= 70 ? 'success.main' : 
                           feedback.overallScore >= 40 ? 'warning.main' : 'error.main'
                }}
              />
            </Box>
          </Box>
          
          <Box display="flex" flexWrap="wrap" gap={4} mb={4}>
            {Object.entries(feedback.metrics).map(([key, value]) => (
              <Box key={key} flex={1} minWidth={150}>
                <Typography variant="subtitle2" color="text.secondary">
                  {key.split(/(?=[A-Z])/).join(' ').toUpperCase()}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box sx={{ width: '100%' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={value} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 5,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: value >= 70 ? 'success.main' : 
                                         value >= 40 ? 'warning.main' : 'error.main'
                        }
                      }} 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {value}%
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          
          <Box display="flex" gap={4} flexWrap="wrap">
            <Paper elevation={1} sx={{ p: 3, flex: 1, minWidth: 300 }}>
              <Typography variant="h6" color="success.main" gutterBottom>
                Strengths
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {feedback.strengths.map((item, index) => (
                  <li key={`strength-${index}`}>
                    <Typography variant="body1">✓ {item}</Typography>
                  </li>
                ))}
              </ul>
            </Paper>
            
            <Paper elevation={1} sx={{ p: 3, flex: 1, minWidth: 300 }}>
              <Typography variant="h6" color="error.main" gutterBottom>
                Areas for Improvement
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {feedback.improvements.map((item, index) => (
                  <li key={`improvement-${index}`}>
                    <Typography variant="body1">• {item}</Typography>
                  </li>
                ))}
              </ul>
            </Paper>
          </Box>
          
          <Box textAlign="center" mt={4}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={resetInterview}
              sx={{ px: 4, py: 1.5 }}
            >
              Practice Again
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default FaceToFaceInterview;
