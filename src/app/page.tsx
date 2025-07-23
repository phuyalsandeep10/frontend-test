'use client';
import {
  AlertDialogDemo,
  AlertDialogDemoRef,
} from '@/components/modal/AlertModal';
import Link from 'next/link';
import Image from 'next/image';
import Alert from '@/assets/images/Alert.svg';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const dialogRef = useRef<AlertDialogDemoRef>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [actionIsLoading, setActionIsLoading] = useState(false);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.open();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  const handleAction = () => {
    setActionIsLoading(true);
    setTimeout(() => {
      console.log('Deleted!');
      setActionIsLoading(false);
      setIsOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

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

        <AlertDialogDemo
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
        />
      </div>
    </div>
  );
}
