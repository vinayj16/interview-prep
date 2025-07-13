/**
 * Authentication Utility
 * 
 * Provides functions for managing authentication tokens in localStorage.
 * Uses the environment configuration for token key names.
 */

import env from './env';

/**
 * Get the authentication token from localStorage
 * @param {string} [tokenKey] - Optional custom token key (defaults to env.auth.tokenKey)
 * @returns {string|null} The authentication token or null if not found
 */
export const getAuthToken = (tokenKey = env.auth.tokenKey) => {
  try {
    return localStorage.getItem(tokenKey);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Set the authentication token in localStorage
 * @param {string} token - The authentication token to store
 * @param {string} [tokenKey] - Optional custom token key (defaults to env.auth.tokenKey)
 */
export const setAuthToken = (token, tokenKey = env.auth.tokenKey) => {
  try {
    if (token) {
      localStorage.setItem(tokenKey, token);
    } else {
      localStorage.removeItem(tokenKey);
    }
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

/**
 * Clear the authentication token from localStorage
 * @param {string} [tokenKey] - Optional custom token key (defaults to env.auth.tokenKey)
 */
export const clearAuthToken = (tokenKey = env.auth.tokenKey) => {
  try {
    localStorage.removeItem(tokenKey);
  } catch (error) {
    console.error('Error clearing auth token:', error);
  }
};

/**
 * Check if the user is authenticated
 * @param {string} [tokenKey] - Optional custom token key (defaults to env.auth.tokenKey)
 * @returns {boolean} True if authenticated, false otherwise
 */
export const isAuthenticated = (tokenKey = env.auth.tokenKey) => {
  return !!getAuthToken(tokenKey);
};

/**
 * Get the authentication headers with the token
 * @param {string} [tokenKey] - Optional custom token key (defaults to env.auth.tokenKey)
 * @returns {Object} Headers object with Authorization header if token exists
 */
export const getAuthHeaders = (tokenKey = env.auth.tokenKey) => {
  const token = getAuthToken(tokenKey);
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

/**
 * Clear all authentication data (tokens, user data, etc.)
 */
export const clearAuthData = () => {
  // Clear all auth-related items
  clearAuthToken(env.auth.tokenKey);
  
  // Clear refresh token if it exists
  if (env.auth.refreshTokenKey) {
    clearAuthToken(env.auth.refreshTokenKey);
  }
  
  // Clear any other auth-related data
  try {
    localStorage.removeItem('user');
    localStorage.removeItem('authState');
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

export default {
  getAuthToken,
  setAuthToken,
  clearAuthToken,
  isAuthenticated,
  getAuthHeaders,
  clearAuthData
};
