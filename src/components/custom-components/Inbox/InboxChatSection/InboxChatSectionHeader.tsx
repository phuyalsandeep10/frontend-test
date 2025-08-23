'use client';
import { Icons } from '@/components/ui/Icons';
import { ConversationService } from '@/services/inbox/agentCoversation.service';
import { useAgentConversationStore } from '@/store/inbox/agentConversationStore';
import { useUiStore } from '@/store/UiStore/useUiStore';
import React from 'react';

const InboxChatSectionHeader = () => {
  const { openChatInfo } = useUiStore();
  const { customer, conversation, setConversationData }: any =
    useAgentConversationStore();
  const resolveConversastion = async () => {
    const res = await ConversationService.resolvedConversation(
      Number(conversation?.id),
    );
    setConversationData(res.data);
  };
  return (
    <div className="flex items-center justify-between border-b bg-white p-4">
      <div className="flex items-center space-x-3">
        <div className="bg-gray-light flex h-10 w-10 items-center justify-center rounded-full">
          <span className="text-theme-text-dark text-sm font-medium">
            {customer?.name?.substring(0, 2)?.toLocaleUpperCase()}
          </span>
        </div>
        <div>
          <h2 className="text-theme-text-dark font-medium">{customer?.name}</h2>
          <p className="text-theme-text-dark text-sm">{customer?.email}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {/* <div className="bg-success-light flex items-center space-x-2 rounded-lg px-3 py-2">
          <div className="bg-success-prominent flex h-5 w-5 items-center justify-center rounded-full">
            <Icons.check className="h-3 w-3 text-white" />
          </div>
     
          
          <span className="text-success text-sm font-medium">Solved</span>
        </div> */}
        {conversation?.is_resolved ? (
          <p>Conversastion resolved</p>
        ) : (
          <button onClick={() => resolveConversastion()}>
            Resolve the conversastion
          </button>
        )}
        <button className="text-gray-light" onClick={openChatInfo}>
          <Icons.chevron_left className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default InboxChatSectionHeader;
