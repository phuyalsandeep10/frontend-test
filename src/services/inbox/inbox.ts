import axiosInstance from '@/apiConfigs/axiosInstance';

export class InboxService {
  static async getAgentAllChatConversations() {
    try {
      const res = await axiosInstance.get('/agent-chat/conversations');
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  static async getAgentChatConversationsDetailsById(conversationsId: number) {
    try {
      const res = await axiosInstance.get(
        `/agent-chat/conversations/${conversationsId}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  static async getAgentChatConversationsMessagesById(conversationsId: number) {
    try {
      const res = await axiosInstance.get(
        `/agent-chat/conversations/${conversationsId}/messages`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  static async createAgentChatConversastions(
    conversationsId: number,
    data: any,
  ) {
    try {
      const res = await axiosInstance.post(
        `/agent-chat/conversations/${conversationsId}/messages`,
        data,
      );
      console.log('Api esponse', res);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
