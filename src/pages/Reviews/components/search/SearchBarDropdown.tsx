import { Review } from '../../types/reviewTypes';
import ExperienceEmoji from '../cards/ExperienceEmoji';

import * as styles from '../../styles/ReviewSearch.module.css';

interface SearchBarDropdownProps {
  reviews: Review[];
  showDropdown: boolean;
  onSelect: (reviewTitle: string) => void;
  setShowDropdown: (b: boolean) => void;
  highlightedIndex: number;
}

/**
 * Extracts the title from a review's subcontent if available.
 * Returns a placeholder string if the title is missing or invalid.
 */
export function getTitleFromSubcontent(review: Review): string {
  if (!review.subcontent || typeof review.subcontent !== 'object')
    return '(No title)';
  if (
    'title' in review.subcontent &&
    typeof review.subcontent.title === 'string'
  ) {
    return review.subcontent.title;
  }
  return '(No title)';
}

/**
 * Renders a dropdown list of filtered reviews beneath the search input.
 * Includes keyboard navigation and accessibility roles.
 *
 * @component
 * @param {SearchBarDropdownProps} props - Props for the dropdown component.
 * @returns {JSX.Element | null} The dropdown list, or null if not visible.
 */
export default function SearchBarDropdown({
  reviews,
  onSelect,
  showDropdown,
  setShowDropdown,
  highlightedIndex,
}: SearchBarDropdownProps) {
  const handleSelect = (review: Review) => {
    const reviewTitle = getTitleFromSubcontent(review);
    onSelect(reviewTitle);
    setShowDropdown(false);
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    review: Review
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(review);
    }
  };

  if (!showDropdown) return null;

  return (
    <ul
      id="autocomplete-listbox"
      role="listbox"
      className={styles.searchDropdown}
    >
      {reviews.map((review, index) => (
        <li
          key={review.reviewId}
          role="option"
          tabIndex={-1}
          onClick={() => handleSelect(review)}
          onKeyDown={(e) => handleOptionKeyDown(e, review)}
          aria-selected={highlightedIndex === index}
          className={`${styles.searchItem} ${
            highlightedIndex === index ? styles.highlighted : ''
          }`}
        >
          <ExperienceEmoji review={review} className={styles.searchItemIcon} />
          {getTitleFromSubcontent(review)}
        </li>
      ))}
    </ul>
  );
}
