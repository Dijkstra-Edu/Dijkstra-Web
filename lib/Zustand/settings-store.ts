import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SettingsStore } from '@/types/lib/Zustand/settings-store-types'

// Default preset pins configuration
const defaultPresetPins = [
  {
    id: "reddit",
    name: "Reddit",
    enabled: true,
    url: "https://www.reddit.com/r/DijkstraEdu/",
    icon: "reddit",
    color: "#FF4500",
    tooltip: "Visit Reddit",
    group: 1,
  },
  {
    id: "google-scholar",
    name: "Google Scholar",
    enabled: true,
    url: "https://scholar.google.com",
    icon: "scholar",
    color: "#4285F4",
    tooltip: "Search academic papers",
    group: 1,
  },
  {
    id: "stackoverflow",
    name: "Stack Overflow",
    enabled: true,
    url: "https://stackoverflow.com",
    icon: "stackoverflow",
    color: "#F48024",
    tooltip: "Find programming solutions",
    group: 1,
  },
  {
    id: "discord",
    name: "Discord",
    enabled: true,
    url: "https://discord.com",
    icon: "discord",
    color: "#5865F2",
    tooltip: "Open Discord",
    group: 2,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    enabled: true,
    url: "https://linkedin.com",
    icon: "linkedin",
    color: "#0A66C2",
    tooltip: "Visit LinkedIn",
    group: 2,
  },
  {
    id: "leetcode",
    name: "LeetCode",
    enabled: true,
    url: "https://leetcode.com",
    icon: "leetcode",
    color: "#FFA116",
    tooltip: "Practice coding problems",
    group: 2,
  },
  {
    id: "github",
    name: "GitHub",
    enabled: true,
    url: "https://github.com",
    icon: "github",
    color: "#000000",
    tooltip: "Visit GitHub",
    group: 2,
  },
  {
    id: "personal-website",
    name: "Personal Website",
    enabled: true,
    url: "https://example.com",
    icon: "world",
    color: "",
    tooltip: "Visit Personal Website",
    group: 3,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    enabled: true,
    url: "/specialization",
    icon: "dashboard",
    color: "",
    tooltip: "Go to Specializations",
    group: 3,
  },
];

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      // Initial state
      // Notifications
      pushNotifications: true,
      emailNotifications: true,
      desktopNotifications: false,
      notificationSound: true,
      mentionsOnly: false,

      // Navigation
      compactMode: false,
      showLabels: true,
      defaultView: 'grid',
      quickAccessToolbar: true,

      // Home
      defaultHomePage: 'dashboard',
      showRecentActivity: true,
      showRecommendations: true,
      itemsPerPage: '20',

      presetPins: defaultPresetPins,

      customPins: [],

      // Appearance
      accentColor: 'blue',
      fontSize: 'medium',
      animations: true,

      // Language & Region
      language: 'en',
      timeZone: 'utc',
      dateFormat: 'mdy',
      timeFormat: '12',

      // Accessibility
      screenReader: false,
      highContrast: false,
      reduceMotion: false,
      textSizeMultiplier: 100,
      keyboardNavigation: true,

      // Privacy & Visibility
      profileVisibility: 'public',
      showOnlineStatus: true,
      showActivity: true,
      allowSearchEngines: false,
      dataCollection: true,

      displayName: '',
      email: '',
      username: '',
      bio: '',

      developerMode: false,
      betaFeatures: false,
      apiKey: '',
      webhookUrl: '',

      // API keys for Dijkstra GPT
      supabaseKey: '',
      geminiKey: '',

      // Advanced
      cacheSize: '500mb',
      hardwareAcceleration: true,

      // Connected Accounts
      connectedAccounts: [
        { platform: "GitHub", username: "johndoe", connected: true },
      ],

      // Actions
      setPushNotifications: (value) => set({ pushNotifications: value }),
      setEmailNotifications: (value) => set({ emailNotifications: value }),
      setDesktopNotifications: (value) => set({ desktopNotifications: value }),
      setNotificationSound: (value) => set({ notificationSound: value }),
      setMentionsOnly: (value) => set({ mentionsOnly: value }),

      setCompactMode: (value) => set({ compactMode: value }),
      setShowLabels: (value) => set({ showLabels: value }),
      setDefaultView: (value) => set({ defaultView: value }),
      setQuickAccessToolbar: (value) => set({ quickAccessToolbar: value }),

      setDefaultHomePage: (value) => set({ defaultHomePage: value }),
      setShowRecentActivity: (value) => set({ showRecentActivity: value }),
      setShowRecommendations: (value) => set({ showRecommendations: value }),
      setItemsPerPage: (value) => set({ itemsPerPage: value }),

      updatePresetPin: (id, updates) =>
        set((state) => ({
          presetPins: state.presetPins.map((pin) =>
            pin.id === id ? { ...pin, ...updates } : pin
          ),
        })),

      addCustomPin: (pin) =>
        set((state) => ({
          customPins: [...state.customPins, { ...pin, id: `custom-${Date.now()}` }],
        })),

      updateCustomPin: (id, updates) =>
        set((state) => ({
          customPins: state.customPins.map((pin) =>
            pin.id === id ? { ...pin, ...updates } : pin
          ),
        })),

      deleteCustomPin: (id) =>
        set((state) => ({
          customPins: state.customPins.filter((pin) => pin.id !== id),
        })),

      setAccentColor: (value) => set({ accentColor: value }),
      setFontSize: (value) => set({ fontSize: value }),
      setAnimations: (value) => set({ animations: value }),

      setLanguage: (value) => set({ language: value }),
      setTimeZone: (value) => set({ timeZone: value }),
      setDateFormat: (value) => set({ dateFormat: value }),
      setTimeFormat: (value) => set({ timeFormat: value }),

      setScreenReader: (value) => set({ screenReader: value }),
      setHighContrast: (value) => set({ highContrast: value }),
      setReduceMotion: (value) => set({ reduceMotion: value }),
      setTextSizeMultiplier: (value) => set({ textSizeMultiplier: value }),
      setKeyboardNavigation: (value) => set({ keyboardNavigation: value }),

      setProfileVisibility: (value) => set({ profileVisibility: value }),
      setShowOnlineStatus: (value) => set({ showOnlineStatus: value }),
      setShowActivity: (value) => set({ showActivity: value }),
      setAllowSearchEngines: (value) => set({ allowSearchEngines: value }),
      setDataCollection: (value) => set({ dataCollection: value }),

      setDisplayName: (value) => set({ displayName: value }),
      setEmail: (value) => set({ email: value }),
      setUsername: (value) => set({ username: value }),
      setBio: (value) => set({ bio: value }),

      setDeveloperMode: (value) => set({ developerMode: value }),
      setBetaFeatures: (value) => set({ betaFeatures: value }),
      setApiKey: (value) => set({ apiKey: value }),
      setWebhookUrl: (value) => set({ webhookUrl: value }),

      setSupabaseKey: (value) => set({ supabaseKey: value }),
      setGeminiKey: (value) => set({ geminiKey: value }),

      setCacheSize: (value) => set({ cacheSize: value }),
      setHardwareAcceleration: (value) => set({ hardwareAcceleration: value }),

      connectAccount: (platform, username) =>
        set((state) => {
          const existing = state.connectedAccounts.find((acc) => acc.platform === platform)
          if (existing) {
            return {
              connectedAccounts: state.connectedAccounts.map((acc) =>
                acc.platform === platform ? { ...acc, username, connected: true } : acc
              ),
            }
          }
          return {
            connectedAccounts: [...state.connectedAccounts, { platform, username, connected: true }],
          }
        }),

      disconnectAccount: (platform) =>
        set((state) => ({
          connectedAccounts: state.connectedAccounts.filter((acc) => acc.platform !== platform),
        })),
    }),
    {
      name: 'dijkstra-settings',
      version: 1, // Increment this when you need to migrate data
      // Persist everything to localStorage
      partialize: (state) => ({
        pushNotifications: state.pushNotifications,
        emailNotifications: state.emailNotifications,
        desktopNotifications: state.desktopNotifications,
        notificationSound: state.notificationSound,
        mentionsOnly: state.mentionsOnly,
        compactMode: state.compactMode,
        showLabels: state.showLabels,
        defaultView: state.defaultView,
        quickAccessToolbar: state.quickAccessToolbar,
        defaultHomePage: state.defaultHomePage,
        showRecentActivity: state.showRecentActivity,
        showRecommendations: state.showRecommendations,
        itemsPerPage: state.itemsPerPage,
        presetPins: state.presetPins,
        customPins: state.customPins,
        accentColor: state.accentColor,
        fontSize: state.fontSize,
        animations: state.animations,
        language: state.language,
        timeZone: state.timeZone,
        dateFormat: state.dateFormat,
        timeFormat: state.timeFormat,
        screenReader: state.screenReader,
        highContrast: state.highContrast,
        reduceMotion: state.reduceMotion,
        textSizeMultiplier: state.textSizeMultiplier,
        keyboardNavigation: state.keyboardNavigation,
        profileVisibility: state.profileVisibility,
        showOnlineStatus: state.showOnlineStatus,
        showActivity: state.showActivity,
        allowSearchEngines: state.allowSearchEngines,
        dataCollection: state.dataCollection,
        displayName: state.displayName,
        email: state.email,
        username: state.username,
        bio: state.bio,
        developerMode: state.developerMode,
        betaFeatures: state.betaFeatures,
        apiKey: state.apiKey,
        webhookUrl: state.webhookUrl,
        supabaseKey: state.supabaseKey,
        geminiKey: state.geminiKey,
        cacheSize: state.cacheSize,
        hardwareAcceleration: state.hardwareAcceleration,
        connectedAccounts: state.connectedAccounts,
      }),
      migrate: (persistedState: any, version: number) => {
        // If migrating from version 0 (or no version) to version 1
        if (version === 0) {
          // Check if presetPins exist and if they have the old structure (no group property)
          if (persistedState.presetPins && persistedState.presetPins.length > 0) {
            const hasGroupProperty = persistedState.presetPins.some((pin: any) => 'group' in pin);
            // If pins don't have the group property, reset to new defaults
            if (!hasGroupProperty) {
              persistedState.presetPins = defaultPresetPins;
            }
          }
        }
        return persistedState;
      },
    }
  )
)
