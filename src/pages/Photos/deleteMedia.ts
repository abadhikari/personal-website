/**
 * Deletes a media item by stackId and (optionally) mediaId using your authenticated API.
 *
 * @param {string} stackId - The ID of the stack to delete from.
 * @param {string | null} mediaId - The ID of the specific media item to delete (optional).
 * @param {string} token - The Cognito ID token for authorization.
 * @returns {Promise<void>} Resolves on success or throws an error on failure.
 */
export default async function deleteMedia({
  stackId,
  mediaId,
  token,
}: {
  stackId: string;
  mediaId?: string | null;
  token: string | null;
}): Promise<void> {
  const endpoint = process.env.MEDIA_BASE_ENDPOINT;
  if (!endpoint) throw new Error('MEDIA_BASE_ENDPOINT is not defined');

  const url = new URL(endpoint);
  url.searchParams.append('stackId', stackId);
  if (mediaId) url.searchParams.append('mediaId', mediaId);

  const response = await fetch(url.toString(), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Delete failed: ${response.status} ${response.statusText} - ${text}`
    );
  }
}
