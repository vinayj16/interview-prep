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
    return this.request('/api/analyze-code', {
      method: 'POST',
      body: JSON.stringify({ code, language, problemDescription }),
    });
  }

  // Generate hints
  async generateHints(problemDescription, currentCode) {
    return this.request('/api/generate-hints', {
      method: 'POST',
      body: JSON.stringify({ problemDescription, currentCode }),
    });
  }

  // User management (for future backend integration)
  async createUser(userData) {
    return this.request('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId, userData) {
    return this.request(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getUser(userId) {
    return this.request(`/api/users/${userId}`);
  }

  // Progress tracking
  async saveProgress(userId, progressData) {
    return this.request(`/api/users/${userId}/progress`, {
      method: 'POST',
      body: JSON.stringify(progressData),
    });
  }

  async getProgress(userId) {
    return this.request(`/api/users/${userId}/progress`);
  }
}

export default new ApiService();