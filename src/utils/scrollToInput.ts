/**
 * Smoothly scrolls the given element into view after an optional delay.
 *
 * @param {React.RefObject<HTMLElement>} ref - Ref to the element to scroll to.
 * @param {number} [delay=0] - Optional delay in milliseconds before scrolling.
 * @param {'start' | 'center' | 'end' | 'nearest'} [block='start'] - Scroll alignment.
 */
export default function scrollToElement(
  ref: React.RefObject<HTMLElement>,
  delay = 0,
  block: ScrollLogicalPosition = 'start'
) {
  setTimeout(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block,
    });
  }, delay);
}
