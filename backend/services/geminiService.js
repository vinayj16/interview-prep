import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config/config.js';

class GeminiService {
  constructor() {
    const apiKey = process.env.GOOGLE_AI_API_KEY || config?.googleAI?.apiKey;
    if (!apiKey) {
      throw new Error('GOOGLE_AI_API_KEY is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: config?.googleAI?.model || 'gemini-pro' 
    });
  }

  async generateResume(userData) {
    try {
      const prompt = `
        Create a professional ATS-friendly resume based on the following information:
        
        Personal Information:
        - Name: ${userData.personalInfo?.name || 'N/A'}
        - Email: ${userData.personalInfo?.email || 'N/A'}
        - Phone: ${userData.personalInfo?.phone || 'N/A'}
        - Location: ${userData.personalInfo?.location || 'N/A'}
        - LinkedIn: ${userData.personalInfo?.linkedin || 'N/A'}
        - GitHub: ${userData.personalInfo?.github || 'N/A'}
        
        Target Role: ${userData.targetRole || 'Software Developer'}
        Target Company: ${userData.targetCompany || 'Tech Company'}
        
        Experience: ${JSON.stringify(userData.experience || [])}
        Education: ${JSON.stringify(userData.education || [])}
        Skills: ${JSON.stringify(userData.skills || [])}
        Projects: ${JSON.stringify(userData.projects || [])}
        
        Please generate:
        1. A compelling professional summary (2-3 sentences)
        2. Optimized experience descriptions with quantified achievements
        3. Relevant skills organized by category
        4. Project descriptions highlighting technical impact
        
        Format the response as a JSON object with the following structure:
        {
          "summary": "professional summary text",
          "experience": [{"position": "", "company": "", "duration": "", "responsibilities": []}],
          "skills": ["skill1", "skill2"],
          "projects": [{"name": "", "description": "", "technologies": []}],
          "education": [{"degree": "", "institution": "", "year": ""}]
        }
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON from the response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const resumeData = JSON.parse(jsonMatch[0]);
          return {
            success: true,
            data: {
              ...userData,
              ...resumeData
            }
          };
        }
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
      }
      
      // Fallback: return structured data based on text response
      return {
        success: true,
        data: {
          ...userData,
          summary: this.extractSummary(text),
          aiGenerated: true,
          rawResponse: text
        }
      };
    } catch (error) {
      console.error('Error generating resume:', error);
      throw new Error('Failed to generate resume with AI');
    }
  }

  async generateInterviewQuestions(company, role) {
    try {
      const prompt = `
        Generate 10 technical interview questions for a ${role} position at ${company}.
        Include a mix of:
        - Technical coding problems
        - System design questions
        - Behavioral questions
        - Company-specific questions
        
        Format as JSON array with objects containing: question, type, difficulty, and sample_answer.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const questions = JSON.parse(jsonMatch[0]);
          return { success: true, data: questions };
        }
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
      }
      
      return {
        success: true,
        data: this.parseQuestionsFromText(text)
      };
    } catch (error) {
      console.error('Error generating interview questions:', error);
      throw new Error('Failed to generate interview questions');
    }
  }

  async analyzeCode(code, language, problemDescription) {
    try {
      const prompt = `
        Analyze the following ${language} code for the problem: "${problemDescription}"
        
        Code:
        \`\`\`${language}
        ${code}
        \`\`\`
        
        Provide analysis including:
        1. Time complexity
        2. Space complexity
        3. Code quality assessment
        4. Suggestions for improvement
        5. Potential bugs or edge cases
        
        Format as JSON with: timeComplexity, spaceComplexity, codeQuality, suggestions, and improvements arrays.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const analysis = JSON.parse(jsonMatch[0]);
          return { success: true, data: analysis };
        }
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
      }
      
      return {
        success: true,
        data: {
          timeComplexity: "Analysis provided in text",
          spaceComplexity: "Analysis provided in text",
          codeQuality: "Good",
          suggestions: ["Review the detailed analysis below"],
          rawAnalysis: text
        }
      };
    } catch (error) {
      console.error('Error analyzing code:', error);
      throw new Error('Failed to analyze code');
    }
  }

  async generateHints(problemDescription, currentCode) {
    try {
      const prompt = `
        Provide helpful hints for solving this problem: "${problemDescription}"
        
        Current code attempt:
        \`\`\`
        ${currentCode || 'No code provided yet'}
        \`\`\`
        
        Provide 3-5 progressive hints that guide toward the solution without giving it away completely.
        Format as JSON array of hint objects with: level (1-5), hint, and category.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const hints = JSON.parse(jsonMatch[0]);
          return { success: true, data: hints };
        }
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
      }
      
      return {
        success: true,
        data: this.parseHintsFromText(text)
      };
    } catch (error) {
      console.error('Error generating hints:', error);
      throw new Error('Failed to generate hints');
    }
  }

  // Helper methods for parsing text responses
  extractSummary(text) {
    const summaryMatch = text.match(/summary[:\s]*(.*?)(?:\n\n|\n[A-Z]|$)/i);
    return summaryMatch ? summaryMatch[1].trim() : 'AI-generated professional summary';
  }

  parseQuestionsFromText(text) {
    const questions = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    lines.forEach((line, index) => {
      if (line.match(/^\d+\./) || line.includes('?')) {
        questions.push({
          question: line.replace(/^\d+\.\s*/, ''),
          type: 'technical',
          difficulty: 'medium',
          sample_answer: 'Consider the problem requirements and constraints.'
        });
      }
    });
    
    return questions.slice(0, 10); // Limit to 10 questions
  }

  parseHintsFromText(text) {
    const hints = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    lines.forEach((line, index) => {
      if (line.match(/^\d+\./) || line.toLowerCase().includes('hint')) {
        hints.push({
          level: Math.min(index + 1, 5),
          hint: line.replace(/^\d+\.\s*/, '').replace(/hint[:\s]*/i, ''),
          category: 'general'
        });
      }
    });
    
    return hints.slice(0, 5); // Limit to 5 hints
  }
}

const geminiService = new GeminiService();
export default geminiService;
