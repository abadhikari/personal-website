import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ContentCategory } from '../../../types/uploadTypes';
import {
  EntertainmentInput,
  EntertainmentSchema,
} from '../../../validation/schemas';

import ExperienceFields from './ExperienceFields';

import * as styles from '../../../styles/UploadContent.module.css';

interface EntertainmentFormProps {
  onSubmit: (d: EntertainmentInput) => void;
}

/**
 * Form component for submitting metadata related to entertainment content.
 *
 * This includes common experience fields (e.g., title, location, venue)
 * and applies Zod validation using `EntertainmentSchema`.
 *
 * @param {Function} onSubmit - Callback fired with validated form data
 * @returns {JSX.Element} A form with controlled input fields
 */
export default function EntertainmentForm({
  onSubmit,
}: EntertainmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EntertainmentInput>({
    resolver: zodResolver(EntertainmentSchema),
    defaultValues: {
      categoryId: ContentCategory.ENTERTAINMENT,
      venueId: -1,
      priceLevel: -1,
    } as EntertainmentInput,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ExperienceFields register={register} errors={errors} />

      <button
        type="submit"
        className={styles.uploadButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Uploading…' : 'Upload'}
      </button>
    </form>
  );
}
