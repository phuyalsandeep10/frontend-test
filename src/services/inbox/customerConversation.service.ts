import axiosInstance from '@/apiConfigs/axiosInstance';

export class CustomerConversastionService {
  static async getCustomerAllChatConversationMessages(conversationId: number) {
    // identifier
    try {
      const res = await axiosInstance.get(
        `/customers/${conversationId}/messages`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  static async createCustomerConversastionWithAgent(
    conversationId: number,
    data: any,
  ) {
    try {
      const res = await axiosInstance.post(
        `/customers/conversations/${conversationId}/messages`,
        data,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
