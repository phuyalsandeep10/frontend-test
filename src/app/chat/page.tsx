import ChatBox from '@/components/custom-components/ChatBox/ChatBox';
import React, { Suspense } from 'react';

const ChatPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatBox />
    </Suspense>
  );
};

export default ChatPage;
