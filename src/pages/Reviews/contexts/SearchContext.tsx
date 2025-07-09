/**
 * SearchContext provides a centralized way to manage and trigger search behavior
 * across the app. It handles querying, storing results, and tracking loading state.
 *
 * Components must be wrapped in <SearchProvider> to access this context.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';

import log from '../../../utils/logger';
import fetchReviews from '../api/fetchReviews';
import { Review } from '../types/reviewTypes';

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: Review[];
  isSearching: boolean;
  isSendingSearch: boolean;
  onSearch: (params: { query: string }) => Promise<void>;
  clearSearch: () => void;
};

type SearchParams = { query: string };

const SearchContext = createContext<SearchContextType | null>(null);

/**
 * Custom hook to consume the SearchContext. Must be used within the SearchProvider.
 *
 * @throws Will throw an error if used outside of the SearchProvider.
 * @returns {SearchContextType} The context state and handlers for search.
 */
export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used inside SearchProvider');
  return ctx;
}

/**
 * Provider component for SearchContext. Manages search state and logic,
 * including query string, results, and error handling.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Components that will consume the search context.
 * @returns {JSX.Element} The context provider wrapping its children.
 */
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Review[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSendingSearch, setIsSendingSearch] = useState(false);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const isFetchingRef = useRef(false);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setIsSearching(false);
    setSearchQuery('');
  }, []);

  /**
   * Executes a search using the given query string.
   * Trims whitespace and falls back to clearing search if empty.
   *
   * @param {SearchParams} params - Object containing the raw query string.
   */
  const handleSearch = useCallback(async ({ query }: SearchParams) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      setIsSendingSearch(true);
      const trimmed = query.trim();
      const data = await fetchReviews({ limit: 1000, search: trimmed });
      setSearchResults(data.results);
      setIsSearching(true);
    } catch (err) {
      toast.error('Search failed. Try again later.');
      log.error('Search error', err);
    } finally {
      setIsSendingSearch(false);
      isFetchingRef.current = false;
    }
  }, []);

  const onSearch = useCallback((searchParams: SearchParams): Promise<void> => {
    return new Promise((resolve) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      const debounceDuration = searchParams.query === '' ? 0 : 300;
      debounceTimeout.current = setTimeout(async () => {
        await handleSearch(searchParams);
        resolve();
      }, debounceDuration);
    });
  }, []);

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      searchResults,
      isSearching,
      isSendingSearch,
      onSearch,
      clearSearch,
    }),
    [
      searchQuery,
      searchResults,
      isSearching,
      isSendingSearch,
      onSearch,
      clearSearch,
    ]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
