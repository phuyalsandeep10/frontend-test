'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Check,
  ChevronLeft,
  MoreHorizontal,
  MoreVertical,
  Reply,
  Ticket,
  Trash2,
} from 'lucide-react';
import React, { useState } from 'react';

const InboxChatSection = () => {
  const messages = [
    {
      id: 1,
      sender: 'customer',
      message: 'Hi, I need help with my account.',
      time: '04:15 PM',
      date: 'Sun',
    },
    {
      id: 2,
      sender: 'agent',
      message: 'Hello Alice! How can I assist you today?',
      time: '04:15 PM',
    },
    {
      id: 3,
      sender: 'customer',
      message: 'My subscription seems to be inactive.',
      time: '04:15 PM',
    },
    {
      id: 4,
      sender: 'agent',
      message:
        'I see. Let me check that for you. Please bear with me for a moment.',
      time: '04:15 PM',
    },
    {
      id: 5,
      sender: 'customer',
      message: 'Great! Thanks for your help with the recent issue!',
      time: '04:15 PM',
      date: 'Fri',
    },
    {
      id: 6,
      sender: 'agent',
      message:
        "Thank you for your patience. It looks like there was a temporary issue with your payment method. I've reactivated your subscription. You should be good to go now!",
      time: '04:15 PM',
    },
    {
      id: 7,
      sender: 'customer',
      message: 'Great! Thanks for your help with the recent issue!',
      time: '04:15 PM',
      date: 'Today',
    },
  ];

  const [showPopup, setShowPopup] = useState(true);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-white p-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-200">
            <span className="text-sm font-medium text-orange-800">AJ</span>
          </div>
          <div>
            <h2 className="font-medium text-gray-900">Alice Johnson</h2>
            <p className="text-sm text-gray-500">alice.johnson@example.com</p>
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            {/* <div className="flex items-center rounded-md bg-gray-100 px-2 py-1">
              <span className="text-sm text-gray-600">Agent Sarah</span>
              <div className="ml-2 h-2 w-2 rounded-full bg-green-500"></div>
            </div> */}
            <div className="flex items-center space-x-2 rounded-lg bg-green-100 px-3 py-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-medium text-green-700">Solved</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Language Selector */}
      <div className="mt-6 flex justify-center py-2">
        <div className="bg-brand-disable text-theme-text-primary flex items-center space-x-1 rounded border px-2 py-1">
          <span className="text-xs">🇺🇸</span>
          <span className="text-theme-text-primary text-sm font-semibold">
            English
          </span>
          <svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {/* Messages */}

      <div className="max-h-[calc(100vh-250px)] flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={message.id}>
            <div>
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
                    <>
                      <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-200">
                        <span className="text-xs font-medium text-orange-800">
                          AJ
                        </span>
                      </div>
                    </>
                  )}

                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                      message.sender === 'agent'
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <div
                      className={`mt-1 flex items-center ${message.sender === 'agent' ? 'justify-end' : ''}`}
                    >
                      <span
                        className={`text-xs ${message.sender === 'agent' ? 'text-purple-200' : 'text-gray-500'}`}
                      >
                        {message.time}
                      </span>
                    </div>
                  </div>

                  {message.sender === 'agent' && (
                    <div className="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                      <span className="text-xs font-medium text-gray-600">
                        S
                      </span>
                    </div>
                  )}
                  {message.sender === 'customer' && (
                    <>
                      <div className={`transition-opacity duration-200`}>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="text-theme-text-primary flex h-6 w-6 cursor-pointer items-center justify-center transition-colors">
                            <MoreVertical size={16} />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                              Create a ticket
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                              Reply
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-error flex cursor-pointer items-center gap-2 focus:text-red-600">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {message.sender === 'agent' && (
              <div className="-mt-2 mr-10 flex justify-end">
                <svg
                  width="22"
                  height="13"
                  viewBox="0 0 22 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.602 8.75893L12.014 10.1709L20.4795 1.70533L21.8938 3.11954L12.014 12.9993L5.65 6.63533L7.06421 5.22113L9.189 7.34593L10.602 8.75893ZM10.6037 5.93123L15.5563 0.978516L16.9666 2.3888L12.014 7.34143L10.6037 5.93123ZM7.77698 11.5863L6.36396 12.9993L0 6.63533L1.41421 5.22113L2.82723 6.63423L2.82604 6.63533L7.77698 11.5863Z"
                    fill="#9500FF"
                  />
                  <path
                    d="M10.602 8.75893L12.014 10.1709L20.4795 1.70533L21.8938 3.11954L12.014 12.9993L5.65 6.63533L7.06421 5.22113L9.189 7.34593L10.602 8.75893ZM10.6037 5.93123L15.5563 0.978516L16.9666 2.3888L12.014 7.34143L10.6037 5.93123ZM7.77698 11.5863L6.36396 12.9993L0 6.63533L1.41421 5.22113L2.82723 6.63423L2.82604 6.63533L7.77698 11.5863Z"
                    fill="black"
                    fill-opacity="0.2"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default InboxChatSection;
