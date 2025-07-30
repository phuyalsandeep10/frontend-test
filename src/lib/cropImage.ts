export const getCroppedImg = (
  imageSrc: string,
  pixelCrop: { width: number; height: number; x: number; y: number },
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return reject('Failed to create canvas context');

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );

      const base64Image = canvas.toDataURL('image/jpeg');
      resolve(base64Image);
    };

    image.onerror = () => {
      reject('Failed to load image');
    };
  });
};
