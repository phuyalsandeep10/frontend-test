'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import VisitorTable from '@/components/custom-components/Visitors/VisitorTable';
import Heading from '@/components/custom-components/Visitors/Heading';
import CurrentVisitors from '@/components/custom-components/Visitors/CurrentVisitors';
import { Icons } from '@/components/ui/Icons';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingMapSkeleton = () => (
  <div className="h-[541px] w-full">
    <Skeleton className="h-full w-full rounded-md" />
  </div>
);

const VisitorMap = dynamic(
  () => import('@/components/custom-components/Visitors/VisitorMap'),
  {
    ssr: false,
    loading: () => <LoadingMapSkeleton />,
  },
);

const page = () => {
  return (
    <div className="mx-[112px]">
      <div className="mb-[32px]">
        <Heading
          title="Visitors"
          description="Track and engage with visitors on your website in real-time."
          icon={<Icons.help className="text-theme-text-primary h-6 w-6" />}
        />
        <VisitorMap
          visitors={[
            { lat: 27.7172, lng: 85.324, count: 15 },
            { lat: 38.9072, lng: -77.0369, count: 40 },
            { lat: -6.2088, lng: 106.8456, count: 7 },
            { lat: 55.7558, lng: 37.6173, count: 22 },
          ]}
        />
      </div>
      <div>
        <div className="mb-[40px]">
          <CurrentVisitors
            title="Current Visitors"
            description="See who is currently browsing your website and initiate conversations."
            highlightText="26 Active Visitors"
            buttonText="12% Increased"
            buttonIcon={<Icons.arrow_up_circle />}
          />
        </div>
        <div className="mb-20">
          <VisitorTable />
        </div>
      </div>
    </div>
  );
};

export default page;
