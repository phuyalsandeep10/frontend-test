'use client';

import React from 'react';
import CardComponent from '@/components/custom-components/Integration/CardComponent';
import { messagingChannels } from './data';
import HeadingTypography from './HeadingTypography';
import ViewDetails from './ViewDetails';

const Messaging = () => {
  return (
    <div className="w-full">
      <HeadingTypography heading="Messaging" />

      <div className="grid grid-cols-3 gap-[29px]">
        {messagingChannels.map((channel, index) => (
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

export default Messaging;
