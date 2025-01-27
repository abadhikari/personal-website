import { MediaStack } from './types';

/**
 * Fetches photo stacks from the API with optional parameters for customization.
 *
 * @param {Object} params - The optional parameters for the API call.
 * @param {number} [params.stackLimit=10] - The maximum number of stacks to fetch.
 * @param {number} [params.startTimestamp=0] - The earliest timestamp to include.
 * @param {number} [params.endTimestamp=9999999999999] - The latest timestamp to include.
 * @returns {Promise<MediaStack[]>} A promise resolving to an array of media stacks.
 */
export default async function fetchPhotos({
  stackLimit = 9,
  startTimestamp = 0,
  endTimestamp = 9999999999999,
}: {
  stackLimit?: number;
  startTimestamp?: number;
  endTimestamp?: number;
} = {}): Promise<MediaStack[]> {
  const response = await fetch(
    `https://reoonusak1.execute-api.us-east-1.amazonaws.com/prod/v1/media?stackLimit=${stackLimit}&startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}`
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.stackAndMediaData;
}
