import React from 'react';

interface FileInputProps {
  onFileSelect: (file: File) => void;
  inputClassName: string;
  buttonClassName: string;
}

/**
 * A component for selecting files from the user's device. The component
 * consists of a styled button to trigger the file input dialog and a hidden file
 * input element that handles the file selection.
 *
 * @param {(file: File) => void} props.onFileSelect - Callback function triggered when a file is selected.
 * @param {string} props.inputClassName - Class name applied to the file input element for custom styling.
 * @param {string} props.buttonClassName - Class name applied to the button element for custom styling.
 * @returns {JSX.Element} The rendered file input component.
 */
export default function FileInput({
  onFileSelect,
  inputClassName,
  buttonClassName,
}: FileInputProps) {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  };

  return (
    <>
      <button
        className={buttonClassName}
        type="button"
        onClick={triggerFileInput}
      >
        Select from device
      </button>

      <input
        id="fileInput"
        type="file"
        multiple
        onChange={handleFileSelect}
        className={inputClassName}
      />
    </>
  );
}
