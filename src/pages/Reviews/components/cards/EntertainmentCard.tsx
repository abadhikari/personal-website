import toTitleCaseFromSnake from '../../../../utils/toTitleCaseFromSnake';
import { Category, Review } from '../../types/reviewTypes';
import ViewType from '../../types/viewType';

import DescriptivePriceLevel from './DescriptivePriceLevel';
import DescriptiveRating from './DescriptiveRating';
import ExperienceEmoji from './ExperienceEmoji';
import MapLinkedTitle from './MapLinkedTitle';
import TruncatedText from './TruncatedText';

import * as styles from '../../styles/ReviewCards.module.css';

interface EntertainmentCardProps {
  review: Extract<Review, { categoryId: Category.Entertainment }>;
  viewType: ViewType;
}

/**
 * Card for rendering entertainment experience review card.
 */
export default function EntertainmentCard({
  review,
  viewType,
}: EntertainmentCardProps) {
  const { rating, reviewText, createdAt, subcontent } = review;
  const { address, title, venue, city, country, priceLevel, genres } =
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
        {priceLevel && <DescriptivePriceLevel priceLevel={priceLevel} />}
        <span>{' • '}</span>
        {genres.length > 0 && (
          <>
            {genres.map((genre) => (
              <span key={genre} className={styles.pill}>
                {toTitleCaseFromSnake(genre)}
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
