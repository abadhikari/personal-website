/* eslint-disable react/jsx-props-no-spreading */
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ContentCategory } from '../../../types/uploadTypes';
import {
  FoodAndDrinkInput,
  FoodAndDrinkSchema,
} from '../../../validation/schemas';

import ExperienceFields from './ExperienceFields';

import * as styles from '../../../styles/UploadContent.module.css';

interface FoodAndDrinkFormProps {
  onSubmit: (d: FoodAndDrinkInput) => void;
}

export const CUISINES = [
  { id: 1, name: 'American' },
  { id: 2, name: 'Mexican' },
  { id: 3, name: 'Italian' },
  { id: 4, name: 'Chinese' },
  { id: 5, name: 'Japanese' },
  { id: 6, name: 'Korean' },
  { id: 7, name: 'Thai' },
  { id: 8, name: 'Vietnamese' },
  { id: 9, name: 'Indian' },
  { id: 10, name: 'Middle Eastern' },
  { id: 11, name: 'French' },
  { id: 12, name: 'Spanish' },
  { id: 13, name: 'Greek' },
  { id: 14, name: 'Turkish' },
  { id: 15, name: 'Caribbean' },
  { id: 16, name: 'African' },
  { id: 17, name: 'Brazilian' },
  { id: 18, name: 'Vegetarian' },
  { id: 19, name: 'Vegan' },
  { id: 20, name: 'Fusion' },
  { id: 21, name: 'Seafood' },
  { id: 22, name: 'BBQ' },
  { id: 23, name: 'Dessert' },
];

export const DISHES = [
  { id: 1, name: 'Sushi' },
  { id: 2, name: 'Ramen' },
  { id: 3, name: 'Soba' },
  { id: 4, name: 'Udon' },
  { id: 5, name: 'Tempura' },
  { id: 6, name: 'Yakitori' },
  { id: 7, name: 'Ochazuke' },
  { id: 8, name: 'Omakase' },
  { id: 9, name: 'Bibimbap' },
  { id: 10, name: 'Bulgogi' },
  { id: 11, name: 'Kalbi' },
  { id: 12, name: 'Tacos' },
  { id: 13, name: 'Burrito' },
  { id: 14, name: 'Quesadilla' },
  { id: 15, name: 'Pizza' },
  { id: 16, name: 'Pasta' },
  { id: 17, name: 'Risotto' },
  { id: 18, name: 'Lasagna' },
  { id: 19, name: 'Gnocchi' },
  { id: 20, name: 'Paella' },
  { id: 21, name: 'Tapas' },
  { id: 22, name: 'Shawarma' },
  { id: 23, name: 'Falafel' },
  { id: 24, name: 'Biryani' },
  { id: 25, name: 'Masala Dosa' },
  { id: 26, name: 'Pho' },
  { id: 27, name: 'Banh Mi' },
  { id: 28, name: 'Peking Duck' },
  { id: 29, name: 'Dumplings' },
  { id: 30, name: 'Dim Sum' },
  { id: 31, name: 'Momos' },
];

/**
 * Form component for submitting metadata related to food & drink content.
 *
 * This includes common experience fields (e.g., title, location, venue)
 * and a multi-select input for cuisine types. Zod validation is applied
 * using `FoodAndDrinkSchema`, and `react-hook-form` is used for form state.
 *
 * The cuisine select field is controlled via `Controller` to properly handle
 * array input from a `<select multiple>` element.
 *
 * @param {Function} onSubmit - Callback fired with validated form data
 * @returns {JSX.Element} A form with controlled input fields
 */
export default function FoodAndDrinkForm({ onSubmit }: FoodAndDrinkFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FoodAndDrinkInput>({
    resolver: zodResolver(FoodAndDrinkSchema),
    defaultValues: {
      categoryId: ContentCategory.FOOD_AND_DRINK,
      venueId: -1,
      priceLevel: -1,
      cuisineIds: [],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ExperienceFields register={register} errors={errors} />

      <label htmlFor="cuisineIds">
        Cuisine Types<span className="required">*</span>
        <Controller
          name="cuisineIds"
          control={control}
          render={({ field }) => (
            <select
              id="cuisineIds"
              multiple
              size={4}
              value={field.value?.map(String) ?? []}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map(
                  (opt) => parseInt(opt.value, 10)
                );
                field.onChange(selected);
              }}
            >
              {CUISINES.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.cuisineIds && (
          <p>
            {(errors.cuisineIds.message as string) ||
              'Please select one or more cuisines.'}
          </p>
        )}
      </label>

      <label htmlFor="dishIds">
        Dishes
        <Controller
          name="dishIds"
          control={control}
          render={({ field }) => (
            <select
              id="dishIds"
              multiple
              size={4}
              value={field.value?.map(String) ?? []}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map(
                  (opt) => parseInt(opt.value, 10)
                );
                field.onChange(selected);
              }}
            >
              {DISHES.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.dishIds && (
          <p>
            {(errors.dishIds.message as string) ||
              'Please select one or more dishes.'}
          </p>
        )}
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
