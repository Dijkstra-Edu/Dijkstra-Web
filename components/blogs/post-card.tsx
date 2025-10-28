import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BadgeCheckIcon, ThumbsUp, MessageCircle, Repeat2 } from "lucide-react"
import type { Post } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer group">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
              {post.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-sm font-medium text-foreground truncate">{post.author.name}</span>
              {post.author.verified && (
                <Badge variant="secondary" className="h-4 px-1 py-0 bg-blue-500 text-white text-xs">
                  <BadgeCheckIcon className="h-3 w-3" />
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">{post.author.title}</p>
            <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <p className="text-sm text-foreground mb-3 line-clamp-3 whitespace-pre-line">
          {post.content}
        </p>
        
        {post.images.length > 0 && (
          <div className="mb-3 rounded-lg overflow-hidden">
            <img
              src={post.images[0] || "/placeholder.svg"}
              alt="Post image"
              className="w-full h-32 object-cover"
            />
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1">
                {post.reactions.slice(0, 3).map((reaction, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[10px] border border-background"
                  >
                    {reaction}
                  </div>
                ))}
              </div>
              <span>{post.likes}</span>
            </div>
            <span>{post.comments}</span>
            <span>{post.reposts}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <div className="flex items-center gap-1 flex-1 justify-center py-1 rounded hover:bg-accent transition-colors group/action">
            <ThumbsUp className={cn("h-3.5 w-3.5", post.isLiked ? "text-blue-500 fill-blue-500" : "")} />
            <span className={cn("text-xs", post.isLiked ? "text-blue-500" : "")}>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1 flex-1 justify-center py-1 rounded hover:bg-accent transition-colors">
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="text-xs">{post.comments}</span>
          </div>
          <div className="flex items-center gap-1 flex-1 justify-center py-1 rounded hover:bg-accent transition-colors">
            <Repeat2 className="h-3.5 w-3.5" />
            <span className="text-xs">{post.reposts}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

