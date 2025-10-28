"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent } from "@/components/ui/card";

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
        <div className="sticky top-0 z-10 bg-background">
          <SiteHeader title="Create Post" />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-6 landing-page">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">Post creation form will go here</p>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

