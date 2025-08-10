import React from 'react';
import MessageItem from './MessageItem';
import { Message } from '../InboxChatSection';

interface MessageListProps {
  messages: Message[];
  onReply: (messageText: string) => void;
}

const MessageList = ({ messages, onReply }: MessageListProps) => {
  return (
    <div className="flex-1 space-y-4 p-4">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} onReply={onReply} />
      ))}
    </div>
  );
};

export default MessageList;
