/**
 * Converts a snake_case string to Title Case.
 *
 * Example:
 *   toTitleCaseFromSnake("jazz_club") => "Jazz Club"
 *
 * @param {string} raw - The input string in snake_case format.
 * @returns {string} The converted string in Title Case format.
 */
export default function toTitleCaseFromSnake(raw: string): string {
  return raw
    .toLowerCase()
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}
