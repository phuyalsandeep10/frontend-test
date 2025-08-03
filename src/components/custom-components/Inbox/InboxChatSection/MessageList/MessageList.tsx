import React from 'react';
import MessageItem from './MessageItem';
import { Message } from '../InboxChatSection';

const MessageList = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex-1 space-y-4 p-4">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default MessageList;
