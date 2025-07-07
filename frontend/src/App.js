import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './components/Toast/Toast';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import OfflineIndicator from './components/OfflineIndicator/OfflineIndicator';
import Dashboard from './components/Dashboard';
import Coding from './components/Coding';
import MCQs from './components/MCQs';
import Resume from './components/Resume';
import Roadmap from './components/Roadmap';
import Reviews from './components/Reviews';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <ToastProvider>
          <Router>
            <div className="App">
              <Header />
              <OfflineIndicator />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/coding" element={<Coding />} />
                  <Route path="/mcqs" element={<MCQs />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/roadmap" element={<Roadmap />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ToastProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;