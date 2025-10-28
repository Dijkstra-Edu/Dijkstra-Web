"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Github, BookOpen } from "lucide-react"
import { useSession } from "next-auth/react"
import { useMemo } from "react"
import { personalBlogs } from "@/data/mock-data"

interface UserProfileCardProps {
  blogStats?: {
    published: number
    drafts: number
    archived: number
  }
}

export function UserProfileCard({ blogStats }: UserProfileCardProps) {
  const { data: session, status } = useSession()

  // Calculate blog stats from personalBlogs if not provided
  const stats = useMemo(() => {
    if (blogStats) return blogStats
    
    const published = personalBlogs.filter(b => b.status === "published").length
    const drafts = personalBlogs.filter(b => b.status === "draft").length
    const archived = personalBlogs.filter(b => b.status === "archived").length
    
    return { published, drafts, archived }
  }, [blogStats])

  // Get user display info from session
  const displayName = session?.user?.name || session?.user?.login || "User"
  const avatarUrl = session?.user?.avatar_url || session?.user?.image
  const role = session?.user?.company || session?.user?.bio || "Software Technical Writer"
  const githubUrl = session?.user?.login 
    ? `https://github.com/${session.user.login}` 
    : "#"
  
  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (status === "loading") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-3 w-32 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl || ""} alt={displayName} />
            <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{displayName}</h3>
            <p className="text-sm text-muted-foreground truncate">{role}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-transparent cursor-pointer"
            onClick={() => window.open(githubUrl, "_blank")}
            disabled={!session?.user?.login}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-transparent cursor-pointer"
            asChild
          >
            <a href="https://blog.dijkstra.org.in/" target="_blank" rel="noopener noreferrer">
              <BookOpen className="mr-2 h-4 w-4" />
              Go to Blogs
            </a>
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-2 text-center">
          <div>
            <div className="text-2xl font-bold">{stats.published}</div>
            <div className="text-xs text-muted-foreground">Published</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.drafts}</div>
            <div className="text-xs text-muted-foreground">Drafts</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.archived}</div>
            <div className="text-xs text-muted-foreground">Archived</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
