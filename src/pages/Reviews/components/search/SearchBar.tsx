import React, { useRef } from 'react';

import { useSearch } from '../../contexts/SearchContext';
import ViewType from '../../types/viewType';

import * as styles from '../../styles/ReviewSearch.module.css';

interface SearchBarProps {
  viewType: ViewType;
}

/**
 * SearchBar component used to input search queries for filtering reviews.
 * Behavior and styling adapts based on whether it's shown in the feed or map view.
 *
 * @param {Object} props - The component props.
 * @param {ViewType} props.viewType - Determines the layout style (feed or map).
 *
 * @returns {JSX.Element} A styled search input box.
 */
export default function SearchBar({ viewType }: SearchBarProps) {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch({ query: searchQuery });
      unfocusFromInput();
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
      <input
        ref={inputRef}
        className={`${styles.searchInput} ${isSendingSearch ? styles.searching : ''}`}
        value={searchQuery}
        onChange={(e) => handleChange(e)}
        onKeyDown={handleKeyDown}
        placeholder="Search reviews…"
      />
    </div>
  );
}
