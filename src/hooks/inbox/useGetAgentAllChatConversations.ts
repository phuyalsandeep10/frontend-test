import { useQuery } from '@tanstack/react-query';
import { InboxService } from '@/services/inbox/inbox';

export const useGetAgentAllChatConversations = () => {
  return useQuery({
    queryKey: ['agetAllChatConversastions'],
    queryFn: InboxService.getAgentAllChatConversations,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
