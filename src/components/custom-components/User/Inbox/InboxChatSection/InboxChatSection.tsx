'use client';

import React from 'react';
import InboxChatSectionHeader from './InboxChatSectionHeader';
import LanguageSelector from './LanguageSelector';
import MessageList from './MessageList/MessageList';

export interface Message {
  id: number;
  sender: 'agent' | 'customer';
  message: string;
  time: string;
  date?: string;
}
const messages: Message[] = [
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
const InboxChatSection = () => {
  return (
    <>
      <InboxChatSectionHeader />
      <LanguageSelector />
      <MessageList messages={messages} />
    </>
  );
};

export default InboxChatSection;
