import React, { useEffect, useMemo, useRef, useState } from 'react';

import { ContentCategory } from '../../../Upload/types/uploadTypes';
import { useSearch } from '../../contexts/SearchContext';
import { Review } from '../../types/reviewTypes';
import ViewType from '../../types/viewType';

import SearchBarDropdown, { getTitleFromSubcontent } from './SearchBarDropdown';

import * as styles from '../../styles/ReviewSearch.module.css';

interface SearchBarProps {
  reviews: Review[];
  viewType: ViewType;
  setSelectionWasManual?: (b: boolean) => void;
  activeCategoryId: ContentCategory | null;
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
export default function SearchBar({
  reviews,
  viewType,
  setSelectionWasManual,
  activeCategoryId,
}: SearchBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const {
    searchQuery,
    setSearchQuery,
    isSendingSearch,
    onSearch,
    clearSearch,
  } = useSearch();

  /**
   * Unfocuses the input element to dismiss mobile keyboard or reset focus state.
   */
  const unfocusFromInput = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleSearchTriggeredSideEffects = () => {
    // If present, sets the "manual selection" flag to false to indicate this selection
    // was triggered by search (e.g. dropdown, hitting enter).
    if (setSelectionWasManual) {
      setSelectionWasManual(false);
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

  /**
   * Shows or hides dropdown based on input focus and availability of filtered results.
   */
  useEffect(() => {
    setShowDropdown(isInputFocused && filteredReviews.length > 0);
  }, [filteredReviews]);

  /**
   * Resets dropdown highlight index when the search query changes.
   */
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [searchQuery]);

  /**
   * Handles logic when a dropdown item is selected via click or keyboard.
   * Updates query, triggers search, and optionally flags the selection as not manual.
   */
  const onDropDownSelect = (title: string) => {
    setSearchQuery(title);
    onSearch({ query: title });
    handleSearchTriggeredSideEffects();
    if (inputRef.current) inputRef.current.blur();
  };

  /**
   * Keyboard navigation logic: handles up/down arrows, enter key selection from dropdown,
   * and default search submission if no dropdown item is selected.
   */
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
          onDropDownSelect(title);
        }
      } else {
        onSearch({ query: searchQuery });
        handleSearchTriggeredSideEffects();
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

  /**
   * Handles search input changes and clears search state if input is emptied.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);

    const trimmed = value.trim();
    if (trimmed === '') {
      clearSearch();
    }
  };

  const searchBarPlaceholder = useMemo(() => {
    switch (activeCategoryId) {
      case ContentCategory.BOOK:
        return 'Search book reviews…';
      case ContentCategory.FOOD_AND_DRINK:
        return 'Search food & drink reviews…';
      case ContentCategory.ENTERTAINMENT:
        return 'Search entertainment reviews…';
      default:
        return 'Search all reviews…';
    }
  }, [activeCategoryId]);

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
          placeholder={searchBarPlaceholder}
        />
        <SearchBarDropdown
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
          highlightedIndex={highlightedIndex}
          reviews={filteredReviews}
          onSelect={onDropDownSelect}
        />
      </div>
    </div>
  );
}
