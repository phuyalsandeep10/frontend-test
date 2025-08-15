'use client';
import React from 'react';
import SlaTable from './SlaTable';

interface SlaProps {
  slaList: any[];
}

export default function SLA({ slaList }: SlaProps) {
  return (
    <>
      <div>
        <h1 className="font-outfit text-brand-dark text-xl font-semibold">
          SLA (Service Level Agreement)
        </h1>
        <p className="font-outfit text-brand-dark mt-1 text-xs font-normal">
          Define the maximum allowed time for the first reply (Response Time)
          and the time within which the issue must be completely resolved
          (Resolution Time). These times are crucial for maintaining service
          quality.
        </p>
      </div>
      <div className="mt-5">
        <SlaTable slaList={slaList} />
      </div>
    </>
  );
}
