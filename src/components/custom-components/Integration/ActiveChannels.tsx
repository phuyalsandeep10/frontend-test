'use client';

import React from 'react';
import CardComponent from '@/components/custom-components/Integration/CardComponent';
import { activeChannels } from './data';
import HeadingTypography from './HeadingTypography';

const ActiveChannels = () => {
  return (
    <div>
      <HeadingTypography heading="Active Channels" />

      <div className="grid grid-cols-3 gap-[29px]">
        {activeChannels.map((channel, index) => (
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
    </div>
  );
};

export default ActiveChannels;
