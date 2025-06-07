import getApiEndpoint from '../../../api/config';
import log from '../../../utils/logger';
import ApiError from '../../../errors/ApiError';
import AuthError from '../../../errors/AuthError';

interface DeleteMediaParams {
  stackId: string;
  mediaId?: string | null;
  token: string;
}

/**
 * Deletes a media item by stackId and (optionally) mediaId using your authenticated API.
 *
 * @param params.stackId - The ID of the stack to delete from.
 * @param params.mediaId - The ID of the specific media item to delete (optional).
 * @param params.token - The token for authorization.
 */
export default async function deleteMedia({
  stackId,
  mediaId,
  token,
}: DeleteMediaParams): Promise<void> {
  if (!token) {
    throw new AuthError('Missing authorization token');
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

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(`DELETE /media failed: ${response.status} ${response.statusText}`, response.status, text);
  }
  
  log.info('event=deleteMedia status=success', { stackId, mediaId: mediaId ?? 'null' });
}
