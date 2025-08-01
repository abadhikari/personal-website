/* eslint-disable react/jsx-props-no-spreading */
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ContentCategory, LookupType } from '../../../types/uploadTypes';
import {
  FoodAndDrinkInput,
  FoodAndDrinkSchema,
} from '../../../validation/schemas';
import LookupSearch from '../LookupSearch/LookupSearch';

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

      <label htmlFor="cuisineIds-input">
        Cuisine Types<span className="required">*</span>
      </label>
      <Controller
        name="cuisineIds"
        control={control}
        render={({ field }) => (
          <LookupSearch
            lookupType={LookupType.CUISINE}
            onSelect={(selectedItems) => {
              field.onChange(selectedItems.map((item) => item.id));
            }}
            placeholder="Search cuisines"
            inputId="cuisineIds-input"
          />
        )}
      />
      {errors.cuisineIds && (
        <p>
          {(errors.cuisineIds.message as string) ||
            'Please select one or more cuisines.'}
        </p>
      )}

      <label htmlFor="dishIds-input"> Dishes </label>
      <Controller
        name="dishIds"
        control={control}
        render={({ field }) => (
          <LookupSearch
            lookupType={LookupType.DISH}
            onSelect={(selectedItems) => {
              field.onChange(selectedItems.map((item) => item.id));
            }}
            placeholder="Search dishes"
            inputId="dishIds-input"
          />
        )}
      />
      {errors.dishIds && (
        <p>
          {(errors.dishIds.message as string) ||
            'Please select one or more dishes.'}
        </p>
      )}

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
