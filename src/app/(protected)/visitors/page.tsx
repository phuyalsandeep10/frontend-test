'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import HelpIcon from '@/assets/images/HelpIcon.svg';
import { Button } from '@/components/ui/button';
import arrowup from '@/assets/images/arrowUp.svg';
import VisitorTable from '@/components/custom-components/User/VisitorsPage/VisitorTable';

const VisitorMap = dynamic(
  () => import('@/components/custom-components/User/VisitorsPage/VisitorMap'),
  {
    ssr: false,
  },
);

const page = () => {
  return (
    <div className="mx-[112px] mb-[214px]">
      <div className="mt-[44px] mb-[40px]">
        <div className="flex gap-[8px]">
          <h1 className="pb-[4px] text-[32px] leading-[40px] font-semibold tracking-tight">
            Visitors
          </h1>
          <Image src={HelpIcon} alt="helpicon" />
        </div>
        <p
          className="text-theme-text-primary text-[12px] leading-[17px]"
          style={{ letterSpacing: '0.002em' }}
        >
          Track and engage with visitors on your website in real-time.
        </p>
      </div>
      <div className="mb-[32px]">
        <VisitorMap visitors={{ NPL: 15, USA: 40, IDN: 7, RUS: 30 }} />
      </div>
      <div>
        <div className="mb-[40px]">
          <div className="flex justify-between">
            <p
              className="text-brand-dark text-[20px] leading-[30px] font-semibold"
              style={{ letterSpacing: '-0.001em' }}
            >
              Current Visitors
            </p>
            <Button
              variant="success"
              leftIcon={<Image src={arrowup} alt="arrow up" />}
            >
              12% Increased
            </Button>
          </div>
          <p
            className="text-theme-text-primary mb-[8px] text-[12px] leading-[17px]"
            style={{ letterSpacing: '0.002em' }}
          >
            See who is currently browsing your website and initiate
            conversations.
          </p>
          <p className="text-brand-dark text-[14px] leading-[21px] font-semibold">
            26 Active Visitors
          </p>
        </div>
        <VisitorTable />
      </div>
    </div>
  );
};

export default page;
