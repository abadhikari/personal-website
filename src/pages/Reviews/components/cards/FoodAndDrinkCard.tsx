import toTitleCaseFromSnake from '../../../../utils/toTitleCaseFromSnake';
import { Review } from '../../types/reviewTypes';

import SymbolScore from './SymbolScore';

import * as styles from '../../styles/ReviewCards.module.css';

interface FoodAndDrinkCardProps {
  review: Extract<Review, { categoryId: 4 }>;
}

/**
 * Card for rendering food and drink review card.
 */
export default function FoodAndDrinkCard({ review }: FoodAndDrinkCardProps) {
  const { rating, reviewText, createdAt, subcontent } = review;
  const { title, venue, city, country, cuisines, priceLevel } = subcontent;

  return (
    <div>
      <div className={styles.title}>
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
        <span>{cuisines.map(toTitleCaseFromSnake).join(', ')}</span>
        <span>{' • '}</span>
        <span>{toTitleCaseFromSnake(venue)}</span>
      </div>
      <p>{reviewText}</p>
      <p className={styles.date}>
        <small>{new Date(createdAt).toLocaleDateString()}</small>
      </p>
    </div>
  );
}
