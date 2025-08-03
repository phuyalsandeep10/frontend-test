import React from 'react';
import InformationsWrapper from './InformationsWrapper';
import { Icons } from '@/components/ui/Icons';

const RelatedConversationInfo = () => {
  return (
    <InformationsWrapper>
      <div className="">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.message className="h-4 w-4" />

            <span className="text-theme-text-dark font-medium">
              Related Conversations/Tickets
            </span>
          </div>
          <Icons.plus_circle className="text-theme-text-dark h-5 w-5 cursor-pointer" />
        </div>
        <div className="border-theme-text-primary text-theme-text-primary rounded-lg border p-3 text-sm font-normal">
          <p>Investigating file upload issue. Might be a network problem.</p>
        </div>
      </div>
    </InformationsWrapper>
  );
};

export default RelatedConversationInfo;
