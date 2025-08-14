'use client';

import { AuthService } from '@/services/auth/auth';
import { useAuthStore } from '@/store/AuthStore/useAuthStore';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Socket, io } from 'socket.io-client';

interface Message {
  message: string;
  from?: string;
  mode?: 'message' | 'typing';
}

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

interface socketOptions {
  auth: {
    token?: string;
    customer_id?: number;
    conversation_id?: number;
  };
  transports: string[];
  path: string;
  autoConnect?: boolean;
  namespace?: string;
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socketUrl, setSocketUrl] = useState(
    'http://localhost:8000/agent-chat',
  );
  const [socketId, setSocketId] = useState<string | undefined>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [otherTyping, setOtherTyping] = useState(false);
  const { authData } = useAuthStore();

  const connectSocket = useCallback(() => {
    const authTokens = AuthService.getAuthTokens();
    if (!authTokens) return;
    const { accessToken } = authTokens;

    if (socket) {
      socket.disconnect();
    }

    const socketOptions: socketOptions = {
      transports: ['websocket', 'polling'],
      path: '/ws/sockets/socket.io',
      namespace: '/agent-chat',
      auth: {
        customer_id: 1,
        conversation_id: 1,
      },
    };

    if (accessToken.trim()) {
      socketOptions.auth = {
        token: accessToken.trim(),
      };
    }

    try {
      const newSocket = io(socketUrl, socketOptions);

      newSocket.on('connect', () => {
        setSocketId(newSocket.id);
        setIsConnected(true);
        console.log('Connected to:', socketUrl);
      });

      newSocket.on('customer_land', (data: Message) => {
        console.log('Customer land:', data);
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
  }, [authToken, socket, socketUrl]);

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
    // if (!authTokens) return;
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, [authData]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
