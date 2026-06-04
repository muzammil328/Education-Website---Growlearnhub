export const DEFAULT_USER_SETTINGS = {
  theme: 'light',
  notifications: {
    notifyGeneralActivity: true,
    notifyWeeklySummary: false,
    notifyFormSubmissions: false,
    notifyTeamUpdates: false,
    notifySecurityEvents: true,
    enableBrowserPushNotifications: false,
  },
  privacy: {
    profileVisible: true,
    showEmailToTeam: false,
    showPhoneToTeam: false,
    allowUsageTracking: true,
    shareAnonymousData: true,
  },
} as const;

export const MAX_PASSWORD_RESET_ATTEMPTS = 3;
export const PASSWORD_HISTORY_LIMIT = 5;
