"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileData } from "@/components/profile-data";
import Readme from "@/components/readme";
import Resume from "@/components/Resume and CV/resume";
import { StudentDashboard } from "@/components/student-dashboard";

export default function Page() {
  const [data, setData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [isResumeBuildingMode, setIsResumeBuildingMode] = useState(false);

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
          <SiteHeader title="Dashboard" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-6 landing-page">
          <div className="@container/main flex flex-1 flex-row gap-6 py-4">
            <div className={`${isResumeBuildingMode ? 'flex-1' : 'flex-[3]'} flex flex-col gap-4`}>
              <Tabs defaultValue="stats">
                <TabsList>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="readme">Readme</TabsTrigger>
                  <TabsTrigger value="resume">Resume & CV</TabsTrigger>
                  <TabsTrigger disabled value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="stats" className="space-y-4">
                  <SectionCards />
                  <ChartAreaInteractive />
                  {loading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-8" />
                      <Skeleton className="h-48" />
                      <Skeleton className="h-10" />
                    </div>
                  ) : (
                    <DataTable data={data as { header: string; type: string; id: number; status: string; target: string; limit: string; reviewer: string; }[]} />
                  )}
                </TabsContent>
                <TabsContent value="portfolio">
                  <StudentDashboard />
                </TabsContent>
                <TabsContent value="readme"><Readme /></TabsContent>
                <TabsContent value="resume"><Resume onResumeBuildingModeChange={setIsResumeBuildingMode} /></TabsContent>
                <TabsContent value="achievments">Make changes to your account here.</TabsContent>
              </Tabs>
            </div>

            {!isResumeBuildingMode && (
              <div className="flex-[1] flex flex-col">
                <ProfileData />
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
