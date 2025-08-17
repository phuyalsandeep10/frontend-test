'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSocket } from '@/context/socket.context';
import { useUiStore } from '@/store/UiStore/useUiStore';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import SubSidebarContentWrapper from '../CustomSidebar/SubSidebarContentWrapper';
import ChatEmptyScreen from './ChatEmptyScreen/ChatEmptyScreen';
import InboxChatInfo from './InboxChatInfo/InboxChatInfo';
import InboxChatSection from './InboxChatSection/InboxChatSection';
import InboxSubSidebar from './InboxSidebar/InboxSubSidebar';

// const socket = io('http://localhost:4000');

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
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [message, setMessage] = useState('');

  const { showChatInfo } = useUiStore();
  const { socket, playSound } = useSocket();

  useEffect(() => {
    if (!chatId || !socket) return;

    socket.emit('join_conversation', { conversation_id: 1 });
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

    // socket.emit('joinChat', chatId);

    const handleNewMessage = (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('receive-message', (data) => {
      console.log({ data });
      playSound();
    });
    socket.on('typing', () => {
      console.log('typing ...');
    });
    socket.on('stop-typing', () => {
      console.log('stop typing...');
    });

    return () => {
      socket.emit('leave_conversation', { conversation_id: 1 });
    };
  }, [chatId, socket, playSound]);

  const onSend = () => {
    const text = inputRef.current?.value;
    if (!socket) return;
    if (text) {
      console.log('Text:', text);

      // typing: stop on send
      // socket.emit('stop-typing');
      setIsTyping(false);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
        setTypingTimeout(null);
      }
      const messageId = crypto.randomUUID();
      const msg = {
        uuid: messageId,
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

      socket.emit('message', {
        message: msg,
        mode: 'message',
        organization_id: 1,
        conversation_id: 1,
      });
      emitStopTyping();
      setMessages((prev) => [...prev, { msg: message, from: socket.id }]);
      setMessage('');
      // socket.emit('sendMessage', msg);
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

  const emitTyping = (message: string) => {
    if (!socket) return;
    socket.emit('typing', { message, mode: 'typing' });
  };
  const emitStopTyping = () => {
    if (!socket) return;
    socket.emit('stop_typing');
  };

  return (
    <div className="flex">
      <SubSidebarContentWrapper className="w-[306px]">
        <div className="flex">
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
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (!socket) return;

                    if (!isTyping) {
                      setIsTyping(true);

                      // socket.emit('message', { message, mode: 'typing' });
                      emitTyping(e.target.value);
                    }

                    if (typingTimeout) clearTimeout(typingTimeout);

                    const timeout = setTimeout(() => {
                      setIsTyping(false);
                      // socket.emit('message', { message, mode: 'stop-typing' });
                      emitStopTyping();
                    }, 2000);

                    setTypingTimeout(timeout);
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
