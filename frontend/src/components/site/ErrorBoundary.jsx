import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
          <div className="max-w-md text-center">
            <h1 className="text-3xl">This page didn't load</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong. Try refreshing or head back home.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => window.location.reload()}
                className="rounded-sm bg-gradient-ember px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground"
              >
                Try again
              </button>
              <a
                href="/"
                className="rounded-sm border border-border px-5 py-3 text-xs font-bold uppercase tracking-[0.2em]"
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
