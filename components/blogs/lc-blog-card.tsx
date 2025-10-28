import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LCBlog } from "@/types/client/blog/blog-types"
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LCBlogCardProps {
  blog: LCBlog
}

export function LCBlogCard({ blog }: LCBlogCardProps) {
  const difficultyColor = {
    easy: "bg-green-500/10 text-green-500 border-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    hard: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  if (blog.status === "error") {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <XCircle className="h-4 w-4 text-destructive shrink-0" />
              <CardTitle className="text-sm font-medium truncate">Problem #{blog.problemNumber}</CardTitle>
            </div>
            <Badge variant="destructive" className="text-xs shrink-0">
              Error
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <p className="text-sm font-medium mb-1 line-clamp-1">{blog.title}</p>
          <p className="text-xs text-destructive/80 mb-3 line-clamp-2">{blog.errorMessage}</p>
          <Button variant="outline" size="sm" className="h-7 text-xs w-full bg-transparent">
            Fix Issue
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer group">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 min-w-0 flex-1">
            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
            <CardTitle className="text-sm font-medium leading-tight line-clamp-2">
              {blog.problemNumber}. {blog.title}
            </CardTitle>
          </div>
          <Badge className={`${difficultyColor[blog.difficulty]} text-xs shrink-0`}>{blog.difficulty}</Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="flex flex-wrap gap-1 mb-3">
          {blog.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0">
              {tag}
            </Badge>
          ))}
          {blog.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              +{blog.tags.length - 3}
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {blog.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
          <Button variant="ghost" size="sm" className="h-7 text-xs -mr-2 group-hover:text-primary">
            View
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
