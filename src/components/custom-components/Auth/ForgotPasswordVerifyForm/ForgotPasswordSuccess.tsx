import Image from 'next/image';
import React from 'react';
import passwordChanged from '@/assets/images/passwordChanged.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SuccessScreenProps {
  text: string;
  subText: string;
  redirectLink: string;
}
const SuccessScreen = ({ text, subText, redirectLink }: SuccessScreenProps) => {
  return (
    <div className="mx-auto flex flex-col items-center pb-20 lg:mx-0 lg:w-[489px]">
      <Image
        src={passwordChanged}
        height={300}
        width={489}
        alt="image"
        className="pb-[32px]"
      />

      <p className="text-brand-pressed w-full pb-[8px] text-center text-[32px] leading-[40px] font-semibold tracking-[-0.05px]">
        {text}
      </p>

      <p className="text-theme-text-primary w-full pb-[40px] text-center text-lg leading-[29px] font-semibold">
        {subText}
      </p>

      <Link href={`${redirectLink}`} className="w-full">
        <Button variant="default" size="lg" className="w-full">
          Go to login
        </Button>
      </Link>
    </div>
  );
};

export default SuccessScreen;
