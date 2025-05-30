import getApiEndpoint from '../../../api/config';

interface EditStackParams {
  stackId: string;
  caption?: string | null;
  location?: string | null;
  token: string | null;
}

/**
 * Edits metadata (caption, location) of a stack by stackId using your authenticated API.
 *
 * @param {EditStackParams} params - The stack edit parameters.
 * @returns {Promise<void>} Resolves on success or throws an error on failure.
 */
export default async function editStack({
  stackId,
  caption,
  location,
  token,
}: EditStackParams): Promise<void> {
  if (!token) {
    throw new Error('Missing authorization token');
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
    throw new Error(
      `Edit failed: ${response.status} ${response.statusText} - ${text}`
    );
  }

  console.log(`Successfully edited stack ${stackId}`);
}
