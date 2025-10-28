export type BlogStatus = "draft" | "published" | "archived"
export type BlogPriority = "low" | "medium" | "high"
export type BlogLanguage = "en" | "es" | "fr" | "de"

export interface PersonalBlog {
  id: string
  title: string
  status: BlogStatus
  priority: BlogPriority
  tags: string[]
  author: string
  heroImage?: string
  readTime: number
  createdAt: Date
  updatedAt: Date
  language: BlogLanguage
}

export interface LCBlog {
  id: string
  title: string
  problemNumber: number
  difficulty: "easy" | "medium" | "hard"
  tags: string[]
  createdAt: Date
  status: "success" | "error"
  errorMessage?: string
  slug: string
}

export interface PostAuthor {
  name: string
  title: string
  avatar: string
  verified: boolean
}

export interface Post {
  id: string
  author: PostAuthor
  timeAgo: string
  content: string
  images: string[]
  likes: number
  comments: number
  reposts: number
  reactions: string[]
  createdAt: Date
  isLiked?: boolean
  isSaved?: boolean
}