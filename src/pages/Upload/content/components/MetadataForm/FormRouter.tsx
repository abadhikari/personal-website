import { ContentCategory } from '../../../types/uploadTypes';
import { UploadableContent } from '../../../validation/schemas';

import BookForm from './BookForm';
import EntertainmentForm from './EntertainmentForm';
import FoodAndDrinkForm from './FoodAndDrinkForm';

type RouterProps = {
  categoryId: ContentCategory | -1;
  onSubmit: (data: UploadableContent) => void;
};

/**
 * Dynamically renders the appropriate content metadata form
 * based on the selected content category.
 *
 * Delegates submission handling to the provided `onSubmit` callback.
 *
 * @param {ContentCategory | -1} categoryId - The selected content category, or -1 for none
 * @param {Function} onSubmit - Handler called with validated form data
 *
 * @returns {JSX.Element | null} A form component or null if no category is selected
 */
export default function FormRouter({ categoryId, onSubmit }: RouterProps) {
  switch (categoryId) {
    case ContentCategory.FOOD_AND_DRINK:
      return <FoodAndDrinkForm onSubmit={onSubmit} />;
    case ContentCategory.ENTERTAINMENT:
      return <EntertainmentForm onSubmit={onSubmit} />;
    case ContentCategory.BOOK:
      return <BookForm onSubmit={onSubmit} />;
    default:
      return null;
  }
}
