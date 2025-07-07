import React, { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from '../services/apiService';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
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
    case 'COMPLETE_TOPIC':
      return {
        ...state,
        completedTopics: new Set([...state.completedTopics, action.payload]),
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

  // Load initial data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedTheme = localStorage.getItem('theme');
    const savedStats = localStorage.getItem('userStats');
    const savedBookmarks = localStorage.getItem('bookmarkedProblems');
    const savedTopics = localStorage.getItem('completedTopics');

    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
    }

    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }

    if (savedStats) {
      dispatch({ type: 'UPDATE_STATS', payload: JSON.parse(savedStats) });
    }

    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks);
      bookmarks.forEach(bookmark => {
        dispatch({ type: 'ADD_BOOKMARK', payload: bookmark });
      });
    }

    if (savedTopics) {
      const topics = JSON.parse(savedTopics);
      topics.forEach(topic => {
        dispatch({ type: 'COMPLETE_TOPIC', payload: topic });
      });
    }
  }, []);

  // Check backend connection
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        await apiService.healthCheck();
        dispatch({ type: 'SET_BACKEND_CONNECTION', payload: true });
      } catch (error) {
        dispatch({ type: 'SET_BACKEND_CONNECTION', payload: false });
        console.warn('Backend not available, using offline mode');
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

  const value = {
    state,
    dispatch,
    actions: {
      setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
      setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
      updateStats: (stats) => dispatch({ type: 'UPDATE_STATS', payload: stats }),
      addBookmark: (id) => dispatch({ type: 'ADD_BOOKMARK', payload: id }),
      removeBookmark: (id) => dispatch({ type: 'REMOVE_BOOKMARK', payload: id }),
      completeTopic: (id) => dispatch({ type: 'COMPLETE_TOPIC', payload: id }),
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};