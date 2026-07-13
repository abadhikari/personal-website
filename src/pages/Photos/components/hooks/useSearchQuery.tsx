import { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import log from '../../../../utils/logger';
import retrieveReadableDate from '../../../../utils/retrieveReadableDate';
import scrollToElement from '../../../../utils/scrollToInput';
import fetchPhotos from '../../api/fetchPhotos';
import { MediaStack } from '../../types/mediaTypes';

interface UseSearchQueryParams {
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
  searchInputRef,
}: UseSearchQueryParams) {
  const DEFAULT_DEBOUNCE = 100;
  const FIRST_SEARCH_DEBOUNCE = 300;
  const STACK_LIMIT = 50;

  const isFetchingRef = useRef(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [searchProcessing, setSearchProcessing] = useState(false);
  const [searchStacks, setSearchStacks] = useState<MediaStack[]>([]);
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const fetchSearchResults = async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setSearchProcessing(true);
    let allResults: MediaStack[] = [];
    let lastEvaluatedKey: string | null = null;

    try {
      do {
        // eslint-disable-next-line no-await-in-loop
        const data = await fetchPhotos({
          stackLimit: STACK_LIMIT,
          ...(lastEvaluatedKey && { lastEvaluatedKey }),
        });

        allResults = [...allResults, ...data.stackAndMediaData];
        lastEvaluatedKey = data.lastEvaluatedKey || null;
      } while (lastEvaluatedKey);

      setSearchStacks(allResults);
    } catch (err) {
      log.error('Failed to search.', { err });
      toast.error('Failed to search. Please try again later.');
    } finally {
      isFetchingRef.current = false;
      setSearchProcessing(false);
    }
  };

  const handleSearchSubmit = async (trimmedQuery: string) => {
    setIsSearching(true);
    setSubmittedQuery(trimmedQuery);
    if (searchStacks.length === 0) {
      await fetchSearchResults();
    }
    scrollToElement(searchInputRef, 100);
  };

  const filteredStacks = useMemo(() => {
    const trimmedQuery = submittedQuery.trim();
    if (!trimmedQuery) return searchStacks;

    // Split by any whitespace
    const keywords = trimmedQuery.toLowerCase().split(/\s+/);

    return searchStacks.filter((stack) => {
      const {
        location = '',
        caption = '',
        uploadTimestamp,
        stackId,
      } = stack.stack;
      const readableDate = retrieveReadableDate(
        stackId,
        uploadTimestamp
      ).toLowerCase();

      const haystack = `${location.toLowerCase()} ${caption.toLowerCase()} ${readableDate}`;

      return keywords.every((keyword) => haystack.includes(keyword));
    });
  }, [searchStacks, submittedQuery]);

  const debouncedSearch = (trimmedQuery: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    const debounceDuration =
      filteredStacks.length === 0 ? FIRST_SEARCH_DEBOUNCE : DEFAULT_DEBOUNCE;

    debounceTimeout.current = setTimeout(() => {
      if (trimmedQuery === '') {
        setIsSearching(false);
      } else {
        handleSearchSubmit(trimmedQuery);
      }
    }, debounceDuration);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawQuery = e.target.value;
    setQuery(rawQuery);
    debouncedSearch(rawQuery.trim());
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return {
    query,
    filteredStacks,
    setSearchStacks,
    isSearching,
    searchProcessing,
    handleQueryChange,
  };
}
