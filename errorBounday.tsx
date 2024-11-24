// components/ErrorBoundary.tsx
import React from 'react';
import * as Sentry from '@sentry/react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ProductionErrorBoundary extends React.Component<Props, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error monitoring service
    Sentry.captureException(error, { extra: errorInfo });
    
    // Custom error handling
    this.props.onError?.(error, errorInfo);
    
    // Log to analytics
    if (window.analytics) {
      window.analytics.track('Error Occurred', {
        error: error.message,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      });
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-y-4">
          <h2 className="text-xl font-bold text-red-600">
            Something went wrong
          </h2>
          <p className="text-gray-600 text-center">
            We apologize for the inconvenience. Please try again or contact support if the problem persists.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto max-w-full">
              {this.state.error?.stack}
            </pre>
          )}
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage:
const App = () => {
  return (
    <ProductionErrorBoundary
      onError={(error, errorInfo) => {
        // Custom error handling logic
        console.error('Error caught by boundary:', error, errorInfo);
      }}
      fallback={
        <div>Custom error UI</div>
      }
    >
      <YourApp />
    </ProductionErrorBoundary>
  );
};