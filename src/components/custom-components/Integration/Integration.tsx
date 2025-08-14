'use client';

import Settings from '@/components/custom-components/Settings/Settings';
import React from 'react';
import RecommendedChannel from './RecommendedChannel';
import CRMSection from './CRMSection';
import Marketing from './Marketing';
import Messaging from './Messaging';
import ActiveChannels from './ActiveChannels';

const Integration = () => {
  return (
    <Settings>
      <div className="mb-13.5">
        <h1 className="mb-1 text-[32px] leading-10 font-semibold">
          All Integration
        </h1>
        <p className="text-xs leading-4 font-normal">
          Connect the tool you use everyday.
        </p>
      </div>

      <div className="mb-4">
        <ActiveChannels />
      </div>
      <hr className="bg-gray-light mb-6 h-[1px] border-0" />

      <div className="mb-4">
        <RecommendedChannel />
      </div>
      <hr className="bg-gray-light mb-6 h-[1px] border-0" />

      <div className="mb-4">
        <CRMSection />
      </div>
      <hr className="bg-gray-light mb-6 h-[1px] border-0" />
      <div className="mb-4">
        <Marketing />
      </div>
      <hr className="bg-gray-light mb-6 h-[1px] border-0" />
      <div className="mb-4">
        <Messaging />
      </div>
      <hr className="bg-gray-light mb-6 h-[1px] border-0" />
    </Settings>
  );
};

export default Integration;
