'use client';

import React from 'react';

import SpamIcon from '@/assets/svg/SpamIcon';
import SidebarList from '../SharedSidebar/SideBar';
import { userRoutes } from '@/routes/userRoutes';

const defaultInboxes = [
  { label: 'Spam', icon: SpamIcon, route: userRoutes.OTHER_BOXES.SPAM },
];

const OtherBoxes = () => {
  return <SidebarList title="Other Boxes" sidebar={defaultInboxes} />;
};

export default OtherBoxes;
