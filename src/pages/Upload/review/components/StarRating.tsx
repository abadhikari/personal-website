import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

import * as styles from '../../styles/UploadReview.module.css';

interface StarRatingProps {
  value: number;
  onChange: (val: number) => void;
}

/**
 * Displays a 1–5 star rating system. Users can click a star to select a rating,
 * and hover to preview a different rating. Icons are rendered using react-icons.
 *
 * @param value - The currently selected rating
 * @param onChange - Function to call when a rating is selected
 */
export default function StarRating({ value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const stars = [1, 2, 3, 4, 5];
  const current = hovered ?? value;

  return (
    <div className={styles.rating}>
      <label htmlFor="rating">
        Rating<span className="required">*</span>
        <input id="rating" type="hidden" value={value} readOnly />
      </label>

      <div className={styles.starRow}>
        {stars.map((star) => {
          const Icon = current >= star ? FaStar : FaRegStar;

          return (
            <div
              key={star}
              className={styles.starShell}
              onMouseLeave={() => setHovered(null)}
            >
              <Icon size={24} color="#ffc107" />

              <button
                type="button"
                className={styles.fullBtn}
                aria-label={`${star} stars`}
                onMouseEnter={() => setHovered(star)}
                onClick={() => onChange(star)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onChange(star);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
