import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="card" style={{ background: '#fee', border: '1px solid #fcc' }}>
          <h2 style={{ color: '#c33' }}>⚠️ Component Error</h2>
          <p style={{ color: '#c33' }}>
            A component failed to render. Check the browser console for details.
          </p>
          {this.state.error && (
            <details style={{ marginTop: '0.5rem' }}>
              <summary style={{ cursor: 'pointer', fontSize: '0.9rem', color: '#c33' }}>Error Details</summary>
              <pre style={{ 
                marginTop: '0.5rem', 
                padding: '0.5rem', 
                background: '#f5f5f5', 
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.8rem'
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.8 }}>
                    {this.state.errorInfo.componentStack}
                  </div>
                )}
              </pre>
            </details>
          )}
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null, errorInfo: null });
              window.location.reload();
            }}
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem 1rem',
              background: '#c33',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

