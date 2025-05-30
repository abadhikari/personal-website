/**
 * Determines if the current environment is production.
 *
 * Relies on `process.env.STAGE === 'prod'` being set in your build environment.
 *
 * @returns {boolean} True if the environment is production.
 */
export function isProd(): boolean {
  return process.env.STAGE === 'prod';
}

/**
 * Determines if the current environment is development.
 *
 * Relies on `process.env.STAGE === 'dev'` being set in your `.env` file or dev config.
 *
 * @returns {boolean} True if the environment is development.
 */
export function isDev(): boolean {
  return process.env.STAGE === 'dev';
}
