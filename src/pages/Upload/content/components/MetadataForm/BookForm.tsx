/* eslint-disable react/jsx-props-no-spreading */
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ContentCategory } from '../../../types/uploadTypes';
import { BookInput, BookSchema } from '../../../validation/schemas';

import * as styles from '../../../styles/UploadContent.module.css';

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
      genres: [],
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
          name="genres"
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
              <option value={1}>Action</option>
              <option value={2}>Adventure</option>
              <option value={3}>Animation</option>
              <option value={4}>Comedy</option>
              <option value={5}>Crime</option>
              <option value={6}>Documentary</option>
              <option value={7}>Drama</option>
              <option value={8}>Fantasy</option>
              <option value={9}>Horror</option>
              <option value={10}>Mystery</option>
              <option value={11}>Romance</option>
              <option value={12}>Sci-Fi</option>
              <option value={13}>Thriller</option>
              <option value={14}>Western</option>
              <option value={15}>Musical</option>
              <option value={16}>Biography</option>
              <option value={17}>Family</option>
              <option value={18}>Sport</option>
              <option value={19}>War</option>
              <option value={20}>History</option>
              <option value={21}>Psychological Thriller</option>
              <option value={22}>Anime</option>
              <option value={23}>Manga</option>
              <option value={24}>Art</option>
              <option value={25}>Science</option>
              <option value={26}>Classic</option>
            </select>
          )}
        />
        {err('genres') && <p>{err('genres')}</p>}
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
