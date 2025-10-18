export interface ConnectedAccount {
  platform: string
  username: string
  connected: boolean
}

export interface PresetPin {
  id: string
  name: string
  enabled: boolean
  url: string
  icon: string
  color: string
  tooltip: string
  group: number
}

export interface CustomPin {
  id: string
  title: string
  url: string
  tooltip: string
  image: string
  enabled: boolean
}

export interface SettingsStore {
  // Notifications
  pushNotifications: boolean
  setPushNotifications: (value: boolean) => void
  emailNotifications: boolean
  setEmailNotifications: (value: boolean) => void
  desktopNotifications: boolean
  setDesktopNotifications: (value: boolean) => void
  notificationSound: boolean
  setNotificationSound: (value: boolean) => void
  mentionsOnly: boolean
  setMentionsOnly: (value: boolean) => void

  // Navigation
  compactMode: boolean
  setCompactMode: (value: boolean) => void
  showLabels: boolean
  setShowLabels: (value: boolean) => void
  defaultView: string
  setDefaultView: (value: string) => void
  quickAccessToolbar: boolean
  setQuickAccessToolbar: (value: boolean) => void

  // Home
  defaultHomePage: string
  setDefaultHomePage: (value: string) => void
  showRecentActivity: boolean
  setShowRecentActivity: (value: boolean) => void
  showRecommendations: boolean
  setShowRecommendations: (value: boolean) => void
  itemsPerPage: string
  setItemsPerPage: (value: string) => void

  presetPins: PresetPin[]
  updatePresetPin: (id: string, updates: Partial<PresetPin>) => void
  customPins: CustomPin[]
  addCustomPin: (pin: Omit<CustomPin, "id">) => void
  updateCustomPin: (id: string, updates: Partial<CustomPin>) => void
  deleteCustomPin: (id: string) => void

  // Appearance
  accentColor: string
  setAccentColor: (value: string) => void
  fontSize: string
  setFontSize: (value: string) => void
  animations: boolean
  setAnimations: (value: boolean) => void

  // Language & Region
  language: string
  setLanguage: (value: string) => void
  timeZone: string
  setTimeZone: (value: string) => void
  dateFormat: string
  setDateFormat: (value: string) => void
  timeFormat: string
  setTimeFormat: (value: string) => void

  // Accessibility
  screenReader: boolean
  setScreenReader: (value: boolean) => void
  highContrast: boolean
  setHighContrast: (value: boolean) => void
  reduceMotion: boolean
  setReduceMotion: (value: boolean) => void
  textSizeMultiplier: number
  setTextSizeMultiplier: (value: number) => void
  keyboardNavigation: boolean
  setKeyboardNavigation: (value: boolean) => void

  // Privacy & Visibility
  profileVisibility: string
  setProfileVisibility: (value: string) => void
  showOnlineStatus: boolean
  setShowOnlineStatus: (value: boolean) => void
  showActivity: boolean
  setShowActivity: (value: boolean) => void
  allowSearchEngines: boolean
  setAllowSearchEngines: (value: boolean) => void
  dataCollection: boolean
  setDataCollection: (value: boolean) => void

  displayName: string
  setDisplayName: (value: string) => void
  email: string
  setEmail: (value: string) => void
  username: string
  setUsername: (value: string) => void
  bio: string
  setBio: (value: string) => void

  developerMode: boolean
  setDeveloperMode: (value: boolean) => void
  betaFeatures: boolean
  setBetaFeatures: (value: boolean) => void
  apiKey: string
  setApiKey: (value: string) => void
  webhookUrl: string
  setWebhookUrl: (value: string) => void

  // API keys for Dijkstra GPT
  supabaseKey: string
  setSupabaseKey: (value: string) => void
  geminiKey: string
  setGeminiKey: (value: string) => void

  // Advanced
  cacheSize: string
  setCacheSize: (value: string) => void
  hardwareAcceleration: boolean
  setHardwareAcceleration: (value: boolean) => void

  // Connected Accounts
  connectedAccounts: ConnectedAccount[]
  connectAccount: (platform: string, username: string) => void
  disconnectAccount: (platform: string) => void
}

