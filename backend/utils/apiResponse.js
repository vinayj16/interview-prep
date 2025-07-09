/**
 * Success response handler
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {*} data - Data to send in the response
 * @param {string} message - Success message
 */
const successResponse = (res, statusCode = 200, data = null, message = 'Success') => {
  const response = {
    success: true,
    message,
    ...(data !== null && { data })
  };
  
  return res.status(statusCode).json(response);
};

/**
 * Error response handler
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {*} errors - Additional error details or message
 * @param {string} message - Error message
 */
const errorResponse = (res, statusCode = 500, errors = null, message = 'An error occurred') => {
  // Handle case where errors is actually the message
  if (typeof errors === 'string' && !message) {
    message = errors;
    errors = null;
  }
  const response = {
    success: false,
    message,
    ...(errors && { errors })
  };
  
  return res.status(statusCode).json(response);
};

/**
 * Validation error response handler
 * @param {Object} res - Express response object
 * @param {Array} errors - Array of validation errors
 */
const validationError = (res, errors) => {
  return errorResponse(
    res,
    'Validation Error',
    400,
    Array.isArray(errors) ? errors : [errors]
  );
};

export { successResponse, errorResponse, validationError };
