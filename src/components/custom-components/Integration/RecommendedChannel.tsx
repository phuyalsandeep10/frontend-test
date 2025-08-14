'use client';

import React from 'react';
import CardComponent from '@/components/custom-components/Integration/CardComponent';
import { recommendedChannels } from './data';
import ViewDetails from './ViewDetails';
import HeadingTypography from './HeadingTypography';

const RecommendedChannels = () => {
  return (
    <div className="w-full">
      <HeadingTypography heading="Recommended Channel" />

      <div className="grid grid-cols-3 gap-[29px]">
        {recommendedChannels.map((channel, index) => (
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

export default RecommendedChannels;
