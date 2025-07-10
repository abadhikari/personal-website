/* eslint-disable react/jsx-props-no-spreading */
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ContentCategory } from '../../../types/uploadTypes';
import { BookInput, BookSchema } from '../../../validation/schemas';

import * as styles from '../../../styles/UploadContent.module.css';

const BOOK_GENRES: { id: number; name: string }[] = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 3, name: 'Animation' },
  { id: 4, name: 'Comedy' },
  { id: 5, name: 'Crime' },
  { id: 6, name: 'Documentary' },
  { id: 7, name: 'Drama' },
  { id: 8, name: 'Fantasy' },
  { id: 9, name: 'Horror' },
  { id: 10, name: 'Mystery' },
  { id: 11, name: 'Romance' },
  { id: 12, name: 'Sci-Fi' },
  { id: 13, name: 'Thriller' },
  { id: 14, name: 'Western' },
  { id: 15, name: 'Musical' },
  { id: 16, name: 'Biography' },
  { id: 17, name: 'Family' },
  { id: 18, name: 'Sport' },
  { id: 19, name: 'War' },
  { id: 20, name: 'History' },
  { id: 21, name: 'Psychological Thriller' },
  { id: 22, name: 'Anime' },
  { id: 23, name: 'Manga' },
  { id: 24, name: 'Art' },
  { id: 25, name: 'Science' },
  { id: 26, name: 'Classic' },
];

/**
 * Form component for submitting metadata related to books.
 *
 * Includes fields for title, author, page count, publication year, ISBN, and genre(s).
 * Leverages React Hook Form for state management and Zod for schema validation.
 *
 * @param {Function} onSubmit - Callback fired with validated form data
 * @returns {JSX.Element} A form with controlled input fields
 */
export default function BookForm({
  onSubmit,
}: {
  onSubmit: (data: BookInput) => void;
}) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookInput>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      categoryId: ContentCategory.BOOK,
      genreIds: [],
    },
  });

  const err = <K extends keyof BookInput>(k: K) =>
    (errors[k]?.message as string | undefined) ?? '';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">
        Title<span className="required">*</span>
        <input id="title" {...register('title')} />
        {err('title') && <p>{err('title')}</p>}
      </label>

      <label htmlFor="author">
        Author<span className="required">*</span>
        <input id="author" {...register('author')} />
        {err('author') && <p>{err('author')}</p>}
      </label>

      <label htmlFor="pages">
        Page Count<span className="required">*</span>
        <input
          id="pages"
          type="number"
          {...register('pages', { valueAsNumber: true })}
        />
        {err('pages') && <p>{err('pages')}</p>}
      </label>

      <label htmlFor="yearPublished">
        Year Published<span className="required">*</span>
        <input
          id="yearPublished"
          type="number"
          {...register('yearPublished', { valueAsNumber: true })}
        />
        {err('yearPublished') && <p>{err('yearPublished')}</p>}
      </label>

      <label htmlFor="isbn">
        ISBN
        <input id="isbn" {...register('isbn')} />
        {err('isbn') && <p>{err('isbn')}</p>}
      </label>

      <label htmlFor="genreIds">
        Genres<span className="required">*</span>
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
              {BOOK_GENRES.map(({ id, name }) => (
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
