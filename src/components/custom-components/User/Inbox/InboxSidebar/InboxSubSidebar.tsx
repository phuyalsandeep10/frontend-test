import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/ui/Icons';
import { Input } from '@/components/ui/input';
import { RiWhatsappFill } from '@remixicon/react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const InboxSubSidebar = () => {
  const conversations = [
    {
      id: 1,
      name: 'Alice Johnson',
      initials: 'AJ',
      message: 'Thanks for your help with the recent...',
      time: '04:15 PM',
      status: 'Unresolved',
      agent: 'Agent Sarah',
      avatarBg: 'bg-pink-200',
      textColor: 'text-pink-800',
    },
    {
      id: 2,
      name: 'Jerome Bell',
      initials: 'JB',
      message: 'Thanks for your help with the recent...',
      time: '04:15 PM',
      status: 'Unresolved',
      agent: 'Agent Sarah',
      avatarBg: 'bg-pink-200',
      textColor: 'text-pink-800',
    },
    {
      id: 3,
      name: 'Robert Fox',
      initials: 'RF',
      message: 'Thanks for your help with the recent...',
      time: '04:15 PM',
      status: 'Pending',
      agent: 'Agent Joshua',
      avatarBg: 'bg-yellow-200',
      textColor: 'text-yellow-800',
    },
    {
      id: 4,
      name: 'Jane Cooper',
      initials: 'JC',
      message: 'Thanks for your help with the recent...',
      time: '04:15 PM',
      status: 'Resolved',
      agent: 'Agent Joshua',
      avatarBg: 'bg-green-200',
      textColor: 'text-green-800',
    },
    {
      id: 5,
      name: 'Eleanor Pena',
      initials: 'EP',
      message: 'Thanks for your help with the recent...',
      time: '04:15 PM',
      status: 'Unresolved',
      agent: 'Agent Sarah',
      avatarBg: 'bg-pink-200',
      textColor: 'text-pink-800',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Unresolved':
        return 'bg-red-100 text-red-600';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Resolved':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  return (
    <div className="font-outfit h-screen">
      <div className="flex items-center justify-between">
        <p>Conversastion</p>
        <span>
          <Icons.filter className="h-4 w-4" />
        </span>
      </div>

      {/* Search Bar */}
      <div className="mt-[26px]">
        <div className="relative">
          <Search className="text-gray-primary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            type="text"
            placeholder="Search Conversation..."
            className="bg-brand-disable text-theme-text-primary border-theme-text-light w-full rounded-lg border border-0 py-2.5 pr-2.5 pl-10 text-xs focus:ring-0 focus:outline-none"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="mt-5 max-h-[100vh-]">
        {conversations.map((conversation) => (
          <Link href={''} key={conversation.id} className="">
            <div className="flex items-center space-x-3 py-4">
              {/* Avatar */}
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="h-[30px] w-[30px] rounded-full"
                />
                <AvatarFallback className="text-theme-text-primary h-[30px] w-[30px] rounded-full text-base font-semibold">
                  CN
                </AvatarFallback>
              </Avatar>

              {/* Content */}
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

                {/* Status and Agent */}
                <div className="flex items-center gap-3">
                  {/* WhatsApp Icon */}
                  <div className="flex h-5 w-5 items-center justify-center rounded-full">
                    <RiWhatsappFill className="fill-success h-5 w-5 text-white" />
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`rounded-2xl px-2 py-1 text-xs font-semibold ${getStatusColor(conversation.status)}`}
                  >
                    {conversation.status}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InboxSubSidebar;
