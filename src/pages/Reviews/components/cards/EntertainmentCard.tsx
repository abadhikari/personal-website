import toTitleCaseFromSnake from '../../../../utils/toTitleCaseFromSnake';
import { Category, Review } from '../../types/reviewTypes';

import CategoryEmoji from './ExperienceEmoji';
import SymbolScore from './SymbolScore';
import TruncatedText from './TruncatedText';

import * as styles from '../../styles/ReviewCards.module.css';

interface EntertainmentCardProps {
  review: Extract<Review, { categoryId: Category.Entertainment }>;
}

/**
 * Card for rendering entertainment experience review card.
 */
export default function EntertainmentCard({ review }: EntertainmentCardProps) {
  const { rating, reviewText, createdAt, subcontent } = review;
  const { title, venue, city, country, priceLevel } = subcontent;

  return (
    <div>
      <div className={styles.title}>
        <CategoryEmoji venue={venue} />
        <h3>{title}</h3>
        <span className={styles.location}>
          {city}, {country}
        </span>
      </div>
      {rating && (
        <p>
          <SymbolScore score={rating} symbol="⭐️" max={5} size={1.3} />
        </p>
      )}
      <div className={styles.tags}>
        {priceLevel && (
          <p>
            <SymbolScore score={priceLevel} symbol="$" max={5} size={0.8} />
          </p>
        )}
        <span>{' • '}</span>

        <div className={styles.tagPills}>
          <span className={styles.pill}>{toTitleCaseFromSnake(venue)}</span>
        </div>
      </div>
      <TruncatedText text={reviewText} />
      <p className={styles.date}>
        <small>{new Date(createdAt).toLocaleDateString()}</small>
      </p>
    </div>
  );
}
