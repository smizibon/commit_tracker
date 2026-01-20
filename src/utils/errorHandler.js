export function createSafeAsync(setError) {
  return async (fn) => {
    try {
      setError('');
      return await fn();
    } catch (err) {
      const message = err?.message || 'Unexpected error';
      setError(message);
      return null;
    }
  };
}
