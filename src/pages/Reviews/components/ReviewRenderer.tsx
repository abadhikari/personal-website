import { Review } from '../types/reviewTypes';

import BookCard from './cards/BookCard';
import EntertainmentCard from './cards/EntertainmentCard';
import FoodAndDrinkCard from './cards/FoodAndDrinkCard';

interface ReviewRendererProps {
  review: Review;
}

/**
 * Dynamically renders a review card based on its category.
 *
 * @param {Review} review - Review with subcontent depending on category.
 * @returns The appropriate card component or null.
 */
export default function ReviewRenderer({ review }: ReviewRendererProps) {
  const { categoryId } = review;

  switch (categoryId) {
    case 3:
      return <BookCard review={review as Extract<Review, { categoryId: 3 }>} />;
    case 4:
      return (
        <FoodAndDrinkCard
          review={review as Extract<Review, { categoryId: 4 }>}
        />
      );
    case 5:
      return (
        <EntertainmentCard
          review={review as Extract<Review, { categoryId: 5 }>}
        />
      );
    default:
      return null;
  }
}
