"use client";

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

export function SiteHeader({ title }: { title: string }) {
  /*
  Things to change:
  - Change it all to icons
  - LinksL GithUb, Leetcode, Specialization, LinkedIn, Dijkstra Page, Personal Page
  - option to pin other pages and sites
  */
  const { theme, setTheme } = useTheme();
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
          <Button
            variant="secondary"
            asChild
            size="sm"
            className="hidden sm:flex bg-[#FF4500]"
          >
            <a
              href="https://www.reddit.com/"
              target="_blank"
              className="dark:text-foreground"
            >
              <IconBrandReddit className="h-4 w-4 text-white" />
            </a>
          </Button>
          <Button
            variant="secondary"
            asChild
            size="sm"
            className="hidden sm:flex bg-[#4285F4]"
          >
            <a
              href="https://scholar.google.com/"
              target="_blank"
              className="dark:text-foreground"
            >
              <IconSchool className="h-4 w-4 text-white" />
            </a>
          </Button>
          <Button
            variant="secondary"
            asChild
            size="sm"
            className="hidden sm:flex bg-[#F48024]"
          >
            <a
              href="https://stackoverflow.com/questions"
              target="_blank"
              className="dark:text-foreground"
            >
              <IconBrandStackoverflow className="h-4 w-4 text-white" />
            </a>
          </Button>
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Button
            variant="secondary"
            asChild
            size="sm"
            className="hidden sm:flex bg-[#5865F2]"
          >
            <a
              href="https://discord.gg/jE9kfzCv"
              target="_blank"
              className="dark:text-foreground"
            >
              <IconBrandDiscord className="h-4 w-4 text-white" />
            </a>
          </Button>
          <Button
            variant="secondary"
            asChild
            size="sm"
            className="hidden sm:flex bg-[#0A66C2]"
          >
            <a
              href="https://www.linkedin.com/in/jrs2002/"
              target="_blank"
              className="dark:text-foreground"
            >
              <IconBrandLinkedin className="h-4 w-4 text-white" />
            </a>
          </Button>
          <Button
            variant="secondary"
            asChild
            size="sm"
            className="hidden sm:flex bg-amber-300"
          >
            <a
              href="https://leetcode.com/u/JRS296/"
              target="_blank"
              className="dark:text-foreground"
            >
              <IconBrandLeetcode className="h-4 w-4 text-white" />
            </a>
          </Button>
          <Button
            variant="secondary"
            asChild
            size="sm"
            className="hidden sm:flex bg-black"
          >
            <a
              href="https://github.com/JRS296"
              target="_blank"
              className="dark:text-foreground"
            >
              <IconBrandGithub className="h-4 w-4 text-white" />
            </a>
          </Button>
          <Button
            variant="secondary"
            asChild
            size="sm"
            className="hidden sm:flex"
          >
            <a
              href="https://jrs-studios.web.cern.ch/"
              target="_blank"
              className="dark:text-foreground"
            >
              <IconWorldWww className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="secondary"
            asChild
            size="sm"
            className="hidden sm:flex"
            disabled
          >
            <a href="" target="_blank" className="dark:text-foreground">
              <IconLayoutDashboard className="h-4 w-4" />
            </a>
          </Button>
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          {/* <Button
            variant="secondary"
            size="sm"
            className="hidden sm:flex"
            onClick={onNotebookClick}
          >
            <IconNotebook className="h-4 w-4" />
          </Button> */}
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
            onClick={() => signOut({ callbackUrl: "/login" })}
            variant="default"
            asChild
            size="sm"
            className="hidden sm:flex cursor-pointer"
          >
            <span>
              <IconLogout className="h-4 w-4" /> Sign Out
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
