// API service for communicating with the backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin 
  : 'http://localhost:5000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Resume generation
  async generateResume(resumeData) {
    return this.makeRequest('/generate-resume', {
      method: 'POST',
      body: JSON.stringify(resumeData),
    });
  }

  // Get MCQs
  async getMCQs(company, jobDescription) {
    const params = new URLSearchParams({ company, jobDescription });
    return this.makeRequest(`/mcqs?${params}`);
  }

  // Get coding questions
  async getCodingQuestions(company) {
    const params = new URLSearchParams({ company });
    return this.makeRequest(`/interview-questions?${params}`);
  }

  // Get reviews
  async getReviews(company) {
    const params = new URLSearchParams({ company });
    return this.makeRequest(`/reviews?${params}`);
  }
}

const apiService = new ApiService();
export default apiService;
