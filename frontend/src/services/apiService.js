import API_CONFIG from '../config/api';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.timeout = API_CONFIG.timeout;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }

  // Resume generation
  async generateResume(userData) {
<<<<<<< HEAD
    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Resume generation error:', error);
      throw error;
    }
=======
    return this.request('/api/generate-resume', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
  }

  // Interview questions
  async generateInterviewQuestions(company, role) {
<<<<<<< HEAD
    try {
      const response = await fetch('/api/generate-interview-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, role }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Interview questions generation error:', error);
      throw error;
    }
=======
    return this.request('/api/generate-interview-questions', {
      method: 'POST',
      body: JSON.stringify({ company, role }),
    });
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
  }

  // Code analysis
  async analyzeCode(code, language, problemDescription) {
<<<<<<< HEAD
    try {
      const response = await fetch('/api/analyze-code', {
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
=======
    return this.request('/api/analyze-code', {
      method: 'POST',
      body: JSON.stringify({ code, language, problemDescription }),
    });
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
  }

  // Generate hints
  async generateHints(problemDescription, currentCode) {
<<<<<<< HEAD
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
=======
    return this.request('/api/generate-hints', {
      method: 'POST',
      body: JSON.stringify({ problemDescription, currentCode }),
    });
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
  }

  // User management (for future backend integration)
  async createUser(userData) {
<<<<<<< HEAD
    return this.request('/api/userss', {
=======
    return this.request('/api/users', {
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId, userData) {
<<<<<<< HEAD
    return this.request(`/api/userss/${userId}`, {
=======
    return this.request(`/api/users/${userId}`, {
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getUser(userId) {
<<<<<<< HEAD
    return this.request(`/api/userss/${userId}`);
=======
    return this.request(`/api/users/${userId}`);
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
  }

  // Progress tracking
  async saveProgress(userId, progressData) {
<<<<<<< HEAD
    return this.request(`/api/userss/${userId}/progress`, {
=======
    return this.request(`/api/users/${userId}/progress`, {
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
      method: 'POST',
      body: JSON.stringify(progressData),
    });
  }

  async getProgress(userId) {
<<<<<<< HEAD
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
=======
    return this.request(`/api/users/${userId}/progress`);
  }
}

export default new ApiService();
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
