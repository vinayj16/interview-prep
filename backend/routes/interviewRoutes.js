import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import geminiService from '../services/geminiService.js';

const router = express.Router();

// @desc    Generate MCQs
// @route   POST /api/interview/mcqs
// @access  Private
router.post('/mcqs', protect, async (req, res) => {
  try {
    const { company, jobDescription } = req.body;

    if (!company || !jobDescription) {
      return errorResponse(res, 400, { message: 'Company and job description are required' });
    }

    // Generate MCQs using AI service
    const mcqs = await geminiService.generateMCQs(company, jobDescription);
    
    return successResponse(res, 200, { mcqs });
  } catch (error) {
    console.error('MCQ Generation Error:', error);
    return errorResponse(res, 500, { message: 'Failed to generate MCQs', error: error.message });
  }
});

// @desc    Get coding challenges
// @route   GET /api/interview/coding
// @access  Private
router.get('/coding', protect, async (req, res) => {
  try {
    const { difficulty, language, category } = req.query;

    // Get coding challenges based on filters
    const challenges = await geminiService.getCodingChallenges({
      difficulty,
      language,
      category
    });
    
    return successResponse(res, 200, { challenges });
  } catch (error) {
    console.error('Coding Challenges Error:', error);
    return errorResponse(res, 500, { message: 'Failed to fetch coding challenges', error: error.message });
  }
});

export default router;
