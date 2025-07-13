import axios from 'axios';
import API_CONFIG from '../config/api';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/ai';

// Set up axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for sending cookies with requests
});

// Add a request interceptor to include the auth token
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

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// AI Service Methods
const aiService = {
  // Generate content using AI
  generateContent: async (prompt, type = 'general') => {
    try {
      const response = await api.post('/generate', { prompt, type });
      return response.data;
    } catch (error) {
      console.error('Error generating AI content:', error);
      throw error;
    }
  },

  // Get AI suggestions
  getSuggestions: async (context, type = 'general') => {
    try {
      const response = await api.post('/suggest', { context, type });
      return response.data;
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      throw error;
    }
  },

  // Generate interview questions
  generateInterviewQuestions: async (jobDescription, difficulty = 'medium', count = 5) => {
    try {
      const prompt = `Generate ${count} ${difficulty} level interview questions for a position with the following description: ${jobDescription}`;
      const response = await api.post('/generate', { 
        prompt,
        type: 'interview_questions',
        difficulty,
        count
      });
      return response.data;
    } catch (error) {
      console.error('Error generating interview questions:', error);
      throw error;
    }
  },

  // Generate code explanation
  explainCode: async (code, language) => {
    try {
      const prompt = `Explain the following ${language} code:\n\`\`\`${language}\n${code}\n\`\`\``;
      const response = await api.post('/generate', {
        prompt,
        type: 'code_explanation'
      });
      return response.data;
    } catch (error) {
      console.error('Error generating code explanation:', error);
      throw error;
    }
  },

  // Translate code between languages
  translateCode: async (code, fromLanguage, toLanguage) => {
    try {
      const prompt = `Translate the following ${fromLanguage} code to ${toLanguage}:\n\`\`\`${fromLanguage}\n${code}\n\`\`\``;
      const response = await api.post('/generate', {
        prompt,
        type: 'code_translation',
        fromLanguage,
        toLanguage
      });
      return response.data;
    } catch (error) {
      console.error('Error translating code:', error);
      throw error;
    }
  }
};

export default aiService;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.status = response.status;
        throw error;
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return null;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        const timeoutError = new Error('Request timed out');
        timeoutError.code = 'ETIMEDOUT';
        throw timeoutError;
      }
      
      console.error(`API request failed: ${error.message}`, {
        endpoint,
        options,
        error: error.message,
      });
      
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }

  // Resume generation
  async generateResume(userData) {
    return this.request('/api/generate-resume', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Interview questions
  async generateInterviewQuestions(company, role) {
    return this.request('/api/generate-interview-questions', {
      method: 'POST',
      body: JSON.stringify({ company, role }),
    });
  }

  // Code analysis
  async analyzeCode(code, language, problemDescription) {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, problemDescription }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Code analysis error:', error);
      throw error;
    }
  }

  // Generate hints
  async generateHints(problemDescription, currentCode) {
    try {
      const response = await fetch('/api/generate-hints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemDescription, currentCode }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Hints generation error:', error);
      throw error;
    }
  }

  // User management (for future backend integration)
  async createUser(userData) {
    return this.request('/api/userss', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId, userData) {
    return this.request(`/api/userss/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getUser(userId) {
    return this.request(`/api/userss/${userId}`);
  }

  // Progress tracking
  async saveProgress(userId, progressData) {
    return this.request(`/api/userss/${userId}/progress`, {
      method: 'POST',
      body: JSON.stringify(progressData),
    });
  }

  async getProgress(userId) {
    return this.request(`/api/userss/${userId}/progress`);
  }

  // Reviews fetching
  async getReviews(companyName) {
    // If companyName is provided, add as query param
    const endpoint = companyName ? `/api/reviews?company=${encodeURIComponent(companyName)}` : '/api/reviews';
    return this.request(endpoint);
  }

  // MCQs fetching
  async getMCQs(company, jobDescription) {
    return this.request('/api/mcqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, jobDescription }),
    });
  }

  // Coding challenges fetching
  async getCodingChallenges({ difficulty, language, category } = {}) {
    const params = new URLSearchParams();
    if (difficulty) params.append('difficulty', difficulty);
    if (language) params.append('language', language);
    if (category) params.append('category', category);

    const response = await fetch(`/api/coding?${params.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}

const apiService = new ApiService();
export default apiService;
    