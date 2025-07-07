import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
  },
  
  // Google AI API configuration
  googleAI: {
    apiKey: process.env.GOOGLE_AI_API_KEY,
    model: process.env.GOOGLE_AI_MODEL || 'gemini-1.5-flash',
    temperature: parseFloat(process.env.GOOGLE_AI_TEMPERATURE) || 0.7,
    maxOutputTokens: parseInt(process.env.GOOGLE_AI_MAX_TOKENS) || 2048
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100 // requests per windowMs
  },
  
  // MongoDB configuration
  mongoDB: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/interview_prep',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    }
  },
  
  // JWT configuration (for future authentication)
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'dev'
  }
};

// Validate required configuration
if (!config.googleAI.apiKey) {
  console.warn('WARNING: GOOGLE_AI_API_KEY is not set. Some features may not work.');
}

export default config;
