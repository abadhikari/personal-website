import { useCallback, useEffect, useState } from 'react';
import { MediaStack } from '../../types/mediaTypes';
import fetchPhotos from '../../api/fetchPhotos';

interface UsePhotosParams {
  stackLimit: number;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

/**
 * Hook for fetching and managing paginated media stacks.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {number} params.stackLimit - Max number of stacks to fetch per request.
 * @param {Function} params.setError - Setter to update global error state.
 *
 * @returns {Object} Photo feed state and handlers.
 * @returns {MediaStack[]} return.stacks - The currently loaded list of media stacks.
 * @returns {Function} return.setStacks - Setter to replace or update media stacks.
 * @returns {string | null} return.lastEvaluatedKey - Pagination token from the last fetch, or null if no more data.
 * @returns {Function} return.fetchMorePhotos - Handler to load more stacks using pagination.
 * @returns {boolean} return.isFetchingMore - Whether the next page of data is currently loading.
 * @returns {boolean} return.pageLoading - Whether the initial page of data is loading.
 */
export default function usePhotos({ stackLimit, setError }: UsePhotosParams) {
  const [pageLoading, setPageLoading] = useState(true);
  const [stacks, setStacks] = useState<MediaStack[]>([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchPhotoData = async (key: string | null = null) => {
    try {
      const data = await fetchPhotos({
        stackLimit,
        ...(key && { lastEvaluatedKey: key }),
      });
      setStacks((prev) => [...prev, ...data.stackAndMediaData]);
      setLastEvaluatedKey(data.lastEvaluatedKey || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error.');
    }
  };

  const fetchMorePhotos = useCallback(async () => {
    if (isFetchingMore || !lastEvaluatedKey) return;
    setIsFetchingMore(true);
    try {
      await fetchPhotoData(lastEvaluatedKey);
    } finally {
      setIsFetchingMore(false);
    }
  }, [lastEvaluatedKey, isFetchingMore]);

  useEffect(() => {
    fetchPhotoData().finally(() => setPageLoading(false));
  }, []);

  return {
    stacks,
    setStacks,
    lastEvaluatedKey,
    fetchMorePhotos,
    isFetchingMore,
    pageLoading,
  };
}
