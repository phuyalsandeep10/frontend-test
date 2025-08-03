'use client';

import React from 'react';
import { Icons } from '../ui/Icons';

interface ImageUploaderProps {
  onImageSelect: (imageDataUrl: string) => void;
  icon?: React.ReactNode; // custom icon passed as prop
  wrapperClassName?: string; // to customize outer div
  labelClickText?: string;
  labelRestText?: string;
  descriptionText?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  icon,
  wrapperClassName = 'flex h-[181px] w-[383px] flex-col items-center justify-center rounded-md border',
  labelClickText = 'Click to upload',
  labelRestText = 'or drag and drop SVG, PNG, JPG.',
  descriptionText = 'Upload a PNG and JPG, up to 10 MB.',
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType = ['image/jpeg', 'image/png'].includes(file.type);
    const isValidSize = file.size <= 10 * 1024 * 1024;

    if (!isValidType) {
      alert('Only PNG and JPG formats are allowed.');
      return;
    }

    if (!isValidSize) {
      alert('Image size should not exceed 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        onImageSelect(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col">
      <div className={wrapperClassName}>
        <label
          htmlFor="imageUploadInput"
          className="flex cursor-pointer flex-col items-center gap-3 rounded-[8px] bg-white px-4 py-3 text-[#18181B] hover:border-blue-500"
          style={{ userSelect: 'none' }}
        >
          {icon ? <div>{icon}</div> : <Icons.upload />}

          <div className="text-center">
            <span className="text-brand-primary text-[18px] leading-[29px] font-semibold underline">
              {labelClickText}
            </span>{' '}
            <span>{labelRestText}</span>
          </div>
        </label>

        <input
          id="imageUploadInput"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {descriptionText && (
        <p className="pt-[11px] text-[12px] leading-[17px]">
          {descriptionText}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
