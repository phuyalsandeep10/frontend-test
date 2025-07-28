import React from 'react';
import MessageItem from './MessageItem';
import { Message } from '../InboxChatSection';

const MessageList = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="max-h-[calc(100vh-250px)] flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default MessageList;
