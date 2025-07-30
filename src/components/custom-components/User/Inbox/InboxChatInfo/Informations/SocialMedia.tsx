import React from 'react';
import InformationsWrapper from './InformationsWrapper';
import { Icons } from '@/components/ui/Icons';

const SocialMedia = () => {
  return (
    <InformationsWrapper>
      <div className="">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.dashboard className="text-brand-dark h-4 w-4" />
            <span className="text-theme-text-dark font-medium">
              Social media
            </span>
          </div>
          <Icons.plus_circle className="text-theme-text-dark h-5 w-5 cursor-pointer" />
        </div>
        <div className="mt-3 flex gap-2">
          <div>
            <Icons.instagram />
          </div>
          <div>
            <Icons.facebook />
          </div>
          <div>
            <Icons.twitter />
          </div>
          <div>
            <Icons.linkedin />
          </div>
        </div>
      </div>
    </InformationsWrapper>
  );
};

export default SocialMedia;
