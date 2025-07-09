// API Configuration
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000'),
  timeout: 10000 // 10 seconds
};

export default API_CONFIG;