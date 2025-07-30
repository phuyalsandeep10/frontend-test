import React from 'react';
import InformationsWrapper from './InformationsWrapper';
import { Icons } from '@/components/ui/Icons';
import { Badge } from '@/components/ui/badge';

const TagsInfo = () => {
  return (
    <InformationsWrapper>
      <div className="">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.tag className="text-brand-dark h-4 w-4" />
            <span className="text-theme-text-dark font-medium">Tags</span>
          </div>
          <Icons.plus_circle className="text-theme-text-dark h-5 w-5 cursor-pointer" />
        </div>
        <div className="mt-3 flex gap-2">
          <Badge className="bg-brand-primary rounded-full px-2 text-sm font-semibold text-white">
            VIP
          </Badge>
          <Badge className="bg-brand-primary rounded-full px-2 text-sm font-semibold text-white">
            Sales Lead
          </Badge>
        </div>
      </div>
    </InformationsWrapper>
  );
};

export default TagsInfo;
