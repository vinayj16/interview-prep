// API Configuration
const API_CONFIG = {
<<<<<<< HEAD
  baseURL: process.env.REACT_APP_API_BASE_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000'),
  timeout: 10000 // 10 seconds
=======
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
};

export default API_CONFIG;