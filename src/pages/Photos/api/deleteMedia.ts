import getApiEndpoint from '../../../api/config';
import log from '../../../utils/logger';

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
  if (!token) {
    throw new Error('Missing authorization token');
  }

  const params = new URLSearchParams({
    stackId,
  });
  if (mediaId) params.append('mediaId', mediaId);

  const endpoint = getApiEndpoint(`media?${params.toString()}`);

  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  log.info(
    `Successfully deleted item of stackId ${stackId} and mediaId ${mediaId}`
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Delete failed: ${response.status} ${response.statusText} - ${text}`
    );
  }
}
