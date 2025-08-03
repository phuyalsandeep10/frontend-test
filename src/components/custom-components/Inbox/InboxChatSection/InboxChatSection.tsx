import React from 'react';
import MessageItem from './MessageList/MessageItem';
import LanguageSelector from './LanguageSelector';
import InboxChatSectionHeader from './InboxChatSectionHeader';

export interface Message {
  id: number;
  sender: 'agent' | 'customer';
  message: string;
  time: string;
  date?: string;
}

interface InboxChatSectionProps {
  messages: Message[];
}

const InboxChatSection = ({ messages }: InboxChatSectionProps) => {
  return (
    <div className="flex-1 p-4">
      <InboxChatSectionHeader />
      <LanguageSelector />
      <div className="max-h-[calc(100vh-250px)] min-h-[calc(100vh-250px)] space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default InboxChatSection;
