import toTitleCaseFromSnake from '../../../../utils/toTitleCaseFromSnake';
import { Category, Review } from '../../types/reviewTypes';
import ViewType from '../../types/viewType';

import DescriptivePriceLevel from './DescriptivePriceLevel';
import DescriptiveRating from './DescriptiveRating';
import ExperienceEmoji from './ExperienceEmoji';
import MapLinkedTitle from './MapLinkedTitle';
import TruncatedText from './TruncatedText';

import * as styles from '../../styles/ReviewCards.module.css';

interface FoodAndDrinkCardProps {
  review: Extract<Review, { categoryId: Category.FoodAndDrink }>;
  viewType: ViewType;
}

/**
 * Card for rendering food and drink review card.
 */
export default function FoodAndDrinkCard({
  review,
  viewType,
}: FoodAndDrinkCardProps) {
  const { rating, reviewText, createdAt, subcontent } = review;
  const { address, title, venue, city, country, cuisines, priceLevel, dishes } =
    subcontent;

  return (
    <div className={`${viewType === ViewType.MAP ? styles.mapPanelCard : ''}`}>
      <div className={styles.title}>
        <ExperienceEmoji review={review} className={styles.categoryEmoji} />
        <h3>
          <MapLinkedTitle title={title} className={styles.mapLinkedTitle} />
        </h3>
        {viewType === ViewType.FEED && (
          <span className={styles.location}>
            {city}, {country}
          </span>
        )}
      </div>
      {viewType === ViewType.MAP && (
        <span className={styles.location}>
          {address}, {city}, {country}
        </span>
      )}
      <DescriptiveRating rating={rating} />
      <div className={styles.tags}>
        {priceLevel && (
          <>
            <DescriptivePriceLevel priceLevel={priceLevel} />
            <span>{' • '}</span>
          </>
        )}
        {dishes.length > 0 && (
          <>
            {dishes.map((dish) => (
              <span key={dish} className={styles.pill}>
                {toTitleCaseFromSnake(dish)}
              </span>
            ))}
            <span>{' • '}</span>
          </>
        )}
        {cuisines.length > 0 && (
          <>
            {cuisines.map((cuisine) => (
              <span key={cuisine} className={styles.pill}>
                {toTitleCaseFromSnake(cuisine)}
              </span>
            ))}
            <span>{' • '}</span>
          </>
        )}
        <span className={styles.pill}>{toTitleCaseFromSnake(venue)}</span>
      </div>
      {viewType === ViewType.MAP ? (
        <p>{reviewText}</p>
      ) : (
        <TruncatedText text={reviewText} />
      )}
      <p className={styles.date}>
        <small>{new Date(createdAt).toLocaleDateString()}</small>
      </p>
    </div>
  );
}
