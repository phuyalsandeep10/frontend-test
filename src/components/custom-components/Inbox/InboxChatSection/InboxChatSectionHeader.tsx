import { Icons } from '@/components/ui/Icons';
import React from 'react';

interface InboxChatSectionHeaderProps {
  onOpen: () => void;
}

const InboxChatSectionHeader: React.FC<InboxChatSectionHeaderProps> = ({
  onOpen,
}) => {
  return (
    <div className="flex items-center justify-between border-b bg-white p-4">
      <div className="flex items-center space-x-3">
        <div className="bg-gray-light flex h-10 w-10 items-center justify-center rounded-full">
          <span className="text-theme-text-dark text-sm font-medium">AJ</span>
        </div>
        <div>
          <h2 className="text-theme-text-dark font-medium">Alice Johnson</h2>
          <p className="text-theme-text-dark text-sm">
            alice.johnson@example.com
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="bg-success-light flex items-center space-x-2 rounded-lg px-3 py-2">
          <div className="bg-success-prominent flex h-5 w-5 items-center justify-center rounded-full">
            <Icons.check className="h-3 w-3 text-white" />
          </div>
          <span className="text-success text-sm font-medium">Solved</span>
        </div>
        <button className="text-gray-light" onClick={onOpen}>
          <Icons.chevron_left className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default InboxChatSectionHeader;
