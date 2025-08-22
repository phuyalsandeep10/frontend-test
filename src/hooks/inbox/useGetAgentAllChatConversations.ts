import { useQuery } from '@tanstack/react-query';
import { ConversationService } from '@/services/inbox/coversation.service';

export const useGetAgentAllChatConversations = () => {
  return useQuery({
    queryKey: ['agetAllChatConversastions'],
    queryFn: ConversationService.getAgentAllChatConversations,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
