import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageCircle, Repeat2, MoreVertical, Edit, Trash2, ExternalLink } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Post } from "@/types/client/blog/blog-types"

interface UserPostCardProps {
  post: Post
  onEdit?: (postId: string) => void
  onDelete?: (postId: string) => void
}

export function UserPostCard({ post, onEdit, onDelete }: UserPostCardProps) {
  return (
    <Card className="hover:border-primary/50 hover:shadow-sm transition-all h-full flex flex-col">
      <CardContent className="p-4 flex flex-col flex-1">
        {/* Header with date and actions */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Post actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem onClick={() => onEdit?.(post.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive" 
                onClick={() => onDelete?.(post.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Post content */}
        <div className="flex-1 mb-3">
          <p className="text-sm text-foreground line-clamp-4 whitespace-pre-line mb-3">
            {post.content}
          </p>
          
          {post.images.length > 0 && (
            <div className="rounded-lg overflow-hidden mb-3">
              <img
                src={post.images[0] || "/placeholder.svg"}
                alt="Post image"
                className="w-full h-32 object-cover"
              />
            </div>
          )}
        </div>

        {/* Engagement stats */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{post.comments}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Repeat2 className="h-3.5 w-3.5" />
              <span>{post.reposts}</span>
            </div>
          </div>
          {post.reactions.length > 0 && (
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
          )}
        </div>
      </CardContent>
    </Card>
  )
}

