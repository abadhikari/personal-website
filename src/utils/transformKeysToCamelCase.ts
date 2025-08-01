/**
 * Converts a snake_case string to camelCase.
 *
 * @param {string} str - The snake_case string to convert.
 * @returns {string} The converted camelCase string.
 */
function snakeToCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * Recursively transforms all object keys from snake_case to camelCase.
 *
 * - Works on nested objects and arrays.
 * - Leaves primitives untouched.
 *
 * @param {unknown} obj - The input object or array to transform.
 * @returns {unknown} A new object or array with camelCased keys.
 */
export default function transformKeysToCamelCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(transformKeysToCamelCase);
  }
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [
        snakeToCamelCase(k),
        transformKeysToCamelCase(v),
      ])
    );
  }
  return obj;
}
