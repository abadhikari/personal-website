import { useState } from 'react';

import SymbolScore from './SymbolScore';

import * as styles from '../../styles/ReviewCards.module.css';

const ratingDescriptions: Record<number, string> = {
  5: 'Transcendent – one of the best experiences I’ve had. Possibly life changing.',
  4: 'Amazing – would highly recommend!',
  3: `Solid – it's definitely worth checking out.`,
  2: `Eh – it didn't leave much of an impression (forgettable).`,
  1: 'Trash – I hated it.',
};

interface DescriptiveRatingProps {
  rating: number;
}

/**
 * Displays a star rating using the SymbolScore component and reveals
 * a short description of the rating on hover (desktop) or tap (mobile).
 *
 * Useful for providing context to numeric ratings in a user-friendly way.
 *
 * @component
 * @param {Object} props
 * @param {number} props.rating - A number from 1 to 5 representing the rating score.
 */
export default function DescriptiveRating({ rating }: DescriptiveRatingProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered((h) => !h)}
    >
      <SymbolScore score={rating} symbol="⭐️" max={5} size={1.3} />
      {hovered && (
        <div className={styles.tooltip}>
          {ratingDescriptions[rating] || 'Unknown rating'}
        </div>
      )}
    </div>
  );
}
