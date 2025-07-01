import { useCallback, useEffect, useMemo, useState } from 'react';

import log from '../../../utils/logger';
import fetchReviews from '../api/fetchPhotos';
import { Review } from '../types/reviewTypes';

interface UseReviewsParams {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

/**
 * Hook for fetching and managing paginated reviews.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {Function} params.setError - Setter to update global error state.
 *
 * @returns {Object} Review feed state and handlers.
 * @returns {Review[]} return.reviews - The currently loaded list of reviews.
 * @returns {Function} return.setReviews - Setter to replace or update reviews.
 * @returns {string | null} return.cursor - Pagination cursor from the last fetch.
 * @returns {Function} return.fetchMoreReviews - Handler to load more reviews using pagination.
 * @returns {boolean} return.isFetchingMore - Whether the next page of data is currently loading.
 * @returns {boolean} return.pageLoading - Whether the initial page of data is loading.
 */
export default function useReview({ setError }: UseReviewsParams) {
  const [pageLoading, setPageLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const reviewLimit = useMemo(() => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    return isMobile ? 9 : 5;
  }, []);

  const fetchReviewData = async (cursorKey: string | null = null) => {
    try {
      const data = await fetchReviews({
        limit: reviewLimit,
        ...(cursorKey && { cursor: cursorKey }),
      });
      setReviews((prev) => [...prev, ...data.results]);
      setCursor(data.nextCursor || null);
    } catch (err) {
      setError('Failed to load reviews. Please refresh or try again later.');
      log.error('Failed to fetch reviews', err);
    }
  };

  const fetchMoreReviews = useCallback(async () => {
    if (isFetchingMore || !cursor) return;
    setIsFetchingMore(true);
    try {
      await fetchReviewData(cursor);
    } finally {
      setIsFetchingMore(false);
    }
  }, [cursor, isFetchingMore]);

  useEffect(() => {
    fetchReviewData().finally(() => setPageLoading(false));
  }, []);

  return {
    reviews,
    setReviews,
    cursor,
    fetchMoreReviews,
    isFetchingMore,
    pageLoading,
  };
}
