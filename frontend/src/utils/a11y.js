/**
 * Accessibility utilities for the application
 */

/**
 * Generates a unique ID for form elements to associate labels with inputs
 * @param {string} prefix - Prefix for the ID
 * @returns {string} A unique ID
 */
export const generateA11yId = (prefix = 'a11y') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Returns ARIA attributes for form validation
 * @param {Object} errors - Object containing error messages
 * @param {string} name - Field name
 * @returns {Object} ARIA attributes object
 */
export const getAriaAttrs = (errors, name) => ({
  'aria-invalid': Boolean(errors?.[name]),
  'aria-describedby': errors?.[name] ? `${name}-error` : undefined,
  'aria-required': true
});

/**
 * Returns ARIA live region attributes based on error state
 * @param {boolean} hasError - Whether there's an error
 * @returns {Object} ARIA live region attributes
 */
export const getAriaLiveAttrs = (hasError) => ({
  role: 'alert',
  'aria-live': hasError ? 'assertive' : 'off',
  'aria-atomic': 'true'
});

/**
 * Focuses the first invalid form field
 * @param {Object} errors - Object containing error messages
 */
export const focusFirstInvalidField = (errors) => {
  if (!errors) return;
  
  const firstErrorField = Object.keys(errors)[0];
  if (firstErrorField) {
    const element = document.querySelector(`[name="${firstErrorField}"]`);
    if (element) {
      element.focus();
      
      // Scroll to the element with some offset from the top
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
};

/**
 * Returns keyboard navigation props for interactive elements
 * @param {Function} onClick - Click handler
 * @param {string} role - ARIA role
 * @returns {Object} Keyboard navigation props
 */
export const getKeyboardNavigationProps = (onClick, role = 'button') => ({
  role,
  tabIndex: 0,
  onClick,
  onKeyDown: (e) => {
    // Handle both Space and Enter keys
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
      e.preventDefault();
      onClick(e);
    }
  }
});

/**
 * Returns ARIA attributes for a loading state
 * @param {boolean} isLoading - Whether the component is in a loading state
 * @returns {Object} Loading state ARIA attributes
 */
export const getLoadingAttrs = (isLoading) => ({
  'aria-busy': isLoading,
  'aria-live': isLoading ? 'polite' : 'off'
});

/**
 * Returns ARIA attributes for a collapsible section
 * @param {string} id - Unique ID for the section
 * @param {boolean} isExpanded - Whether the section is expanded
 * @returns {Object} ARIA attributes for collapsible section
 */
export const getCollapsibleSectionAttrs = (id, isExpanded) => ({
  'aria-expanded': isExpanded,
  'aria-controls': id,
  id: `${id}-button`
});

/**
 * Returns ARIA attributes for a modal dialog
 * @param {string} id - Unique ID for the modal
 * @param {boolean} isOpen - Whether the modal is open
 * @returns {Object} ARIA attributes for modal dialog
 */
export const getModalAttrs = (id, isOpen) => ({
  role: 'dialog',
  'aria-modal': 'true',
  'aria-labelledby': `${id}-title`,
  'aria-describedby': `${id}-description`,
  'aria-hidden': !isOpen,
  tabIndex: isOpen ? 0 : -1
});

export default {
  generateA11yId,
  getAriaAttrs,
  getAriaLiveAttrs,
  focusFirstInvalidField,
  getKeyboardNavigationProps,
  getLoadingAttrs,
  getCollapsibleSectionAttrs,
  getModalAttrs
};
