import React, { useEffect, useRef } from 'react';
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
  onOpenChatInfo: () => void;
  onReply: (messageText: string) => void;
}

const InboxChatSection = ({
  messages,
  onOpenChatInfo,
  onReply,
}: InboxChatSectionProps) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 p-4">
      <InboxChatSectionHeader onOpen={onOpenChatInfo} />
      <LanguageSelector />
      <div className="max-h-[calc(100vh-380px)] min-h-[calc(100vh-380px)] space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} onReply={onReply} />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default InboxChatSection;
