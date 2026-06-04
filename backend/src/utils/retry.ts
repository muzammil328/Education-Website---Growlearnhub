export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  onRetry?: (attempt: number, error: Error) => void;
}

const wait = (delayMs: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, delayMs);
  });

export async function withRetry<T>(task: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const maxRetries = options.maxRetries ?? 3;
  const initialDelay = options.initialDelay ?? 200;
  const maxDelay = options.maxDelay ?? 5000;

  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt > maxRetries) {
        break;
      }

      options.onRetry?.(attempt, lastError);

      const delayMs = Math.min(initialDelay * 2 ** (attempt - 1), maxDelay);
      await wait(delayMs);
    }
  }

  throw lastError ?? new Error('Operation failed after retries');
}
