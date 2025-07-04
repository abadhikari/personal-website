/**
 * Delays execution for a specified number of milliseconds.
 *
 * Commonly used to simulate latency in testing, stagger animations,
 * or artificially extend async operations (e.g. loading spinners).
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export default function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
