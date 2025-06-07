import getApiEndpoint from '../../../api/config';
import log from '../../../utils/logger';
import ApiError from '../../../errors/ApiError';
import AuthError from '../../../errors/AuthError';

interface EditStackParams {
  stackId: string;
  caption?: string | null;
  location?: string | null;
  token: string;
}

/**
 * Edits metadata (caption, location) of a stack by stackId using your authenticated API.
 *
 * @param {EditStackParams} params - The stack edit parameters.
 */
export default async function editStack({
  stackId,
  caption,
  location,
  token,
}: EditStackParams): Promise<void> {
  if (!token) {
    throw new AuthError('Missing authorization token');
  }

  const params = new URLSearchParams({ stackId });
  const endpoint = getApiEndpoint(`stack?${params.toString()}`);

  const body: Record<string, string> = {};
  if (caption != null) body.caption = caption;
  if (location != null) body.location = location;

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(
      `PATCH stack failed: ${response.status} ${response.statusText} - ${text}`, response.status, text
    );
  }

  log.info('event=editStack status=success', {
  stackId,
  ...(caption != null && { caption }),
  ...(location != null && { location }),
});
}
