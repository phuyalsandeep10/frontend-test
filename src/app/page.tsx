'use client';

import {
  // AlertDialogDemo,
  AlertDialogDemoRef,
} from '@/components/modal/AlertModal';
import Link from 'next/link';
import Image from 'next/image';
import Alert from '@/assets/images/Alert.svg';
import { useEffect, useRef, useState, useCallback } from 'react';
import ZoomImageModal from '@/components/modal/ZoomImageModal';
import ChangePasswordModal from '@/components/modal/ChangePassword/ChangePasswordModal';
import { Button } from '@/components/ui/button';
import AuthenticatorModal from '@/components/modal/Authenticator/AuthenticatorModal';


export default function Home() {
  console.log("success fully home page")
  // const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
  //   x: number;
  //   y: number;
  //   width: number;
  //   height: number;
  // } | null>(null);

  // const onCropComplete = useCallback(
  //   (
  //     croppedArea: any,
  //     croppedAreaPixels: {
  //       x: number;
  //       y: number;
  //       width: number;
  //       height: number;
  //     },
  //   ) => {
  //     setCroppedAreaPixels(croppedAreaPixels);
  //   },
  //   [],
  // );

  // const getCroppedImg = useCallback(
  //   async (
  //     imageSrc: string,
  //     pixelCrop: { x: number; y: number; width: number; height: number },
  //   ) => {
  //     if (!imageSrc) {
  //       throw new Error('No image source provided');
  //     }

  //     const image = new window.Image();
  //     image.src = imageSrc;
  //     await new Promise((resolve, reject) => {
  //       image.onload = resolve;
  //       image.onerror = () => reject(new Error('Failed to load image'));
  //     });

  //     const canvas = document.createElement('canvas');
  //     const ctx = canvas.getContext('2d');
  //     if (!ctx) {
  //       throw new Error('Could not get canvas context');
  //     }

  //     canvas.width = pixelCrop.width;
  //     canvas.height = pixelCrop.height;

  //     ctx.drawImage(
  //       image,
  //       pixelCrop.x,
  //       pixelCrop.y,
  //       pixelCrop.width,
  //       pixelCrop.height,
  //       0,
  //       0,
  //       pixelCrop.width,
  //       pixelCrop.height,
  //     );

  //     return canvas.toDataURL('image/jpeg');
  //   },
  //   [],
  // );

  // const handleSave = useCallback(
  //   async (imageSrc: string) => {
  //     if (!croppedAreaPixels) {
  //       return;
  //     }

  //     try {
  //       const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
  //       console.log('Cropped Image Data URL:', croppedImage);

  //       const link = document.createElement('a');
  //       link.href = croppedImage;
  //       link.download = 'cropped-image.jpg';
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     } catch (error) {}
  //   },
  //   [croppedAreaPixels, getCroppedImg],
  // );

  // const dialogRef = useRef<AlertDialogDemoRef>(null);
  // const [isOpen, setIsOpen] = useState(false);
  // const [actionIsLoading, setActionIsLoading] = useState(false);

  // useEffect(() => {
  //   if (dialogRef.current) {
  //     if (isOpen) {
  //       dialogRef.current.open();
  //     } else {
  //       dialogRef.current.close();
  //     }
  //   }
  // }, [isOpen]);

  // const handleAction = () => {
  //   setActionIsLoading(true);
  //   setTimeout(() => {
  //     console.log('Deleted!');
  //     setActionIsLoading(false);
  //     setIsOpen(false);
  //   }, 3000);
  // };

  // const handleCancel = () => {
  //   setIsOpen(false);
  // };

  return (
    <div>
      <h1>Home page</h1>
      <div className="m-6">
        <Link href={'/login'} className="cursor-pointer text-indigo-400">
          Login
        </Link>
        <Link
          href={'/register'}
          className="ml-6 cursor-pointer text-indigo-400"
        >
          Register
        </Link>

        {/* <AlertDialogDemo
          ref={dialogRef}
          icon={
            <Image
              src={Alert}
              alt="Alert Icon"
              width={14}
              height={14}
              className="text-alert-prominent mt-0.5"
            />
          }
          descriptionClassName="text-alert-prominent"
          heading="Are you sure?"
          subheading="This action is immediate and cannot be undone. Your paid plans will be cancelled and paid access will be lost."
          cancelText="Cancel"
          actionText="Confirm & Delete"
          onCancel={handleCancel}
          onAction={handleAction}
          actionIsLoading={actionIsLoading}
          cancelButtonProps={{
            variant: 'secondary',
            size: 'sm',
          }}
          actionButtonProps={{
            variant: 'destructive',
            size: 'sm',
          }}
        /> */}

        {/* <ZoomImageModal
          heading="Change Profile Picture"
          subHeading="Crop"
          cancelText="Cancel"
          actionText="Save"
          cancelButtonProps={{ variant: 'secondary', size: 'sm' }}
          actionButtonProps={{ variant: 'default', size: 'sm' }}
          onCropComplete={onCropComplete}
          onSave={handleSave}
        /> */}
      </div>
    </div>
  );
}
