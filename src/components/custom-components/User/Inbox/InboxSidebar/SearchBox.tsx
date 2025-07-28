import { Icons } from '@/components/ui/Icons';
import { Input } from '@/components/ui/input';
import React from 'react';

const SearchBox = () => {
  return (
    <div className="mt-[26px]">
      <div className="relative">
        <Icons.search className="text-gray-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          type="text"
          placeholder="Search Conversation..."
          className="bg-brand-disable text-theme-text-primary border-theme-text-light w-full rounded-lg border py-2.5 pr-2.5 pl-10 text-xs focus:ring-0 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBox;
