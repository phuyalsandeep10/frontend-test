'use client';
import { CustomerConversastionService } from '@/services/inbox/customerConversation.service';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  message: string;
  from?: string;
  mode?: 'message' | 'typing';
}

interface socketOptions {
  auth: {
    token?: string;
    customer_id?: number;
    conversation_id?: number;
    organization_id?: number;
  };
  transports: string[];
  path: string;
  autoConnect?: boolean;
  namespace?: string;
}

export default function ChatBox() {
  const [socketUrl, setSocketUrl] = useState('http://127.0.0.1:8000/chat');
  const [authToken, setAuthToken] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  const [message, setMessage] = useState('');
  const [socketId, setSocketId] = useState<string | undefined>('');
  const [messages, setMessages] = useState<Message[]>([]);

  // typing: added
  const [isTyping, setIsTyping] = useState(false);

  const [otherTyping, setOtherTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const connectSocket = () => {
    if (socket) {
      socket.disconnect();
    }

    const socketOptions: socketOptions = {
      transports: ['websocket', 'polling'],
      path: '/ws/sockets/socket.io',
      namespace: '/chat',
      auth: {
        customer_id: 1,
        conversation_id: 1,
        organization_id: 1,
      },
    };

    if (authToken.trim()) {
      socketOptions.auth = {
        token: authToken.trim(),
      };
    }

    try {
      const newSocket = io(socketUrl, socketOptions);

      newSocket.on('connect', () => {
        setSocketId(newSocket.id);
        setIsConnected(true);
        console.log('Connected to:', socketUrl);
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from:', socketUrl);
      });

      newSocket.on('receive-message', (data: Message) => {
        console.log({ data });
        setMessages((prev) => [...prev, data]);
      });

      // typing: listen
      newSocket.on('typing', () => {
        setOtherTyping(true);
        console.log('typing ...');
      });

      newSocket.on('stop-typing', () => {
        setOtherTyping(false);
        console.log('stop typing...');
      });

      setSocket(newSocket);
    } catch (error) {
      console.log({ error });
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
      setSocketId('');
      setMessages([]);
      setOtherTyping(false); // typing: clear typing state
    }
  };

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!socket || !isConnected) return;

    socket.emit('message', {
      message,
      mode: 'message',
      organization_id: 1,
      conversation_id: 1,
      customer_id: 1,
    });

    emitStopTyping();
    setMessages((prev) => [...prev, { message, from: socketId }]);
    setMessage('');

    // typing: stop on send
    // socket.emit('stop-typing');
    setIsTyping(false);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      setTypingTimeout(null);
    }
  };

  const sendMessage = async () => {
    const messageData = {
      content: message,
    };
    console.log('clicked...');
    const res =
      await CustomerConversastionService.createCustomerConversastionWithAgent(
        1,
        messageData,
      );
  };
  const emitTyping = (message: string) => {
    if (!socket || !isConnected) return;
    socket.emit('typing', { message, mode: 'typing' });
  };
  const emitStopTyping = () => {
    if (!socket || !isConnected) return;
    socket.emit('stop_typing');
  };

  const getConversastions = async () => {
    await CustomerConversastionService.getCustomerAllChatConversationMessages(
      1,
    );
  };

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col p-4">
      <h1 className="mb-4 text-center text-2xl font-bold">
        Socket.IO Chat Client
      </h1>

      {/* Connection Configuration */}
      <div className="mb-4 rounded border border-gray-300 bg-gray-50 p-4">
        <h2 className="mb-3 text-lg font-semibold">Connection Settings</h2>

        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium">
            Socket Server URL
          </label>
          <input
            type="text"
            value={socketUrl}
            onChange={(e) => setSocketUrl(e.target.value)}
            placeholder="http://localhost:4000"
            className="w-full rounded border border-gray-300 p-2"
            disabled={isConnected}
          />
        </div>

        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium">
            Authentication Token (Optional)
          </label>
          <input
            type="text"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            placeholder="Enter your auth token here..."
            className="w-full rounded border border-gray-300 p-2"
            disabled={isConnected}
          />
          <p className="mt-1 text-xs text-gray-600">
            Leave empty if no authentication is required
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={connectSocket}
            disabled={isConnected || !socketUrl.trim()}
            className={`rounded px-4 py-2 font-medium ${
              isConnected || !socketUrl.trim()
                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isConnected ? 'Connected' : 'Connect'}
          </button>

          {isConnected && (
            <button
              onClick={disconnectSocket}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Disconnect
            </button>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className="text-sm">
            {isConnected
              ? `Connected - Socket ID: ${socketId}`
              : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Messages Box */}
      <div className="mb-4 flex-1 space-y-2 overflow-y-auto rounded border border-gray-300 bg-gray-50 p-4">
        {!isConnected && (
          <div className="mt-8 text-center text-gray-500">
            Please connect to a socket server to start chatting
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`rounded p-2 ${
              msg.from === socketId
                ? 'ml-auto self-end bg-blue-500 text-white'
                : 'mr-auto self-start bg-gray-200 text-black'
            } max-w-xs`}
          >
            {msg?.message}
          </div>
        ))}

        {/* typing: show indicator */}
        {otherTyping && (
          <div className="text-sm text-gray-500 italic">
            Someone is typing...
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);

            if (!socket) return;

            if (!isTyping) {
              setIsTyping(true);
              emitTyping(e.target.value);
              socket.emit('message', { message, mode: 'typing' });
            }

            if (typingTimeout) clearTimeout(typingTimeout);

            const timeout = setTimeout(() => {
              setIsTyping(false);
              // socket.emit('message', { message, mode: 'stop-typing' });
              emitStopTyping();
            }, 2000);

            setTypingTimeout(timeout);
          }}
          placeholder="Type your message..."
          className="flex-1 rounded border border-gray-300 p-2"
          disabled={!isConnected}
        />
        <button
          type="submit"
          disabled={!isConnected || !message.trim()}
          className={`rounded px-4 py-2 ${
            !isConnected || !message.trim()
              ? 'cursor-not-allowed bg-gray-300 text-gray-500'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          Send
        </button>
      </form>
      <button
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        onClick={() => getConversastions()}
      >
        get Conversastions
      </button>

      <button type="button" onClick={sendMessage}>
        Create Message{' '}
      </button>
    </div>
  );
}
