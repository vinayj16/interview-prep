import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Coding from './components/Coding';
import MCQs from './components/MCQs';
import Resume from './components/Resume';
import Roadmap from './components/Roadmap';
import Reviews from './components/Reviews';
import Profile from './components/Profile';
import { ToastProvider } from './components/Toast/Toast';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ToastProvider>
      <Router>
        <div className={`App ${theme}`}>
          <Header 
            theme={theme} 
            toggleTheme={toggleTheme} 
            user={user}
            setUser={setUser}
          />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/coding" element={<Coding user={user} />} />
              <Route path="/mcqs" element={<MCQs user={user} />} />
              <Route path="/resume" element={<Resume user={user} />} />
              <Route path="/roadmap" element={<Roadmap user={user} />} />
              <Route path="/reviews" element={<Reviews user={user} />} />
              <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;