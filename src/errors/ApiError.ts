/**
 * Custom error class for handling API request failures.
 *
 * Includes HTTP status code and raw response body for improved debugging and error handling.
 */
export default class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public responseBody: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
