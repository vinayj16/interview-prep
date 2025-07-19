import { toast } from 'react-toastify';
import { getAuthToken, setAuthToken, clearAuthToken } from '../utils/auth';
import env from '../utils/env';

/**
 * API Service with interceptors, error handling, and type safety
 */
class ApiService {
  constructor() {
    // Initialize with environment configuration
    this.baseURL = env.api.baseURL;
    this.timeout = env.api.timeout;
    this.pendingRequests = new Map();
    
    // Initialize interceptors
    this.requestInterceptors = [];
    this.responseInterceptors = [];
    this.errorInterceptors = [];
    
    // Add default interceptors
    this._addDefaultInterceptors();
  }

  /**
   * Add request interceptor
   * @param {Function} interceptor - Function that modifies the request config
   */
  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
    return () => {
      this.requestInterceptors = this.requestInterceptors.filter(i => i !== interceptor);
    };
  }

  /**
   * Add response interceptor
   * @param {Function} interceptor - Function that processes the response
   */
  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
    return () => {
      this.responseInterceptors = this.responseInterceptors.filter(i => i !== interceptor);
    };
  }

  /**
   * Add error interceptor
   * @param {Function} interceptor - Function that handles errors
   */
  addErrorInterceptor(interceptor) {
    this.errorInterceptors.push(interceptor);
    return () => {
      this.errorInterceptors = this.errorInterceptors.filter(i => i !== interceptor);
    };
  }

  /**
   * Make an API request with interceptors and error handling
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @param {Object} meta - Additional metadata for interceptors
   * @returns {Promise<any>} - Processed response data
   */
  async request(endpoint, options = {}, meta = {}) {
    const requestId = `${endpoint}-${Date.now()}`;
    const abortController = new AbortController();
    
    // Add to pending requests
    this.pendingRequests.set(requestId, abortController);
    
    // Initialize config
    let config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: abortController.signal,
      ...options,
    };
    
    // Apply request interceptors
    try {
      for (const interceptor of this.requestInterceptors) {
        config = await interceptor(config, { endpoint, ...meta }) || config;
      }
      
      // Add auth token if available
      const token = getAuthToken(env.auth.tokenKey);
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Set up timeout
      const timeout = setTimeout(() => {
        abortController.abort(`Request timed out after ${this.timeout}ms`);
      }, this.timeout);
      
      // Make the request
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      // Clear timeout
      clearTimeout(timeout);
      
      // Process response
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else if (contentType && contentType.includes('text/')) {
        data = await response.text();
      } else {
        data = await response.blob();
      }
      
      // Check for error response
      if (!response.ok) {
        const error = new Error(data?.message || `HTTP error! status: ${response.status}`);
        error.status = response.status;
        error.response = { data, status: response.status, headers: response.headers };
        throw error;
      }
      
      // Apply response interceptors
      let processedData = data;
      for (const interceptor of this.responseInterceptors) {
        processedData = await interceptor(processedData, { response, endpoint, ...meta }) || processedData;
      }
      
      return processedData;
      
    } catch (error) {
      // Apply error interceptors
      let processedError = error;
      for (const interceptor of this.errorInterceptors) {
        try {
          const result = await interceptor(error, { endpoint, ...meta });
          if (result) {
            return result; // Interceptor handled the error
          }
        } catch (interceptorError) {
          processedError = interceptorError;
        }
      }
      
      // Handle specific error types
      if (error.name === 'AbortError') {
        if (error.message.includes('timeout')) {
          const timeoutError = new Error('Request timed out. Please check your connection and try again.');
          timeoutError.code = 'ETIMEDOUT';
          timeoutError.isRetryable = true;
          throw timeoutError;
        }
        // Request was cancelled
        return Promise.reject(new Error('Request was cancelled'));
      }
      
      // Handle 401 Unauthorized
      if (error.status === 401) {
        // Clear all auth data on unauthorized
        clearAuthToken(env.auth.tokenKey);
        
        // If we have a refresh token, try to refresh
        if (getAuthToken(env.auth.refreshTokenKey)) {
          try {
            // Try to refresh the token
            const response = await this.request('/api/auth/refresh', {
              method: 'POST',
              body: JSON.stringify({
                refreshToken: getAuthToken(env.auth.refreshTokenKey)
              })
            });
            
            // If refresh was successful, retry the original request
            if (response?.token) {
              setAuthToken(response.token, env.auth.tokenKey);
              if (response.refreshToken) {
                setAuthToken(response.refreshToken, env.auth.refreshTokenKey);
              }
              
              // Retry the original request with the new token
              return this.request(endpoint, {
                ...options,
                headers: {
                  ...options.headers,
                  'Authorization': `Bearer ${response.token}`
                }
              });
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
          }
        }
        
        // If we get here, either refresh failed or wasn't attempted
        // Redirect to login with session expired message
        window.location.href = '/login?session_expired=1';
      }
      
      // Log error details in development
      if (process.env.NODE_ENV !== 'production') {
        console.error(`API Request Error [${endpoint}]:`, {
          error: error.message,
          status: error.status,
          config,
          response: error.response,
        });
      }
      
      throw processedError;
      
    } finally {
      // Clean up
      this.pendingRequests.delete(requestId);
    }
  }

  /**
   * Add default interceptors for common functionality
   */
  _addDefaultInterceptors() {
    // Request interceptor to add loading state
    this.addRequestInterceptor((config) => {
      // Add request timestamp for caching
      config.metadata = { startTime: Date.now() };
      return config;
    });
    
    // Response interceptor for common data structure
    this.addResponseInterceptor((data, { response }) => {
      // Handle standard API response format: { success, data, message, error }
      if (data && typeof data === 'object' && 'success' in data) {
        if (!data.success) {
          throw new Error(data.message || 'Request failed');
        }
        return data.data || data;
      }
      return data;
    });
    
    // Error interceptor for common error handling
    this.addErrorInterceptor((error) => {
      // Show error toast for non-401 errors
      if (error.status !== 401) {
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        toast.error(errorMessage, { autoClose: 5000 });
      }
      return Promise.reject(error);
    });
  }
  
  /**
   * Cancel all pending requests
   */
  cancelAllRequests() {
    this.pendingRequests.forEach((controller, id) => {
      controller.abort(`Request ${id} was cancelled`);
    });
    this.pendingRequests.clear();
  }
  
  /**
   * Health check endpoint
   */
  async healthCheck() {
    return this.request('/api/health', {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' },
    });
  }
  
  // ========== AUTHENTICATION ========== //
  
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   */
  async login(email, password) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
  
  /**
   * Register new user
   * @param {Object} userData - User registration data
   */
  async register(userData) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
  
  /**
   * Logout user
   */
  async logout() {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } finally {
      clearAuthToken();
    }
  }
  
  /**
   * Get current user profile
   */
  async getCurrentUser() {
    return this.request('/api/users/me');
  }
  
  // ========== CORE FEATURES ========== //
  
  /**
   * Generate resume based on user data
   * @param {Object} userData - User information for resume
   */
  async generateResume(userData) {
    return this.request('/api/resumes/generate', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
  
  /**
   * Generate interview questions
   * @param {string} company - Company name
   * @param {string} role - Job role
   * @param {string} [difficulty='medium'] - Question difficulty
   */
  async generateInterviewQuestions(company, role, difficulty = 'medium') {
    return this.request('/api/interview/questions', {
      method: 'POST',
      body: JSON.stringify({ company, role, difficulty }),
    });
  }

  /**
   * Analyze code for issues and provide feedback
   * @param {string} code - Source code to analyze
   * @param {string} language - Programming language
   * @param {string} problemDescription - Problem statement
   * @param {Object} options - Additional options
   */
  async analyzeCode(code, language, problemDescription, options = {}) {
    return this.request('/api/code/analyze', {
      method: 'POST',
      body: JSON.stringify({ 
        code, 
        language, 
        problemDescription,
        ...options 
      }),
    });
  }
  
  /**
   * Generate hints for solving a coding problem
   * @param {string} problemDescription - Problem statement
   * @param {string} currentCode - Current user code
   * @param {string} [language='javascript'] - Programming language
   */
  async generateHints(problemDescription, currentCode = '', language = 'javascript') {
    return this.request('/api/code/hints', {
      method: 'POST',
      body: JSON.stringify({ 
        problemDescription, 
        currentCode,
        language 
      }),
    });
  }

  // ========== USER MANAGEMENT ========== //
  
  /**
   * Create a new user (admin only)
   * @param {Object} userData - User data
   */
  async createUser(userData) {
    return this.request('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} userData - Updated user data
   */
  async updateUser(userId, userData) {
    return this.request(`/api/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }

  /**
   * Get user by ID
   * @param {string} userId - User ID
   */
  async getUser(userId) {
    return this.request(`/api/users/${userId}`);
  }
  
  /**
   * Update current user's profile
   * @param {Object} userData - Updated user data
   */
  async updateProfile(userData) {
    return this.request('/api/users/me', {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }
  
  // ========== PROGRESS TRACKING ========== //
  
  /**
   * Save user progress
   * @param {string} userId - User ID
   * @param {Object} progressData - Progress data to save
   */
  async saveProgress(userId, progressData) {
    return this.request(`/api/users/${userId}/progress`, {
      method: 'POST',
      body: JSON.stringify(progressData),
    });
  }
  
  /**
   * Get user progress
   * @param {string} userId - User ID
   * @param {Object} options - Query options (e.g., { type: 'coding', limit: 10 })
   */
  async getProgress(userId, options = {}) {
    const query = new URLSearchParams(options).toString();
    return this.request(`/api/users/${userId}/progress?${query}`);
  }

  // ========== INTERVIEW PREP ========== //
  
  /**
   * Get company reviews
   * @param {string} [companyName] - Filter by company name
   * @param {Object} [filters] - Additional filters
   */
  async getReviews(companyName, filters = {}) {
    const params = new URLSearchParams();
    if (companyName) params.append('company', companyName);
    Object.entries(filters).forEach(([key, value]) => {
      if (value != null) params.append(key, value);
    });
    
    return this.request(`/api/reviews?${params.toString()}`);
  }
  
  /**
   * Submit a new company review
   * @param {Object} reviewData - Review data
   */
  async submitReview(reviewData) {
    return this.request('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  /**
   * Get MCQs based on filters
   * @param {Object} filters - Filter options
   * @param {string} [filters.company] - Company name
   * @param {string} [filters.role] - Job role
   * @param {string} [filters.difficulty] - Difficulty level
   * @param {string[]} [filters.categories] - Question categories
   * @param {number} [filters.limit] - Number of questions to return
   */
  async getMCQs(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v));
      } else if (value != null) {
        params.append(key, value);
      }
    });
    
    return this.request(`/api/mcqs?${params.toString()}`);
  }
  
  /**
   * Submit MCQ answer and get feedback
   * @param {string} questionId - MCQ question ID
   * @param {string} answer - User's answer
   */
  async submitMCQAnswer(questionId, answer) {
    return this.request(`/api/mcqs/${questionId}/answer`, {
      method: 'POST',
      body: JSON.stringify({ answer }),
    });
  }

  /**
   * Get coding challenges
   * @param {Object} options - Filter options
   * @param {string} [options.difficulty] - Challenge difficulty
   * @param {string} [options.language] - Programming language
   * @param {string} [options.category] - Challenge category
   * @param {number} [options.limit] - Number of challenges to return
   */
  async getCodingChallenges(options = {}) {
    const params = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      if (value != null) params.append(key, value);
    });
    
    return this.request(`/api/coding?${params.toString()}`);
  }
  
  /**
   * Submit code for a coding challenge
   * @param {string} challengeId - Challenge ID
   * @param {Object} submission - Submission data
   * @param {string} submission.code - Submitted code
   * @param {string} submission.language - Programming language
   */
  async submitCode(challengeId, { code, language }) {
    return this.request(`/api/coding/${challengeId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ code, language }),
    });
}

/**
 * Generate hints for solving a coding problem
 * @param {string} problemDescription - Problem statement
 * @param {string} currentCode - Current user code
 * @param {string} [language='javascript'] - Programming language
 */
async generateHints(problemDescription, currentCode = '', language = 'javascript') {
  return this.request('/api/code/hints', {
    method: 'POST',
    body: JSON.stringify({ 
      problemDescription, 
      currentCode,
      language 
    }),
  });
}

// ========== USER MANAGEMENT ========== //

/**
 * Create a new user (admin only)
 * @param {Object} userData - User data
 */
async createUser(userData) {
  return this.request('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} userData - Updated user data
 */
async updateUser(userId, userData) {
  return this.request(`/api/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(userData),
  });
}

/**
 * Get user by ID
 * @param {string} userId - User ID
 */
async getUser(userId) {
  return this.request(`/api/users/${userId}`);
}

/**
 * Update current user's profile
 * @param {Object} userData - Updated user data
 */
async updateProfile(userData) {
  return this.request('/api/users/me', {
    method: 'PATCH',
    body: JSON.stringify(userData),
  });
}

// ========== PROGRESS TRACKING ========== //

/**
 * Save user progress
 * @param {string} userId - User ID
 * @param {Object} progressData - Progress data to save
 */
async saveProgress(userId, progressData) {
  return this.request(`/api/users/${userId}/progress`, {
    method: 'POST',
    body: JSON.stringify(progressData),
  });
}

/**
 * Get user progress
 * @param {string} userId - User ID
 * @param {Object} options - Query options (e.g., { type: 'coding', limit: 10 })
 */
async getProgress(userId, options = {}) {
  const query = new URLSearchParams(options).toString();
  return this.request(`/api/users/${userId}/progress?${query}`);
}

// ========== INTERVIEW PREP ========== //

/**
 * Get company reviews
 * @param {string} [companyName] - Filter by company name
 * @param {Object} [filters] - Additional filters
 */
async getReviews(companyName, filters = {}) {
  const params = new URLSearchParams();
  if (companyName) params.append('company', companyName);
  Object.entries(filters).forEach(([key, value]) => {
    if (value != null) params.append(key, value);
  });
  
  return this.request(`/api/reviews?${params.toString()}`);
}

/**
 * Submit a new company review
 * @param {Object} reviewData - Review data
 */
async submitReview(reviewData) {
  return this.request('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
}

/**
 * Get MCQs based on filters
 * @param {Object} filters - Filter options
 * @param {string} [filters.company] - Company name
 * @param {string} [filters.role] - Job role
 * @param {string} [filters.difficulty] - Difficulty level
 * @param {string[]} [filters.categories] - Question categories
 * @param {number} [filters.limit] - Number of questions to return
 */
async getMCQs(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else if (value != null) {
      params.append(key, value);
    }
  });
  
  return this.request(`/api/mcqs?${params.toString()}`);
}

/**
 * Submit MCQ answer and get feedback
 * @param {string} questionId - MCQ question ID
 * @param {string} answer - User's answer
 */
async submitMCQAnswer(questionId, answer) {
  return this.request(`/api/mcqs/${questionId}/answer`, {
    method: 'POST',
    body: JSON.stringify({ answer }),
  });
}

/**
 * Get coding challenges
 * @param {Object} options - Filter options
 * @param {string} [options.difficulty] - Challenge difficulty
 * @param {string} [options.language] - Programming language
 * @param {string} [options.category] - Challenge category
 * @param {number} [options.limit] - Number of challenges to return
 */
async getCodingChallenges(options = {}) {
  const params = new URLSearchParams();
  Object.entries(options).forEach(([key, value]) => {
    if (value != null) params.append(key, value);
  });
  
  return this.request(`/api/coding?${params.toString()}`);
}

/**
 * Submit code for a coding challenge
 * @param {string} challengeId - Challenge ID
 * @param {Object} submission - Submission data
 * @param {string} submission.code - Submitted code
 * @param {string} submission.language - Programming language
 */
async submitCode(challengeId, { code, language }) {
  return this.request(`/api/coding/${challengeId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ code, language }),
  });
}
}

// Create a singleton instance
const apiService = new ApiService();

export default apiService;

// Export types for better TypeScript/IDE support
/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {any} [data] - Response data
 * @property {string} [message] - Optional message
 * @property {string} [error] - Error message if request failed
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {any[]} items - Array of items
 * @property {number} total - Total number of items
 * @property {number} page - Current page number
 * @property {number} limit - Items per page
 * @property {number} pages - Total number of pages
 */

// Export common types
export const ApiErrorType = {
  NETWORK: 'NETWORK',
  TIMEOUT: 'TIMEOUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION: 'VALIDATION',
  SERVER: 'SERVER',
  UNKNOWN: 'UNKNOWN',
};

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  /**
   * @param {string} message - Error message
   * @param {string} [code] - Error code
   * @param {number} [status] - HTTP status code
   * @param {any} [response] - Original response data
   */
  constructor(message, code = 'UNKNOWN', status = 500, response = null) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.response = response;
    this.isApiError = true;
    
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

// Helper function to create API error from response
export function createApiError(error) {
  if (error.isApiError) return error;
  
  if (error.name === 'AbortError') {
    return new ApiError(
      'Request was cancelled or timed out',
      'TIMEOUT',
      408
    );
  }
  
  if (error.response) {
    const { status, data } = error.response;
    const message = data?.message || error.message || 'An error occurred';
    
    let errorCode = 'UNKNOWN';
    if (status >= 500) errorCode = 'SERVER';
    else if (status === 401) errorCode = 'UNAUTHORIZED';
    else if (status === 403) errorCode = 'FORBIDDEN';
    else if (status === 404) errorCode = 'NOT_FOUND';
    else if (status === 422) errorCode = 'VALIDATION';
    
    return new ApiError(message, errorCode, status, data);
  }
  
  if (error.request) {
    return new ApiError(
      'No response received from server',
      'NETWORK',
      0
    );
  }
  
  return new ApiError(
    error.message || 'An unknown error occurred',
    'UNKNOWN',
    0
  );
}
