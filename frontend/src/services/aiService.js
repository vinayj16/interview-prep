import axios from 'axios';

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
  // Health check for backend connection
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Backend health check failed:', error);
      throw error;
    }
  },

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
    