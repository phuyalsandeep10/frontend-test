import { X } from 'lucide-react';
import React from 'react';

const InboxChatInfoHeader = () => {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <h3 className="text-theme-text-dark font-medium">Customer Details</h3>
      <div className="text-gray-light hover:text-gray-dark">
        <X className="h-5 w-5" />
      </div>
    </div>
  );
};

export default InboxChatInfoHeader;
