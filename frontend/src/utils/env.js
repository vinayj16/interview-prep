/**
 * Environment Configuration Utility
 * 
 * This module provides a type-safe way to access environment variables
 * with validation and default values.
 */

// Validate required environment variables on startup
const validateEnvironment = () => {
  const requiredVars = [
    'REACT_APP_API_BASE_URL',
    'REACT_APP_AUTH_TOKEN_KEY'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0 && process.env.NODE_ENV !== 'test') {
    console.error('Missing required environment variables:', missingVars.join(', '));
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  }
};

// Environment configuration with defaults
const env = {
  // Application
  app: {
    name: process.env.REACT_APP_NAME || 'Interview Preparation Platform',
    version: process.env.REACT_APP_VERSION || '1.0.0',
    environment: process.env.REACT_APP_ENVIRONMENT || 'development',
    defaultLanguage: process.env.REACT_APP_DEFAULT_LANGUAGE || 'en',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    debug: process.env.REACT_APP_DEBUG === 'true'
  },

  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 
      (process.env.NODE_ENV === 'production' 
        ? window.location.origin 
        : 'http://localhost:5000'),
    version: process.env.REACT_APP_API_VERSION || 'v1',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '15000', 10),
    withCredentials: true
  },

  // Authentication
  auth: {
    tokenKey: process.env.REACT_APP_AUTH_TOKEN_KEY || 'interview_prep_auth_token',
    refreshTokenKey: process.env.REACT_APP_REFRESH_TOKEN_KEY || 'interview_prep_refresh_token',
    tokenExpiryCheck: parseInt(process.env.REACT_APP_TOKEN_EXPIRY_CHECK || '300000', 10) // 5 minutes
  },

  // Gemini AI
  gemini: {
    apiKey: process.env.REACT_APP_GEMINI_API_KEY,
    apiUrl: process.env.REACT_APP_GEMINI_API_URL || 
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
  },

  // Feature Flags
  features: {
    analytics: process.env.REACT_APP_FEATURE_ANALYTICS === 'true',
    offlineMode: process.env.REACT_APP_FEATURE_OFFLINE_MODE !== 'false',
    darkMode: process.env.REACT_APP_FEATURE_DARK_MODE !== 'false'
  },

  // Performance
  performance: {
    measure: process.env.REACT_APP_PERF_MEASURE === 'true',
    longTaskThreshold: parseInt(process.env.REACT_APP_PERF_LONG_TASK_THRESHOLD || '200', 10)
  },

  // Analytics
  analytics: {
    googleAnalyticsId: process.env.REACT_APP_GA_TRACKING_ID,
    sentryDsn: process.env.REACT_APP_SENTRY_DSN
  }
};

// Validate environment on import
if (typeof window !== 'undefined') {
  validateEnvironment();
}

export default env;
