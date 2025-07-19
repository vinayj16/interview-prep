import React, { Component } from 'react';
import { FaExclamationTriangle, FaSync, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
      hasError: true
    });
    
    // Log the error to an error reporting service
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert">
          <div className="error-content">
            <div className="error-icon">
              <FaExclamationTriangle aria-hidden="true" />
            </div>
            <h3>Something went wrong</h3>
            <p>We're sorry, but an unexpected error occurred. Please try again or return to the home page.</p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error details (Development Only)</summary>
                <pre>{this.state.error.toString()}</pre>
                {this.state.errorInfo?.componentStack && (
                  <pre>Component Stack: {this.state.errorInfo.componentStack}</pre>
                )}
              </details>
            )}
            
            <div className="error-actions">
              <button 
                className="btn btn-primary"
                onClick={this.handleRetry}
                aria-label="Retry loading the component"
              >
                <FaSync style={{ marginRight: '8px' }} />
                Try Again
              </button>
              
              <button 
                className="btn btn-outline"
                onClick={() => window.location.reload()}
                aria-label="Reload the entire page"
              >
                <FaSync style={{ marginRight: '8px' }} />
                Reload Page
              </button>
              
              <Link 
                to="/" 
                className="btn btn-outline"
                aria-label="Go to home page"
              >
                <FaHome style={{ marginRight: '8px' }} />
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
