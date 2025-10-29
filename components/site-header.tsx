"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { signOut } from "next-auth/react";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandDiscord,
  IconBrandLeetcode,
  IconWorldWww,
  IconLogout,
  IconLayoutDashboard,
  IconBrandStackoverflow,
  IconBrandReddit,
  IconSchool,
  IconNotebook,
  IconSun,
  IconMoon,
  IconExternalLink,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Bell, Notebook, Sheet } from "lucide-react";
import ActionSearchBar from "./action-search-bar";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";

import { handleLogout } from "@/lib/logout";
import { useSettingsStore } from "@/lib/Zustand/settings-store";
import type { PresetPin, CustomPin } from "@/types/lib/Zustand/settings-store-types";
import { callGemini } from "@/lib/geminiClient";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { getDataForgeBaseUrl } from "@/server/dataforge/client";
import { getArchivistBaseUrl } from "@/server/archivist/client";
import { getGitripperBaseUrl } from "@/server/gitripper/client";
import { getHeliosBaseUrl } from "@/server/helios/client";

// Service types for API status checks
export type ServiceType = 'DIJKSTRA_GPT' | 'ARCHIVIST' | 'GITRIPPER' | 'DATAFORGE' | 'HELIOS';

interface ServiceStatus {
  service: ServiceType;
  status: 'checking' | 'active' | 'inactive';
}

// Icon mapping helper
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    reddit: IconBrandReddit,
    scholar: IconSchool,
    stackoverflow: IconBrandStackoverflow,
    discord: IconBrandDiscord,
    linkedin: IconBrandLinkedin,
    leetcode: IconBrandLeetcode,
    github: IconBrandGithub,
    world: IconWorldWww,
    dashboard: IconLayoutDashboard,
    notebook: IconNotebook,
  };
  return iconMap[iconName] || IconExternalLink;
};

export function SiteHeader({ title, services }: { title: string; services?: ServiceType[] }) {
  const { theme, setTheme } = useTheme();
  const presetPins = useSettingsStore((state) => state.presetPins);
  const customPins = useSettingsStore((state) => state.customPins);
  const [serviceStatuses, setServiceStatuses] = React.useState<ServiceStatus[]>([]);
  const dataforgeBaseUrl = getDataForgeBaseUrl();
  const archivistBaseUrl = getArchivistBaseUrl();
  const gitripperBaseUrl = getGitripperBaseUrl();
  const heliosBaseUrl = getHeliosBaseUrl();
  // Health check endpoints mapping
  const healthEndpoints: Record<ServiceType, () => Promise<boolean>> = {
    DIJKSTRA_GPT: async () => {
      try {
        const response = await callGemini("test");
        return !!response;
      } catch {
        return false;
      }
    },
    DATAFORGE: async () => {
      try {
        const response = await fetch(`${dataforgeBaseUrl}/Dijkstra/v1/health`);
        return response.ok;
      } catch {
        return false;
      }
    },
    HELIOS: async () => {
      try {
        const response = await fetch(`${heliosBaseUrl}/Helios/v1/health`);
        return response.ok;
      } catch {
        return false;
      }
    },
    GITRIPPER: async () => {
      try {
        const response = await fetch(`${gitripperBaseUrl}/Gitripper/v1/health`);
        return response.ok;
      } catch {
        return false;
      }
    },
    ARCHIVIST: async () => {
      try {
        const response = await fetch(`${archivistBaseUrl}/Archivist/v1/health`);
        return response.ok;
      } catch {
        return false;
      }
    },
  };

  // Check API status for all specified services
  React.useEffect(() => {
    if (services && services.length > 0) {
      // Initialize all services as checking
      const initialStatuses: ServiceStatus[] = services.map(service => ({
        service,
        status: 'checking'
      }));
      setServiceStatuses(initialStatuses);

      // Check each service
      services.forEach(async (service) => {
        try {
          const isActive = await healthEndpoints[service]();
          setServiceStatuses(prev => 
            prev.map(s => s.service === service 
              ? { ...s, status: isActive ? 'active' : 'inactive' }
              : s
            )
          );
        } catch {
          setServiceStatuses(prev => 
            prev.map(s => s.service === service 
              ? { ...s, status: 'inactive' }
              : s
            )
          );
        }
      });
    }
  }, [services]);

  // Debug logging (can be removed later)
  React.useEffect(() => {
    console.log('Preset Pins:', presetPins);
    console.log('Enabled Preset Pins:', presetPins?.filter((pin) => pin.enabled));
  }, [presetPins]);

  // Filter enabled pins and group them
  const enabledPresetPins = presetPins?.filter((pin) => pin.enabled) || [];
  const enabledCustomPins = customPins?.filter((pin) => pin.enabled) || [];

  // Group preset pins by their group number
  const groupedPins = enabledPresetPins.reduce((acc, pin) => {
    if (!acc[pin.group]) {
      acc[pin.group] = [];
    }
    acc[pin.group].push(pin);
    return acc;
  }, {} as Record<number, typeof enabledPresetPins>);

  // Get sorted group numbers
  const groupNumbers = Object.keys(groupedPins).map(Number).sort((a, b) => a - b);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium mr-2">{title}</h1>
        {services && services.length > 0 && serviceStatuses.length > 0 && (() => {
          // Calculate overall status: checking if any is checking, active if all are active, otherwise inactive
          const overallStatus = serviceStatuses.some(s => s.status === 'checking')
            ? 'checking'
            : serviceStatuses.every(s => s.status === 'active')
            ? 'active'
            : 'inactive';
          
          // Format service names for display
          const formatServiceName = (service: ServiceType): string => {
            return service.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          };

          // Build tooltip content
          const tooltipContent = serviceStatuses
            .map(s => {
              const statusIcon = s.status === 'active' ? '✓' : s.status === 'inactive' ? '✗' : '⟳';
              return `${statusIcon} ${formatServiceName(s.service)}: ${s.status === 'active' ? 'Active' : s.status === 'inactive' ? 'Inactive' : 'Checking...'}`;
            })
            .join('\n');

          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`flex items-center gap-2 px-2 py-1 rounded-full border text-xs font-medium transition-all cursor-help ${
                  overallStatus === 'active' 
                    ? 'bg-green-500/10 border-green-500 text-green-600' 
                    : overallStatus === 'inactive'
                    ? 'bg-red-500/10 border-red-500 text-red-600'
                    : 'bg-yellow-500/10 border-yellow-500 text-yellow-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    overallStatus === 'active' 
                      ? 'bg-green-500 animate-pulse' 
                      : overallStatus === 'inactive'
                      ? 'bg-red-500'
                      : 'bg-yellow-500 animate-pulse'
                  }`} />
                  <span>
                    {overallStatus === 'active' ? 'Active' : overallStatus === 'inactive' ? 'Inactive' : 'Checking...'}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs whitespace-pre-line text-left">
                <div className="font-semibold mb-1">Service Status:</div>
                {tooltipContent}
              </TooltipContent>
            </Tooltip>
          );
        })()}
        {/* <ActionSearchBar /> */}
        <div className="ml-auto flex items-center gap-2">
          {/* Render preset pins grouped with separators */}
          {groupNumbers.map((groupNum, groupIndex) => (
            <React.Fragment key={`group-${groupNum}`}>
              {(groupedPins[groupNum] || []).map((pin) => {
                const IconComponent = getIconComponent(pin.icon);
                const hasBackgroundColor = pin.color && pin.color !== "";
                
                return (
                  <Button
                    key={pin.id}
                    variant="secondary"
                    asChild
                    size="sm"
                    className="hidden sm:flex"
                    style={hasBackgroundColor ? { backgroundColor: pin.color } : undefined}
                    title={pin.tooltip}
                  >
                    <a
                      href={pin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dark:text-foreground"
                    >
                      <IconComponent className={hasBackgroundColor ? "h-4 w-4 text-white" : "h-4 w-4"} />
                    </a>
                  </Button>
                );
              })}
              
              {/* Add separator after each group except the last one */}
              {groupIndex < groupNumbers.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="mx-2 data-[orientation=vertical]:h-4"
                />
              )}
            </React.Fragment>
          ))}

          {/* Render custom pins */}
          {enabledCustomPins.map((pin) => (
            <Button
              key={pin.id}
              variant="secondary"
              asChild
              size="sm"
              className="hidden sm:flex"
              title={pin.tooltip}
            >
              <a
                href={pin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-foreground"
              >
                {pin.image ? (
                  <img src={pin.image} alt={pin.title} className="h-4 w-4" />
                ) : (
                  <IconExternalLink className="h-4 w-4" />
                )}
              </a>
            </Button>
          ))}

          {/* Final separator before theme/notifications */}
          {(enabledPresetPins.length > 0 || enabledCustomPins.length > 0) && (
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
          )}

          <Button
            variant="secondary"
            asChild
            size="sm"
            className="hidden cursor-pointer sm:flex"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <div>
              {theme === "dark" ? (
                <IconMoon className="h-5 w-5" />
              ) : (
                <IconSun className="h-5 w-5" />
              )}
            </div>
          </Button>
          <Button
            variant="secondary"
            asChild
            size="sm"
            className="hidden sm:flex"
          >
            <a
              href="https://your-notification-link.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center dark:text-foreground"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </a>
          </Button>

          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Button
            onClick={() => {handleLogout()}}
            variant="default"
            asChild
            size="sm"
            className="hidden sm:flex cursor-pointer"
          >
            <span>
              <IconLogout className="h-4 w-4"/> Sign Out
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
