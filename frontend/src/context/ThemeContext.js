import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize state with user's preference or default to 'light'
  const [theme, setTheme] = useState(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    // Check for system preference if no saved theme
    if (!savedTheme) {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
    }
    return savedTheme;
  });

  // Update document class and save to localStorage when theme changes
  useEffect(() => {
    // Update document class and data-theme attribute
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme); // Ensure body also gets the data-theme
    document.documentElement.classList.toggle('dark-mode', theme === 'dark');
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update CSS variables based on theme
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--background-color', 'var(--dark-bg)');
      root.style.setProperty('--text-primary', 'var(--dark-text-primary)');
      // Add more theme variable overrides as needed
    } else {
      root.style.setProperty('--background-color', 'var(--light-bg)');
      root.style.setProperty('--text-primary', 'var(--light-text-primary)');
      // Reset to light theme variables
    }
  }, [theme]);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
