'use client';
import React from 'react';
import HeaderComponent from '@/components/custom-components/Billings/Plans&Subscriptions/HeaderComponent';
import ActivePlansComponent from '@/components/custom-components/Billings/Plans&Subscriptions/ActivePlansComponent';
import Settings from '@/components/custom-components/Settings/Settings';
import { Icons } from '@/components/ui/Icons';

const Page = () => {
  return (
    <Settings>
      <div className="font-outfit">
        <div className="pb-6">
          <HeaderComponent
            heading="Plans & Subscriptions"
            icon={<Icons.help className="text-theme-text-primary h-6 w-6" />}
          />
          <ActivePlansComponent />
        </div>
      </div>
    </Settings>
  );
};

export default Page;
