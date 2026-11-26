export function readFileForPreview(file: File): Promise<{ url: string; mediaType: 'image' | 'video' }> {
  const isVideo = file.type.startsWith('video/');
  if (isVideo) {
    // Object URLs allow instant playback of large MP4/MOV reels without bloating localStorage
    return Promise.resolve({
      url: URL.createObjectURL(file),
      mediaType: 'video',
    });
  }

  // For images, convert to data URL when under 2.5MB so it persists across page reloads in localStorage
  if (file.size <= 2.5 * 1024 * 1024) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve({ url: reader.result, mediaType: 'image' });
        } else {
          reject(new Error('Could not read image file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  }

  return Promise.resolve({
    url: URL.createObjectURL(file),
    mediaType: 'image',
  });
}
