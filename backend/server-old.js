import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import mongoose from 'mongoose';

// Configure environment variables
dotenv.config();

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS Origin: http://localhost:3000`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
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

app.post('/signup', async (req, res) => {
  const { full_name, email, password } = req.body;
  if (!full_name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const user = new User({ full_name, email, password_hash });
    await user.save();
    res.json({ success: true, message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    // Generate JWT token (optional)
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1d' });
    res.json({ success: true, message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

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

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  app.close(() => {
    process.exit(1);
  });
});