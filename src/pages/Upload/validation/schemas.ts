import { z } from 'zod';

import { ContentCategory } from '../types/uploadTypes';

const BaseExperience = z.object({
  title: z.string().min(1, 'Title is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  latitude: z.number({ invalid_type_error: 'Latitude required' }),
  longitude: z.number({ invalid_type_error: 'Longitude required' }),
  venueId: z.number().int().min(1, 'Select a venue'),
  priceLevel: z.number().int().min(1, 'Select price level'),
});

export const FoodAndDrinkSchema = BaseExperience.extend({
  categoryId: z.literal(ContentCategory.FOOD_AND_DRINK),
  cuisineIds: z.array(z.number().int()).optional(),
});

export const EntertainmentSchema = BaseExperience.extend({
  categoryId: z.literal(ContentCategory.ENTERTAINMENT),
});

export const AnyContentSchema = z.discriminatedUnion('categoryId', [
  FoodAndDrinkSchema,
  EntertainmentSchema,
]);

export type FoodAndDrinkInput = z.infer<typeof FoodAndDrinkSchema>;
export type EntertainmentInput = z.infer<typeof EntertainmentSchema>;
export type AnyContentInput = z.infer<typeof AnyContentSchema>;

export type UploadableContent = FoodAndDrinkInput | EntertainmentInput;
