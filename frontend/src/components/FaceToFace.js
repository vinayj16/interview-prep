import React, { useState, useRef } from 'react';
import { FaPlay, FaStop, FaRedo, FaVideo, FaHeadset, FaLightbulb, FaCheck, FaTimes } from 'react-icons/fa';
import './FaceToFace.css';

const FaceToFace = () => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const interviewQuestions = [
    'Tell me about yourself and your background.',
    'What are your greatest strengths and weaknesses?',
    'Why do you want to work for our company?',
    'Describe a challenging situation you faced at work and how you handled it.',
    'Where do you see yourself in 5 years?'
  ];

  const startInterview = () => {
    setShowInstructions(false);
    setInterviewStarted(true);
    startRecording();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedChunks(prev => [...prev, {
          question: interviewQuestions[currentQuestion],
          blob,
          url: URL.createObjectURL(blob),
          timestamp: new Date().toISOString()
        }]);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      alert('Could not access camera/microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all tracks in the stream
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    }
  };

  const nextQuestion = () => {
    if (isRecording) {
      stopRecording();
    }
    
    setShowFeedback(false);
    setCurrentQuestion(prev => {
      const next = prev + 1;
      if (next < interviewQuestions.length) {
        return next;
      }
      return prev;
    });
    
    // Start recording for the next question after a short delay
    setTimeout(() => {
      if (interviewStarted) {
        startRecording();
      }
    }, 1000);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const restartInterview = () => {
    setShowInstructions(true);
    setInterviewStarted(false);
    setCurrentQuestion(0);
    setRecordedChunks([]);
    setShowFeedback(false);
  };

  const submitForReview = () => {
    stopRecording();
    setShowFeedback(true);
  };

  if (showInstructions) {
    return (
      <div className="interview-instructions">
        <h2>Interview Preparation</h2>
        <div className="instructions-container">
          <div className="instruction-card">
            <FaVideo className="instruction-icon" />
            <h3>Setup Your Environment</h3>
            <ul>
              <li>Find a quiet, well-lit space</li>
              <li>Test your camera and microphone</li>
              <li>Ensure good internet connection</li>
            </ul>
          </div>
          
          <div className="instruction-card">
            <FaHeadset className="instruction-icon" />
            <h3>During the Interview</h3>
            <ul>
              <li>Speak clearly and at a moderate pace</li>
              <li>Maintain good posture and eye contact</li>
              <li>Think before you answer</li>
            </ul>
          </div>
          
          <div className="instruction-card">
            <FaLightbulb className="instruction-icon" />
            <h3>Tips for Success</h3>
            <ul>
              <li>Research the company beforehand</li>
              <li>Prepare questions to ask the interviewer</li>
              <li>Practice common interview questions</li>
            </ul>
          </div>
        </div>
        
        <div className="action-buttons">
          <button 
            className="btn btn-primary start-btn"
            onClick={startInterview}
          >
            <FaPlay /> Start Mock Interview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="face-to-face">
      <div className="container">
        <h1>Mock Interview</h1>
        
        {interviewStarted && (
          <div className="interview-container">
            <div className="question-section">
              <h2>Question {currentQuestion + 1} of {interviewQuestions.length}</h2>
              <div className="question-card">
                <p>{interviewQuestions[currentQuestion]}</p>
              </div>
              
              <div className="recording-controls">
                <button 
                  className={`btn ${isRecording ? 'btn-danger' : 'btn-primary'}`}
                  onClick={toggleRecording}
                >
                  {isRecording ? (
                    <>
                      <FaStop /> Stop Recording
                    </>
                  ) : (
                    <>
                      <FaVideo /> {recordedChunks.length > 0 ? 'Continue' : 'Start'} Recording
                    </>
                  )}
                </button>
                
                {isRecording && (
                  <div className="recording-indicator">
                    <span className="pulse"></span>
                    <span>Recording...</span>
                  </div>
                )}
              </div>
              
              <div className="navigation-buttons">
                <button 
                  className="btn btn-secondary"
                  onClick={submitForReview}
                  disabled={recordedChunks.length === 0}
                >
                  <FaCheck /> Submit Answer
                </button>
                
                {currentQuestion < interviewQuestions.length - 1 ? (
                  <button 
                    className="btn btn-primary"
                    onClick={nextQuestion}
                    disabled={isRecording}
                  >
                    Next Question <FaPlay />
                  </button>
                ) : (
                  <button 
                    className="btn btn-success"
                    onClick={restartInterview}
                  >
                    <FaRedo /> Start New Interview
                  </button>
                )}
              </div>
            </div>
            
            <div className="video-section">
              <div className="video-container">
                {isRecording ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="interview-video"
                  />
                ) : (
                  <div className="video-placeholder">
                    <FaVideo size={48} />
                    <p>Your video will appear here when recording</p>
                  </div>
                )}
              </div>
              
              {showFeedback && recordedChunks.length > 0 && (
                <div className="feedback-section">
                  <h3>Your Answer</h3>
                  <video 
                    src={recordedChunks[recordedChunks.length - 1].url} 
                    controls 
                    className="recorded-video"
                  />
                  <div className="ai-feedback">
                    <h4>AI Feedback:</h4>
                    <div className="feedback-points">
                      <p><FaCheck className="feedback-good" /> Good eye contact</p>
                      <p><FaCheck className="feedback-good" /> Clear and concise</p>
                      <p><FaTimes className="feedback-bad" /> Try to reduce filler words</p>
                      <p><FaTimes className="feedback-bad" /> Speak a bit slower</p>
                    </div>
                    <button 
                      className="btn btn-primary"
                      onClick={nextQuestion}
                    >
                      Next Question
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceToFace;
