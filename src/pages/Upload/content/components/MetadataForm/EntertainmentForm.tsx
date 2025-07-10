import { Controller, useForm } from 'react-hook-form';
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

const EXPERIENCE_GENRES: { id: number; name: string }[] = [
  { id: 1, name: 'Art' },
  { id: 2, name: 'Modern Art' },
  { id: 3, name: 'Contemporary' },
  { id: 4, name: 'Renaissance' },
  { id: 5, name: 'Photography' },
  { id: 6, name: 'History' },
  { id: 7, name: 'Natural History' },
  { id: 8, name: 'Science' },
  { id: 9, name: 'Archaeology' },
  { id: 10, name: 'Religious' },
  { id: 11, name: 'Design' },
  { id: 12, name: 'Fashion' },
  { id: 13, name: 'War' },
  { id: 14, name: 'Technology' },
  { id: 15, name: 'Sculpture' },
  { id: 16, name: 'Installation' },
  { id: 17, name: 'Digital Art' },
  { id: 18, name: 'Solo Exhibition' },
  { id: 19, name: 'Electronic' },
  { id: 20, name: 'Indie' },
  { id: 21, name: 'DJ Set' },
  { id: 22, name: 'Zen' },
  { id: 23, name: 'Botanical' },
];

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

      <label htmlFor="genreIds">
        Genres
        <Controller
          name="genreIds"
          control={control}
          render={({ field }) => (
            <select
              id="genreIds"
              multiple
              size={6}
              value={field.value?.map(String) ?? []}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map(
                  (opt) => parseInt(opt.value, 10)
                );
                field.onChange(selected);
              }}
            >
              {EXPERIENCE_GENRES.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          )}
        />
        {err('genreIds') && <p>{err('genreIds')}</p>}
      </label>

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
