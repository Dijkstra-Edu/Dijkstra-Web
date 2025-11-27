"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DataTable } from "@/components/blogs/data-table";
import { columns } from "@/components/blogs/columns";
import { personalBlogs, lcBlogs, posts } from "@/data/mock-data";
import { LCBlogCard } from "@/components/blogs/lc-blog-card";
import { LCInstructionsCard } from "@/components/blogs/lc-instructions-card";
import { PostsCarousel } from "@/components/blogs/posts-carousel";
import { UserProfileCard } from "@/components/user-profile-card";
import { QuickActions } from "@/components/quick-actions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";

export default function Page() {
  const handleEditPost = (postId: string) => {
    // TODO: Implement edit functionality
    console.log("Edit post:", postId)
  }

  const handleDeletePost = (postId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete post:", postId)
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
      {/* Keep QA sidebar */}
      <AppSidebar variant="inset" />

      {/* Keep QA SidebarInset wrapper */}
      <SidebarInset className="h-[calc(100vh-20px)] flex flex-col overflow-hidden">
        {/* QA Sticky Header */}
        <div className="sticky top-0 z-10 bg-background">
          <SiteHeader title="Blogs and Articles" />
        </div>

        {/* Scrollable content (PR widgets go here) */}
        <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6 landing-page">
          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold tracking-tight">Personal Blogs</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage and organize your blog posts
                  </p>
                </div>
                <DataTable 
                  data={personalBlogs} 
                  columns={columns}
                  actions={
                    <Link href="/blog/create">
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Blog
                      </Button>
                    </Link>
                  }
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 lg:flex lg:flex-col lg:h-full">
              <UserProfileCard />
              <div className="lg:flex-1">
                <QuickActions />
              </div>
            </div>
          </div>

          <Separator />

          {/* Posts */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
                <p className="text-sm text-muted-foreground">
                  Your posts shared with the Dijkstra community
                </p>
              </div>
              <Link href="/post/create">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </Link>
            </div>
            <PostsCarousel 
              posts={posts} 
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
            />
          </div>

          <Separator />

          {/* LeetCode Blogs */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold tracking-tight">LeetCode Blogs</h2>
              <p className="text-sm text-muted-foreground">
                Automatically generated from your LeetCode solutions
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              <LCInstructionsCard />
              {lcBlogs.map((blog) => (
                <LCBlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
