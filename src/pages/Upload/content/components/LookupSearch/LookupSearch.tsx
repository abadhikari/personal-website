import { useState } from 'react';

import AnimatedSpinner from '../../../../../components/common/animations/AnimatedSpinner';
import { Lookup, LookupType } from '../../../types/uploadTypes';
import useLookups from '../../hooks/useLookups';

import * as styles from '../../../styles/LookupSearch.module.css';

interface LookupsSearchProps {
  lookupType: LookupType;
  onSelect: (results: Lookup[]) => void;
  placeholder: string;
  inputId?: string;
}

/**
 * Provides an accessible, keyboard-navigable search input for finding and selecting content items.
 * Triggers a fetch on "Enter", supports arrow key navigation, and invokes `onSelect` on item click or key press.
 *
 * @param onSelect - Function called with selected Content object
 */
export default function LookupsSearch({
  lookupType,
  onSelect,
  placeholder,
  inputId = 'lookup-search',
}: LookupsSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedLookups, setSelectedLookups] = useState<Lookup[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isWriting, setIsWriting] = useState(false);

  const { lookups, onLookup, isLoading, onWriteLookup } = useLookups();

  const handleSelect = (lookup: Lookup) => {
    if (!selectedLookups.find((s) => s.id === lookup.id)) {
      const updated = [...selectedLookups, lookup];
      setSelectedLookups(updated);
      onSelect(updated);
    }
    setQuery('');
    setShowDropdown(false);
  };

  const toSnakeCase = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^\w_]/g, '');

  const handleWrite = async () => {
    const snake = toSnakeCase(query);
    setIsWriting(true);
    const created = await onWriteLookup(lookupType, snake);
    setIsWriting(false);
    if (created) {
      const updated = [...selectedLookups, created];
      setSelectedLookups(updated);
      onSelect(updated);
      setQuery('');
      setShowDropdown(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const totalResults = lookups.length;
    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < totalResults) {
        handleSelect(lookups[highlightedIndex]);
      }
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

  const handleRemove = (id: string | number) => {
    const updated = selectedLookups.filter((l) => l.id !== id);
    setSelectedLookups(updated);
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    lookup: Lookup
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(lookup);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);

    const trimmed = value.trim();
    if (trimmed !== '') {
      onLookup(lookupType, trimmed);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
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
      <div className={styles.searchInputWrapper}>
        <input
          id={inputId}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
          placeholder={placeholder}
          autoComplete="off"
        />
        {showDropdown &&
          lookups.length === 0 &&
          !isLoading &&
          query.length > 0 && (
            <button
              type="button"
              className={styles.writeButton}
              onClick={handleWrite}
              disabled={isWriting}
              aria-label="Add new item"
            >
              {isWriting ? <AnimatedSpinner className="spinner" /> : '➕'}
            </button>
          )}
      </div>

      {isLoading && (
        <div className={styles.loading}>
          <AnimatedSpinner className="spinner" />
        </div>
      )}

      {showDropdown && lookups.length > 0 && (
        <ul
          id="content-search-listbox"
          role="listbox"
          className={styles.searchDropdown}
        >
          {lookups.map((lookup, index) => (
            <li
              key={lookup.id}
              role="option"
              tabIndex={-1}
              onClick={() => handleSelect(lookup)}
              onKeyDown={(e) => handleOptionKeyDown(e, lookup)}
              aria-selected={highlightedIndex === index}
              className={`${styles.searchItem} ${
                highlightedIndex === index ? styles.highlighted : ''
              }`}
            >
              <span className={styles.searchItemIcon}>📍</span> {lookup.name}
            </li>
          ))}
        </ul>
      )}

      {showDropdown && lookups.length === 0 && !isLoading && (
        <div className={styles.searchDropdown}>
          <div className={styles.searchEmpty}>No results</div>
        </div>
      )}

      {selectedLookups.length > 0 && (
        <div className={styles.selectedPills}>
          {selectedLookups.map((item) => (
            <span key={item.id} className={styles.pill}>
              {item.name}
              <button
                type="button"
                className={styles.pillClose}
                onClick={() => handleRemove(item.id)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
