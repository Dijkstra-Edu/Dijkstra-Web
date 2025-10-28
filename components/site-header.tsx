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

export function SiteHeader({ title }: { title: string }) {
  const { theme, setTheme } = useTheme();
  const presetPins = useSettingsStore((state) => state.presetPins);
  const customPins = useSettingsStore((state) => state.customPins);

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
        <h1 className="text-base font-medium">{title}</h1>
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
