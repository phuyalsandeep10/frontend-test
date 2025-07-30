import React from 'react';
import InformationsWrapper from './InformationsWrapper';
import { Icons } from '@/components/ui/Icons';

const RecentlyViewPagesInfo = () => {
  return (
    <InformationsWrapper>
      <div className="">
        <div className="text-theme-text-dark flex items-center gap-2 font-medium">
          <Icons.message className="h-4 w-4" />

          <span className="text-theme-text-dark font-semibold">
            Recently Viewed pages
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          <div className="border-theme-text-primary rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <Icons.contact_line className="text-theme-text-primary h-4 w-4" />
              <div>
                <div className="text-brand-dark text-sm font-medium">
                  Contact page
                </div>
                <div className="text-theme-text-primary text-xs">
                  Jul 17, 2025, 10:40 AM
                </div>
              </div>
            </div>
          </div>
          <div className="border-theme-text-primary rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <Icons.contact_line className="text-theme-text-primary h-4 w-4" />
              <div>
                <div className="text-brand-dark text-sm font-medium">
                  Add to the Cart Page
                </div>
                <div className="text-theme-text-primary text-xs">
                  Jul 17, 2025, 10:40 AM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InformationsWrapper>
  );
};

export default RecentlyViewPagesInfo;
