import {
  getInitialResumeData,
  validateField,
  formatDate,
  calculateTotalExperience,
  generateId,
  getCurrentDate
} from '../resumeUtils';

describe('resumeUtils', () => {
  describe('getInitialResumeData', () => {
    it('returns the initial resume data structure', () => {
      const initialData = getInitialResumeData();
      
      expect(initialData).toHaveProperty('fullName', '');
      expect(initialData).toHaveProperty('email', '');
      expect(initialData).toHaveProperty('experiences');
      expect(initialData).toHaveProperty('education');
      expect(initialData).toHaveProperty('skills', []);
      expect(initialData.experiences).toHaveLength(1);
      expect(initialData.education).toHaveLength(1);
    });
  });

  describe('validateField', () => {
    it('validates required fields', () => {
      expect(validateField('fullName', '')).toBe('This field is required');
      expect(validateField('fullName', '   ')).toBe('This field is required');
      expect(validateField('fullName', 'John')).toBeNull();
    });

    it('validates email format', () => {
      expect(validateField('email', 'invalid-email')).toBe('Please enter a valid email address');
      expect(validateField('email', 'test@example.com')).toBeNull();
    });

    it('validates phone number format', () => {
      expect(validateField('phone', '123')).toBe('Please enter a valid phone number');
      expect(validateField('phone', '123-456-7890')).toBeNull();
      expect(validateField('phone', '+1 (123) 456-7890')).toBeNull();
    });

    it('validates URL format', () => {
      expect(validateField('website', 'invalid-url')).toBe('Please enter a valid URL');
      expect(validateField('website', 'https://example.com')).toBeNull();
      expect(validateField('github', 'github.com/username')).toBeNull();
    });
  });

  describe('formatDate', () => {
    it('formats date string to readable format', () => {
      expect(formatDate('2023-01')).toBe('Jan 2023');
      expect(formatDate('2020-12')).toBe('Dec 2020');
      expect(formatDate('')).toBe('');
    });
  });

  describe('calculateTotalExperience', () => {
    it('calculates total experience from experiences array', () => {
      const experiences = [
        {
          startDate: '2020-01',
          endDate: '2022-01',
          current: false
        },
        {
          startDate: '2022-01',
          endDate: '',
          current: true
        }
      ];
      
      // Mock current date to be 2023-01
      const originalDate = global.Date;
      global.Date = class extends Date {
        constructor() {
          super('2023-01-01T00:00:00Z');
        }
      };
      
      expect(calculateTotalExperience(experiences)).toBe('3 years');
      
      // Restore original Date
      global.Date = originalDate;
    });

    it('returns "No experience" for empty array', () => {
      expect(calculateTotalExperience([])).toBe('No experience');
    });

    it('handles months correctly', () => {
      const experiences = [
        {
          startDate: '2022-06',
          endDate: '2022-12',
          current: false
        }
      ];
      
      expect(calculateTotalExperience(experiences)).toBe('6 months');
    });
  });

  describe('generateId', () => {
    it('generates a string ID', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id).toMatch(/^[a-z0-9]+$/);
    });

    it('generates unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('getCurrentDate', () => {
    it('returns current date in YYYY-MM format', () => {
      // Mock current date
      const originalDate = global.Date;
      const mockDate = new Date('2023-01-15T00:00:00Z');
      global.Date = class extends Date {
        constructor() {
          super();
          return mockDate;
        }
      };
      
      expect(getCurrentDate()).toBe('2023-01');
      
      // Restore original Date
      global.Date = originalDate;
    });
  });
});
