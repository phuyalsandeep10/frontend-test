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

export const useConversationStore = create<ConversationState>((set) => ({
  conversation: null,
  customer: null,
  setConversationData: (data: ConversationResponse) =>
    set({
      conversation: data.data.conversation,
      customer: data.data.customer,
    }),
}));
