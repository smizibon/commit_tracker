function ErrorDisplay({ message }) {
  if (!message) return null;
  return (
    <div className="error-message" data-testid="error-display">
      ⚠️ {message}
    </div>
  );
}

export default ErrorDisplay;
