import { ContentCategory } from '../../../Upload/types/uploadTypes';

import * as styles from '../../styles/ReviewCategorySelection.module.css';

type Props = {
  value: ContentCategory | null;
  onChange: (next: ContentCategory | null) => void;
  className?: string;
};

/**
 * CategorySelector is a segmented control component for filtering reviews by category.
 *
 * It renders a set of toggleable buttons (Timeline, Book, Food & Drink, Entertainment).
 * Only one option can be active at a time. The active category is highlighted,
 * and `onChange` is called with the newly selected category.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {ContentCategory | null} props.value - The currently selected category.
 *   - `null` represents "Timeline" (all categories).
 *   - Otherwise, one of the `ContentCategory` enum values.
 * @param {(next: ContentCategory | null) => void} props.onChange - Callback invoked
 *   when the user selects a different category. Receives the new category value or `null` for Timeline.
 * @param {string} [props.className] - Optional additional className to apply to the container.
 */
export default function CategorySelector({
  value,
  onChange,
  className,
}: Props) {
  const selected = value;
  const items: Array<{
    key: 'TIMELINE' | ContentCategory;
    label: string;
    onPick: () => void;
  }> = [
    { key: 'TIMELINE', label: '🕒️', onPick: () => onChange(null) },
    {
      key: ContentCategory.BOOK,
      label: '📚',
      onPick: () => onChange(ContentCategory.BOOK),
    },
    {
      key: ContentCategory.FOOD_AND_DRINK,
      label: '🍽️',
      onPick: () => onChange(ContentCategory.FOOD_AND_DRINK),
    },
    {
      key: ContentCategory.ENTERTAINMENT,
      label: '🎭',
      onPick: () => onChange(ContentCategory.ENTERTAINMENT),
    },
  ];

  return (
    <div
      className={`${styles.segmented} ${className ?? ''}`}
      role="tablist"
      aria-label="Feed filter"
    >
      {items.map((item) => {
        const active =
          (item.key === 'TIMELINE' && selected === null) ||
          item.key === selected;
        return (
          <button
            key={String(item.key)}
            type="button"
            role="tab"
            aria-selected={active}
            className={`${styles.segment} ${active ? styles.active : ''}`}
            onClick={item.onPick}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
