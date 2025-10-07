"use client"

import * as React from "react"
import { useTheme } from "next-themes"

interface ConnectedAccount {
  platform: string
  username: string
  connected: boolean
}

interface SettingsContextType {
  theme: string
  setTheme: (theme: string) => void

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

const SettingsContext = React.createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()

  // Notifications
  const [pushNotifications, setPushNotifications] = React.useState(true)
  const [emailNotifications, setEmailNotifications] = React.useState(true)
  const [desktopNotifications, setDesktopNotifications] = React.useState(false)
  const [notificationSound, setNotificationSound] = React.useState(true)
  const [mentionsOnly, setMentionsOnly] = React.useState(false)

  // Navigation
  const [compactMode, setCompactMode] = React.useState(false)
  const [showLabels, setShowLabels] = React.useState(true)
  const [defaultView, setDefaultView] = React.useState("grid")
  const [quickAccessToolbar, setQuickAccessToolbar] = React.useState(true)

  // Home
  const [defaultHomePage, setDefaultHomePage] = React.useState("dashboard")
  const [showRecentActivity, setShowRecentActivity] = React.useState(true)
  const [showRecommendations, setShowRecommendations] = React.useState(true)
  const [itemsPerPage, setItemsPerPage] = React.useState("20")

  // Appearance
  const [accentColor, setAccentColor] = React.useState("blue")
  const [fontSize, setFontSize] = React.useState("medium")
  const [animations, setAnimations] = React.useState(true)

  // Language & Region
  const [language, setLanguage] = React.useState("en")
  const [timeZone, setTimeZone] = React.useState("utc")
  const [dateFormat, setDateFormat] = React.useState("mdy")
  const [timeFormat, setTimeFormat] = React.useState("12")

  // Accessibility
  const [screenReader, setScreenReader] = React.useState(false)
  const [highContrast, setHighContrast] = React.useState(false)
  const [reduceMotion, setReduceMotion] = React.useState(false)
  const [textSizeMultiplier, setTextSizeMultiplier] = React.useState(100)
  const [keyboardNavigation, setKeyboardNavigation] = React.useState(true)

  // Privacy & Visibility
  const [profileVisibility, setProfileVisibility] = React.useState("public")
  const [showOnlineStatus, setShowOnlineStatus] = React.useState(true)
  const [showActivity, setShowActivity] = React.useState(true)
  const [allowSearchEngines, setAllowSearchEngines] = React.useState(false)
  const [dataCollection, setDataCollection] = React.useState(true)

  const [displayName, setDisplayName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [bio, setBio] = React.useState("")

  const [developerMode, setDeveloperMode] = React.useState(false)
  const [betaFeatures, setBetaFeatures] = React.useState(false)
  const [apiKey, setApiKey] = React.useState("")
  const [webhookUrl, setWebhookUrl] = React.useState("")

  // API keys for Dijkstra GPT
  const [supabaseKey, setSupabaseKey] = React.useState("")
  const [geminiKey, setGeminiKey] = React.useState("")

  // Advanced
  const [cacheSize, setCacheSize] = React.useState("500mb")
  const [hardwareAcceleration, setHardwareAcceleration] = React.useState(true)

  // Connected Accounts
  const [connectedAccounts, setConnectedAccounts] = React.useState<ConnectedAccount[]>([
    { platform: "GitHub", username: "johndoe", connected: true },
  ])

  const connectAccount = (platform: string, username: string) => {
    setConnectedAccounts((prev) => {
      const existing = prev.find((acc) => acc.platform === platform)
      if (existing) {
        return prev.map((acc) => (acc.platform === platform ? { ...acc, username, connected: true } : acc))
      }
      return [...prev, { platform, username, connected: true }]
    })
  }

  const disconnectAccount = (platform: string) => {
    setConnectedAccounts((prev) => prev.filter((acc) => acc.platform !== platform))
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSupabaseKey = localStorage.getItem("dijkstra_supabase_key")
      const storedGeminiKey = localStorage.getItem("dijkstra_gemini_key")

      if (storedSupabaseKey) setSupabaseKey(storedSupabaseKey)
      if (storedGeminiKey) setGeminiKey(storedGeminiKey)
    }
  }, [])

  React.useEffect(() => {
    if (typeof window !== "undefined" && supabaseKey) {
      localStorage.setItem("dijkstra_supabase_key", supabaseKey)
    }
  }, [supabaseKey])

  React.useEffect(() => {
    if (typeof window !== "undefined" && geminiKey) {
      localStorage.setItem("dijkstra_gemini_key", geminiKey)
    }
  }, [geminiKey])

  return (
    <SettingsContext.Provider
      value={{
        theme: theme || "system",
        setTheme,
        pushNotifications,
        setPushNotifications,
        emailNotifications,
        setEmailNotifications,
        desktopNotifications,
        setDesktopNotifications,
        notificationSound,
        setNotificationSound,
        mentionsOnly,
        setMentionsOnly,
        compactMode,
        setCompactMode,
        showLabels,
        setShowLabels,
        defaultView,
        setDefaultView,
        quickAccessToolbar,
        setQuickAccessToolbar,
        defaultHomePage,
        setDefaultHomePage,
        showRecentActivity,
        setShowRecentActivity,
        showRecommendations,
        setShowRecommendations,
        itemsPerPage,
        setItemsPerPage,
        accentColor,
        setAccentColor,
        fontSize,
        setFontSize,
        animations,
        setAnimations,
        language,
        setLanguage,
        timeZone,
        setTimeZone,
        dateFormat,
        setDateFormat,
        timeFormat,
        setTimeFormat,
        screenReader,
        setScreenReader,
        highContrast,
        setHighContrast,
        reduceMotion,
        setReduceMotion,
        textSizeMultiplier,
        setTextSizeMultiplier,
        keyboardNavigation,
        setKeyboardNavigation,
        profileVisibility,
        setProfileVisibility,
        showOnlineStatus,
        setShowOnlineStatus,
        showActivity,
        setShowActivity,
        allowSearchEngines,
        setAllowSearchEngines,
        dataCollection,
        setDataCollection,
        displayName,
        setDisplayName,
        email,
        setEmail,
        username,
        setUsername,
        bio,
        setBio,
        developerMode,
        setDeveloperMode,
        betaFeatures,
        setBetaFeatures,
        apiKey,
        setApiKey,
        webhookUrl,
        setWebhookUrl,
        supabaseKey,
        setSupabaseKey,
        geminiKey,
        setGeminiKey,
        cacheSize,
        setCacheSize,
        hardwareAcceleration,
        setHardwareAcceleration,
        connectedAccounts,
        connectAccount,
        disconnectAccount,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = React.useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
