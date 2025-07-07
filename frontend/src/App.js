import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress,
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Coding from './components/Coding';
import MCQs from './components/MCQs';
import Resume from './components/Resume';
import Roadmap from './components/Roadmap';
import Reviews from './components/Reviews';
import Profile from './components/Profile';
import About from './components/About';
import Contact from './components/Contact';
import Services from './components/Services';
import FaceToFaceInterview from './components/FaceToFaceInterview';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { ToastProvider, useToast } from './components/Toast/Toast';
import './App.css';

// Create emotion cache
const cache = createCache({
  key: 'css',
  prepend: true,
});

// Create theme instance with default values
const getTheme = (mode = 'light') => {
  const isLight = mode === 'light';
  const primaryColor = isLight ? '#1976d2' : '#90caf9';
  const secondaryColor = isLight ? '#dc004e' : '#f48fb1';
  
  try {
    const theme = createTheme({
      palette: {
        mode,
        primary: {
          main: primaryColor,
          light: isLight ? '#63a4ff' : '#e3f2fd',
          dark: isLight ? '#004ba0' : '#42a5f5',
          contrastText: '#ffffff',
        },
        secondary: {
          main: secondaryColor,
          light: isLight ? '#ff5c8d' : '#fce4ec',
          dark: isLight ? '#9a0036' : '#c2185b',
          contrastText: '#ffffff',
        },
        error: {
          main: isLight ? '#d32f2f' : '#f44336',
          light: '#ef5350',
          dark: '#c62828',
          contrastText: '#ffffff',
        },
        warning: {
          main: isLight ? '#ed6c02' : '#ff9800',
          light: '#ff9800',
          dark: '#e65100',
          contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        info: {
          main: isLight ? '#0288d1' : '#29b6f6',
          light: '#03a9f4',
          dark: '#01579b',
          contrastText: '#ffffff',
        },
        success: {
          main: isLight ? '#2e7d32' : '#66bb6a',
          light: '#4caf50',
          dark: '#1b5e20',
          contrastText: '#ffffff',
        },
        background: {
          default: isLight ? '#f5f5f5' : '#121212',
          paper: isLight ? '#ffffff' : '#1e1e1e',
        },
        text: {
          primary: isLight ? 'rgba(0, 0, 0, 0.87)' : '#ffffff',
          secondary: isLight ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
          disabled: isLight ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.5)',
          hint: isLight ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.5)',
        },
        divider: isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
        action: {
          active: isLight ? 'rgba(0, 0, 0, 0.54)' : '#ffffff',
          hover: isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
          hoverOpacity: 0.04,
          selected: isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.16)',
          selectedOpacity: 0.08,
          disabled: isLight ? 'rgba(0, 0, 0, 0.26)' : 'rgba(255, 255, 255, 0.3)',
          disabledBackground: isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
          disabledOpacity: 0.38,
          focus: isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
          focusOpacity: 0.12,
          activatedOpacity: 0.12,
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: { 
          fontWeight: 500,
          fontSize: '2.5rem',
          lineHeight: 1.2,
          letterSpacing: '-0.01562em',
        },
        h2: { 
          fontWeight: 500,
          fontSize: '2rem',
          lineHeight: 1.2,
          letterSpacing: '-0.00833em',
        },
        h3: { 
          fontWeight: 500,
          fontSize: '1.75rem',
          lineHeight: 1.2,
          letterSpacing: '0em',
        },
        h4: { 
          fontWeight: 500,
          fontSize: '1.5rem',
          lineHeight: 1.2,
          letterSpacing: '0.00735em',
        },
        h5: { 
          fontWeight: 500,
          fontSize: '1.25rem',
          lineHeight: 1.2,
          letterSpacing: '0em',
        },
        h6: { 
          fontWeight: 500,
          fontSize: '1rem',
          lineHeight: 1.2,
          letterSpacing: '0.0075em',
        },
        button: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
      shape: {
        borderRadius: 4,
      },
      spacing: 8,
      transitions: {
        easing: {
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
          easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
          sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        },
        duration: {
          shortest: 150,
          shorter: 200,
          short: 250,
          standard: 300,
          complex: 375,
          enteringScreen: 225,
          leavingScreen: 195,
        },
      },
      components: {
        MuiButton: {
          defaultProps: {
            variant: 'contained',
            color: 'primary',
            disableElevation: true,
          },
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: 4,
              padding: '8px 16px',
            },
          },
        },
        MuiAppBar: {
          defaultProps: {
            elevation: 0,
            color: 'default',
          },
          styleOverrides: {
            root: {
              backgroundColor: isLight ? primaryColor : '#1e1e1e',
              color: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
            },
          },
        },
        MuiCard: {
          defaultProps: {
            elevation: 0,
          },
          styleOverrides: {
            root: {
              borderRadius: 8,
              boxShadow: isLight 
                ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
                : '0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)',
            },
          },
        },
        MuiListItemButton: {
          styleOverrides: {
            root: {
              borderRadius: 4,
              margin: '4px 8px',
              '&.Mui-selected': {
                backgroundColor: isLight 
                  ? 'rgba(25, 118, 210, 0.08)' 
                  : 'rgba(144, 202, 249, 0.08)',
                '&:hover': {
                  backgroundColor: isLight 
                    ? 'rgba(25, 118, 210, 0.12)'
                    : 'rgba(144, 202, 249, 0.12)',
                },
              },
            },
          },
        },
      },
    });
    
    console.log('Theme created successfully:', theme);
    return theme;
  } catch (error) {
    console.error('Error creating theme:', error);
    // Return a safe default theme if creation fails
    return createTheme({
      palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
      },
    });
  }
}

// Protected Route component
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Error Boundary component for catching rendering errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="error" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {this.state.error?.toString()}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Reload Page
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

// AppContent component with theme context and error boundary
const AppContent = ({ theme, setTheme, toggleTheme }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const muiTheme = useTheme();
  const sidebarWidth = 280;
  
  // Ensure theme is always defined
  const themeMode = theme || 'light';
  
  // Safely access theme breakpoints
  const isMobile = useMediaQuery(
    muiTheme?.breakpoints?.down?.('sm') 
      ? muiTheme.breakpoints.down('sm') 
      : '(max-width: 900px)'
  );
  
  // Handle drawer close with animation
  const handleDrawerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
      setIsClosing(false);
    }, 250); // Match this with the transition duration in the Sidebar component
  };
  
  // Toggle drawer with animation
  const toggleDrawer = () => {
    if (mobileOpen) {
      handleDrawerClose();
    } else {
      setMobileOpen(true);
    }
  };
  
  // Close drawer when clicking on a menu item on mobile
  const handleMenuItemClick = () => {
    if (isMobile) {
      handleDrawerClose();
    }
  };
  
  // Close drawer when clicking outside on mobile
  const handleBackdropClick = () => {
    if (isMobile) {
      handleDrawerClose();
    }
  };
  
  // Ensure theme is properly initialized
  const safeMuiTheme = muiTheme || getTheme(themeMode);
  
  // Log theme information for debugging
  React.useEffect(() => {
    console.log('Current theme mode:', themeMode);
    console.log('MUI Theme Object:', muiTheme);
    
    // Verify theme structure
    if (!muiTheme || !muiTheme.palette) {
      console.error('Theme is not properly initialized!');
    } else {
      console.log('Theme palette:', muiTheme.palette);
    }
  }, [themeMode, muiTheme]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const closeMobileMenu = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      // Set the default auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return JSON.parse(savedUser);
    }
    return null;
  });

  // Update document theme when themeMode changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  // Handle user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  // Toggle theme is now passed as a prop from App component

  // Get the current theme based on themeMode
  const currentTheme = useMemo(() => getTheme(themeMode), [themeMode]);

  // Use the safe theme with proper fallbacks
  const safeTheme = currentTheme || getTheme(themeMode);

  // Handle window resize for mobile view detection
  useEffect(() => {
    const handleResize = () => {
      try {
        const isMobile = window.innerWidth < 960;
        if (!isMobile) {
          setMobileOpen(false);
        }
      } catch (err) {
        console.error('Error in resize handler:', err);
      }
    };

    try {
      // Initial check
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        try {
          window.removeEventListener('resize', handleResize);
        } catch (err) {
          console.error('Error removing resize listener:', err);
        }
      };
    } catch (err) {
      console.error('Error setting up resize handler:', err);
      return () => {};
    }
  }, []);

  // Ensure theme is properly applied
  const themeWithFallback = safeMuiTheme || safeTheme;
  
  return (
    <ErrorBoundary>
      <ThemeProvider theme={themeWithFallback}>
        <Box sx={{ 
          display: 'flex', 
          minHeight: '100vh', 
          backgroundColor: 'background.default',
          position: 'relative',
          overflowX: 'hidden',
          width: '100%'
        }}>
          {/* Backdrop for mobile */}
          {mobileOpen && isMobile && (
            <Box
              onClick={handleBackdropClick}
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: (theme) => theme.zIndex.drawer - 1,
                opacity: isClosing ? 0 : 1,
                transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              }}
            />
          )}
          
          {/* Header */}
          <Header 
            theme={themeMode} 
            toggleTheme={toggleTheme} 
            user={user}
            onLogout={handleLogout}
            toggleSidebar={toggleDrawer}
            isSidebarOpen={mobileOpen}
          />
          
          {/* Sidebar */}
          <Sidebar 
            isOpen={mobileOpen} 
            onClose={handleDrawerClose} 
            user={user}
            onItemClick={handleMenuItemClick}
            width={sidebarWidth}
            isMobile={isMobile}
            isClosing={isClosing}
          />
        
        {/* Main Content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3 },
            width: { 
              xs: '100%',
              sm: mobileOpen ? `calc(100% - ${sidebarWidth}px)` : '100%' 
            },
            marginLeft: { 
              xs: 0,
              sm: mobileOpen ? `${sidebarWidth}px` : 0 
            },
            transition: (theme) => theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            ...(mobileOpen && !isMobile && {
              transition: (theme) => theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }),
          }}
        >
          <ErrorBoundary>
            <Suspense fallback={
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
              </Box>
            }>
              <Routes>
                {/* Public Routes */}
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login setUser={setUser} />} />
                <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup setUser={setUser} />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                
                {/* Protected Routes */}
                <Route path="/" element={
                  <ProtectedRoute user={user}>
                    <Dashboard user={user} setUser={setUser} />
                  </ProtectedRoute>
                } />
                <Route path="/coding" element={
                  <ProtectedRoute user={user}>
                    <Coding user={user} />
                  </ProtectedRoute>
                } />
                <Route path="/mcqs" element={
                  <ProtectedRoute user={user}>
                    <MCQs user={user} />
                  </ProtectedRoute>
                } />
                <Route path="/resume" element={
                  <ProtectedRoute user={user}>
                    <Resume user={user} />
                  </ProtectedRoute>
                } />
                <Route path="/roadmap" element={
                  <ProtectedRoute user={user}>
                    <Roadmap user={user} />
                  </ProtectedRoute>
                } />
                <Route path="/reviews" element={
                  <ProtectedRoute user={user}>
                    <Reviews user={user} />
                  </ProtectedRoute>
                } />
                <Route path="/face-to-face" element={
                  <ProtectedRoute user={user}>
                    <FaceToFaceInterview user={user} />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute user={user}>
                    <Profile user={user} setUser={setUser} />
                  </ProtectedRoute>
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          </Box>
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
    );
  };

// Main App component
const App = () => {
  // Get theme mode from localStorage or default to 'light'
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Create the theme only once when themeMode changes
  const theme = useMemo(() => {
    console.log('Creating theme with mode:', themeMode);
    const newTheme = getTheme(themeMode);
    
    // Ensure all required theme properties are defined
    if (!newTheme.components) newTheme.components = {};
    if (!newTheme.shape) newTheme.shape = { borderRadius: 4 };
    if (!newTheme.spacing) newTheme.spacing = (factor) => `${8 * factor}px`;
    
    return newTheme;
  }, [themeMode]);
  
  // Ensure theme is always defined with all required properties
  const safeTheme = React.useMemo(() => {
    const baseTheme = theme || getTheme(themeMode);
    return {
      ...baseTheme,
      components: baseTheme.components || {},
      shape: baseTheme.shape || { borderRadius: 4 },
      spacing: baseTheme.spacing || ((factor) => `${8 * factor}px`),
    };
  }, [theme, themeMode]);
  
  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Wrap the app with all required providers
  return (
    <CacheProvider value={cache}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={safeTheme}>
          <CssBaseline enableColorScheme />
          <ToastProvider>
            <Router>
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppContent 
                  theme={themeMode} 
                  setTheme={setThemeMode}
                  toggleTheme={toggleTheme}
                />
                <Footer />
              </Box>
            </Router>
          </ToastProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
};

export default App;