import React from 'react';
import InformationsWrapper from './InformationsWrapper';
import { Icons } from '@/components/ui/Icons';

const RecentActivityInfo = () => {
  return (
    <InformationsWrapper>
      <div className="">
        <h5 className="text-theme-text-dark flex items-center gap-2 font-medium">
          <Icons.clock className="h-4 w-4" />
          Recent Activity
        </h5>
        <div className="mt-3 flex flex-col gap-1">
          <div className="flex items-center space-x-2">
            <Icons.message className="text-brand-dark h-4 w-4" />
            <div>
              <p className="text-brand-dark text-sm font-normal">
                Current conversation started
              </p>
              <p className="text-theme-text-primary text-xs">Thu</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icons.upload className="text-brand-dark h-4 w-4" />
            <div>
              <p className="text-brand-dark text-sm font-normal">
                Attempted file upload (failed)
              </p>
              <p className="text-theme-text-primary text-xs">Thu</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icons.user_check className="text-brand-dark h-4 w-4" />
            <div>
              <p className="text-brand-dark text-sm font-normal">Signed up</p>
              <p className="text-theme-text-primary text-xs">6/20/2024</p>
            </div>
          </div>
        </div>
      </div>
    </InformationsWrapper>
  );
};

export default RecentActivityInfo;
