/**
 * Utility functions for managing resume data structure and operations
 */

/**
 * Get the initial resume data structure
 * @returns {Object} Initial resume data structure
 */
export const getInitialResumeData = () => ({
  // Personal Information
  fullName: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  summary: '',
  professionalTitle: '',
  socialLinks: {
    linkedin: '',
    github: '',
    twitter: ''
  },
  
  // Work Experience
  experiences: [{
    id: Date.now(),
    jobTitle: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  }],
  
  // Education
  education: [{
    id: Date.now() + 1,
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  }],
  
  // Skills
  skills: [],
  
  // Projects
  projects: [],
  
  // Additional Information
  certifications: [],
  awards: [],
  languages: []
});

/**
 * Load resume data from localStorage
 * @returns {Object} Parsed resume data or null if not found
 */
export const loadResumeFromStorage = () => {
  try {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : null;
  } catch (error) {
    console.error('Error loading resume from storage:', error);
    return null;
  }
};

/**
 * Save resume data to localStorage
 * @param {Object} data - Resume data to save
 */
export const saveResumeToStorage = (data) => {
  try {
    localStorage.setItem('resumeData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving resume to storage:', error);
  }
};

/**
 * Validate a single form field
 * @param {string} field - Field name
 * @param {*} value - Field value
 * @returns {string|null} Error message or null if valid
 */
export const validateField = (field, value) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return 'This field is required';
  }
  
  switch (field) {
    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address';
      }
      break;
      
    case 'phone':
      if (!/^[\d\s+\-()]{10,}$/.test(value)) {
        return 'Please enter a valid phone number';
      }
      break;
      
    case 'website':
    case 'github':
    case 'linkedin':
    case 'twitter':
      try {
        // Basic URL validation
        new URL(value.startsWith('http') ? value : `https://${value}`);
      } catch {
        return 'Please enter a valid URL';
      }
      break;
  }
  
  return null;
};

/**
 * Format date for display
 * @param {string} dateString - Date string in YYYY-MM format
 * @returns {string} Formatted date (e.g., "Jan 2020")
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const [year, month] = dateString.split('-');
  const date = new Date(year, month - 1);
  
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });
};

/**
 * Calculate total experience in years and months
 * @param {Array} experiences - Array of experience objects
 * @returns {string} Formatted experience string (e.g., "2 years 6 months")
 */
export const calculateTotalExperience = (experiences) => {
  if (!experiences?.length) return 'No experience';
  
  let totalMonths = 0;
  
  experiences.forEach(exp => {
    if (!exp.startDate) return;
    
    const startDate = new Date(exp.startDate);
    const endDate = exp.current || !exp.endDate ? new Date() : new Date(exp.endDate);
    
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    
    totalMonths += (years * 12) + months;
  });
  
  if (totalMonths <= 0) return 'Less than a month';
  
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
  
  return parts.join(' ') || 'Less than a month';
};

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

/**
 * Get the current date in YYYY-MM format
 * @returns {string} Current date string
 */
export const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};
