import { Review } from '../types/reviewTypes';

import ReviewsMap from './ReviewsMap';

import * as animationStyles from '../../../styles/animations.module.css';
import * as styles from '../styles/ReviewsMap.module.css';

type ReviewsMapContentProps = {
  reviews: Review[];
};

/**
 * ReviewsMapContent wraps the ReviewsMap component in layout and animation containers.
 * It ensures full-width display and fade-in animation for the map panel.
 *
 * @param {ReviewsMapContentProps} props - Component props.
 * @param {Review[]} props.reviews - The array of reviews to display on the map.
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
