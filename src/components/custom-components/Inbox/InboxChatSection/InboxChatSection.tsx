import React from 'react';
import MessageItem from './MessageList/MessageItem';

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
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default InboxChatSection;
