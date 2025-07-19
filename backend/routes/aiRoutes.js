import express from 'express';
import { generateAIContent, getAISuggestions } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Health check endpoint (public)
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'AI Service is running' });
});

// Protected routes (require authentication)
router.post('/generate', protect, generateAIContent);
router.post('/suggest', protect, getAISuggestions);

export default router;
