import apiService from '../apiService';
import { getAuthToken, setAuthToken, clearAuthToken } from '../../utils/auth';

// Mock the auth utility
jest.mock('../../utils/auth', () => ({
  getAuthToken: jest.fn(),
  setAuthToken: jest.fn(),
  clearAuthToken: jest.fn()
}));

describe('ApiService', () => {
  const originalFetch = global.fetch;
  const mockResponse = (status, data) => 
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  describe('request', () => {
    it('should make a successful API request', async () => {
      const mockData = { success: true, data: 'test' };
      global.fetch.mockResolvedValueOnce(mockResponse(200, mockData));
      
      const result = await apiService.request('/test');
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Object)
        })
      );
      expect(result).toEqual(mockData);
    });

    it('should include auth token in request headers', async () => {
      const mockToken = 'test-token';
      getAuthToken.mockReturnValueOnce(mockToken);
      global.fetch.mockResolvedValueOnce(mockResponse(200, {}));
      
      await apiService.request('/protected');
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': `Bearer ${mockToken}`
          })
        })
      );
    });

    it('should handle 401 Unauthorized with token refresh', async () => {
      // First request fails with 401
      global.fetch.mockResolvedValueOnce(mockResponse(401, { error: 'Unauthorized' }));
      
      // Mock refresh token response
      const newToken = 'new-token';
      const refreshToken = 'refresh-token';
      
      // Mock refresh token call
      global.fetch.mockResolvedValueOnce(mockResponse(200, {
        token: newToken,
        refreshToken: 'new-refresh-token'
      }));
      
      // Mock the retry request
      const successResponse = { success: true };
      global.fetch.mockResolvedValueOnce(mockResponse(200, successResponse));
      
      // Set up mock refresh token
      getAuthToken
        .mockReturnValueOnce('expired-token') // First call for original request
        .mockReturnValueOnce(refreshToken)    // For refresh token check
        .mockReturnValueOnce(newToken);       // For retry request
      
      const result = await apiService.request('/protected');
      
      // Should have made 3 calls: original, refresh, retry
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(setAuthToken).toHaveBeenCalledWith(newToken, expect.any(String));
      expect(result).toEqual(successResponse);
    });

    it('should handle 401 Unauthorized when refresh fails', async () => {
      // First request fails with 401
      global.fetch.mockResolvedValueOnce(mockResponse(401, { error: 'Unauthorized' }));
      
      // Mock refresh token call to fail
      global.fetch.mockResolvedValueOnce(mockResponse(401, { error: 'Invalid refresh token' }));
      
      // Set up mocks
      getAuthToken
        .mockReturnValueOnce('expired-token')
        .mockReturnValueOnce('invalid-refresh-token');
      
      // Mock window.location.href
      delete window.location;
      window.location = { href: '' };
      
      await expect(apiService.request('/protected')).rejects.toThrow();
      
      expect(clearAuthToken).toHaveBeenCalled();
      expect(window.location.href).toContain('/login?session_expired=1');
    });
  });

  describe('authentication methods', () => {
    it('should handle login', async () => {
      const credentials = { email: 'test@example.com', password: 'password' };
      const responseData = { token: 'test-token', user: { id: 1, email: credentials.email } };
      
      global.fetch.mockResolvedValueOnce(mockResponse(200, responseData));
      
      const result = await apiService.login(credentials.email, credentials.password);
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/login'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(credentials)
        })
      );
      expect(result).toEqual(responseData);
    });

    it('should handle logout', async () => {
      global.fetch.mockResolvedValueOnce(mockResponse(200, { success: true }));
      
      await apiService.logout();
      
      expect(clearAuthToken).toHaveBeenCalled();
    });
  });
});
