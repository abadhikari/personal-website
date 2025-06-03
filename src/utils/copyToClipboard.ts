import log from './logger';

/**
 * Attempts to copy a given string to the user's clipboard.
 *
 * Uses the modern `navigator.clipboard.writeText` API if available.
 * Falls back to using a hidden `<textarea>` element and `document.execCommand('copy')`
 * for broader browser support.
 *
 * @param {string} copyContent - The string content to copy to the clipboard.
 * @returns {Promise<boolean>} - Resolves to `true` if copying succeeded, `false` otherwise.
 */
export default async function copyToClipboard(
  copyContent: string
): Promise<boolean> {
  try {
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function'
    ) {
      await navigator.clipboard.writeText(copyContent);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = copyContent;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (!success) throw new Error('Fallback copy failed');
    }

    return true;
  } catch (err) {
    log.error('Copy to clipboard failed:', err);
    return false;
  }
}
