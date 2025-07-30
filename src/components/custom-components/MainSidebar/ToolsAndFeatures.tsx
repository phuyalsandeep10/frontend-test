'use client';

import { ROUTES } from '@/routes/routes';
import SidebarList from '../SharedSidebar/SideBar';
import { Icons } from '@/components/ui/Icons';

const sidebarList = [
  {
    label: 'Dashboard',
    icon: Icons.dashboard,
    route: ROUTES.TOOLS_FEATURES.DASHBOARD,
  },
  {
    label: 'Tickets',
    icon: Icons.ticket,
    route: ROUTES.TOOLS_FEATURES.TICKET,
  },
  {
    label: 'Visitors',
    icon: Icons.earth,
    route: ROUTES.TOOLS_FEATURES.VISITORS,
  },
  {
    label: 'AI Assistants',
    icon: Icons.aiassistant,
    route: ROUTES.TOOLS_FEATURES.AI_ASSISTANT,
  },
  {
    label: 'Triggers',
    icon: Icons.trigger,
    route: ROUTES.TOOLS_FEATURES.TRIGGER,
  },
  {
    label: 'Clients',
    icon: Icons.client,
    route: ROUTES.TOOLS_FEATURES.CLIENT,
  },
  {
    label: 'Engagement Streams',
    icon: Icons.send,
    route: ROUTES.TOOLS_FEATURES.ENGAGEMENT,
  },
  {
    label: 'Support Library',
    icon: Icons.support,
    route: ROUTES.TOOLS_FEATURES.SUPPORT,
  },
  {
    label: 'Plugins & Integrations',
    icon: Icons.plugins,
    route: ROUTES.TOOLS_FEATURES.PLUGINS,
  },
  {
    label: 'Settings',
    icon: Icons.setting,
    route: ROUTES.SETTINGS.ACCOUNT_INFORMATION,
  },
  { label: 'Help', icon: Icons.help, route: ROUTES.TOOLS_FEATURES.HELP },
];

const ToolsAndFeatures = () => {
  return <SidebarList title="Tools & Features" sidebar={sidebarList} />;
};

export default ToolsAndFeatures;
