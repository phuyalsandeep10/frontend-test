'use client';

import { userRoutes } from '@/routes/userRoutes';
import SidebarList from '../SharedSidebar/SideBar';
import { Icons } from '@/components/ui/Icons';

const sidebarList = [
  {
    label: 'Dashboard',
    icon: Icons.dashboard,
    route: userRoutes.TOOLS_FEATURES.DASHBOARD,
  },
  {
    label: 'Tickets',
    icon: Icons.ticket,
    route: userRoutes.TOOLS_FEATURES.TICKET,
  },
  {
    label: 'Visitors',
    icon: Icons.earth,
    route: userRoutes.TOOLS_FEATURES.VISITORS,
  },
  {
    label: 'AI Assistants',
    icon: Icons.aiassistant,
    route: userRoutes.TOOLS_FEATURES.AI_ASSISTANT,
  },
  {
    label: 'Triggers',
    icon: Icons.trigger,
    route: userRoutes.TOOLS_FEATURES.TRIGGER,
  },
  {
    label: 'Clients',
    icon: Icons.client,
    route: userRoutes.TOOLS_FEATURES.CLIENT,
  },
  {
    label: 'Engagement Streams',
    icon: Icons.send,
    route: userRoutes.TOOLS_FEATURES.ENGAGEMENT,
  },
  {
    label: 'Support Library',
    icon: Icons.support,
    route: userRoutes.TOOLS_FEATURES.SUPPORT,
  },
  {
    label: 'Plugins & Integrations',
    icon: Icons.plugins,
    route: userRoutes.TOOLS_FEATURES.PLUGINS,
  },
  {
    label: 'Settings',
    icon: Icons.setting,
    route: userRoutes.SETTINGS.ACCOUNT_INFORMATION,
  },
  { label: 'Help', icon: Icons.help, route: userRoutes.TOOLS_FEATURES.HELP },
];

const ToolsAndFeatures = () => {
  return <SidebarList title="Tools & Features" sidebar={sidebarList} />;
};

export default ToolsAndFeatures;
