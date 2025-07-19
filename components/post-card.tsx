import { Heart, MessageCircle, Share2 } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface PostCardProps {
  username: string
  avatarUrl: string
  imageUrl: string
  caption: string
  likes: number
  comments: number
}

export function PostCard({ username, avatarUrl, imageUrl, caption, likes, comments }: PostCardProps) {
  return (
    <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700 overflow-hidden">
      <CardHeader className="flex flex-row items-center space-x-3 p-4 pb-0">
        <Avatar className="h-9 w-9">
          <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={username} />
          <AvatarFallback className="bg-blue-900 text-blue-300">{username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="font-semibold text-slate-100">{username}</div>
      </CardHeader>
      <CardContent className="p-0">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt="Post image"
          className="w-full h-auto object-cover aspect-square"
        />
      </CardContent>
      <CardFooter className="p-4 pt-3 flex flex-col items-start">
        <div className="flex items-center space-x-4 mb-2">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-400">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-green-400">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        <div className="text-sm font-semibold text-slate-100 mb-1">{likes.toLocaleString()} likes</div>
        <p className="text-sm text-slate-300">
          <span className="font-semibold text-slate-100 mr-1">{username}</span>
          {caption}
        </p>
        <div className="text-xs text-slate-500 mt-1">View all {comments.toLocaleString()} comments</div>
      </CardFooter>
    </Card>
  )
}
