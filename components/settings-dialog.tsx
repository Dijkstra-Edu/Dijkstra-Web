"use client";

import * as React from "react";

import { useSettingsStore } from "@/lib/Zustand/settings-store";
import { useTheme } from "next-themes";

import {
  Bell,
  Code,
  Globe,
  Home,
  Keyboard,
  Lock,
  Paintbrush,
  Plus,
  Settings,
  Trash2,
  User,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGithubFilled,
  IconBrandLeetcode,
  IconBrandLinkedin,
  IconSettings,
  IconWorldWww,
  IconLayoutDashboard,
} from "@tabler/icons-react";

const data = {
  nav: [
    { name: "Home", icon: Home },
    { name: "Accounts", icon: User },
    { name: "Notifications", icon: Bell },
    { name: "Appearance", icon: Paintbrush },
    { name: "Language & region", icon: Globe },
    { name: "Accessibility", icon: Keyboard },
    { name: "Privacy & visibility", icon: Lock },
    { name: "Developer Settings", icon: Code },
    { name: "Advanced", icon: Settings },
  ],
};

function NotificationsPage() {
  
  const settings = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Manage how you receive notifications
        </p>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Push notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive push notifications on your device
            </p>
          </div>
          <Switch
            checked={settings.pushNotifications}
            onCheckedChange={settings.setPushNotifications}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Email notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications via email
            </p>
          </div>
          <Switch
            checked={settings.emailNotifications}
            onCheckedChange={settings.setEmailNotifications}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Desktop notifications</Label>
            <p className="text-sm text-muted-foreground">
              Show notifications on your desktop
            </p>
          </div>
          <Switch
            checked={settings.desktopNotifications}
            onCheckedChange={settings.setDesktopNotifications}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Sound</Label>
            <p className="text-sm text-muted-foreground">
              Play a sound when you receive a notification
            </p>
          </div>
          <Switch
            checked={settings.notificationSound}
            onCheckedChange={settings.setNotificationSound}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Mentions only</Label>
            <p className="text-sm text-muted-foreground">
              Only notify when someone mentions you
            </p>
          </div>
          <Switch
            checked={settings.mentionsOnly}
            onCheckedChange={settings.setMentionsOnly}
          />
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const settings = useSettingsStore()
  const [newPinTitle, setNewPinTitle] = React.useState("")
  const [newPinUrl, setNewPinUrl] = React.useState("")
  const [newPinTooltip, setNewPinTooltip] = React.useState("")
  const [newPinImage, setNewPinImage] = React.useState("")
  const [showAddCustomPin, setShowAddCustomPin] = React.useState(false)

  const handleAddCustomPin = () => {
    if (newPinTitle && newPinUrl) {
      settings.addCustomPin({
        title: newPinTitle,
        url: newPinUrl,
        tooltip: newPinTooltip || newPinTitle,
        image: newPinImage || "/placeholder.svg?height=40&width=40",
        enabled: true,
      })
      setNewPinTitle("")
      setNewPinUrl("")
      setNewPinTooltip("")
      setNewPinImage("")
      setShowAddCustomPin(false)
    }
  }

  const getPinIcon = (iconName: string, color: string) => {
    const iconProps = { 
      className: "h-5 w-5", 
      style: { color },
      size: 20
    }

    switch (iconName) {
      case "reddit":
        return (
          <img
            src="https://static.vecteezy.com/system/resources/previews/018/930/474/non_2x/reddit-logo-reddit-icon-transparent-free-png.png"
            alt="Reddit"
            className="w-6 h-6 object-contain"
          />
        )
      case "scholar":
        return (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Scholar_logo.svg/2048px-Google_Scholar_logo.svg.png"
            alt="Google Scholar"
            className="w-6 h-6 object-contain"
          />
        )
      case "stackoverflow":
        return (
          <img
            src="https://pbs.twimg.com/profile_images/1220067947798024192/30eZhfxx_400x400.png"
            alt="Stack Overflow"
            className="w-8 h-8 object-contain"
          />
        )
      case "discord":
        return (
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-white-icon.png"
            alt="Discord"
            className="w-6 h-6 object-contain"
          />
        )
      case "linkedin":
        return (
          <img
            src="https://img.freepik.com/premium-vector/linkedin-logo-icon_1273375-1174.jpg"
            alt="LinkedIn"
            className="w-8 h-8 object-contain"
          />
        )
      case "leetcode":
        return (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
            alt="LeetCode"
            className="w-8 h-8 object-contain"
          />
        )
      case "github":
        return (
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
            className="w-6 h-6 object-contain"
          />
        )
      case "world":
        return <IconWorldWww className="h-5 w-5" style={{ color }} />
      case "dashboard":
        return <IconLayoutDashboard className="h-5 w-5" style={{ color }} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Home</h3>
        <p className="text-sm text-muted-foreground">Customize your home page experience</p>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Default home page</Label>
          <Select value={settings.defaultHomePage} onValueChange={settings.setDefaultHomePage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dashboard">Dashboard</SelectItem>
              <SelectItem value="feed">Activity feed</SelectItem>
              <SelectItem value="projects">Projects</SelectItem>
              <SelectItem value="tasks">Tasks</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Show recent activity</Label>
            <p className="text-sm text-muted-foreground">Display your recent activity on the home page</p>
          </div>
          <Switch checked={settings.showRecentActivity} onCheckedChange={settings.setShowRecentActivity} />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Show recommendations</Label>
            <p className="text-sm text-muted-foreground">Get personalized recommendations</p>
          </div>
          <Switch checked={settings.showRecommendations} onCheckedChange={settings.setShowRecommendations} />
        </div>
        <div className="space-y-2">
          <Label>Items per page</Label>
          <Select value={settings.itemsPerPage} onValueChange={settings.setItemsPerPage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Pins</h4>
            <p className="text-sm text-muted-foreground">Quick access links to your favorite sites</p>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm font-medium">Preset Pins</h5>
            {settings.presetPins.map((pin) => {
              const hasBackgroundColor = pin.color && pin.color !== "";
              const iconColor = hasBackgroundColor ? "#ffffff" : "currentColor";
              
              return (
                <div key={pin.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded"
                      style={hasBackgroundColor ? { backgroundColor: pin.color } : undefined}
                    >
                      {getPinIcon(pin.icon, iconColor)}                    
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{pin.name}</p>
                      {pin.enabled && (
                        <Input
                          placeholder="Enter URL"
                          value={pin.url}
                          onChange={(e) => settings.updatePresetPin(pin.id, { url: e.target.value })}
                          className="mt-1 h-8 text-xs"
                        />
                      )}
                    </div>
                  </div>
                  <Switch
                    checked={pin.enabled}
                    onCheckedChange={(enabled) => settings.updatePresetPin(pin.id, { enabled })}
                  />
                </div>
              );
            })}
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-medium">Custom Pins</h5>
              <Button size="sm" variant="outline" onClick={() => setShowAddCustomPin(!showAddCustomPin)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Custom Pin
              </Button>
            </div>

            {showAddCustomPin && (
              <div className="rounded-lg border p-4 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="pin-title">Title</Label>
                  <Input
                    id="pin-title"
                    placeholder="My Custom Pin"
                    value={newPinTitle}
                    onChange={(e) => setNewPinTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pin-url">URL</Label>
                  <Input
                    id="pin-url"
                    placeholder="https://example.com"
                    value={newPinUrl}
                    onChange={(e) => setNewPinUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pin-tooltip">Tooltip (optional)</Label>
                  <Input
                    id="pin-tooltip"
                    placeholder="Description for this pin"
                    value={newPinTooltip}
                    onChange={(e) => setNewPinTooltip(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pin-image">Image URL (optional)</Label>
                  <Input
                    id="pin-image"
                    placeholder="https://example.com/icon.png"
                    value={newPinImage}
                    onChange={(e) => setNewPinImage(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddCustomPin}>
                    Add Pin
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowAddCustomPin(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {settings.customPins.length > 0 ? (
              <div className="space-y-2">
                {settings.customPins.map((pin) => (
                  <div key={pin.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3 flex-1">
                      <img
                        src={pin.image || "/placeholder.svg"}
                        alt={pin.title}
                        className="h-8 w-8 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{pin.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{pin.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={pin.enabled}
                        onCheckedChange={(enabled) => settings.updateCustomPin(pin.id, { enabled })}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => settings.deleteCustomPin(pin.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No custom pins yet. Add one to get started!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountsPage() {
  const settings = useSettingsStore();

  const getConnectedAccount = (platform: string) => {
    return settings.connectedAccounts.find((acc) => acc.platform === platform);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Accounts</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and profile
        </p>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Connected Accounts</h4>
          <p className="text-sm text-muted-foreground">
            Link your professional, academic, and competitive programming
            accounts
          </p>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#181717]">
                <IconBrandGithub className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-medium">GitHub</p>
                {getConnectedAccount("GitHub") ? (
                  <p className="text-sm text-muted-foreground">
                    @{getConnectedAccount("GitHub")?.username}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Connect your GitHub account
                  </p>
                )}
              </div>
            </div>
            {getConnectedAccount("GitHub") ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-600 dark:text-green-400">
                  Connected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => settings.disconnectAccount("GitHub")}
                  disabled
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => settings.connectAccount("GitHub", "JRS296")}
              >
                Connect
              </Button>
            )}
          </div>

          {/* Discord */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#ffffff]">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/018/930/500/non_2x/discord-logo-discord-icon-transparent-free-png.png"
                  alt="Discord"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-medium">Discord</p>
                <p className="text-sm text-muted-foreground">
                  Link your Discord account
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#ffffff]">
                <img
                  src="https://img.freepik.com/premium-vector/linkedin-logo-icon_1273375-1174.jpg"
                  alt="LinkedIn"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-medium">LinkedIn</p>
                <p className="text-sm text-muted-foreground">
                  Connect your LinkedIn profile
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          {/* LeetCode */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#ffffff]">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                  alt="LeetCode"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-medium">LeetCode</p>
                <p className="text-sm text-muted-foreground">
                  Link your LeetCode profile
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          {/* Hugging Face */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FFD21E]">
                <img
                  src="https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.png"
                  alt="Hugging Face"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-medium">Hugging Face</p>
                <p className="text-sm text-muted-foreground">
                  Connect your Hugging Face account
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          {/* Kaggle */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#20BEFF]">
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Kaggle</p>
                <p className="text-sm text-muted-foreground">
                  Link your Kaggle profile
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          {/* Codeforces */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-white">
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-code-forces-logo-icon-svg-download-png-2944796.png"
                  alt="Codeforces"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <p className="font-medium">Codeforces</p>
                <p className="text-sm text-muted-foreground">
                  Connect your Codeforces account
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          {/* CodeChef */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#5B4638]">
                <img
                  src="https://codechefabesec.netlify.app/img/icons/ccemoji2.webp"
                  alt="CodeChef"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-medium">CodeChef</p>
                <p className="text-sm text-muted-foreground">
                  Link your CodeChef profile
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          {/* ORCID */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#A6CE39]">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/ORCID_iD.svg/2048px-ORCID_iD.svg.png"
                  alt="ORCID"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-medium">ORCID</p>
                <p className="text-sm text-muted-foreground">
                  Link your ORCID iD
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          {/* Overleaf */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-white">
                <img
                  src="https://images.ctfassets.net/nrgyaltdicpt/3nesOc6iRhdzatUCC5OKWo/ea0fc03647a5f6a903a9aacc357481b2/overleaf-o-logo-primary.jpg"
                  alt="Overleaf"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-medium">Overleaf</p>
                <p className="text-sm text-muted-foreground">
                  Connect your Overleaf account
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          {/* Google Scholar */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-white">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Scholar_logo.svg/2048px-Google_Scholar_logo.svg.png"
                  alt="Google Scholar"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-medium">Google Scholar</p>
                <p className="text-sm text-muted-foreground">
                  Link your Google Scholar profile
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          {/* ICPC */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-white">
                <img
                  src="https://news.icpc.global/icpc_foundation.svg"
                  alt="ICPC"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-medium">ICPC</p>
                <p className="text-sm text-muted-foreground">
                  Link your ICPC profile
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>

          {/* KodeCloud */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#3e199b]">
                <img
                  src="https://avatars.githubusercontent.com/u/43662489?s=280&v=4"
                  alt="KodeCloud"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="font-medium">KodeCloud</p>
                <p className="text-sm text-muted-foreground">
                  Connect your KodeCloud account
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        </div>
        <Separator />
            User Data?
        <Separator />
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Two-factor authentication</h4>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security
            </p>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppearancePage() {
  const settings = useSettingsStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Appearance</h3>
          <p className="text-sm text-muted-foreground">
            Customize the look and feel of the application
          </p>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <div className="text-sm text-muted-foreground">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the look and feel of the application
        </p>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Theme</Label>
          <RadioGroup value={theme} onValueChange={setTheme}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="font-normal">
                Light
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="font-normal">
                Dark
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system" className="font-normal">
                System
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label>Accent color</Label>
          <Select
            value={settings.accentColor}
            onValueChange={settings.setAccentColor}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Font size</Label>
          <Select
            value={settings.fontSize}
            onValueChange={settings.setFontSize}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Animations</Label>
            <p className="text-sm text-muted-foreground">
              Enable interface animations
            </p>
          </div>
          <Switch
            checked={settings.animations}
            onCheckedChange={settings.setAnimations}
          />
        </div>
      </div>
    </div>
  );
}

function LanguageRegionPage() {
  const settings = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Language & region</h3>
        <p className="text-sm text-muted-foreground">
          Set your language and regional preferences
        </p>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Language</Label>
          <Select
            value={settings.language}
            onValueChange={settings.setLanguage}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Time zone</Label>
          <Select
            value={settings.timeZone}
            onValueChange={settings.setTimeZone}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc">UTC</SelectItem>
              <SelectItem value="est">Eastern Time</SelectItem>
              <SelectItem value="pst">Pacific Time</SelectItem>
              <SelectItem value="cet">Central European Time</SelectItem>
              <SelectItem value="jst">Japan Standard Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Date format</Label>
          <Select
            value={settings.dateFormat}
            onValueChange={settings.setDateFormat}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
              <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
              <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Time format</Label>
          <RadioGroup
            value={settings.timeFormat}
            onValueChange={settings.setTimeFormat}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="12" id="12h" />
              <Label htmlFor="12h">12-hour</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="24" id="24h" />
              <Label htmlFor="24h">24-hour</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

function AccessibilityPage() {
  const settings = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Accessibility</h3>
        <p className="text-sm text-muted-foreground">
          Make the application more accessible
        </p>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Screen reader support</Label>
            <p className="text-sm text-muted-foreground">
              Optimize for screen readers
            </p>
          </div>
          <Switch
            checked={settings.screenReader}
            onCheckedChange={settings.setScreenReader}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>High contrast mode</Label>
            <p className="text-sm text-muted-foreground">
              Increase contrast for better visibility
            </p>
          </div>
          <Switch
            checked={settings.highContrast}
            onCheckedChange={settings.setHighContrast}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Reduce motion</Label>
            <p className="text-sm text-muted-foreground">
              Minimize animations and transitions
            </p>
          </div>
          <Switch
            checked={settings.reduceMotion}
            onCheckedChange={settings.setReduceMotion}
          />
        </div>
        <div className="space-y-2">
          <Label>Text size multiplier</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[settings.textSizeMultiplier]}
              onValueChange={(value) =>
                settings.setTextSizeMultiplier(value[0])
              }
              max={200}
              min={75}
              step={25}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-12">
              {settings.textSizeMultiplier}%
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Keyboard navigation</Label>
            <p className="text-sm text-muted-foreground">
              Enhanced keyboard shortcuts
            </p>
          </div>
          <Switch
            checked={settings.keyboardNavigation}
            onCheckedChange={settings.setKeyboardNavigation}
          />
        </div>
      </div>
    </div>
  );
}

function PrivacyVisibilityPage() {
  const settings = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Privacy & visibility</h3>
        <p className="text-sm text-muted-foreground">
          Control your privacy and who can see your information
        </p>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Profile visibility</Label>
          <RadioGroup
            value={settings.profileVisibility}
            onValueChange={settings.setProfileVisibility}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public">Public</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="friends" id="friends" />
              <Label htmlFor="friends">Friends only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private">Private</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Show online status</Label>
            <p className="text-sm text-muted-foreground">
              Let others see when you're online
            </p>
          </div>
          <Switch
            checked={settings.showOnlineStatus}
            onCheckedChange={settings.setShowOnlineStatus}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Show activity</Label>
            <p className="text-sm text-muted-foreground">
              Display your recent activity
            </p>
          </div>
          <Switch
            checked={settings.showActivity}
            onCheckedChange={settings.setShowActivity}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Allow search engines</Label>
            <p className="text-sm text-muted-foreground">
              Let search engines index your profile
            </p>
          </div>
          <Switch
            checked={settings.allowSearchEngines}
            onCheckedChange={settings.setAllowSearchEngines}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Data collection</Label>
            <p className="text-sm text-muted-foreground">
              Allow analytics and usage data collection
            </p>
          </div>
          <Switch
            checked={settings.dataCollection}
            onCheckedChange={settings.setDataCollection}
          />
        </div>
      </div>
    </div>
  );
}

function DeveloperSettingsPage() {
  const settings = useSettingsStore();
  const [showSupabaseKey, setShowSupabaseKey] = React.useState(false);
  const [showGeminiKey, setShowGeminiKey] = React.useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Developer Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure API keys and developer tools
        </p>
      </div>
      <Separator />

      <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
        <div className="flex gap-2">
          <svg
            className="h-5 w-5 text-yellow-600 dark:text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="space-y-1">
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-500">
              Security Notice
            </p>
            <p className="text-sm text-yellow-600/90 dark:text-yellow-500/90">
              API keys are stored securely in your browser's local storage and
              are only accessible on this device. Never share your API keys with
              others.

              To Be Fixed, this is NOT THE RIGHT WAY TO DO THIS
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="supabase-key">Supabase Key</Label>
          <p className="text-sm text-muted-foreground">
            API key for storing user chat data from Dijkstra GPT in Supabase
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="supabase-key"
                type={showSupabaseKey ? "text" : "password"}
                placeholder="Enter your Supabase API key"
                value={settings.supabaseKey}
                onChange={(e) => settings.setSupabaseKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowSupabaseKey(!showSupabaseKey)}
              >
                {showSupabaseKey ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </Button>
            </div>
          </div>
          {settings.supabaseKey && (
            <p className="text-xs text-green-600 dark:text-green-400">
              ✓ Key saved and accessible throughout the app
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gemini-key">Gemini API Key</Label>
          <p className="text-sm text-muted-foreground">
            API key for Dijkstra GPT powered by Google Gemini
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="gemini-key"
                type={showGeminiKey ? "text" : "password"}
                placeholder="Enter your Gemini API key"
                value={settings.geminiKey}
                onChange={(e) => settings.setGeminiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowGeminiKey(!showGeminiKey)}
              >
                {showGeminiKey ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </Button>
            </div>
          </div>
          {settings.geminiKey && (
            <p className="text-xs text-green-600 dark:text-green-400">
              ✓ Key saved and accessible throughout the app
            </p>
          )}
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Developer mode</Label>
            <p className="text-sm text-muted-foreground">
              Enable developer tools and features
            </p>
          </div>
          <Switch
            checked={settings.developerMode}
            onCheckedChange={settings.setDeveloperMode}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Beta features</Label>
            <p className="text-sm text-muted-foreground">
              Try experimental features before release
            </p>
          </div>
          <Switch
            checked={settings.betaFeatures}
            onCheckedChange={settings.setBetaFeatures}
          />
        </div>
        <div className="space-y-2">
          <Label>API key</Label>
          <Input
            type="password"
            placeholder="Enter your API key"
            value={settings.apiKey}
            onChange={(e) => settings.setApiKey(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Webhook URL</Label>
          <Input
            placeholder="https://example.com/webhook"
            defaultValue={settings.webhookUrl}
            onInput={(e) => settings.setWebhookUrl(e.currentTarget.value)}
          />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">API Documentation</h4>
          <Button variant="outline" size="sm">
            View API Docs
          </Button>
        </div>
      </div>
    </div>
  );
}

function AdvancedPage() {
  const settings = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Advanced</h3>
        <p className="text-sm text-muted-foreground">
          Advanced settings for power users
        </p>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Cache size</Label>
          <Select
            value={settings.cacheSize}
            onValueChange={settings.setCacheSize}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="100mb">100 MB</SelectItem>
              <SelectItem value="500mb">500 MB</SelectItem>
              <SelectItem value="1gb">1 GB</SelectItem>
              <SelectItem value="5gb">5 GB</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Hardware acceleration</Label>
            <p className="text-sm text-muted-foreground">
              Use GPU for better performance
            </p>
          </div>
          <Switch
            checked={settings.hardwareAcceleration}
            onCheckedChange={settings.setHardwareAcceleration}
          />
        </div>
        <Separator />
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Data Management</h4>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export data
            </Button>
            <Button variant="outline" size="sm">
              Import data
            </Button>
          </div>
        </div>
        <div className="pt-4">
          <Button variant="destructive" size="sm">
            Clear all data
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SettingsDialog({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: { open?: boolean; onOpenChange?: (open: boolean) => void } = {}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [activePage, setActivePage] = React.useState("Home");

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange || setInternalOpen;

  const renderPageContent = () => {
    switch (activePage) {
      case "Home":
        return <HomePage />;
      case "Accounts":
        return <AccountsPage />;
      case "Notifications":
        return <NotificationsPage />;
      case "Appearance":
        return <AppearancePage />;
      case "Language & region":
        return <LanguageRegionPage />;
      case "Accessibility":
        return <AccessibilityPage />;
      case "Privacy & visibility":
        return <PrivacyVisibilityPage />;
      case "Developer Settings":
        return <DeveloperSettingsPage />;
      case "Advanced":
        return <AdvancedPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton className="cursor-pointer">
          <IconSettings />
          <span>Settings</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="overflow-hidden border-black p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <div className="flex items-center gap-2 px-4 py-3">
                <Settings className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Settings</h2>
              </div>
              <Separator />
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.name === activePage}
                        >
                          <button onClick={() => setActivePage(item.name)}>
                            <item.icon />
                            <span>{item.name}</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{activePage}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {renderPageContent()}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
