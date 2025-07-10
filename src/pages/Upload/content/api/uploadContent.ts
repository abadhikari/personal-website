import getApiEndpoint from '../../../../api/config';
import getToken from '../../../../auth/getToken';
import ApiError from '../../../../errors/ApiError';
import AuthError from '../../../../errors/AuthError';
import log from '../../../../utils/logger';
import {
  BookPayload,
  ContentCategory,
  EntertainmentPayload,
  FoodAndDrinkPayload,
} from '../../types/uploadTypes';
import {
  BookInput,
  EntertainmentInput,
  FoodAndDrinkInput,
  UploadableContent,
} from '../../validation/schemas';

type WriteRequest =
  | {
      categoryId: ContentCategory.FOOD_AND_DRINK;
      payload: FoodAndDrinkPayload;
    }
  | {
      categoryId: ContentCategory.BOOK;
      payload: BookPayload;
    }
  | {
      categoryId: ContentCategory.ENTERTAINMENT;
      payload: EntertainmentPayload;
    };

/**
 * Sends a structured write request to the backend's content API.
 *
 * @param {WriteRequest} writeRequest - The content metadata and category to be uploaded
 *
 * @throws {AuthError} If no valid token is found
 * @throws {ApiError} If the API returns a non-2xx response
 *
 * @returns {Promise<void>} Resolves on successful upload
 */
export async function postToContentApi(
  writeRequest: WriteRequest
): Promise<void> {
  const token = await getToken();
  if (!token) {
    throw new AuthError('Missing authorization token');
  }

  const endpoint = getApiEndpoint(`content`);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(writeRequest),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(
      `POST content failed: ${response.status} ${response.statusText} - ${text}`,
      response.status,
      text
    );
  }

  log.info('event=writeContent status=success', {
    writeRequest,
  });
}

/**
 * Uploads a Food & Drink content entry to the backend.
 *
 * Constructs the payload from `FoodAndDrinkInput` and routes it through
 * the content API.
 *
 * @param {FoodAndDrinkInput} input - Validated form data for a food-related venue
 *
 * @returns {Promise<void>} Resolves when the content is uploaded
 */
export async function uploadFoodAndDrinkContent(
  input: FoodAndDrinkInput
): Promise<void> {
  const payload = {
    title: input.title,
    address: input.address,
    city: input.city,
    state: input.state,
    venueId: input.venueId,
    country: input.country,
    latitude: input.latitude,
    longitude: input.longitude,
    priceLevel: input.priceLevel,
    cuisineIds: input.cuisineIds,
    dishIds: input.dishIds,
  };

  const request = { categoryId: input.categoryId, payload };
  return postToContentApi(request);
}

/**
 * Uploads an Entertainment content entry to the backend.
 *
 * Constructs the payload from `EntertainmentInput` and routes it through
 * the content API.
 *
 * @param {EntertainmentInput} input - Validated form data for an entertainment venue
 *
 * @returns {Promise<void>} Resolves when the content is uploaded
 */
export async function uploadEntertainmentInput(
  input: EntertainmentInput
): Promise<void> {
  const payload = {
    title: input.title,
    address: input.address,
    city: input.city,
    state: input.state,
    venueId: input.venueId,
    country: input.country,
    latitude: input.latitude,
    longitude: input.longitude,
    priceLevel: input.priceLevel,
    genreIds: input.genreIds,
  };

  const request = { categoryId: input.categoryId, payload };
  return postToContentApi(request);
}

/**
 * Uploads a Book content entry to the backend.
 *
 * @param {BookInput} input - Validated form data for a book
 * @returns {Promise<void>} Resolves when the content is uploaded
 */
export async function uploadBookInput(input: BookInput): Promise<void> {
  const payload = {
    title: input.title,
    author: input.author,
    pages: input.pages,
    yearPublished: input.yearPublished,
    isbn: input.isbn,
    genreIds: input.genreIds,
  };

  const request = { categoryId: input.categoryId, payload };
  return postToContentApi(request);
}

/**
 * Delegates upload to the correct function based on content category.
 *
 * This is the main entry point for submitting content from the frontend form.
 *
 * @param {UploadableContent} data - Validated form data for any supported category
 *
 * @returns {Promise<void>} Resolves on successful upload
 *
 * @throws {Error} If an unsupported content category is provided
 */
export default async function uploadContent(
  data: UploadableContent
): Promise<void> {
  switch (data.categoryId) {
    case ContentCategory.FOOD_AND_DRINK:
      return uploadFoodAndDrinkContent(data);
    case ContentCategory.ENTERTAINMENT:
      return uploadEntertainmentInput(data);
    case ContentCategory.BOOK:
      return uploadBookInput(data);
    default:
      throw new Error(
        `Unhandled content category: ${(data satisfies never) ? 'never' : JSON.stringify(data)}`
      );
  }
}
