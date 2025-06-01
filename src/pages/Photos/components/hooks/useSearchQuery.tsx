import { useState, useMemo } from 'react';
import { MediaStack } from '../../types/mediaTypes';
import fetchPhotos from '../../api/fetchPhotos';

interface UseSearchQueryParams {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

/**
 * Hook for managing the search logic for media stacks.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {Function} params.setError - Setter to update global error state.
 * @param {React.RefObject<HTMLInputElement>} params.searchInputRef - Ref for scrolling the search input into view.
 *
 * @returns {Object} Search state and handlers.
 * @returns {string} return.query - The current query string input by the user.
 * @returns {Function} return.setQuery - Setter to update the query string.
 * @returns {Function} return.handleSearchSubmit - Submits the current query and initiates a search.
 * @returns {MediaStack[]} return.filteredStacks - Filtered list of media stacks matching the submitted query.
 * @returns {Function} return.setSearchStacks - Setter to update the full fetched search results.
 * @returns {boolean} return.isSearching - Whether the user has entered search mode.
 * @returns {Function} return.setIsSearching - Setter to toggle search mode.
 * @returns {boolean} return.searchProcessing - Whether search results are currently loading.
 */
export default function useSearchQuery({
  setError,
  searchInputRef,
}: UseSearchQueryParams) {
  const [searchProcessing, setSearchProcessing] = useState(false);
  const [searchStacks, setSearchStacks] = useState<MediaStack[]>([]);
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const scrollToInput = (
    ref: React.RefObject<HTMLInputElement>,
    delay: number
  ) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, delay);
  };

  const fetchSearchResults = async () => {
    setSearchProcessing(true);
    setError(null);
    let allResults: MediaStack[] = [];
    let lastEvaluatedKey: string | null = null;

    try {
      do {
        // eslint-disable-next-line no-await-in-loop
        const data = await fetchPhotos({
          stackLimit: 50,
          ...(lastEvaluatedKey && { lastEvaluatedKey }),
        });

        allResults = [...allResults, ...data.stackAndMediaData];
        lastEvaluatedKey = data.lastEvaluatedKey || null;
      } while (lastEvaluatedKey);

      setSearchStacks(allResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error.');
    } finally {
      setSearchProcessing(false);
    }
  };

  const handleSearchSubmit = async (trimmedQuery: string) => {
    if (searchProcessing) return;
    setIsSearching(true);
    setSubmittedQuery(trimmedQuery);
    if (searchStacks.length === 0) {
      await fetchSearchResults();
    }
    scrollToInput(searchInputRef, 100);
  };

  const filteredStacks = useMemo(() => {
    if (!submittedQuery.trim()) return searchStacks;

    const lower = submittedQuery.toLowerCase();

    return searchStacks.filter((stack) => {
      const location = stack.stack.location?.toLowerCase() ?? '';
      const caption = stack.stack.caption?.toLowerCase() ?? '';
      return location.includes(lower) || caption.includes(lower);
    });
  }, [searchStacks, submittedQuery]);

  return {
    query,
    setQuery,
    handleSearchSubmit,
    filteredStacks,
    setSearchStacks,
    isSearching,
    setIsSearching,
    searchProcessing,
  };
}
