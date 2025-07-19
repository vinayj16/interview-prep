import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Simplified version of AppContext
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoadingAuth: false,
  theme: 'light'
};

const AppContext = createContext();

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
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Simulate auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        dispatch({ type: 'SET_AUTH_LOADING', payload: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsInitialized(true);
        dispatch({ type: 'SET_AUTH_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch({ type: 'SET_USER', payload: userData });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'SET_USER', payload: null });
    return true;
  };

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        setTheme,
      }}
    >
      {isInitialized ? children : <div>Loading initial data...</div>}
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

// Test components
const Home = () => {
  const { user, login, logout, theme } = useApp();
  const [currentTheme, setCurrentTheme] = useState(theme);
  
  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
  };

  return (
    <div style={{
      ...styles.page,
      backgroundColor: currentTheme === 'dark' ? '#333' : '#fff',
      color: currentTheme === 'dark' ? '#fff' : '#333'
    }}>
      <h1>Home Page</h1>
      <p>Current theme: {currentTheme}</p>
      <button onClick={toggleTheme} style={styles.button}>
        Toggle Theme
      </button>
      
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout} style={styles.button}>Logout</button>
        </div>
      ) : (
        <button 
          onClick={() => login({ name: 'Test User', email: 'test@example.com' })} 
          style={styles.button}
        >
          Login as Test User
        </button>
      )}
    </div>
  );
};

const About = () => {
  const { user, theme } = useApp();
  return (
    <div style={{
      ...styles.page,
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333'
    }}>
      <h1>About Page</h1>
      <p>This is the about page</p>
      {user && <p>Logged in as: {user.name}</p>}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    transition: 'all 0.3s ease'
  },
  nav: {
    backgroundColor: '#333',
    padding: '10px 20px',
    marginBottom: '20px',
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#555'
    }
  },
  page: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    margin: '10px',
    minHeight: '200px'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '5px',
    '&:hover': {
      backgroundColor: '#45a049'
    }
  }
};

function TestRealContextApp() {
  return (
    <AppProvider>
      <Router>
        <div style={{
          ...styles.container,
          backgroundColor: '#f5f5f5'
        }}>
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/about" style={styles.navLink}>About</Link>
            <div style={{ marginLeft: 'auto' }}>
              <Link to="/login" style={styles.navLink}>Login</Link>
            </div>
          </nav>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default TestRealContextApp;
