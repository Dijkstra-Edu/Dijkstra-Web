"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileData } from "@/components/profile-data";
import Readme from "@/components/readme";
import OpportunitiesPage from "@/components/opportunities/opportunities-page";
import AllJobsPage from "@/components/opportunities/all-jobs";

export default function Page() {

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="h-[calc(100vh-20px)] flex flex-col overflow-hidden">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-background">
          <SiteHeader title="Jobs" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 lg:px-6 landing-page">
          <AllJobsPage />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
