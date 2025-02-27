/**
 * Extracts a thumbnail image from the first frame of a given video file.
 *
 * @param {File} file - The video file from which to extract a thumbnail.
 * @param {number} currentTime - the time to be used for the thumbnail.
 * @returns {Promise<File>} - A Promise that resolves with a File object containing the extracted thumbnail image.
 * @throws {Error} If the video fails to load, the canvas is unsupported, or the thumbnail extraction fails.
 */
export default function extractThumbnailFromVideo(
  file: File,
  currentTime: number
): Promise<File> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const url = URL.createObjectURL(file);

    video.style.display = 'none';
    document.body.appendChild(video);

    video.src = url;
    video.load();

    video.addEventListener('loadedmetadata', () => {
      video.currentTime = currentTime;
    });

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Canvas not supported.'));
        return;
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Use canvas.toBlob (async) instead of toDataURL
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to convert canvas to Blob.'));
          return;
        }

        // Wrap the Blob in a File object (optional but often handy)
        const fileNameWithoutExtension =
          file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        const thumbnailFile = new File(
          [blob],
          `${fileNameWithoutExtension}_thumbnail.jpg`,
          {
            type: 'image/jpeg',
          }
        );

        // Cleanup
        URL.revokeObjectURL(url);
        document.body.removeChild(video);

        resolve(thumbnailFile);
      }, 'image/png');
    });

    video.addEventListener('error', () => {
      reject(new Error('Failed to load video.'));
    });
  });
}
