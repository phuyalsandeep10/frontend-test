import { X } from 'lucide-react';
import React from 'react';

interface InboxChatInfoHeaderProps {
  onClose: () => void;
}

const InboxChatInfoHeader: React.FC<InboxChatInfoHeaderProps> = ({
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <h3 className="text-theme-text-dark font-medium">Customer Details</h3>
      <button
        className="text-gray-light hover:text-gray-dark"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default InboxChatInfoHeader;
