import {
  MessageCircle,
  Repeat2,
  Send,
  MoreHorizontal,
  ThumbsUp,
  BadgeCheckIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FeedPostCardProps {
  author: {
    name: string;
    title: string;
    avatar: string;
    verified: boolean;
  };
  timeAgo: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  reposts: number;
  reactions: string[];
  theme: "light" | "dark";
}

export function FeedPostCard({
  author,
  timeAgo,
  content,
  images,
  likes,
  comments,
  reposts,
  reactions,
  theme,
}: FeedPostCardProps) {
  return (
    <Card
      className={cn(
        "backdrop-blur-sm overflow-hidden bg-card/50 border-border"
      )}
    >
      <CardContent className="p-0">
        {/* Post header */}
        <div className="flex items-start justify-between p-4 pb-3">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={author.avatar || "/placeholder.svg"}
                alt={author.name}
              />
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <h3 className="font-semibold text-sm text-foreground">
                  {author.name}
                </h3>
                {author.verified && (
                  //   <Badge variant="secondary" className="h-4 w-4 p-0 rounded-full bg-blue-500">
                  //     <span className="text-white text-xs">✓</span>
                  //   </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-white dark:bg-blue-600"
                  >
                    <BadgeCheckIcon />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{author.title}</p>
              <p className="text-xs text-muted-foreground">{timeAgo} • 🌐</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Post content */}
        <div className="px-4 pb-3">
          <p className="text-sm whitespace-pre-line text-foreground">
            {content}
          </p>
        </div>

        {/* Post images */}
        {images.length > 0 && (
          <div className="px-4 pb-3">
            {images.length === 1 ? (
              <img
                src={images[0] || "/placeholder.svg"}
                alt="Post image"
                className="w-full h-auto object-cover rounded-lg max-h-96"
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reactions summary */}
        <div className="px-4 py-2 border-b border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="flex -space-x-1">
                {reactions.map((reaction, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs border border-background"
                  >
                    {reaction}
                  </div>
                ))}
              </div>
              <span>{likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{comments} comments</span>
              <span>{reposts} reposts</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-around p-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            Like
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Comment
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Repeat2 className="mr-2 h-4 w-4" />
            Repost
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
