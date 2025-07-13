// API Configuration
const API_CONFIG = {
  // Base URL for API requests
  baseURL: process.env.REACT_APP_API_BASE_URL || 
    (process.env.NODE_ENV === 'production' 
      ? window.location.origin 
      : 'http://localhost:5000'),
  
  // Default timeout for requests (15 seconds)
  timeout: 15000,
  
  // Default headers
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  },
  
  // API version
  apiVersion: 'v1',
  
  // Enable/disable request/response logging in development
  debug: process.env.NODE_ENV !== 'production',
  
  // Retry configuration
  retry: {
    maxRetries: 3,
    initialDelay: 300,
    maxDelay: 5000,
    retryOn: [408, 429, 500, 502, 503, 504]
  },
  
  // CORS configuration
  withCredentials: true,
  credentials: 'include'
};

export default API_CONFIG;