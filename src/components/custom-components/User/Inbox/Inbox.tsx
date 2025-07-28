'use client';
import React from 'react';
import SubSidebarContentWrapper from '../CustomUserSidebar/SubSidebarContentWrapper';
import InboxChatSection from './InboxChatSection/InboxChatSection';
import InboxChatInfo from './InboxChatInfo/InboxChatInfo';
import InboxSubSidebar from './InboxSidebar/InboxSubSidebar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Inbox = () => {
  return (
    <div className="flex">
      <SubSidebarContentWrapper className="w-[306px]">
        <div className="flex">
          <div>
            <InboxSubSidebar />
          </div>
        </div>
      </SubSidebarContentWrapper>

      <div className="flex-1">
        <InboxChatSection />
        <div className="m-4">
          <div>
            <Textarea placeholder="Enter your message here" className="h-24" />
          </div>
          <div className="mt-3 flex justify-end">
            <Button className="">Send</Button>
          </div>
        </div>
      </div>
      <div className="w-[400px]">
        <InboxChatInfo />
      </div>
    </div>
  );
};

export default Inbox;
