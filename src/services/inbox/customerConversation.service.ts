import axiosInstance from '@/apiConfigs/axiosInstance';

export class CustomerConversastionService {
  static async getCustomerAllChatConversationMessages(
    conversationId: number,
    orgId: string = 'test1',
  ) {
    // identifier
    try {
      const res = await axiosInstance.get(
        `/customers/${conversationId}/messages`,
        {
          headers: {
            'X-Org-ID': orgId,
          },
        },
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  static async createCustomerConversastionWithAgent(conversationId: number) {
    try {
      const res = await axiosInstance.get(
        `/customers/conversations/${conversationId}/messages`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
