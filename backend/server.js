import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import geminiService from './services/geminiService.js';
import authRoutes from './routes/authRoutes.js';
import config from './config/config.js';
import errorHandler from './middleware/errorHandler.js';
import { successResponse, errorResponse } from './utils/apiResponse.js';
import mongoose from 'mongoose';

// Configure environment variables
dotenv.config();

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// API Documentation
app.get('/api', (req, res) => {
  res.json({
    name: 'Interview Preparation Platform API',
    version: '1.0.0',
    endpoints: {
      'GET /api/health': 'Health check',
      'POST /api/generate-resume': 'Generate AI-powered resume',
      'POST /api/generate-interview-questions': 'Generate interview questions',
      'POST /api/analyze-code': 'Analyze code with AI',
      'POST /api/generate-hints': 'Generate coding hints'
    },
    documentation: 'https://github.com/your-repo/interview-prep-platform'
  });
});

// Gemini AI Endpoints
app.post('/api/generate-resume', async (req, res) => {
  try {
    const userData = req.body;
    
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'User data is required'
      });
    }

    const result = await geminiService.generateResume(userData);
    res.json(result);
  } catch (error) {
    console.error('Resume generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate resume',
      details: error.message
    });
  }
});

app.post('/api/generate-interview-questions', async (req, res) => {
  try {
    const { company, role } = req.body;
    
    if (!company || !role) {
      return res.status(400).json({
        success: false,
        error: 'Company and role are required'
      });
    }

    const result = await geminiService.generateInterviewQuestions(company, role);
    res.json(result);
  } catch (error) {
    console.error('Interview questions generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate interview questions',
      details: error.message
    });
  }
});

app.post('/api/analyze-code', async (req, res) => {
  try {
    const { code, language, problemDescription } = req.body;
    
    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Code and language are required'
      });
    }

    const result = await geminiService.analyzeCode(code, language, problemDescription);
    res.json(result);
  } catch (error) {
    console.error('Code analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze code',
      details: error.message
    });
  }
});

app.post('/api/generate-hints', async (req, res) => {
  try {
    const { problemDescription, currentCode } = req.body;
    
    if (!problemDescription) {
      return res.status(400).json({
        success: false,
        error: 'Problem description is required'
      });
    }

    const result = await geminiService.generateHints(problemDescription, currentCode);
    res.json(result);
  } catch (error) {
    console.error('Hints generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate hints',
      details: error.message
    });
  }
});

// Catch-all handler for React Router (production only)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🤖 Gemini AI: ${process.env.GOOGLE_AI_API_KEY ? 'Configured' : 'Not configured'}`);
  console.log(`🌐 CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
});