import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './shared/Toast/Toast';
import ErrorBoundary from './shared/common/ErrorBoundary';
import LoadingSpinner from './shared/LoadingSpinner/LoadingSpinner';
import TestRealContextApp from './TestRealContextApp';
import './index.css';

function FullAppTest() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppProvider>
          <ThemeProvider>
            <ToastProvider>
              <Suspense fallback={<LoadingSpinner size="lg" />}>
                <TestRealContextApp />
              </Suspense>
            </ToastProvider>
          </ThemeProvider>
        </AppProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default FullAppTest;
