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

class RootErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in root:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="app">
          <header className="app-header">
            <div className="header-content">
              <div className="logo-section">
                <h1>Zenfinity Energy</h1>
                <p className="subtitle">Battery Analytics Dashboard</p>
              </div>
            </div>
          </header>
          <main className="app-main">
            <div className="error-message">
              <h2>Application Error</h2>
              <p>
                The application encountered an unexpected error. Please check the browser console for details.
              </p>
              {this.state.error && (
                <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Error Details
                  </summary>
                  <pre style={{ 
                    marginTop: '0.5rem', 
                    padding: '1rem', 
                    background: '#f5f5f5', 
                    borderRadius: '4px',
                    overflow: 'auto',
                    fontSize: '0.9rem',
                    maxHeight: '400px'
                  }}>
                    <strong>Error:</strong> {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack && (
                      <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.8 }}>
                        <strong>Component Stack:</strong>
                        <pre style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </pre>
                </details>
              )}
              <button
                onClick={() => {
                  window.location.reload();
                }}
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1.5rem',
                  background: '#c33',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Reload Application
              </button>
            </div>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RootErrorBoundary;

