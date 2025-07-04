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
              <option value={1}>American</option>
              <option value={2}>Mexican</option>
              <option value={3}>Italian</option>
              <option value={4}>Chinese</option>
              <option value={5}>Japanese</option>
              <option value={6}>Korean</option>
              <option value={7}>Thai</option>
              <option value={8}>Vietnamese</option>
              <option value={9}>Indian</option>
              <option value={10}>Middle Eastern</option>
              <option value={11}>French</option>
              <option value={12}>Spanish</option>
              <option value={13}>Greek</option>
              <option value={14}>Turkish</option>
              <option value={15}>Caribbean</option>
              <option value={16}>African</option>
              <option value={17}>Brazilian</option>
              <option value={18}>Vegetarian</option>
              <option value={19}>Vegan</option>
              <option value={20}>Fusion</option>
              <option value={21}>Seafood</option>
              <option value={22}>BBQ</option>
              <option value={23}>Dessert</option>
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
