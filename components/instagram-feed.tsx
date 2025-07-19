"use client"

import { PostCard } from "./post-card"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ImageIcon, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Dummy data for posts
const posts = [
  {
    id: "1",
    username: "dijkstra_official",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption:
      "Excited to announce our new 'Advanced Algorithms' course! Dive deep into complex problem-solving techniques. #Dijkstra #Algorithms #Coding",
    likes: 1245,
    comments: 87,
  },
  {
    id: "2",
    username: "code_master_john",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "Just crushed the 'Dynamic Programming' module on Dijkstra! Feeling unstoppable. 💪 #CodingLife #DP",
    likes: 890,
    comments: 52,
  },
  {
    id: "3",
    username: "learning_geek",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "My setup for a productive coding session. What's your favorite IDE? #DeveloperSetup #Coding",
    likes: 1500,
    comments: 110,
  },
  {
    id: "4",
    username: "algo_queen",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "Celebrating a new personal best in the weekly contest! Thanks, Dijkstra! 🎉 #CompetitiveProgramming",
    likes: 980,
    comments: 65,
  },
  {
    id: "5",
    username: "tech_explorer",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "Exploring new data structures today. Trees are fascinating! 🌳 #DataStructures #Learning",
    likes: 720,
    comments: 40,
  },
  {
    id: "6",
    username: "dev_journey",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "Coffee and code, the perfect combination. What are you building today? ☕💻 #Programming #Coffee",
    likes: 1100,
    comments: 78,
  },
]

export function InstagramFeed() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts.filter(
    (post) =>
      post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.caption.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-base text-slate-100">
          <ImageIcon className="mr-2 h-5 w-5 text-purple-400" />
          Community Feed
        </CardTitle>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search posts..."
            className="pl-9 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <div className="text-center text-slate-400 py-8">No posts found matching your search.</div>
        )}
      </CardContent>
    </Card>
  )
}
