import { useState } from 'react';

import AnimatedSpinner from '../../../../components/common/animations/AnimatedSpinner';
import { Content } from '../../types/uploadTypes';
import useContents from '../hooks/useContents';

import * as styles from '../../styles/UploadReview.module.css';

interface ContentSearchProps {
  onSelect: (content: Content) => void;
}

/**
 * Provides an accessible, keyboard-navigable search input for finding and selecting content items.
 * Triggers a fetch on "Enter", supports arrow key navigation, and invokes `onSelect` on item click or key press.
 *
 * @param onSelect - Function called with selected Content object
 */
export default function ContentSearch({ onSelect }: ContentSearchProps) {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const { contents, fetchContents, isContentLoading } = useContents();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const totalResults = contents.length;
    if (e.key === 'Enter') {
      e.preventDefault();
      await fetchContents(query);
      setShowDropdown(true);
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

  const handleSelect = (content: Content) => {
    onSelect(content);
    setQuery(content.title);
    setShowDropdown(false);
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    content: Content
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(content);
    }
  };

  return (
    <div
      className={styles.searchContainer}
      role="combobox"
      aria-label="Search content"
      aria-haspopup="listbox"
      aria-controls="content-search-listbox"
      aria-expanded={showDropdown}
    >
      <input
        id="content-search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.searchInput}
        placeholder="Search for content..."
        autoComplete="off"
      />

      {isContentLoading && (
        <div className={styles.loading}>
          <AnimatedSpinner className="spinner" />
        </div>
      )}

      {showDropdown && contents.length > 0 && (
        <ul
          id="content-search-listbox"
          role="listbox"
          className={styles.searchDropdown}
        >
          {contents.map((content, index) => (
            <li
              key={content.content_id}
              role="option"
              tabIndex={-1}
              onClick={() => handleSelect(content)}
              onKeyDown={(e) => handleOptionKeyDown(e, content)}
              aria-selected={highlightedIndex === index}
              className={`${styles.searchItem} ${
                highlightedIndex === index ? styles.highlighted : ''
              }`}
            >
              <span className={styles.searchItemIcon}>📍</span> {content.title}
            </li>
          ))}
        </ul>
      )}

      {showDropdown && contents.length === 0 && !isContentLoading && (
        <div className={styles.searchDropdown}>
          <div className={styles.searchEmpty}>No results</div>
        </div>
      )}
    </div>
  );
}
