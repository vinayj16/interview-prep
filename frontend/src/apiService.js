import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default {
  // Reviews API
  getReviews: (company) => api.get(`/reviews${company ? `?company=${encodeURIComponent(company)}` : ''}`),
  createReview: (reviewData) => api.post('/reviews', reviewData),
  
  // User API
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  
  // Roadmap API
  getRoadmapProgress: () => api.get('/roadmap/progress'),
  updateTopicStatus: (topicId, status) => api.put(`/roadmap/topics/${topicId}`, { status }),
  
  // MCQs API
  getQuestions: (category) => api.get(`/mcqs${category ? `?category=${category}` : ''}`),
  submitAnswer: (questionId, answer) => api.post(`/mcqs/${questionId}/answer`, { answer }),
  
  // Mock Interview API
  startInterview: (config) => api.post('/interview/start', config),
  submitInterviewResponse: (interviewId, response) => 
    api.post(`/interview/${interviewId}/response`, response),
  getInterviewFeedback: (interviewId) => api.get(`/interview/${interviewId}/feedback`)
};
