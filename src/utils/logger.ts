import { isDev } from './env';

const timestamp = () => new Date().toISOString();

/**
 * Lightweight logging utility that outputs to the console during development.
 *
 * - Includes timestamp and log level prefix (INFO, WARN, ERROR).
 * - In production (`STAGE !== 'dev'`), logs are suppressed except for `error`,
 *   which is reserved for future remote logging (e.g., Sentry, backend API).
 *
 * Example usage:
 * ```ts
 * import log from '@/utils/logger';
 * log.info('Component mounted', { id: 123 });
 * log.warn('Unexpected fallback triggered');
 * log.error('API fetch failed', error);
 * ```
 */
const log = {
  info: (...args: unknown[]) => {
    if (isDev()) console.info(`[INFO] [${timestamp()}]`, ...args);
  },
  warn: (...args: unknown[]) => {
    if (isDev()) console.warn(`[WARN] [${timestamp()}]`, ...args);
  },
  error: (...args: unknown[]) => {
    if (isDev()) {
      console.error(`[ERROR] [${timestamp()}]`, ...args);
    } else {
      // future: send to prod log endpoint
    }
  },
};

export default log;
