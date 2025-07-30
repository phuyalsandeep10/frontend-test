import { Button } from '@/components/ui/button';
import React from 'react';

const InboxChatInfoProfileInfo = () => {
  return (
    <div className="border-b p-4 text-center">
      <div className="bg-brand-primary border-light-blue mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2">
        <span className="text-xl font-medium text-white">AJ</span>
      </div>
      <h4 className="text-theme-text-dark font-semibold">Alice Johnson</h4>
      <p className="text-theme-text-primary mb-2 text-base leading-[26px] font-normal">
        Innovative Solutions
      </p>
      <Button className="w-full cursor-pointer text-sm">
        <div>{/* Icon is remaining  */}</div>
        <span>View Full Profile</span>
      </Button>
    </div>
  );
};

export default InboxChatInfoProfileInfo;
