const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class GeminiService {
  async generateResume(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating resume:', error);
      throw error;
    }
  }

  async generateInterviewQuestions(company, role) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-interview-questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company, role }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating interview questions:', error);
      throw error;
    }
  }

  async analyzeCode(code, language, problemDescription) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language, problemDescription }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error analyzing code:', error);
      throw error;
    }
  }

  async generateHints(problemDescription, currentCode) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-hints`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problemDescription, currentCode }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating hints:', error);
      throw error;
    }
  }
}

export default new GeminiService();