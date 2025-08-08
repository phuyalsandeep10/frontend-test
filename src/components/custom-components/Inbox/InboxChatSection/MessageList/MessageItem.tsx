import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { Icons } from '@/components/ui/Icons';
import { useState } from 'react';
import Image from 'next/image';
import profile from '@/assets/images/profile.jpg';

interface Message {
  id: number;
  sender: 'agent' | 'customer';
  message: string;
  time: string;
  date?: string;
}

interface MessageItemProps {
  message: Message;
  onReply: (messageText: string) => void;
}

const MessageItem = ({ message, onReply }: MessageItemProps) => {
  const [replyTo, setReplyTo] = useState(true);

  const handleReplyClick = () => {
    onReply(message.message);
  };

  return (
    <div>
      {message.date && (
        <div className="mb-4 flex items-center">
          <div className="bg-gray-light h-[0.5px] w-full"></div>
          <div className="text-gray-light text-center text-xs">
            {message.date}
          </div>
          <div className="bg-gray-light h-[0.5px] w-full"></div>
        </div>
      )}

      <div
        className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'} mb-4`}
      >
        {message.sender === 'customer' && (
          <div className="bg-gray-light mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
            <span className="text-theme-text-dark text-xs font-medium">AJ</span>
          </div>
        )}

        <div className="flex items-center">
          <div
            className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-sm ${
              message.sender === 'agent'
                ? 'bg-brand-primary px-5 pt-2.5 pb-5 text-white'
                : 'bg-brand-disable text-gray-dark'
            }`}
          >
            {message.sender === 'agent' && replyTo && (
              <div className="bg-brand-bg-gradient flex items-center justify-center overflow-hidden">
                <div className="w-full items-center rounded-[8px] border border-l-4 py-2.5 pr-7 pl-7">
                  <div className="flex items-center gap-3 text-sm font-semibold text-white">
                    <Icons.reply className="h-5 w-5" />
                    <span>Replied</span>
                  </div>
                  <p className="mt-1 text-xs font-normal text-white">
                    Great! Thanks for your help with the recent issue!
                  </p>
                </div>
              </div>
            )}

            <p
              className={`${
                message.sender === 'agent'
                  ? 'mt-3 text-lg font-normal break-all'
                  : 'text-sm'
              }`}
            >
              {message.message}
            </p>

            <div
              className={`mt-1 flex items-center ${message.sender === 'agent' ? 'justify-end' : ''}`}
            >
              <span
                className={`text-xs ${
                  message.sender === 'agent' ? 'text-white' : 'text-gray-dark'
                }`}
              >
                {message.time}
              </span>
            </div>
          </div>

          {message.sender === 'agent' && (
            <div className="ml-2 flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
              <Image
                src={profile}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        {message.sender === 'customer' && (
          <div className="transition-opacity duration-200">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-theme-text-primary flex h-6 w-6 cursor-pointer items-center justify-center transition-colors">
                <MoreVertical size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                  Create a ticket
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2"
                  onClick={handleReplyClick}
                >
                  Reply
                </DropdownMenuItem>
                <DropdownMenuItem className="text-error focus:text-error flex cursor-pointer items-center gap-2">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {message.sender === 'agent' && (
        <div className="-mt-2 mr-10 flex justify-end">
          <Icons.double_check className="text-brand-primary" />
        </div>
      )}
    </div>
  );
};

export default MessageItem;
