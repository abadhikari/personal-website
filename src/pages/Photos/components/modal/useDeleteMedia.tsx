import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import deleteMedia from '../../deleteMedia';
import { MediaStack } from '../../types';

interface UseDeleteMediaParams {
  selectedStack: MediaStack;
  selectedStackIndex: number;
  selectedMediaIndex: number;
  setStacks: React.Dispatch<React.SetStateAction<MediaStack[]>>;
  token: string | null;
  onClose: () => void;
}

/**
 * Hook that encapsulates the logic for deleting a media item from a stack.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {MediaStack} params.selectedStack - The stack the media belongs to.
 * @param {number} params.selectedStackIndex - Index of the stack.
 * @param {number} params.selectedMediaIndex - Index of the media.
 * @param {Function} params.setStacks - State setter for the stack list.
 * @param {string} params.token - Authorization token.
 * @param {Function} params.onClose - Function to call if the modal should be closed (e.g., no media remains).
 *
 * @returns {Function} deleteMedia - Async handler to delete the focused media from the stack.
 */
export default function useDeleteMedia({
  selectedStack,
  selectedStackIndex,
  selectedMediaIndex,
  setStacks,
  token,
  onClose,
}: UseDeleteMediaParams) {
  return useCallback(async () => {
    try {
      const { mediaId } = selectedStack.media[selectedMediaIndex];
      await deleteMedia({
        stackId: selectedStack.stack.stackId,
        mediaId,
        token,
      });

      setStacks((prev) => {
        const newStacks = [...prev];
        const stack = { ...newStacks[selectedStackIndex] };
        stack.media = stack.media.filter((m) => m.mediaId !== mediaId);

        if (stack.media.length === 0) {
          newStacks.splice(selectedStackIndex, 1);
          onClose();
          toast.success('Media Deleted.');
        } else {
          newStacks[selectedStackIndex] = stack;
        }

        return newStacks;
      });
    } catch (err) {
      console.error('Failed to delete media:', err);
      toast.error('Failed to delete media. Please try again.');
    }
  }, [selectedStack, selectedStackIndex, setStacks, token, onClose]);
}
