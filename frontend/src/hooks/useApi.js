import { useState, useCallback } from 'react';
import { useToast } from '../components/Toast/Toast';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const execute = useCallback(async (apiCall, options = {}) => {
    const { 
      showSuccessToast = false, 
      successMessage = 'Operation completed successfully',
      showErrorToast = true,
      onSuccess,
      onError 
    } = options;

    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      
      if (showSuccessToast) {
        showToast(successMessage, 'success');
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      
      if (showErrorToast) {
        showToast(errorMessage, 'error');
      }
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return { loading, error, execute };
};