"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

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

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error("Error fetching certificate data:", error);
      return null;
    }
  }

  const { data: session, status } = useSession();
  console.log("Session data:", session);
  console.log("Session status:", status);

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
      <SidebarInset>
        <SiteHeader title="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>

              {loading ? (
                <div className="space-y-2 px-4">
                  {/* You can customize skeleton height and width */}
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-48" />
                  <Skeleton className="h-10" />
                </div>
              ) : (
                <DataTable data={data} />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
