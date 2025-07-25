"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, BookOpen, Code, Lightbulb, Clock, Eye, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
  }
  category: "blog" | "leetcode" | "advice"
  readTime: string
  views: number
  likes: number
  publishedAt: string
  image: string
  tags: string[]
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "Learn the best practices for structuring large React applications with TypeScript, including advanced patterns and performance optimizations.",
    author: {
      name: "Sarah Chen",
      avatar: "https://warburgpincus.com/wp-content/uploads/2019/10/Sarah-Chen-web-1024x991.jpg",
    },
    category: "blog",
    readTime: "8 min read",
    views: 1247,
    likes: 89,
    publishedAt: "2 days ago",
    image: "https://www.krishangtechnolab.com/wp-content/uploads/2025/07/How-to-Build-Scalable-React-Apps-with-TypeScript-Patterns.png",
    tags: ["React", "TypeScript", "Architecture"],
  },
  {
    id: "2",
    title: "Two Sum - Multiple Approaches Explained",
    excerpt:
      "Comprehensive breakdown of the classic Two Sum problem with brute force, hash map, and two-pointer solutions including time complexity analysis.",
    author: {
      name: "Alex Rodriguez",
      avatar: "https://foxsports-wordpress-www-prsupports-prod.s3.amazonaws.com/uploads/sites/2/2022/12/Alex-Rodriguez_727x727.jpg",
    },
    category: "leetcode",
    readTime: "5 min read",
    views: 2156,
    likes: 156,
    publishedAt: "1 day ago",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*dWJgx83vJZRao6-geaEt_w.png",
    tags: ["Arrays", "Hash Table", "Easy"],
  },
  {
    id: "3",
    title: "Essential Resources for Landing Your First Tech Job",
    excerpt:
      "Curated list of books, courses, and practice platforms that will help you prepare for technical interviews and build a strong foundation.",
    author: {
      name: "Dr. Emily Watson",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMcnuFOhLfBhtmOsKqplI07pWokUh6fsFvQQ&s",
    },
    category: "advice",
    readTime: "12 min read",
    views: 3421,
    likes: 234,
    publishedAt: "3 days ago",
    image: "https://m.media-amazon.com/images/I/510rkNKBCvL._UF1000,1000_QL80_.jpg",
    tags: ["Career", "Interview Prep", "Resources"],
  },
  {
    id: "4",
    title: "Understanding JavaScript Closures with Practical Examples",
    excerpt:
      "Deep dive into JavaScript closures, lexical scoping, and practical use cases that every developer should understand.",
    author: {
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "blog",
    readTime: "10 min read",
    views: 1876,
    likes: 142,
    publishedAt: "4 days ago",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["JavaScript", "Fundamentals", "Closures"],
  },
  {
    id: "5",
    title: "Longest Palindromic Substring - Dynamic Programming Solution",
    excerpt:
      "Step-by-step explanation of solving the longest palindromic substring problem using dynamic programming with optimizations.",
    author: {
      name: "Lisa Park",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "leetcode",
    readTime: "7 min read",
    views: 1654,
    likes: 98,
    publishedAt: "5 days ago",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Dynamic Programming", "Strings", "Medium"],
  },
  {
    id: "6",
    title: "How to Build a Strong GitHub Portfolio",
    excerpt:
      "Tips and strategies for creating an impressive GitHub profile that showcases your skills and attracts potential employers.",
    author: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "advice",
    readTime: "6 min read",
    views: 2890,
    likes: 187,
    publishedAt: "1 week ago",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["GitHub", "Portfolio", "Career"],
  },
]

interface BlogCarouselProps {
  theme?: "light" | "dark"
}

export function FeedCarousel({ theme = "dark" }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const postsPerView = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + postsPerView >= blogPosts.length ? 0 : prev + postsPerView))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, blogPosts.length - postsPerView) : Math.max(0, prev - postsPerView),
    )
  }

  const getCategoryIcon = (category: BlogPost["category"]) => {
    switch (category) {
      case "blog":
        return <BookOpen className="h-4 w-4" />
      case "leetcode":
        return <Code className="h-4 w-4" />
      case "advice":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: BlogPost["category"]) => {
    switch (category) {
      case "blog":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30"
      case "leetcode":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      case "advice":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30"
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/30"
    }
  }

  const getCategoryLabel = (category: BlogPost["category"]) => {
    switch (category) {
      case "blog":
        return "Blog Post"
      case "leetcode":
        return "LeetCode Solution"
      case "advice":
        return "Advice & Resources"
      default:
        return "Blog Post"
    }
  }

  const visiblePosts = blogPosts.slice(currentIndex, currentIndex + postsPerView)

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-border">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <BookOpen className="mr-2 h-5 w-5 text-primary" />
            Featured Articles
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="h-8 w-8 text-muted-foreground hover:text-foreground disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex + postsPerView >= blogPosts.length}
              className="h-8 w-8 text-muted-foreground hover:text-foreground disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visiblePosts.map((post) => (
            <Card
              key={post.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-card/30 border-border hover:border-primary/30"
            >
              <div className="relative overflow-hidden">                
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-1 left-3">
                  <Badge variant="outline" className={getCategoryColor(post.category)}>
                    {getCategoryIcon(post.category)}
                    <span className="ml-1 text-xs">{getCategoryLabel(post.category)}</span>
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{post.author.name}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
                </div>

                <h3 className="font-semibold text-sm text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-muted-foreground mb-3 line-clamp-3">{post.excerpt}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5 bg-muted text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-muted text-muted-foreground">
                      +{post.tags.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(blogPosts.length / postsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * postsPerView)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                Math.floor(currentIndex / postsPerView) === index
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
