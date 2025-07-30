'use client';

import React from 'react';

import SidebarList from '../SharedSidebar/SideBar';
import { ROUTES } from '@/routes/routes';
import { Icons } from '@/components/ui/Icons';

const mainsidebar = [
  { label: 'Spam', icon: Icons.spam, route: ROUTES.OTHER_BOXES.SPAM },
];

const OtherBoxes = () => {
  return <SidebarList title="Other Boxes" sidebar={mainsidebar} />;
};

export default OtherBoxes;
