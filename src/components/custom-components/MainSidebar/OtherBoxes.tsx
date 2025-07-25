'use client';

import React from 'react';

import SidebarList from '../SharedSidebar/SideBar';
import { userRoutes } from '@/routes/userRoutes';
import { Icons } from '@/components/ui/Icons';

const mainsidebar = [
  { label: 'Spam', icon: Icons.spam, route: userRoutes.OTHER_BOXES.SPAM },
];

const OtherBoxes = () => {
  return <SidebarList title="Other Boxes" sidebar={mainsidebar} />;
};

export default OtherBoxes;
