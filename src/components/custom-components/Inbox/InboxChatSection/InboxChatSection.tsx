import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageList/MessageItem';
import LanguageSelector from './LanguageSelector';
import InboxChatSectionHeader from './InboxChatSectionHeader';
import { useUiStore } from '@/store/UiStore/useUiStore';

export interface Message {
  id: number;
  sender: 'agent' | 'customer';
  message: string;
  time: string;
  date?: string;
}

interface InboxChatSectionProps {
  messages: Message[];
  onReply: (messageText: string) => void;
}

const InboxChatSection = ({ messages, onReply }: InboxChatSectionProps) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { openChatInfo } = useUiStore();

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  console.log(messages);

  return (
    <div className="flex-1 p-4">
      <InboxChatSectionHeader onOpen={openChatInfo} />
      <LanguageSelector />
      <div className="max-h-[calc(100vh-380px)] min-h-[calc(100vh-380px)] space-y-4 overflow-y-auto py-10">
        {messages?.map((message, index) => (
          <MessageItem key={index} message={message} onReply={onReply} />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default InboxChatSection;
