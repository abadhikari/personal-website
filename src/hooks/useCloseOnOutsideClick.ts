import { useEffect } from 'react';

/**
 * Hook that triggers a callback when a mouse click occurs outside the specified element.
 *
 * Commonly used to close dropdowns, modals, tooltips, etc. when clicking outside their bounds.
 *
 * @param ref - A React ref pointing to the target DOM element to monitor.
 * @param onClickOutside - A callback function invoked when a click happens outside the target element.
 */
export default function useCloseOnOutsideClick(
  ref: React.RefObject<HTMLElement>,
  onClickOutside: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onClickOutside]);
}
