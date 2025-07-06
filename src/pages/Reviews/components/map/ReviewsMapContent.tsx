import { Review } from '../../types/reviewTypes';

import ReviewsMap from './ReviewsMap';

import * as animationStyles from '../../../../styles/animations.module.css';
import * as styles from '../../styles/ReviewsMap.module.css';

type ReviewsMapContentProps = {
  reviews: Review[];
};

/**
 * Displays a full-width animated map of reviews.
 *
 * @param {Object} props - Component props.
 * @param {Review[]} props.reviews - List of reviews to render as map markers.
 * @returns {JSX.Element} The animated and styled map section.
 */
export default function ReviewsMapContent({ reviews }: ReviewsMapContentProps) {
  return (
    <section
      className={`${styles.fullWidthMapSection} ${animationStyles.fadeInUp}`}
    >
      <div className={styles.reviewsMapContainer}>
        <ReviewsMap reviews={reviews} />
      </div>
    </section>
  );
}
