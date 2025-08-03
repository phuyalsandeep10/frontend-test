import React from 'react';
import Logo from '../../../../assets/images/logo.svg';
import AuthLeftImage from '../../../../assets/images/authLeftImage.svg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AuthLayoutLeftSection = () => {
  return (
    <div className="bg-light">
      <div className="pb-6">
        <div className="flex justify-between ps-10 pt-10 pr-10">
          <Image src={Logo} className="h-[45px] w-[145px]" alt="Logo" />
          <Button className="border-brand-primary text-theme-text-dark cursor-pointer rounded-lg border bg-transparent text-base font-semibold shadow-none hover:bg-transparent">
            Help & Support
          </Button>
        </div>
        <div className="mt-[111px] mb-[66px]">
          <Image
            src={AuthLeftImage}
            alt=""
            className="mx-auto h-[549px] object-cover"
          />
        </div>
        <h3 className="font-outfit text-brand-dark mx-auto w-full text-center text-[32px] leading-10 font-semibold md:w-[517px]">
          AI Powered Chat like never seen before, Check Magic Reply.
        </h3>
        <div className="mt-[111px] flex items-center justify-center gap-1">
          <Link
            href={''}
            className="text-theme-text-primary hover:text-brand-dark cursor-pointer text-xs font-normal"
          >
            Terms of services
          </Link>
          <span className="text-theme-text-primary"> | </span>{' '}
          <Link
            href={''}
            className="text-theme-text-primary hover:text-brand-dark cursor-pointer text-xs font-normal"
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutLeftSection;
