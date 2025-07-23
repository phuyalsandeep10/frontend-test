'use client';
import { AlertDialogDemo } from '@/components/modal/AlertModal';
import Link from 'next/link';
import Image from 'next/image';
import Alert from '@/assets/images/Alert.svg';
import { useState } from 'react';

export default function Home() {
  const [open, setOpen] = useState(true);

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
          isOpen={open}
          onOpenChange={setOpen}
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
          subheading="This action is immediate and cannot be undone. Your paid plans will be cancelled and paid 
access will be lost."
          cancelText="Cancel"
          actionText="Confirm & Delete"
          onCancel={() => setOpen(false)}
          onAction={() => {
            console.log('Deleted!');
            setOpen(false);
          }}
        />

        <AlertDialogDemo
          isOpen={open}
          onOpenChange={setOpen}
          descriptionClassName="text-black"
          heading="Are you sure?"
          subheading="Turning on 2FA will add an extra layer of security to your account. This action will make your account more secure from attempts of unauthorized access."
          cancelText="Cancel"
          actionText="Turn on 2FA"
          onCancel={() => setOpen(false)}
          onAction={() => {
            console.log('Deleted!');
            setOpen(false);
          }}
        />

        <AlertDialogDemo
          isOpen={open}
          onOpenChange={setOpen}
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
          subheading="Turning on 2FA will add an extra layer of security to your account. This action will make your account more secure from attempts of unauthorized access."
          cancelText="Cancel"
          actionText="Turn on 2FA"
          onCancel={() => setOpen(false)}
          onAction={() => {
            console.log('Deleted!');
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
}
