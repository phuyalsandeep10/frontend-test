'use client';
import Dashboard from '@/assets/svg/Dashboard';
import Tickets from '@/assets/svg/Tickets';
import Visitors from '@/assets/svg/Visitors';
import Assistant from '@/assets/svg/Assistant';
import Triggers from '@/assets/svg/Triggers';
import Client from '@/assets/svg/Client';
import Engagement from '@/assets/svg/Engagement';
import Support from '@/assets/svg/Support';
import Settings from '@/assets/svg/Settings';
import Help from '@/assets/svg/Help';
import { userRoutes } from '@/routes/userRoutes';
import SidebarList from '../SharedSidebar/SideBar';

const defaultFeatures = [
  {
    label: 'Dashboard',
    icon: Dashboard,
    route: userRoutes.TOOLS_FEATURES.DASHBOARD,
  },
  { label: 'Tickets', icon: Tickets, route: userRoutes.TOOLS_FEATURES.TICKET },
  {
    label: 'Visitors',
    icon: Visitors,
    route: userRoutes.TOOLS_FEATURES.VISITORS,
  },
  {
    label: 'AI Assistants',
    icon: Assistant,
    route: userRoutes.TOOLS_FEATURES.AI_ASSISTANT,
  },
  {
    label: 'Triggers',
    icon: Triggers,
    route: userRoutes.TOOLS_FEATURES.TRIGGER,
  },
  { label: 'Clients', icon: Client, route: userRoutes.TOOLS_FEATURES.CLIENT },
  {
    label: 'Engagement Streams',
    icon: Engagement,
    route: userRoutes.TOOLS_FEATURES.ENGAGEMENT,
  },
  {
    label: 'Support Library',
    icon: Support,
    route: userRoutes.TOOLS_FEATURES.SUPPORT,
  },
  {
    label: 'Plugins & Integrations',
    icon: Dashboard,
    route: userRoutes.TOOLS_FEATURES.PLUGINS,
  },
  {
    label: 'Settings',
    icon: Settings,
    route: userRoutes.SETTINGS.ACCOUNT_INFORMATION,
  },
  { label: 'Help', icon: Help, route: userRoutes.TOOLS_FEATURES.HELP },
];

const ToolsAndFeatures = () => {
  return <SidebarList title="Tools & Features" sidebar={defaultFeatures} />;
};

export default ToolsAndFeatures;
