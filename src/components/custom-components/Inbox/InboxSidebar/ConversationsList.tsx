import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';
import { Badge } from '@/components/ui/badge';

const ConversationsList = () => {
  const conversations = [
    {
      id: 1,
      name: 'Alice Johnson',
      initials: 'AJ',
      message: 'Thanks for your help with the recent...',
      time: '04:15 PM',
      status: 'Unresolved',
      agent: 'Agent Sarah',
    },
    {
      id: 2,
      name: 'Jerome Bell',
      initials: 'JB',
      message: 'Thanks for your help with the recent...',
      time: '04:15 PM',
      status: 'Unresolved',
      agent: 'Agent Sarah',
    },
    {
      id: 3,
      name: 'Robert Fox',
      initials: 'RF',
      message: 'Thanks for your help with the recent...',
      time: '04:15 PM',
      status: 'Pending',
      agent: 'Agent Joshua',
    },
    {
      id: 4,
      name: 'Jane Cooper',
      initials: 'JC',
      message: 'Thanks for your help with the recent...',
      time: '04:15 PM',
      status: 'Resolved',
      agent: 'Agent Joshua',
    },
    {
      id: 5,
      name: 'Eleanor Pena',
      initials: 'EP',
      message: 'Thanks for your help with the recent...',
      time: '04:15 PM',
      status: 'Unresolved',
      agent: 'Agent Sarah',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Unresolved':
        return 'bg-error text-white';
      case 'Pending':
        return 'bg-warning text-white';
      case 'Resolved':
        return 'bg-success text-white';
      default:
        return 'bg-warning text-white';
    }
  };
  return (
    <div className="mt-5 max-h-[100vh-]">
      {conversations.map((conversation) => (
        <Link
          href={`/inbox/${conversation.id}`}
          key={conversation.id}
          className=""
        >
          <div className="flex items-center space-x-3 py-4">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Image"
                className="h-[30px] w-[30px] rounded-full"
              />
              <AvatarFallback className="text-theme-text-primary h-[30px] w-[30px] rounded-full text-base font-semibold">
                SC
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between">
                <h3 className="text-theme-text-dark truncate text-base font-semibold">
                  {conversation.name}
                </h3>
                <span className="text-theme-text-primary ml-1 text-sm leading-17">
                  {conversation.time}
                </span>
              </div>

              <p className="text-theme-text-primary my-1 truncate text-sm">
                {conversation.message}
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full">
                  <Icons.whatsapp className="fill-success h-5 w-5 text-white" />
                </div>
                <Badge
                  className={`rounded-2xl px-2 py-1 text-xs font-semibold ${getStatusColor(conversation.status)}`}
                >
                  {conversation.status}
                </Badge>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ConversationsList;
