import { useEffect, useRef } from 'react';

import AnimatedSpinner from './animations/AnimatedSpinner';

interface InfiniteScrollProps {
  fetchMore: () => void;
  isFetching: boolean;
}

/**
 * InfiniteScroll component detects when the user reaches the bottom and triggers `fetchMore()`
 * to get more images.
 *
 * @param {Function} fetchMore - Function to call when reaching the bottom.
 * @param {boolean} isFetching - Whether data is currently being fetched.
 */
export default function InfiniteScroll({
  fetchMore,
  isFetching,
}: InfiniteScrollProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return undefined;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          fetchMore();
        }
      },
      { rootMargin: '100px' }
    );

    observerRef.current.observe(loaderRef.current);

    return () => observerRef.current?.disconnect();
  }, [fetchMore, isFetching]);

  return (
    <div ref={loaderRef}>
      {isFetching && <AnimatedSpinner className="spinner" />}
    </div>
  );
}
