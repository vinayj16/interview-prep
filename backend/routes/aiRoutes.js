import express from 'express';
import { generateAIContent, getAISuggestions } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes (require authentication)
router.post('/generate', protect, generateAIContent);
router.post('/suggest', protect, getAISuggestions);

export default router;
