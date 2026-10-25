import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((params: { reset: () => void }) => ReactNode);
  resetKeys?: unknown[];
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (!this.state.hasError) {
      return;
    }

    const { resetKeys } = this.props;
    const prevKeys = prevProps.resetKeys;

    if (!resetKeys || !prevKeys) {
      return;
    }

    const changed =
      resetKeys.length !== prevKeys.length ||
      resetKeys.some((key, index) => !Object.is(key, prevKeys[index]));

    if (changed) {
      this.reset();
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  reset = () => this.setState({ hasError: false });

  render() {
    const { children, fallback } = this.props;

    if (this.state.hasError) {
      const defaultFallback = (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '24px',
            textAlign: 'center',
            backgroundColor: '#fff',
            color: '#1a1a1a',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
          }}
        >
          <h1 style={{ margin: 0 }}>Something went wrong</h1>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            Please refresh the page, or contact support if the problem persists.
          </p>
          <button
            type="button"
            onClick={this.reset}
            style={{
              padding: '10px 24px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: '#2563eb',
              color: '#fff',
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      );

      const element =
        typeof fallback === 'function'
          ? fallback({ reset: this.reset })
          : fallback || defaultFallback;

      return element;
    }

    return children;
  }
}

export default ErrorBoundary;
