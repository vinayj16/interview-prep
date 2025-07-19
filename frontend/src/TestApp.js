import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Simple test components
const Home = () => <div style={styles.page}><h1>Home Page</h1><p>This is the home page</p></div>;
const About = () => <div style={styles.page}><h1>About Page</h1><p>This is the about page</p></div>;

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  nav: {
    backgroundColor: '#333',
    padding: '10px 20px',
    marginBottom: '20px',
    display: 'flex',
    gap: '20px'
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
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
};

function TestApp() {
  return (
    <Router>
      <div style={styles.container}>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/about" style={styles.navLink}>About</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default TestApp;
