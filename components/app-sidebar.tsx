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
import { useSession } from "next-auth/react";

const data = {
  user: {
    name: "Jonathan Rufus Samuel",
    email: "jonathan.rufus.samuel@cern.ch",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
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
      url: "/discussions",
      icon: IconTransformPoint,
    },
    {
      title: "Pin Board",
      url: "/pin-board",
      icon: IconFolder,
    },
    {
      title: "Join a Team",
      url: "/teams",
      icon: IconUsers,
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
      title: "Settings",
      url: "/administration/settings",
      icon: IconSettings,
    },
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
  documents: [
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
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    data.user.name = session.user.name || "No name";
    data.user.email = session.user.email || "No email";
    data.user.avatar = session.user.avatar_url || session.user.image || ""; // your extended avatar_url or fallback
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="#" className="flex items-center gap-2">
              <img src="/splash-icon.png" alt="Logo" className="h-12 w-auto" />
              <span className="text-base font-semibold">Dijkstra</span>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
