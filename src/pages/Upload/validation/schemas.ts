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

export const BookSchema = z.object({
  categoryId: z.literal(ContentCategory.BOOK),
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  pages: z.number().int().positive('Pages must be a positive number'),
  yearPublished: z
    .number()
    .int()
    .min(0, 'Invalid year')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  isbn: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^[\d-]+$/.test(val),
      'ISBN must be numeric or hyphenated'
    ),
  genres: z.array(z.number().int()).min(1, 'Select at least one genre'),
});

export const AnyContentSchema = z.discriminatedUnion('categoryId', [
  FoodAndDrinkSchema,
  EntertainmentSchema,
  BookSchema,
]);

export type FoodAndDrinkInput = z.infer<typeof FoodAndDrinkSchema>;
export type EntertainmentInput = z.infer<typeof EntertainmentSchema>;
export type BookInput = z.infer<typeof BookSchema>;
export type AnyContentInput = z.infer<typeof AnyContentSchema>;

export type UploadableContent =
  | FoodAndDrinkInput
  | EntertainmentInput
  | BookInput;
