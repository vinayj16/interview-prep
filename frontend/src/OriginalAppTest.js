import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './shared/Toast/Toast';
import ErrorBoundary from './shared/common/ErrorBoundary';
import LoadingSpinner from './shared/LoadingSpinner/LoadingSpinner';
import Layout from './layout/Layout/Layout';
import './index.css';

// Simplified AppContent component
const AppContent = () => {
  return (
    <div className="app">
      <Layout>
        <h1>App Content Loaded Successfully!</h1>
        <p>This is a simplified version of the original app content.</p>
      </Layout>
    </div>
  );
};

function OriginalAppTest() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppProvider>
          <ThemeProvider>
            <ToastProvider>
              <Suspense fallback={<LoadingSpinner size="lg" />}>
                <AppContent />
              </Suspense>
            </ToastProvider>
          </ThemeProvider>
        </AppProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default OriginalAppTest;
