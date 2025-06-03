import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import getBaseUrl from '../../../../../utils/getBaseUrl';
import copyToClipboard from '../../../../../utils/copyToClipboard';

interface UseShareLinkParams {
  stackId: string;
  mediaId: string;
}

/**
 * Hook that generates and handles copying a shareable link to a specific media item within a stack.
 *
 * @param {UseShareLinkParams} params - The parameters required to generate the share link.
 * @param {string} params.stackId - The ID of the stack being shared.
 * @param {string} params.mediaId - The ID of the specific media item within the stack.
 *
 * @returns {Object} Share link state and handler functions.
 * @returns {string} return.shareUrl - The full shareable URL pointing to the stack/media.
 * @returns {Function} return.handleCopy - Function to copy the share link to the clipboard with feedback.
 * @returns {boolean} return.copied - Indicates whether the share link was recently copied.
 */
export default function useShareLink({ stackId, mediaId }: UseShareLinkParams) {
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    return `${getBaseUrl()}/photos?stackId=${stackId}&mediaId=${mediaId}`;
  }, [stackId, mediaId]);

  const handleCopy = useCallback(async () => {
    try {
      await copyToClipboard(shareUrl);

      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link.');
    }
  }, [shareUrl]);

  return {
    shareUrl,
    handleCopy,
    copied,
  };
}
