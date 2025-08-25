import { useCallback, useEffect, useState } from 'react';

import log from '../../../utils/logger';
import { ContentCategory } from '../../Upload/types/uploadTypes';
import fetchReviews, { FetchReviewsParams } from '../api/fetchReviews';
import { Review } from '../types/reviewTypes';
import ViewType from '../types/viewType';

interface UseReviewsParams {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  view: ViewType;
  activeCategoryId: ContentCategory | null;
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
export default function useReview({
  setError,
  view,
  activeCategoryId,
}: UseReviewsParams) {
  const [pageLoading, setPageLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasFetchedForMap, setHasFetchedForMap] = useState(false);

  const fetchReviewData = async (
    options: FetchReviewsParams = {},
    clearReviews: boolean = false
  ) => {
    try {
      if (clearReviews) {
        setPageLoading(true);
        setReviews([]);
        setCursor(null);
      }

      const data = await fetchReviews(options);
      setReviews((prev) => [...prev, ...data.results]);
      setCursor(data.nextCursor || null);
    } catch (err) {
      setError('Failed to load reviews. Please refresh or try again later.');
      log.error('Failed to fetch reviews', err);
    } finally {
      setPageLoading(false);
    }
  };

  const fetchMoreReviews = useCallback(async () => {
    if (isFetchingMore || !cursor) return;
    setIsFetchingMore(true);
    try {
      await fetchReviewData({
        cursor,
        categoryIds: activeCategoryId ? [activeCategoryId] : undefined,
      });
    } finally {
      setIsFetchingMore(false);
    }
  }, [cursor, isFetchingMore, activeCategoryId]);

  useEffect(() => {
    if (view !== ViewType.MAP) {
      fetchReviewData(
        { categoryIds: activeCategoryId ? [activeCategoryId] : undefined },
        true
      );
    }
  }, [activeCategoryId]);

  useEffect(() => {
    if (view === ViewType.MAP && !hasFetchedForMap) {
      fetchReviewData(
        {
          limit: 1000,
          categoryIds: [
            ContentCategory.FOOD_AND_DRINK,
            ContentCategory.ENTERTAINMENT,
          ],
        },
        true
      ).finally(() => {
        setHasFetchedForMap(true);
      });
    }
  }, [view, hasFetchedForMap]);

  return {
    reviews,
    cursor,
    fetchMoreReviews,
    isFetchingMore,
    pageLoading,
  };
}
