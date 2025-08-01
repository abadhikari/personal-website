import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ContentCategory, LookupType } from '../../../types/uploadTypes';
import {
  EntertainmentInput,
  EntertainmentSchema,
} from '../../../validation/schemas';
import LookupsSearch from '../LookupSearch/LookupSearch';

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
    control,
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

  const err = <K extends keyof EntertainmentInput>(k: K) =>
    (errors[k]?.message as string | undefined) ?? '';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ExperienceFields register={register} errors={errors} />

      <label htmlFor="genreIds-input"> Genres </label>
      <Controller
        name="genreIds"
        control={control}
        render={({ field }) => (
          <LookupsSearch
            lookupType={LookupType.EXPERIENCE_GENRE}
            onSelect={(selectedItems) => {
              field.onChange(selectedItems.map((item) => item.id));
            }}
            placeholder="Search genres"
            inputId="genreIds-input"
          />
        )}
      />
      {err('genreIds') && <p>{err('genreIds')}</p>}

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
