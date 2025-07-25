import Homepage from "@/components/homepage";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ChatInterface from "@/components/dijkstra-gpt";

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
          <SiteHeader title="Home" />
        </div>
        <div className="flex-1 overflow-y-auto px-4 lg:px-6 landing-page">
          <div className="@container/main gap-4 py-2">
                    {/* <div className="@container/main flex flex-1 flex-row gap-4 py-2"> */}
            <Homepage />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
