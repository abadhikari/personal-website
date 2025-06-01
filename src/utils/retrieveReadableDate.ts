const readableDateMap = new Map<string, string>();

/**
 * Retrieves a human-readable, localized date string for a given `stackId` and `timestamp`.
 *
 * - Dates are cached in memory using a `Map` keyed by `stackId` to avoid redundant formatting.
 * - Uses `en-US` locale with the format: `"Month Day, Year"` (e.g., `"May 31, 2025"`).
 *
 * @param {string} stackId - Unique identifier for the media stack.
 * @param {number} timestamp - Unix timestamp (milliseconds since epoch).
 * @returns {string} - Formatted date string.
 */
export default function retrieveReadableDate(
  stackId: string,
  timestamp: number
): string {
  let readableDate = readableDateMap.get(stackId);
  if (!readableDate) {
    readableDate = new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    readableDateMap.set(stackId, readableDate);
  }
  return readableDate;
}
