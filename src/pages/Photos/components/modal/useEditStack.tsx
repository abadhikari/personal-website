import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { MediaStack } from '../../types';
import editStack from '../../editStack';

interface UseEditStackParams {
  stack: MediaStack;
  selectedIndex: number;
  setStacks: React.Dispatch<React.SetStateAction<MediaStack[]>>;
  token: string | null;
  onFinish?: () => void;
}

/**
 * Hook for managing the edit flow of a media stack.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {MediaStack} params.stack - The currently selected stack.
 * @param {number} params.selectedIndex - Index of the selected stack in the stack array.
 * @param {Function} params.setStacks - Setter to update the full media stack list.
 * @param {string} params.token - Auth token for the API request.
 * @param {Function} [params.onFinish] - Optional callback invoked after a successful edit.
 *
 * @returns {Object} Editing state and handlers.
 * @returns {boolean} return.isEditing - Whether the modal is in editing mode.
 * @returns {string} return.editedCaption - Current caption input value.
 * @returns {Function} return.setEditedCaption - Setter for caption.
 * @returns {string} return.editedLocation - Current location input value.
 * @returns {Function} return.setEditedLocation - Setter for location.
 * @returns {Function} return.setIsEditing - Toggle editing mode.
 * @returns {Function} return.saveEdit - Handler to commit the edit.
 */
export default function useEditStack({
  stack,
  selectedIndex,
  setStacks,
  token,
  onFinish,
}: UseEditStackParams) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(stack.stack.caption);
  const [editedLocation, setEditedLocation] = useState(
    stack.stack.location || ''
  );

  useEffect(() => {
    setEditedCaption(stack.stack.caption);
    setEditedLocation(stack.stack.location || '');
  }, [stack]);

  const saveEdit = useCallback(async () => {
    try {
      await editStack({
        stackId: stack.stack.stackId,
        caption: editedCaption,
        location: editedLocation,
        token,
      });

      setStacks((prev) => {
        const updated = [...prev];
        updated[selectedIndex] = {
          ...updated[selectedIndex],
          stack: {
            ...updated[selectedIndex].stack,
            caption: editedCaption,
            location: editedLocation,
          },
        };
        return updated;
      });

      setIsEditing(false);
      onFinish?.();
    } catch (err) {
      console.error('Failed to edit stack:', err);
      toast.error('Failed to edit stack. Please try again.');
    }
  }, [
    editedCaption,
    editedLocation,
    stack,
    selectedIndex,
    setStacks,
    token,
    onFinish,
  ]);

  return {
    isEditing,
    editedCaption,
    setEditedCaption,
    editedLocation,
    setEditedLocation,
    setIsEditing,
    saveEdit,
  };
}
