import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Create a simple context
const TestContext = createContext();

// Simple test components
const Home = () => {
  const { user, login, logout } = useContext(TestContext);
  
  return (
    <div style={styles.page}>
      <h1>Home Page</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout} style={styles.button}>Logout</button>
        </div>
      ) : (
        <button 
          onClick={() => login({ name: 'Test User' })} 
          style={styles.button}
        >
          Login as Test User
        </button>
      )}
    </div>
  );
};

const About = () => {
  const { user } = useContext(TestContext);
  return (
    <div style={styles.page}>
      <h1>About Page</h1>
      <p>This is the about page</p>
      {user && <p>Logged in as: {user.name}</p>}
    </div>
  );
};

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
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#45a049'
    }
  }
};

function TestContextApp() {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <TestContext.Provider value={{ user, login, logout }}>
      <Router>
        <div style={styles.container}>
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/about" style={styles.navLink}>About</Link>
            {user && <span style={{ marginLeft: 'auto', color: 'white' }}>Welcome, {user.name}!</span>}
          </nav>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </Router>
    </TestContext.Provider>
  );
}

export default TestContextApp;
