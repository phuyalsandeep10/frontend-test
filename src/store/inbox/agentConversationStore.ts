import { create } from 'zustand';
import { ConversationService } from '@/services/inbox/agentCoversation.service';
import { ConversationResponse, ConversationState } from './types';

export const useAgentConversationStore = create<ConversationState>((set) => ({
  conversation: null,
  customer: null,
  messages: [],
  req_loading: {
    fetch_messages: false,
    add_message: false,
    fetch_conversation: false,
    resolve_conversation: false,
  },
  req_success: {
    fetch_messages: false,
    add_message: false,
    fetch_conversation: false,
    resolve_conversation: false,
  },
  setConversationData: (data: ConversationResponse) =>
    set({
      conversation: data.data.conversation,
      customer: data.data.customer,
    }),
  setMessages: (messages) => set({ messages }),
  addMessageToStore: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateMessageSeen: (messageId) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === messageId ? { ...m, seen: true } : m,
      ),
    })),
  setLoading: (key, value) =>
    set((state) => ({
      req_loading: { ...state.req_loading, [key]: value },
    })),
  setSuccess: (key, value) =>
    set((state) => ({
      req_success: { ...state.req_success, [key]: value },
    })),
  fetchMessages: async (chatId: number) => {
    set({
      req_loading: {
        fetch_messages: true,
        add_message: false,
        fetch_conversation: false,
        resolve_conversation: false,
      },
    });
    try {
      const data = await ConversationService.getAllMessagesById(chatId);
      set({
        messages: data?.data,
        req_success: {
          fetch_messages: true,
          add_message: false,
          fetch_conversation: false,
          resolve_conversation: false,
        },
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      set({
        req_success: {
          fetch_messages: false,
          add_message: false,
          fetch_conversation: false,
          resolve_conversation: false,
        },
      });
    } finally {
      set({
        req_loading: {
          fetch_messages: false,
          add_message: false,
          fetch_conversation: false,
          resolve_conversation: false,
        },
      });
    }
  },
  sendMessageToDB: async (
    chatId: number,
    content: string,
    replyToId: number | null = null,
  ) => {
    set({
      req_loading: {
        fetch_messages: false,
        add_message: true,
        fetch_conversation: false,
        resolve_conversation: false,
      },
    });
    try {
      const response = await ConversationService.createMessage(chatId, {
        content,
        reply_to_id: replyToId,
      });
      set((state) => ({
        messages: [...state.messages, response?.data],
        req_success: {
          fetch_messages: false,
          add_message: true,
          fetch_conversation: false,
          resolve_conversation: false,
        },
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      set({
        req_success: {
          fetch_messages: false,
          add_message: false,
          fetch_conversation: false,
          resolve_conversation: false,
        },
      });
    } finally {
      set({
        req_loading: {
          fetch_messages: false,
          add_message: false,
          fetch_conversation: false,
          resolve_conversation: false,
        },
      });
    }
  },
  fetchConversationDetails: async (chatId: number) => {
    set({
      req_loading: {
        fetch_messages: false,
        add_message: false,
        fetch_conversation: true,
        resolve_conversation: false,
      },
    });
    try {
      const data: ConversationResponse =
        await ConversationService.getConversationDetailsById(chatId);
      set({
        conversation: data.data.conversation,
        customer: data.data.customer,
        req_success: {
          fetch_messages: false,
          add_message: false,
          fetch_conversation: true,
          resolve_conversation: false,
        },
      });
    } catch (error) {
      console.error('Error fetching conversation details:', error);
      set({
        req_success: {
          fetch_messages: false,
          add_message: false,
          fetch_conversation: false,
          resolve_conversation: false,
        },
      });
    } finally {
      set({
        req_loading: {
          fetch_messages: false,
          add_message: false,
          fetch_conversation: false,
          resolve_conversation: false,
        },
      });
    }
  },
  resolveConversation: async (chatId: number) => {
    set({
      req_loading: {
        fetch_messages: false,
        add_message: false,
        fetch_conversation: false,
        resolve_conversation: true,
      },
    });
    try {
      const response = await ConversationService.resolvedConversation(chatId);
      set({
        conversation: response.data.conversation,
        customer: response.data.customer,
        req_success: {
          fetch_messages: false,
          add_message: false,
          fetch_conversation: false,
          resolve_conversation: true,
        },
      });
    } catch (error) {
      console.error('Error resolving conversation:', error);
      set({
        req_success: {
          fetch_messages: false,
          add_message: false,
          fetch_conversation: false,
          resolve_conversation: false,
        },
      });
    } finally {
      set({
        req_loading: {
          fetch_messages: false,
          add_message: false,
          fetch_conversation: false,
          resolve_conversation: false,
        },
      });
    }
  },
}));
