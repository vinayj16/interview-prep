import { useState, useEffect } from 'react';

/**
 * A custom React hook that detects if the current viewport matches a given media query.
 * @param {string} query - The media query to match (e.g., '(max-width: 768px)').
 * @returns {boolean} - Returns true if the media query matches, false otherwise.
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure window is defined (for server-side rendering)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);
    
    // Create event listener callback function
    const listener = (event) => {
      setMatches(event.matches);
    };
    
    // Add event listener for changes
    mediaQuery.addEventListener('change', listener);
    
    // Clean up the event listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
