import getApiEndpoint from '../../../../api/config';
import getToken from '../../../../auth/getToken';
import ApiError from '../../../../errors/ApiError';
import AuthError from '../../../../errors/AuthError';
import log from '../../../../utils/logger';
import { Lookup, LookupType } from '../../types/uploadTypes';

/**
 * Writes a new lookup value of a specific type.
 *
 * @param {LookupType} lookupType - The type of lookup to write (e.g., 'cuisine', 'dish').
 * @param {string} newValue - The new value to insert (already snake_cased).
 * @returns {Promise<Lookup>} The newly created lookup row.
 * @throws {ApiError} If the server response is not OK or the payload is malformed.
 */
export default async function writeLookup(
  lookupType: LookupType,
  newValue: string
): Promise<Lookup> {
  const token = await getToken();
  if (!token) {
    throw new AuthError('Missing authorization token');
  }

  const endpoint = new URL(getApiEndpoint('lookups'), window.location.origin);

  const response = await fetch(endpoint.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ lookupType, newValue }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(
      `POST lookups failed: ${response.status} ${response.statusText} - ${text}`,
      response.status,
      text
    );
  }

  const bodyText = await response.text();
  const parsed = JSON.parse(bodyText);
  const { item, message } = parsed;

  if (!item) {
    throw new ApiError(`Lookup already exists.`, 409, message);
  }

  log.info(
    `event=writeLookup status=success lookupType=${lookupType} value=${newValue}`
  );

  return item;
}
