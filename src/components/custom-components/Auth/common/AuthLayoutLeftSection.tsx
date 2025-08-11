import React from 'react';
import Logo from '../../../../assets/images/logo.svg';
import AuthLeftImage from '../../../../assets/images/authLeftImage.svg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AuthLayoutLeftSection = () => {
  return (
    <div className="bg-light box-border hidden flex-col justify-between lg:flex">
      <div className="flex justify-between ps-10 pt-10 pr-10">
        <Image src={Logo} className="h-[45px] w-[145px]" alt="Logo" />
        <Button
          variant={'outline'}
          size={'sm'}
          className="hover:text-brand-primary hover:bg-transparent"
        >
          Help & Support
        </Button>
      </div>
      <div className="2xl:mx-auto">
        <Image src={AuthLeftImage} alt="" className="flex-1" />
      </div>
      <div>
        <h3 className="font-outfit text-brand-dark mx-auto w-full text-center leading-10 font-semibold md:w-[517px] md:px-4 md:text-2xl xl:text-[32px]">
          AI Powered Chat like never seen before, Check Magic Reply.
        </h3>
        <div className="flex items-center justify-center gap-1 md:mt-0 xl:mt-[40px]">
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
