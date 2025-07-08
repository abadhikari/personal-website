import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useSearch } from '../../contexts/SearchContext';
import { Review } from '../../types/reviewTypes';
import ViewType from '../../types/viewType';

import SearchBarDropdown, { getTitleFromSubcontent } from './SearchBarDropdown';

import * as styles from '../../styles/ReviewSearch.module.css';

interface SearchBarProps {
  reviews: Review[];
  viewType: ViewType;
}

const MAX_AUTOCOMPLETE_RESULTS = 5;

/**
 * SearchBar component used to input search queries for filtering reviews.
 * Behavior and styling adapts based on whether it's shown in the feed or map view.
 *
 * @param {Object} props - The component props.
 * @param {ViewType} props.viewType - Determines the layout style (feed or map).
 *
 * @returns {JSX.Element} A styled search input box.
 */
export default function SearchBar({ reviews, viewType }: SearchBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { searchQuery, setSearchQuery, isSendingSearch, onSearch } =
    useSearch();

  /**
   * Unfocuses the input element to dismiss mobile keyboard or reset focus state.
   */
  const unfocusFromInput = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const filteredReviews = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return reviews
      .filter((review) =>
        getTitleFromSubcontent(review)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
      .slice(0, MAX_AUTOCOMPLETE_RESULTS);
  }, [searchQuery, reviews]);

  useEffect(() => {
    setShowDropdown(isInputFocused && filteredReviews.length > 0);
  }, [filteredReviews]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [searchQuery]);

  const onAutoCompleteSelect = (title: string) => {
    setSearchQuery(title);
    onSearch({ query: title });
    if (inputRef.current) inputRef.current.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const totalResults = Math.min(
      MAX_AUTOCOMPLETE_RESULTS,
      filteredReviews.length
    );
    if (e.key === 'Enter') {
      if (filteredReviews.length > 0 && highlightedIndex >= 0) {
        const selectedReview = filteredReviews[highlightedIndex];
        if (selectedReview) {
          const title = getTitleFromSubcontent(selectedReview);
          onAutoCompleteSelect(title);
        }
      } else {
        onSearch({ query: searchQuery });
      }
      unfocusFromInput();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!showDropdown) return;
      setHighlightedIndex((prev) => (prev + 1) % totalResults);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!showDropdown) return;
      setHighlightedIndex((prev) => (prev - 1 + totalResults) % totalResults);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);

    const trimmed = value.trim();
    if (trimmed === '') {
      onSearch({ query: '' });
    }
  };

  return (
    <div
      className={
        viewType === ViewType.FEED
          ? styles.searchBarContainer
          : styles.searchBarContainerMap
      }
    >
      <div className={styles.searchInputWrapper}>
        <input
          ref={inputRef}
          className={`${styles.searchInput} ${isSendingSearch ? styles.searching : ''}`}
          value={searchQuery}
          onChange={(e) => handleChange(e)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="Search reviews…"
        />
        <SearchBarDropdown
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
          highlightedIndex={highlightedIndex}
          reviews={filteredReviews}
          onSelect={onAutoCompleteSelect}
        />
      </div>
    </div>
  );
}
