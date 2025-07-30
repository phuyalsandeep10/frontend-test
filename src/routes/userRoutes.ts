export const userRoutes = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_EMAIL: '/verify-email',
  VERIFY_TWO_FA_TOKEN: 'verify-two-factor-authentication',
  SETTINGS: {
    ACCOUNT_INFORMATION: '/settings/account-information',
    NOTIFICATIONS: '/settings/notifications',
    AVAILABILITY: '/settings/availability',
    SECURITY: '/settings/security',
    PERSONALIZATION: '/settings/personalization',
    // Workspace Setting
    INFORMATION: '/settings/workspace/information',
    TRANSPARENCY_LOGS: '/settings/workspace/transparency-logs',
    OPERATOR_TEAMS: '/settings/workspace/operator-teams',
    ADVANCE_CONFIGURATION: '/settings/workspace/advance-configuration',
  },

  YOUR_INBOXES: {
    MAIN_INBOX: 'user/inbox/',
    SALES: '/inbox/sales',
    SUPPORT: '/inbox/support',
  },
  OTHER_BOXES: {
    SPAM: '/inbox/spam',
  },
  TOOLS_FEATURES: {
    DASHBOARD: '/tools_features/dashboard',
    TICKET: '/tools_features/ticket',
    VISITORS: '/tools_features/visitors',
    AI_ASSISTANT: '/tools_features/ai_assistant',
    TRIGGER: '/tools_features/trigger',
    CLIENT: '/tools_features/client',
    ENGAGEMENT: '/tools_features/engagement',
    SUPPORT: '/tools_features/support',
    PLUGINS: '/tools_features/plugins',
    HELP: '/tools_features/help',
  },
};
