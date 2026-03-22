"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconBrandOpenai,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconTransformPoint,
  IconFidgetSpinner,
  IconArticle,
  IconCalendarEvent,
  IconCode,
  IconQuestionMark,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { SettingsDialog } from "./settings-dialog";
import { useState } from "react";
import { NavSettings } from "./nav-settings";
import { authClient } from "@/lib/auth/auth-client";

const appSidebarData = {
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: IconListDetails,
    },
    {
      title: "Dijkstra GPT",
      url: "/dijkstra-gpt",
      icon: IconBrandOpenai,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Learning Hub",
      url: "/learning-hub",
      icon: IconChartBar,
    },
    {
      title: "Discussion Forum",
      url: "https://discordapp.com/channels/1117871960874041376/1117873313130237992",
      icon: IconTransformPoint,
    },
    {
      title: "Blogs and Articles",
      url: "/blog",
      icon: IconArticle,
    },
    {
      title: "Join a Team",
      url: "/teams",
      icon: IconUsers,
    },
    {
      title: "Project Planner (Jira)",
      url: "/planner",
      icon: IconFidgetSpinner,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Get Help",
      url: "/administration/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/administration/search",
      icon: IconSearch,
    },
  ],
  challenges: [
    {
      name: "Quizzes",
      url: "/challenges/quizzes",
      icon: IconQuestionMark,
    },
    {
      name: "Weekly Challenges",
      url: "/challenges/weekly-challenges",
      icon: IconCalendarEvent,
    },
    {
      name: "Hackathons",
      url: "/challenges/hackathons",
      icon: IconCode,
    },
  ],
  opportunities: [
    {
      name: "Projects Hub",
      url: "/opportunities/projects",
      icon: IconDatabase,
    },
    {
      name: "Fellowships and Programs",
      url: "/opportunities/fellowships",
      icon: IconReport,
    },
    {
      name: "Job Board",
      url: "/opportunities/jobs",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const displayName = user?.name ?? "";
  const avatarUrl = user?.image ?? "";
  const email = user?.email ?? "";

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="flex items-center gap-2">
              <img src="/icon.png" alt="Logo" className="h-12 w-auto" />
              <span className="text-base font-semibold">Dijkstra</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={appSidebarData.navMain} />
        <NavDocuments items={appSidebarData.challenges} title="Challenges" />
        <NavDocuments items={appSidebarData.opportunities} title="Opportunities" />
        <NavSettings items={appSidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ name: displayName, email: email, avatar: avatarUrl }} />
      </SidebarFooter>
    </Sidebar>
  );
}
