'use client';

import React, { useState } from 'react';
import ErrorText from '@/components/common/hook-form/ErrorText';
import { Icons } from '@/components/ui/Icons';
import Image from 'next/image';

interface ImageUploaderProps {
  onImagesSelect: (images: string[]) => void;
  previewImages?: string[];
  wrapperClassName?: string;
  labelClickText?: string;
  labelRestText?: string;
  descriptionText?: string;
  label?: string;
}

const MultiImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesSelect,
  previewImages,
  wrapperClassName = 'flex h-[181px] w-[383px] flex-col items-center justify-center rounded-md border',
  labelClickText = 'Click to upload',
  labelRestText = 'or drag and drop SVG, PNG, JPG.',
  descriptionText = 'Upload PNG or JPG files, up to 10 MB each.',
  label,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const acceptedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      if (!acceptedTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid format.`);
        return;
      }
      if (file.size > maxSize) {
        errors.push(`${file.name}: Exceeds 10MB.`);
        return;
      }
      validFiles.push(file);
    });

    if (errors.length > 0) {
      setError(errors.join(' '));
      return;
    }

    setError(null);

    const readers = validFiles.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        }),
    );

    Promise.all(readers).then((imageUrls) => {
      onImagesSelect(imageUrls);
    });
  };

  return (
    <>
      {label && (
        <label className="text-brand-dark font-outfit text-sm leading-[21px] font-semibold">
          {label}
        </label>
      )}
      <div className="mt-2 flex flex-col">
        <div className={`${wrapperClassName} overflow-auto`}>
          {!previewImages || previewImages.length === 0 ? (
            <label
              htmlFor="imageUploadInput"
              className="text-theme-text-dark flex cursor-pointer flex-col items-center gap-2 rounded-[8px] bg-white px-4 py-2.5"
              style={{ userSelect: 'none' }}
            >
              <Icons.download_cloud className="text-brand-primary h-7 w-8" />
              <div className="text-center">
                <span className="text-brand-primary text-lg leading-7 font-semibold underline">
                  {labelClickText}
                </span>{' '}
                <span>{labelRestText}</span>
              </div>
            </label>
          ) : (
            <div className="flex flex-wrap gap-3 p-2">
              {previewImages.map((img, idx) => (
                <Image
                  key={idx}
                  width={64}
                  height={64}
                  src={img}
                  alt={`Preview ${idx}`}
                  className="h-[64px] w-[64px] rounded-md border object-cover"
                />
              ))}
            </div>
          )}

          <input
            id="imageUploadInput"
            type="file"
            accept="image/png, image/jpeg"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {descriptionText && (
          <p className="pt-[11px] text-[12px] leading-[17px]">
            {descriptionText}
          </p>
        )}

        {error && <ErrorText error={error} />}
      </div>
    </>
  );
};
export default MultiImageUploader;
