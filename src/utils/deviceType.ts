/**
 * Determines if the deviceType is mobile based on
 * the size of the screen.
 *
 * @returns if the deviceType is mobile.
 */
export function isMobile() {
  return window.matchMedia('(max-width: 900px)').matches;
}

/**
 * Determines if the deviceType is desktop based on
 * the size of the screen.
 *
 * @returns if the deviceType is desktop.
 */
export function isDesktop() {
  return !isMobile();
}
