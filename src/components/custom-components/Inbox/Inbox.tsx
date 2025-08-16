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
  const { socket } = useSocket();

  useEffect(() => {
    if (!chatId || !socket) return;
    console.log({ chatId, socket });

    // socket.emit('joinChat', chatId);
    socket.emit('join_conversation', { conversation_id: 1 });

    const handleNewMessage = (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('receive-message', (data) => {
      console.log({ data });
    });
    socket.on('typing', () => {
      console.log('typing ...');
    });
    socket.on('stop-typing', () => {
      console.log('stop typing...');
    });

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [chatId, socket]);

  const onSend = () => {
    const text = inputRef.current?.value;
    if (text) {
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
        sender: 'agent',
        replyTo: replyingTo,
      };

      setMessages((prev) => [...prev, msg]);
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
