/**
 * Converts a string into a URL-safe slugified format.
 *
 * Lowercases the input and trims whitespace before encoding it.
 * This ensures that all special characters (e.g., `'`, `&`, `?`) are safely represented in URLs.
 *
 * @param {string} input - The input string to convert.
 * @returns {string} The encoded, slug-like string (e.g., "S'mac & Cheese" → "s%27mac%20%26%20cheese").
 */
export function toSlug(input: string): string {
  return encodeURIComponent(input.trim().toLowerCase());
}

/**
 * Decodes a slugified string back to a human-readable format.
 *
 * This reverses `toSlug` and restores original characters, though casing and punctuation may not match exactly.
 *
 * @param {string} slug - The encoded slug to decode (e.g., "s%27mac%20%26%20cheese").
 * @returns {string} The decoded string (e.g., "s'mac & cheese").
 */
export function fromSlug(slug: string): string {
  return decodeURIComponent(slug);
}
