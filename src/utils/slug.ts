/**
 * Converts a string into a slugified format suitable for URLs.
 *
 * Lowercases the input, trims whitespace, removes non-word characters
 * (excluding spaces and hyphens), and replaces remaining spaces with hyphens.
 *
 * @param {string} input - The input string to convert.
 * @returns {string} The slugified string (e.g., "Blue Bottle Coffee" → "blue-bottle-coffee").
 */
export function toSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Converts a slugified string back to a readable format by replacing hyphens with spaces.
 *
 * Does not reintroduce capitalization or punctuation — purely structural reversal.
 *
 * @param {string} slug - The slug to convert (e.g., "blue-bottle-coffee").
 * @returns {string} The readable string (e.g., "blue bottle coffee").
 */
export function fromSlug(slug: string): string {
  return slug.replace(/-/g, ' ');
}
