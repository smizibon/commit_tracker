export function createSafeAsync(setError) {
  return async (fn) => {
    try {
      await fn();
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      console.error(err);
    }
  };
}