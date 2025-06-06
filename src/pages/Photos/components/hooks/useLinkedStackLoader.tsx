import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import log from '../../../../utils/logger';
import fetchSingleStack from '../../api/fetchSingleStack';
import { MediaStack } from '../../types/mediaTypes';

import { LinkedStackUrlParams } from './useLinkedStackUrlParams';

/**
 * Loads a linked stack from the backend using a stackId, optionally focusing on a specific mediaId.
 *
 * @param stackId - ID of the stack to load.
 * @param mediaId - Optional ID of the media to focus on.
 * @returns Object containing the loaded stack, focused media index, and a setter to update the stack.
 */
export default function useLinkedStackLoader({
  stackId,
  mediaId,
}: LinkedStackUrlParams): {
  linkedStack: MediaStack | null;
  focusedMediaIndex: number;
  setLinkedStack: React.Dispatch<React.SetStateAction<MediaStack | null>>;
} {
  const [linkedStack, setLinkedStack] = useState<MediaStack | null>(null);
  const [focusedMediaIndex, setFocusedMediaIndex] = useState(0);

  useEffect(() => {
    if (!stackId) return;

    const loadStack = async () => {
      try {
        const stack = await fetchSingleStack(stackId);
        const index = mediaId
          ? stack.media.findIndex((m) => m.mediaId === mediaId)
          : 0;

        setLinkedStack(stack);
        setFocusedMediaIndex(index >= 0 ? index : 0);
      } catch (err) {
        log.error('Error loading linked stack:', err);
        toast.error('Failed to load linked media.');
      }
    };

    loadStack();
  }, [stackId, mediaId]);

  return { linkedStack, focusedMediaIndex, setLinkedStack };
}
