import { Venue } from '../../types/reviewTypes';

import * as styles from '../../styles/ReviewCards.module.css';

interface ExperienceEmojiProps {
  venue: Venue;
}

/**
 * Renders an appropriate emoji representing the type of experience based on its venue.
 * Used for quick visual categorization of experience-type reviews.
 */
export default function ExperienceEmoji({ venue }: ExperienceEmojiProps) {
  let emoji = '';
  switch (venue) {
    case Venue.Restaurant:
      emoji = '🍽️';
      break;
    case Venue.Bar:
      emoji = '🍺';
      break;
    case Venue.JazzClub:
      emoji = '🎷';
      break;
    default:
      emoji = '❓';
  }

  return <span className={styles.categoryEmoji}>{emoji}</span>;
}
