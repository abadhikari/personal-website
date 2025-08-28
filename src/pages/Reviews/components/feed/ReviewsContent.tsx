import { useMemo } from 'react';

import { ContentCategory } from '../../../Upload/types/uploadTypes';
import { Review } from '../../types/reviewTypes';
import ViewType from '../../types/viewType';
import SearchBar from '../search/SearchBar';

import CategorySelector from './CategorySelector';
import ReviewsFeed from './ReviewsFeed';

import * as animationStyles from '../../../../styles/animations.module.css';
import * as styles from '../../styles/Reviews.module.css';

type ReviewsContentProps = {
  reviews: Review[];
  activeCategoryId: ContentCategory | null;
  setActiveCategoryId: (next: ContentCategory | null) => void;
};

/**
 * High-level layout component for the Reviews page (feed view).
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Review[]} props.reviews - List of reviews to be passed to the feed.
 * @returns {JSX.Element} A structured layout for the reviews section.
 */
export default function ReviewsContent({
  reviews,
  activeCategoryId,
  setActiveCategoryId,
}: ReviewsContentProps) {
  const headerContent = useMemo(() => {
    switch (activeCategoryId) {
      case ContentCategory.MOVIE:
        return {
          title: 'Movie Reviews',
          subtitle: 'My thoughts on films I’ve watched.',
        };
      case ContentCategory.SHOW:
        return {
          title: 'Show Reviews',
          subtitle: 'Reviews of TV and streaming series.',
        };
      case ContentCategory.BOOK:
        return {
          title: 'Book Reviews',
          subtitle: `Reviews of books I've read.`,
        };
      case ContentCategory.FOOD_AND_DRINK:
        return {
          title: 'Food Reviews',
          subtitle: 'Reviews of restaurants, cafes, bars, etc.',
        };
      case ContentCategory.ENTERTAINMENT:
        return {
          title: 'Entertainment Reviews',
          subtitle: 'Reviews of places like jazz clubs, museums, etc.',
        };
      default:
        return {
          title: 'My Reviews',
          subtitle: "Reviews of places, food, and media I've experienced.",
        };
    }
  }, [activeCategoryId]);

  return (
    <div className={`${styles.reviewsContainer} ${animationStyles.fadeInUp}`}>
      <h1>{headerContent.title}</h1>
      <div className="divider" />
      <p>{headerContent.subtitle}</p>

      <CategorySelector
        value={activeCategoryId}
        onChange={setActiveCategoryId}
      />

      <SearchBar
        reviews={reviews}
        viewType={ViewType.FEED}
        activeCategoryId={activeCategoryId}
      />

      <ReviewsFeed reviews={reviews} />
    </div>
  );
}
