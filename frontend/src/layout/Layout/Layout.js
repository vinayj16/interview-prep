import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Layout.css';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: appState } = useApp();
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isDesktop]);

  // Show loading state while checking auth
  if (appState?.isLoadingAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner size="xl" />
        <p className="mt-4 text-lg text-gray-600">Loading your experience...</p>
      </div>
    );
  }

  // Handle offline state
  if (!appState.isOnline) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-6xl mb-4">📶</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">You're Offline</h1>
          <p className="text-gray-600 mb-6">
            Please check your internet connection and try again. Some features may be limited.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-layout flex flex-col min-h-screen bg-gray-50 ${appState.theme === 'dark' ? 'dark' : ''}`}>
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={appState.theme}
      />

      {/* Header */}
      <Header 
        isScrolled={isScrolled}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen} 
      />

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {(isSidebarOpen && !isDesktop) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}
      </AnimatePresence>
      
      <div className="flex flex-1 pt-16 relative">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || isDesktop) && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] z-20 ${
                isSidebarOpen ? 'w-64' : 'w-20'
              } bg-white dark:bg-gray-800 shadow-lg transition-all duration-300`}
            >
              <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => !isDesktop && setIsSidebarOpen(false)}
                isMobile={!isDesktop}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main Content */}
        <main 
          className={`main-content flex-1 transition-all duration-300 ${
            isSidebarOpen && isDesktop ? 'ml-64' : 'ml-0 lg:ml-20'
          }`}
        >
          <div className="mx-auto p-4 md:p-6 max-w-7xl">
            <div 
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6 transition-all duration-200 ${
                isSidebarOpen && isDesktop ? 'max-w-full' : 'max-w-full'
              }`}
            >
              {/* Main content area */}
              <div className="relative overflow-auto">
                {/* Debug info - only show in development */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 z-10">
                    Current Path: {location.pathname}
                  </div>
                )}
                
                {/* Main content */}
                <div className="p-4">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Offline indicator */}
      {!appState.isOnline && (
        <div className="fixed bottom-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 px-4 z-30">
          You are currently offline. Some features may be limited.
        </div>
      )}
    </div>
  );
};

export default React.memo(Layout);
