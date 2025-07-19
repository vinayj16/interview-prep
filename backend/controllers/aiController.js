import { generateResume } from '../services/geminiService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const generateAIContent = async (req, res) => {
  try {
    const { prompt, type = 'general' } = req.body;
    
    if (!prompt) {
      return errorResponse(res, 400, 'Prompt is required');
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

    return successResponse(res, 200, { result }, 'AI content generated successfully');
  } catch (error) {
    console.error('AI generation error:', error);
    return errorResponse(res, 500, error.message, 'Failed to generate AI content');
  }
};

export const getAISuggestions = async (req, res) => {
  try {
    const { context, type = 'general' } = req.body;
    
    if (!context) {
      return errorResponse(res, 400, 'Context is required');
    }

    // Add your AI suggestion logic here
    const suggestions = {
      type,
      suggestions: [],
      timestamp: new Date().toISOString()
    };

    return successResponse(res, 200, { suggestions }, 'AI suggestions generated successfully');
  } catch (error) {
    console.error('AI suggestions error:', error);
    return errorResponse(res, 500, error.message, 'Failed to generate AI suggestions');
  }
};
