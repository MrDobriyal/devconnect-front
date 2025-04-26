import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
function fallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={fallbackRender}>
    <Router>
    <App />
    </Router>
  </ErrorBoundary>
  </StrictMode>,
)
