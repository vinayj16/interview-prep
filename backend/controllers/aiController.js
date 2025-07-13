import { generateResume } from '../services/geminiService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const generateAIContent = async (req, res) => {
  try {
    const { prompt, type = 'general' } = req.body;
    
    if (!prompt) {
      return res.status(400).json(
        errorResponse('Prompt is required', 400)
      );
    }

    let result;
    switch (type) {
      case 'resume':
        result = await generateResume(prompt);
        break;
      // Add more cases for different types of AI generations
      default:
        result = await generateResume(prompt); // Default to resume generation
    }

    return res.status(200).json(
      successResponse('AI content generated successfully', { result })
    );
  } catch (error) {
    console.error('AI generation error:', error);
    return res.status(500).json(
      errorResponse('Failed to generate AI content', 500, error.message)
    );
  }
};

export const getAISuggestions = async (req, res) => {
  try {
    const { context, type = 'general' } = req.body;
    
    if (!context) {
      return res.status(400).json(
        errorResponse('Context is required', 400)
      );
    }

    // Add your AI suggestion logic here
    const suggestions = {
      type,
      suggestions: [],
      timestamp: new Date().toISOString()
    };

    return res.status(200).json(
      successResponse('AI suggestions generated successfully', { suggestions })
    );
  } catch (error) {
    console.error('AI suggestions error:', error);
    return res.status(500).json(
      errorResponse('Failed to generate AI suggestions', 500, error.message)
    );
  }
};
