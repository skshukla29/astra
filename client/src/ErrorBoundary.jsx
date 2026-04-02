import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || "Unexpected client error" };
  }

  componentDidCatch(error) {
    console.error("Astra UI runtime error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "1rem", fontFamily: "Segoe UI, sans-serif" }}>
          <h2>Something went wrong in the UI</h2>
          <p>{this.state.message}</p>
          <p>Refresh the page. If this continues, restart frontend with npm run dev in client folder.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
