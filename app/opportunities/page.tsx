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

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCertificateData().then((fetchedData) => {
      if (fetchedData) {
        setData(fetchedData);
      }
      setLoading(false);
    });
  }, []);

  async function getCertificateData() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Dijkstra/test/certificate/data/`
      );
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("Error fetching certificate data:", error);
      return null;
    }
  }

  const { data: session, status } = useSession();

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
          <SiteHeader title="Opportuntities" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 lg:px-6 landing-page">
          <OpportunitiesPage />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
