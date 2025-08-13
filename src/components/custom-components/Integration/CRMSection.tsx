'use client';

import React from 'react';
import CardComponent from '@/components/custom-components/Integration/CardComponent';
import { crmChannels } from './data';
import HeadingTypography from './HeadingTypography';
import ViewDetails from './ViewDetails';

const CRMSection = () => {
  return (
    <div className="w-full">
      <HeadingTypography heading="CRM" />

      <div className="grid grid-cols-3 gap-[29px]">
        {crmChannels.map((channel, index) => (
          <CardComponent
            key={index}
            image={channel.image}
            name={channel.name}
            price={channel.price}
            description={channel.description}
            websiteUrl={channel.websiteUrl}
          />
        ))}
      </div>

      <ViewDetails />
    </div>
  );
};

export default CRMSection;
