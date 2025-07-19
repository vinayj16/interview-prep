import React, { useState, useEffect } from 'react';
import { FaVideo, FaUsers, FaStar, FaRobot, FaPlay, FaSpinner } from 'react-icons/fa';
import geminiService from '../../services/geminiService';
import { useToast } from '../../shared/Toast/Toast';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import './FaceToFace.css';

const FaceToFace = () => {
  const { showToast } = useToast();
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [showQuestions, setShowQuestions] = useState(false);

  const companies = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook', 'Netflix', 'Tesla', 'Uber'];
  const roles = ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer', 'Data Scientist'];

  const generateInterviewQuestions = async () => {
    if (!selectedCompany || !selectedRole) {
      showToast('Please select both company and role', 'warning');
      return;
    }

    try {
      setIsGeneratingQuestions(true);
      const questions = await geminiService.generateInterviewQuestions(selectedCompany, selectedRole);
      setInterviewQuestions(questions.questions || []);
      setShowQuestions(true);
      showToast('Interview questions generated successfully!', 'success');
    } catch (error) {
      console.error('Error generating interview questions:', error);
      showToast('Failed to generate interview questions. Please try again.', 'error');
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const startAIInterview = () => {
    if (interviewQuestions.length === 0) {
      showToast('Please generate interview questions first', 'info');
      return;
    }
    showToast('AI Interview feature coming soon!', 'info');
  };

  return (
    <div className="face-to-face-page">
      <div className="page-header">
        <h1>Mock Interviews</h1>
        <p>Practice face-to-face interviews with AI or real interviewers</p>
      </div>
      
      <div className="content-section">
        <div className="feature-card">
          <div className="card-header">
            <FaRobot className="card-icon" />
            <h2>AI Mock Interviews</h2>
          </div>
          <p>Practice with our AI interviewer that adapts to your responses and provides real-time feedback.</p>
          
          <div className="interview-setup">
            <div className="form-row">
              <div className="form-group">
                <label>Target Company</label>
                <select 
                  value={selectedCompany} 
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Company</option>
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Role</label>
                <select 
                  value={selectedRole} 
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="action-buttons">
              <button 
                className="btn btn-outline"
                onClick={generateInterviewQuestions}
                disabled={isGeneratingQuestions}
              >
                {isGeneratingQuestions ? (
                  <>
                    <FaSpinner className="spinning" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <FaRobot />
                    Generate Questions
                  </>
                )}
              </button>
              
              <button 
                className="btn btn-primary"
                onClick={startAIInterview}
                disabled={interviewQuestions.length === 0}
              >
                <FaPlay />
                Start AI Interview
              </button>
            </div>
          </div>
          
          {showQuestions && interviewQuestions.length > 0 && (
            <div className="generated-questions">
              <h3>Generated Interview Questions</h3>
              <div className="questions-list">
                {interviewQuestions.map((question, index) => (
                  <div key={index} className="question-item">
                    <span className="question-number">{index + 1}.</span>
                    <span className="question-text">{question}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="feature-card">
          <div className="card-header">
            <FaUsers className="card-icon" />
            <h2>Peer Interviews</h2>
          </div>
          <p>Connect with other users for peer-to-peer mock interviews and mutual feedback.</p>
          <button className="btn btn-secondary" onClick={() => showToast('Peer interview feature coming soon!', 'info')}>
            <FaUsers />
            Find Peer
          </button>
        </div>
        
        <div className="feature-card">
          <div className="card-header">
            <FaStar className="card-icon" />
            <h2>Expert Interviews</h2>
          </div>
          <p>Book sessions with industry experts for professional mock interviews.</p>
          <button className="btn btn-secondary" onClick={() => showToast('Expert interview booking coming soon!', 'info')}>
            <FaStar />
            Book Expert
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaceToFace; 