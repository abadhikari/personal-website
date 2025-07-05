import { useState } from 'react';
import { motion } from 'framer-motion';

import * as styles from '../../styles/ReviewsMap.module.css';

/**
 * Returns a color string based on the rating level.
 *
 * @param {number} rating - The numeric rating (1 to 5).
 * @returns {string} - Hex color associated with the rating.
 */
export const getColorByRating = (rating: number) => {
  if (rating >= 5) return '#2C93AE';
  if (rating >= 4) return '#3FB1CE';
  if (rating >= 3) return '#6BC6A7';
  if (rating >= 2) return '#F4A261';
  return '#CE5C5C';
};

/**
 * Array of rating tiers used for legend display.
 * Each item includes a color and descriptive label.
 */
const legendItems = [
  { color: getColorByRating(5), label: 'Transcendent' },
  { color: getColorByRating(4), label: 'Amazing' },
  { color: getColorByRating(3), label: 'Solid' },
  { color: getColorByRating(2), label: 'Eh' },
  { color: getColorByRating(1), label: 'Trash' },
];

/**
 * MapLegend component visually represents review scores on a map.
 * In collapsed state: shows only colored dots.
 * In expanded state: shows colored dots with descriptive labels.
 *
 * @component
 * @returns {JSX.Element} Interactive map legend toggle.
 */
export default function MapLegend() {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      className={styles.legend}
      type="button"
      onClick={() => setExpanded((e) => !e)}
      aria-expanded={expanded}
      aria-label="Legend toggle"
    >
      <div className={expanded ? styles.expanded : styles.collapsed}>
        {legendItems.map(({ color, label }) => (
          <div key={label} className={styles.legendItem}>
            <span
              className={styles.legendColor}
              style={{ backgroundColor: color }}
            />
            {expanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className={styles.legendLabel}
              >
                {label}
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </button>
  );
}
