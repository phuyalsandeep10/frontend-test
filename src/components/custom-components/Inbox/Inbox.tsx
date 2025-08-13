'use client';
import React, { useEffect, useRef, useState } from 'react';
import SubSidebarContentWrapper from '../CustomSidebar/SubSidebarContentWrapper';
import InboxChatSection from './InboxChatSection/InboxChatSection';
import InboxChatInfo from './InboxChatInfo/InboxChatInfo';
import InboxSubSidebar from './InboxSidebar/InboxSubSidebar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import io from 'socket.io-client';
import { useParams } from 'next/navigation';
import { useUiStore } from '@/store/UiStore/useUiStore';
import ChatEmptyScreen from './ChatEmptyScreen/ChatEmptyScreen';

const socket = io('http://localhost:4000');

interface Message {
  id: number;
  sender: 'agent' | 'customer';
  message: string;
  time: string;
  date?: string;
}

const Inbox = () => {
  const params = useParams();
  const chatId = params?.userId;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const { showChatInfo } = useUiStore();

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'customer',
        message: 'Hello, I need help with my order.',
        time: '10:00',
      },
      {
        id: 2,
        sender: 'agent',
        message: 'Sure! Could you provide your order ID?',
        time: '10:01',
      },
    ]);
  }, []);

  useEffect(() => {
    if (!chatId) return;

    socket.emit('joinChat', chatId);

    const handleNewMessage = (msg: any) => {
      console.log('Message from server', msg);
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [chatId]);

  const onSend = () => {
    const text = inputRef.current?.value;
    if (text) {
      console.log('Text:', text);
      const messageId = crypto.randomUUID();
      const msg = {
        messageId,
        chatId,
        user: 'Me',
        message: text,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'sent',
        sender: 'customer',
        replyTo: replyingTo,
      };

      setMessages((prev) => [...prev, msg]);
      socket.emit('sendMessage', msg);
      if (inputRef.current) inputRef.current.value = '';
      setReplyingTo(null);
    }
  };

  const handleReply = (messageText: string) => {
    setReplyingTo(messageText);
  };

  const clearReply = () => {
    setReplyingTo(null);
  };

  return (
    <div className="flex">
      <SubSidebarContentWrapper className="w-[306px]">
        <div className="flex-1">
          <InboxSubSidebar />
        </div>
      </SubSidebarContentWrapper>

      {chatId ? (
        <>
          <div className="flex-1">
            <InboxChatSection messages={messages} onReply={handleReply} />
            <div className="relative m-4">
              <div className="relative">
                {replyingTo && (
                  <div className="bg bg-brand-disable absolute top-2 right-2 left-2 z-10 flex w-fit items-center justify-between rounded-md border px-4 py-2 text-black">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-black">Replying to:</span>
                      <span className="text-theme-text-primary max-w-[200px] truncate text-xs font-medium">
                        {replyingTo}
                      </span>
                    </div>
                    <button
                      onClick={clearReply}
                      className="text-theme-text-primary hover:text-brand-dark ml-2 text-sm"
                    >
                      ×
                    </button>
                  </div>
                )}

                <Textarea
                  placeholder="Enter your message here"
                  className={`h-24 resize-none ${replyingTo ? 'pt-14' : 'pt-3'}`}
                  ref={inputRef}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      const text = inputRef.current?.value || '';
                      onSend();
                    }
                  }}
                />
              </div>

              <div className="mt-3 flex justify-end">
                <Button onClick={onSend}>{'Send'}</Button>
              </div>
            </div>
          </div>
          {showChatInfo && (
            <div className="w-[400px]">
              <InboxChatInfo />
            </div>
          )}
        </>
      ) : (
        <ChatEmptyScreen />
      )}
    </div>
  );
};

export default Inbox;
