interface UploadStatusProps {
  status: string;
}

/**
 * A component for displaying the status of an upload operation.
 * The status message is conditionally styled based on whether it indicates an error.
 *
 * @param {string} props.status - The status message to display. If the message contains "error",
 * it is styled as an error; otherwise, it is styled as a success.
 * @returns {JSX.Element | null} A paragraph element displaying the status message or `null` if no status is provided.
 */
export default function UploadStatus({ status }: UploadStatusProps) {
  if (!status) return null;

  const isError = status.toLowerCase().includes('error');
  return (
    <p
      style={{
        color: isError ? 'red' : 'green',
        wordWrap: 'break-word',
        maxWidth: '50%',
      }}
    >
      {status}
    </p>
  );
}
