import { ConversationService } from '@/services/inbox/agentCoversation.service';
import { create } from 'zustand';

interface Customer {
  id: number;
  name: string;
  created_at: string;
  organization_id: number;
  phone: string;
  updated_at: string;
  email: string;
  active: boolean;
  attributes: Record<string, any> | null;
  created_by_id: number | null;
  ip_address: string;
  updated_by_id: number | null;
  is_online: boolean;
  deleted_at: string | null;
}

interface Conversation {
  id: number;
  active: boolean;
  updated_by_id: number | null;
  name: string | null;
  customer_id: number;
  is_resolved: boolean;
  created_at: string;
  updated_at: string;
  created_by_id: number | null;
  deleted_at: string | null;
  organization_id: number;
  attributes: Record<string, any>;
}

interface ConversationResponse {
  success: boolean;
  message: string;
  data: {
    conversation: Conversation;
    customer: Customer;
  };
}

interface ConversationState {
  conversation: Conversation | null;
  customer: Customer | null;
  setConversationData: (data: ConversationResponse) => void;
}

export const useAgentConversationStore = create((set) => ({
  conversation: null,
  customer: null,
  messages: [],
  req_loading: {
    fetch_messages: false,
    add_message: false,
  },
  req_success: {
    fetch_messages: false,
    add_message: false,
  },
  setConversationData: (data: ConversationResponse) =>
    set({
      conversation: data.data.conversation,
      customer: data.data.customer,
    }),
  setMessages: (messages: any) => set({ messages }),
  addMessage: (message: any) =>
    set((state: any) => ({ messages: [...state.messages, message] })),
  updateMessageSeen: (messageId: number) =>
    set((state: any) => ({
      messages: state.messages.map((m: any) =>
        m.id === messageId ? { ...m, seen: true } : m,
      ),
    })),

  setLoading: (key: any, value: any) =>
    set((state: any) => ({
      req_loading: { ...state.req_loading, [key]: value },
    })),

  setSuccess: (key: any, value: any) =>
    set((state: any) => ({
      req_success: { ...state.req_success, [key]: value },
    })),

  fetchMessages: async (chatId: number) => {
    set({ req_loading: { fetch_messages: true, add_message: false } });
    try {
      const data: any = await ConversationService.getAllMessagesById(chatId);
      set({
        messages: data?.data,
        req_success: { fetch_messages: true, add_message: false },
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      set({ req_success: { fetch_messages: false, add_message: false } });
    } finally {
      set({ req_loading: { fetch_messages: false, add_message: false } });
    }
  },

  sendMessage: async (
    chatId: number,
    content: string,
    replyToId: number | null = null,
  ) => {
    set({ req_loading: { fetch_messages: false, add_message: true } });
    try {
      const response = await ConversationService.createMessage(chatId, {
        content,
        reply_to_id: replyToId,
      });
      set((state: any) => ({
        messages: [...state.messages, response?.data],
        req_success: { fetch_messages: false, add_message: true },
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      set({ req_success: { fetch_messages: false, add_message: false } });
    } finally {
      set({ req_loading: { fetch_messages: false, add_message: false } });
    }
  },
}));
