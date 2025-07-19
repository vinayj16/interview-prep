import React, { createContext, useContext, useReducer, useEffect } from 'react';
import aiService from '../services/aiService';
import LoadingSpinner from '../shared/LoadingSpinner/LoadingSpinner';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoadingAuth: true, // NEW: loading state for initial auth check
  theme: 'light',
  stats: {
    problemsSolved: 0,
    mcqsCompleted: 0,
    currentStreak: 0,
    totalPoints: 0,
  },
  bookmarks: new Set(),
  completedTopics: new Set(),
  isOnline: navigator.onLine,
  backendConnected: false,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoadingAuth: false,
      };
    case 'SET_AUTH_LOADING':
      return {
        ...state,
        isLoadingAuth: action.payload,
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'UPDATE_STATS':
      return {
        ...state,
        stats: { ...state.stats, ...action.payload },
      };
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: new Set([...state.bookmarks, action.payload]),
      };
    case 'REMOVE_BOOKMARK':
      const newBookmarks = new Set(state.bookmarks);
      newBookmarks.delete(action.payload);
      return {
        ...state,
        bookmarks: newBookmarks,
      };
    case 'MARK_TOPIC_COMPLETED':
      return {
        ...state,
        completedTopics: new Set([...state.completedTopics, action.payload]),
      };
    case 'REMOVE_TOPIC_COMPLETED':
      const newCompletedTopics = new Set(state.completedTopics);
      newCompletedTopics.delete(action.payload);
      return {
        ...state,
        completedTopics: newCompletedTopics,
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };
    case 'SET_ONLINE_STATUS':
      return {
        ...state,
        isOnline: action.payload,
      };
    case 'SET_BACKEND_CONNECTION':
      return {
        ...state,
        backendConnected: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const initialized = React.useRef(false);

  // Login function
  const login = (userData) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      dispatch({ type: 'SET_USER', payload: userData });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    try {
      localStorage.removeItem('user');
      dispatch({ type: 'SET_USER', payload: null });
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  };

  // Load initial data from localStorage
  useEffect(() => {
    // Prevent double initialization in development with StrictMode
    if (initialized.current) return;
    initialized.current = true;

    const initializeAuth = async () => {
      try {
        // Set loading state
    dispatch({ type: 'SET_AUTH_LOADING', payload: true });
        
        // Load all data from localStorage
        const [
          savedUser,
          savedTheme,
          savedStats,
          savedBookmarks,
          savedTopics
        ] = await Promise.all([
          localStorage.getItem('user'),
          localStorage.getItem('theme'),
          localStorage.getItem('userStats'),
          localStorage.getItem('bookmarkedProblems'),
          localStorage.getItem('completedTopics')
        ]);

        // Process user authentication
        let user = null;
    if (savedUser) {
          try {
            user = JSON.parse(savedUser);
            // Simple token check - in a real app, validate with backend
            if (!user || !user.token) {
              localStorage.removeItem('user');
              user = null;
            }
          } catch (e) {
            console.error('Error parsing user data:', e);
            localStorage.removeItem('user');
            user = null;
          }
        }
        
        // Set user state
        dispatch({ 
          type: 'SET_USER', 
          payload: user 
        });

        // Load theme if available
    if (savedTheme) {
          try {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
            document.documentElement.setAttribute('data-theme', savedTheme);
          } catch (e) {
            console.error('Error setting theme:', e);
          }
    }

        // Load stats if available
    if (savedStats) {
          try {
            const stats = JSON.parse(savedStats);
            dispatch({ type: 'UPDATE_STATS', payload: stats });
          } catch (e) {
            console.error('Error parsing stats:', e);
          }
        }

        // Load bookmarks if available
    if (savedBookmarks) {
          try {
      const bookmarks = JSON.parse(savedBookmarks);
            if (Array.isArray(bookmarks)) {
      bookmarks.forEach(bookmark => {
        dispatch({ type: 'ADD_BOOKMARK', payload: bookmark });
      });
            }
          } catch (e) {
            console.error('Error parsing bookmarks:', e);
          }
    }

        // Load completed topics if available
    if (savedTopics) {
          try {
      const topics = JSON.parse(savedTopics);
            if (Array.isArray(topics)) {
      topics.forEach(topic => {
        dispatch({ type: 'MARK_TOPIC_COMPLETED', payload: topic });
      });
    }
          } catch (e) {
            console.error('Error parsing completed topics:', e);
          }
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        // Always ensure loading is set to false
    dispatch({ type: 'SET_AUTH_LOADING', payload: false });
      }
    };

    // Initialize auth
    initializeAuth();
    
    // Cleanup function
    return () => {
      // Cleanup if needed
    };
  }, [dispatch]);

  // Check backend connection
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        await aiService.healthCheck();
        dispatch({ type: 'SET_BACKEND_CONNECTION', payload: true });
      } catch (error) {
        dispatch({ type: 'SET_BACKEND_CONNECTION', payload: false });
      }
    };

    checkBackendConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkBackendConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: true });
    const handleOffline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: false });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync data to localStorage
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(state.stats));
  }, [state.stats]);

  useEffect(() => {
    localStorage.setItem('bookmarkedProblems', JSON.stringify([...state.bookmarks]));
  }, [state.bookmarks]);

  useEffect(() => {
    localStorage.setItem('completedTopics', JSON.stringify([...state.completedTopics]));
  }, [state.completedTopics]);

  // Context value
  const contextValue = React.useMemo(() => ({
    // State
    state,
    
    // Auth actions
      login,
      logout,
    
    // Other actions
    setTheme: (theme) => {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      dispatch({ type: 'SET_THEME', payload: theme });
    },
    
    updateStats: (stats) => {
      const newStats = { ...state.stats, ...stats };
      localStorage.setItem('userStats', JSON.stringify(newStats));
      dispatch({ type: 'UPDATE_STATS', payload: stats });
    },
    
    addBookmark: (problemId) => {
      const newBookmarks = new Set([...state.bookmarks, problemId]);
      localStorage.setItem('bookmarkedProblems', JSON.stringify([...newBookmarks]));
      dispatch({ type: 'ADD_BOOKMARK', payload: problemId });
    },
    
    removeBookmark: (problemId) => {
      const newBookmarks = new Set(state.bookmarks);
      newBookmarks.delete(problemId);
      localStorage.setItem('bookmarkedProblems', JSON.stringify([...newBookmarks]));
      dispatch({ type: 'REMOVE_BOOKMARK', payload: problemId });
    },
    
    markTopicCompleted: (topicId) => {
      const newTopics = new Set([...state.completedTopics, topicId]);
      localStorage.setItem('completedTopics', JSON.stringify([...newTopics]));
      dispatch({ type: 'MARK_TOPIC_COMPLETED', payload: topicId });
    },
    
    removeTopicCompleted: (topicId) => {
      const newTopics = new Set(state.completedTopics);
      newTopics.delete(topicId);
      localStorage.setItem('completedTopics', JSON.stringify([...newTopics]));
      dispatch({ type: 'REMOVE_TOPIC_COMPLETED', payload: topicId });
    },
    
    updatePreferences: (preferences) => {
      dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
    },
    
    // System actions
    setOnlineStatus: (isOnline) => dispatch({ type: 'SET_ONLINE_STATUS', payload: isOnline }),
    setBackendConnection: (isConnected) => dispatch({ type: 'SET_BACKEND_CONNECTION', payload: isConnected })
  }), [state]);

  // Log state changes in development (removed for cleaner output)

  return (
    <AppContext.Provider value={contextValue}>
      {!state.isLoadingAuth ? children : (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <LoadingSpinner size="lg" />
          <p>Loading application...</p>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export { AppContext };
export default AppProvider;