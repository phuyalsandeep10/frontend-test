'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSocket } from '@/context/socket.context';
import { useMessageAudio } from '@/hooks/useMessageAudio.hook';
import { useUiStore } from '@/store/UiStore/useUiStore';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import SubSidebarContentWrapper from '../CustomSidebar/SubSidebarContentWrapper';
import ChatEmptyScreen from './ChatEmptyScreen/ChatEmptyScreen';
import InboxChatInfo from './InboxChatInfo/InboxChatInfo';
import InboxChatSection from './InboxChatSection/InboxChatSection';
import InboxSubSidebar from './InboxSidebar/InboxSubSidebar';
import { useGetAgentAllChatConversations } from '@/hooks/inbox/useGetAgentAllChatConversations';
import { InboxService } from '@/services/inbox/inbox';
import { Input } from '@/components/ui/input';

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
  const { playSound } = useMessageAudio();

  useEffect(() => {
    if (!chatId || !socket) return;

    const getAgentChatConversationsMessagesById = async () => {
      const data: any =
        await InboxService.getAgentChatConversationsMessagesById(
          Number(chatId),
        );
      console.log(data);
      setMessages(data?.data);
    };
    getAgentChatConversationsMessagesById();

    socket.emit('join_conversation', { conversation_id: 1 });

    // socket.emit('joinChat', chatId);
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

  const onSend = async (e: any) => {
    e.preventDefault();
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

      emitStopTyping();
      // setMessages((prev) => [...prev, { msg: message, from: socket.id }]);
      console.log('clicked...');
      const response = await InboxService.createAgentChatConversastions(
        Number(chatId),
        {
          content: text,
          reply_to_id: 25,
        },
      );
      console.log({ response });
      setMessages((prev: any) => {
        console.log({ prev });
        return [...prev, response?.data];
      });
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

  console.log(messages);
  const getAgentChatConversastionDetails = async () => {
    const data: any = await InboxService.getAgentChatConversationsDetailsById(
      Number(chatId),
    );
    return data?.data;
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
          <form onSubmit={onSend} className="flex-1">
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

                <Input
                  placeholder="Enter your message here"
                  className={` ${replyingTo ? 'pt-14' : 'pt-3'}`}
                  ref={inputRef as any}
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
                <Button type="submit">{'Send'}</Button>
              </div>
            </div>
          </form>
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
