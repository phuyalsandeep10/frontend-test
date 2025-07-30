import React from 'react';
import InformationsWrapper from './InformationsWrapper';
import { Icons } from '@/components/ui/Icons';

const GeneralInfo = () => {
  return (
    <InformationsWrapper>
      <div className="">
        <h5 className="text-theme-text-dark flex items-center gap-2 font-medium">
          <Icons.error_warning className="h-4 w-4" />
          General Information
        </h5>
        <div className="flex flex-col gap-1">
          <div className="mt-3 flex items-center gap-1">
            <span className="text-brand-dark text-sm leading-21 font-semibold">
              Location:
            </span>
            <span className="text-brand-dark text-sm font-normal">
              New York, USA
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-brand-dark text-sm leading-21 font-semibold">
              Last Active:
            </span>
            <span className="text-brand-dark text-sm font-normal">Friday</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-brand-dark text-sm leading-21 font-semibold">
              Local Time:
            </span>
            <span className="text-brand-dark text-sm font-normal">
              00:55:08 AM (UTC+2)
            </span>
          </div>
        </div>
      </div>
    </InformationsWrapper>
  );
};

export default GeneralInfo;
