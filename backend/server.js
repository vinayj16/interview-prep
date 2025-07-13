import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import geminiService from './services/geminiService.js';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import { successResponse, errorResponse } from './utils/apiResponse.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from './models/User.js'; // Added missing User model import

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Interview Preparation Platform API',
    version: '1.0.0',
    endpoints: {
      'POST /api/generate-resume': 'Generate AI-powered resume',
      'POST /api/generate-interview-questions': 'Generate interview questions',
      'POST /api/generate-hints': 'Generate coding hints',
      'POST /api/mcqs': 'Get company-specific MCQs',
      'GET /api/reviews': 'Get company reviews',
      'GET /api/coding': 'Get coding challenges'
    },
    documentation: 'https://github.com/your-repo/interview-prep-platform'
  });
});

// Resume generation endpoint
app.post('/api/generate-resume', async (req, res) => {
  try {
    const userData = req.body;

    if (!userData || Object.keys(userData).length === 0) {
      return errorResponse(res, 400, { error: 'User data is required' });
    }

    const result = await geminiService.generateResume(userData);
    return successResponse(res, 200, result, 'Resume generated successfully');
  } catch (error) {
    console.error('Resume generation error:', error);
    return errorResponse(res, 500, {
      error: 'Failed to generate resume',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Interview questions generation endpoint
app.post('/api/generate-interview-questions', async (req, res) => {
  try {
    const { company, role } = req.body;

    if (!company || !role) {
      return errorResponse(res, 400, { error: 'Company and role are required' });
    }

    const result = await geminiService.generateInterviewQuestions(company, role);
    return successResponse(res, 200, result, 'Interview questions generated successfully');
  } catch (error) {
    console.error('Interview questions generation error:', error);
    return errorResponse(res, 500, {
      error: 'Failed to generate interview questions',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Code analysis endpoint
app.post('/api/analyze-code', async (req, res) => {
  try {
    const { code, language, problemDescription } = req.body;

    if (!code || !language) {
      return errorResponse(res, 400, { error: 'Code and language are required' });
    }

    const result = await geminiService.analyzeCode(code, language, problemDescription);
    return successResponse(res, 200, result, 'Code analyzed successfully');
  } catch (error) {
    console.error('Code analysis error:', error);
    return errorResponse(res, 500, { error: 'Failed to analyze code' });
  }
});

// Hints generation endpoint
app.post('/api/generate-hints', async (req, res) => {
  try {
    const { problemDescription, currentCode } = req.body;

    if (!problemDescription) {
      return errorResponse(res, 400, { error: 'Problem description is required' });
    }

    const result = await geminiService.generateHints(problemDescription, currentCode);
    return successResponse(res, 200, result, 'Hints generated successfully');
  } catch (error) {
    console.error('Hints generation error:', error);
    return errorResponse(res, 500, { error: 'Failed to generate hints' });
  }
});

// MCQs endpoint
app.post('/api/mcqs', async (req, res) => {
  try {
    const { company, jobDescription } = req.body;

    if (!company || !jobDescription) {
      return errorResponse(res, 400, { error: 'Company and job description are required.' });
    }

    const mcqs = [
      {
        question: `What is the primary programming language used at ${company}?`,
        options: ['Java', 'Python', 'C++', 'JavaScript'],
        answer: 'JavaScript',
      },
      {
        question: `Which of the following best describes the role of a ${jobDescription}?`,
        options: [
          'Develops software',
          'Manages HR',
          'Handles finances',
          'Designs buildings'
        ],
        answer: 'Develops software',
      },
      {
        question: 'What does REST stand for?',
        options: [
          'Representational State Transfer',
          'Remote Execution Standard Technology',
          'Random Encoded Secure Transmission',
          'Relational Standard Table'
        ],
        answer: 'Representational State Transfer',
      },
      {
        question: 'What is the time complexity of binary search?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        answer: 'O(log n)',
      },
      {
        question: 'Which data structure uses LIFO?',
        options: ['Queue', 'Stack', 'Tree', 'Graph'],
        answer: 'Stack',
      }
    ];

    return successResponse(res, 200, { mcqs }, 'MCQs fetched successfully');
  } catch (error) {
    console.error('MCQs generation error:', error);
    return errorResponse(res, 500, { error: 'Failed to generate MCQs' });
  }
});

// Reviews endpoint
app.get('/api/reviews', async (req, res) => {
  try {
    const { company } = req.query;

    const reviews = [
      {
        company: company || 'Tech Company',
        rating: 4.2,
        review: 'Great work environment and learning opportunities.',
        author: 'Anonymous',
        date: '2024-01-15',
        pros: ['Good benefits', 'Flexible hours', 'Learning opportunities'],
        cons: ['Sometimes long hours', 'High expectations']
      },
      {
        company: company || 'Tech Company',
        rating: 3.8,
        review: 'Decent company with room for improvement.',
        author: 'Anonymous',
        date: '2024-01-10',
        pros: ['Stable job', 'Good team'],
        cons: ['Limited growth', 'Outdated tech stack']
      }
    ];

    return successResponse(res, 200, { reviews }, 'Reviews fetched successfully');
  } catch (error) {
    console.error('Reviews fetch error:', error);
    return errorResponse(res, 500, { error: 'Failed to fetch reviews' });
  }
});

// Coding challenges endpoint
app.get('/api/coding', async (req, res) => {
  try {
    const { difficulty, language, category } = req.query;

    const challenges = [
      {
        id: 1,
        title: 'Two Sum',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        difficulty: 'Easy',
        category: 'Arrays',
        languages: ['JavaScript', 'Python', 'Java', 'C++'],
        examples: [
          {
            input: 'nums = [2,7,11,15], target = 9',
            output: '[0,1]',
            explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
          }
        ],
        constraints: [
          '2 <= nums.length <= 104',
          '-109 <= nums[i] <= 109',
          '-109 <= target <= 109'
        ],
        starterCode: {
          javascript: 'function twoSum(nums, target) {\n    // Your code here\n}',
          python: 'def two_sum(nums, target):\n    # Your code here\n    pass',
          java: 'public int[] twoSum(int[] nums, int target) {\n    // Your code here\n}'
        }
      },
      {
        id: 2,
        title: 'Valid Parentheses',
        description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
        difficulty: 'Easy',
        category: 'Stack',
        languages: ['JavaScript', 'Python', 'Java', 'C++'],
        examples: [
          {
            input: 's = "()"',
            output: 'true',
            explanation: 'The string contains valid parentheses.'
          }
        ],
        constraints: [
          '1 <= s.length <= 104',
          's consists of parentheses only \'()[]{}\''
        ],
        starterCode: {
          javascript: 'function isValid(s) {\n    // Your code here\n}',
          python: 'def is_valid(s):\n    # Your code here\n    pass',
          java: 'public boolean isValid(String s) {\n    // Your code here\n}'
        }
      },
      {
        id: 3,
        title: 'Reverse Linked List',
        description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        difficulty: 'Easy',
        category: 'Linked List',
        languages: ['JavaScript', 'Python', 'Java', 'C++'],
        examples: [
          {
            input: 'head = [1,2,3,4,5]',
            output: '[5,4,3,2,1]',
            explanation: 'The linked list is reversed.'
          }
        ],
        constraints: [
          'The number of nodes in the list is in the range [0, 5000]',
          '-5000 <= Node.val <= 5000'
        ],
        starterCode: {
          javascript: 'function reverseList(head) {\n    // Your code here\n}',
          python: 'def reverse_list(head):\n    # Your code here\n    pass',
          java: 'public ListNode reverseList(ListNode head) {\n    // Your code here\n}'
        }
      }
    ];

    // Filter challenges based on query parameters
    let filteredChallenges = challenges;

    if (difficulty) {
      filteredChallenges = filteredChallenges.filter(challenge =>
        challenge.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    if (category) {
      filteredChallenges = filteredChallenges.filter(challenge =>
        challenge.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (language) {
      filteredChallenges = filteredChallenges.filter(challenge =>
        challenge.languages.some(lang =>
          lang.toLowerCase() === language.toLowerCase()
        )
      );
    }

    return successResponse(res, 200, { challenges: filteredChallenges }, 'Coding challenges fetched successfully');
  } catch (error) {
    console.error('Coding challenges fetch error:', error);
    return errorResponse(res, 500, { error: 'Failed to fetch coding challenges' });
  }
});

// Signup endpoint
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
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login endpoint
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
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );
    res.json({ success: true, message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Production build handling
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// Error handling middleware
app.use(errorHandler);
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
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

export default app;
