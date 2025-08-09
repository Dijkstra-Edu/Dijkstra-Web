"use client"

import { FeedPostCard } from "./feed-post-card"
import { FeedCarousel } from "./feed-carousel"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, Search, Video, ImageIcon, FileText, ChevronDown, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// Dummy data for LinkedIn-style posts
const allPosts = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      title: "Senior Software Engineer at Google",
      avatar: "https://warburgpincus.com/wp-content/uploads/2019/10/Sarah-Chen-web-1024x991.jpg",
      verified: true,
    },
    timeAgo: "2h",
    content:
      "Excited to share that our team just launched a new machine learning feature that improves code completion accuracy by 40%! 🚀\n\nWorking on developer tools has been incredibly rewarding. Seeing how small improvements can save thousands of hours across the engineering community is what drives me every day.\n\n#MachineLearning #DeveloperTools #Google",
    images: ["https://blogs.imf-formacion.com/blog/tecnologia/wp-content/uploads/2017/06/machine-learning-next-1.png"],
    likes: 127,
    comments: 23,
    reposts: 8,
    reactions: ["👍", "❤️", "🚀"],
  },
  {
    id: "2",
    author: {
      name: "Alex Rodriguez",
      title: "Tech Lead at Meta",
      avatar: "https://foxsports-wordpress-www-prsupports-prod.s3.amazonaws.com/uploads/sites/2/2022/12/Alex-Rodriguez_727x727.jpg",
      verified: false,
    },
    timeAgo: "4h",
    content:
      "Just finished an amazing interview with a candidate who built their own programming language! 🤯\n\nIt's incredible to see the passion and creativity in our industry. Whether you're building the next big framework or solving complex algorithms, every contribution matters.\n\nTo all the developers out there: keep building, keep learning, and never stop being curious! 💪\n\n#TechInterview #Programming #Innovation",
    images: [],
    likes: 89,
    comments: 15,
    reposts: 12,
    reactions: ["👍", "🤯", "💪"],
  },
  {
    id: "3",
    author: {
      name: "Dr. Emily Watson",
      title: "AI Research Scientist at OpenAI",
      avatar: "https://images.mubicdn.net/images/cast_member/2881/cache-1163-1427637945/image-w856.jpg",
      verified: true,
    },
    timeAgo: "6h",
    content:
      "Thrilled to announce our latest research paper on 'Efficient Neural Architecture Search for Edge Devices' has been accepted at NeurIPS 2024! 📄✨\n\nThis work focuses on making AI more accessible by optimizing models for resource-constrained environments. Special thanks to my amazing co-authors and the entire research team.\n\nLink to paper in comments 👇\n\n#AI #Research #NeurIPS #EdgeComputing",
    images: ["https://pub.mdpi-res.com/electronics/electronics-11-02255/article_deploy/html/images/electronics-11-02255-g001.png?1658307401", "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41598-024-57236-2/MediaObjects/41598_2024_57236_Fig1_HTML.png"],
    likes: 234,
    comments: 41,
    reposts: 28,
    reactions: ["👍", "🎉", "🧠"],
  },
  {
    id: "4",
    author: {
      name: "Marcus Johnson",
      title: "Startup Founder | Ex-Amazon",
      avatar: "https://m.media-amazon.com/images/M/MV5BODAzYjkwY2EtNTUxMy00MWVkLWExYjctY2Y3NGEwNzMzOWNhXkEyXkFqcGc@._V1_.jpg",
      verified: false,
    },
    timeAgo: "8h",
    content:
      "6 months ago, I left my comfortable job at Amazon to start my own company. Today, we just closed our seed round! 🎉\n\nThe journey has been challenging but incredibly rewarding. Here are 3 key lessons I learned:\n\n1. Validate your idea early and often\n2. Build a strong network before you need it\n3. Embrace failure as a learning opportunity\n\nTo anyone considering the entrepreneurial path: it's scary, but it's worth it. Feel free to reach out if you want to chat about startups or need advice!\n\n#Entrepreneurship #Startup #Amazon #SeedRound",
    images: [],
    likes: 156,
    comments: 32,
    reposts: 19,
    reactions: ["👍", "🎉", "💪"],
  },
  {
    id: "5",
    author: {
      name: "Lisa Park",
      title: "Frontend Developer at Stripe",
      avatar: "https://m.media-amazon.com/images/M/MV5BYTI3NjA4ZTAtN2FkYy00ZThmLTlmNWMtMWU5ZmFjZDQxYjM4XkEyXkFqcGc@._V1_.jpg",
      verified: false,
    },
    timeAgo: "10h",
    content:
      "Just shipped a major performance optimization that reduced our bundle size by 30%! 📦⚡\n\nKey techniques used:\n• Tree shaking unused code\n• Dynamic imports for route-based code splitting\n• Optimized image loading with next/image\n• Removed duplicate dependencies\n\nPerformance is a feature, not an afterthought. Every millisecond counts for user experience!\n\n#WebPerformance #React #Optimization",
    images: ["https://www.xenonstack.com/hs-fs/hubfs/xenonstack-performance-tuning-tools.png?width=1280&height=720&name=xenonstack-performance-tuning-tools.png"],
    likes: 98,
    comments: 12,
    reposts: 6,
    reactions: ["👍", "⚡", "🚀"],
  },
  {
    id: "6",
    author: {
      name: "David Kim",
      title: "DevOps Engineer at Netflix",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkZ_y5LaGVbMlXXA5OKNXHh8VE5494oatb5w&s",
      verified: true,
    },
    timeAgo: "12h",
    content:
      "Kubernetes tip of the day: Use resource quotas to prevent resource starvation! 🎯\n\nI've seen too many production incidents caused by one service consuming all available resources. Here's a simple resource quota example:\n\nAlways set both requests and limits! Your future self will thank you.\n\n#Kubernetes #DevOps #CloudNative",
    images: [],
    likes: 145,
    comments: 28,
    reposts: 15,
    reactions: ["👍", "💡", "🎯"],
  },
  {
    id: "7",
    author: {
      name: "Jennifer Wu",
      title: "Product Manager at Airbnb",
      avatar: "https://www.professioncgp.com/uploads/media/articles/0001/05/a3c3597a838e9f7499d4b8ba9bd46af034591139.jpeg",
      verified: false,
    },
    timeAgo: "14h",
    content:
      "Lessons learned from launching 5 products in 2 years 📈\n\n1. Start with the problem, not the solution\n2. Talk to users early and often\n3. Build MVPs that actually solve the core problem\n4. Measure what matters, not vanity metrics\n5. Iterate based on data, not opinions\n\nThe best products are built through continuous learning and adaptation. What's your biggest product lesson?\n\n#ProductManagement #Startup #UserExperience",
    images: [],
    likes: 203,
    comments: 45,
    reposts: 22,
    reactions: ["👍", "📈", "💡"],
  },
  {
    id: "8",
    author: {
      name: "Robert Chen",
      title: "Security Engineer at Cloudflare",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Robbie_Williams_at_the_2024_Toronto_International_Film_Festival_%28cropped%29.jpg",
      verified: true,
    },
    timeAgo: "16h",
    content:
      "PSA: Please stop storing passwords in plain text! 🔐\n\nI'm still amazed by how many applications I audit that store passwords without proper hashing. Here's the bare minimum you should do:\n\n✅ Use bcrypt, scrypt, or Argon2\n✅ Add a unique salt for each password\n✅ Use a high cost factor (at least 12 for bcrypt)\n✅ Never store the original password\n\nSecurity isn't optional in 2024. Protect your users!\n\n#CyberSecurity #WebSecurity #PasswordSecurity",
    images: ["https://fusionauth.io/img/blogs/plain-text-passwords/plain-text-offender-cu.png"],
    likes: 312,
    comments: 67,
    reposts: 89,
    reactions: ["👍", "🔐", "⚠️"],
  },
  {
    id: "9",
    author: {
      name: "Michael Zhang",
      title: "Full Stack Developer at Shopify",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    timeAgo: "18h",
    content:
      "Built my first GraphQL API with Apollo Server and I'm blown away by the developer experience! 🚀\n\nKey benefits I've noticed:\n• Type safety out of the box\n• Single endpoint for all data needs\n• Powerful query capabilities\n• Amazing tooling and introspection\n\nIf you haven't tried GraphQL yet, I highly recommend giving it a shot!\n\n#GraphQL #Apollo #WebDevelopment",
    images: ["/placeholder.svg?height=300&width=500"],
    likes: 76,
    comments: 18,
    reposts: 9,
    reactions: ["👍", "🚀", "💡"],
  },
  {
    id: "10",
    author: {
      name: "Anna Kowalski",
      title: "UX Designer at Figma",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    timeAgo: "20h",
    content:
      "Design systems are not just about components - they're about creating a shared language! 🎨\n\nAfter working on design systems for 3 years, here are my key learnings:\n\n1. Start with principles, not components\n2. Document the 'why' behind every decision\n3. Make it easy to contribute and evolve\n4. Test with real projects early and often\n\nWhat's your biggest design system challenge?\n\n#DesignSystems #UX #Design",
    images: [],
    likes: 189,
    comments: 34,
    reposts: 21,
    reactions: ["👍", "🎨", "💡"],
  },
  {
    id: "11",
    author: {
      name: "James Wilson",
      title: "Data Scientist at Spotify",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    timeAgo: "22h",
    content:
      "Just finished analyzing 10M+ music streaming patterns and the insights are fascinating! 🎵📊\n\nSome interesting findings:\n• Peak listening happens during commute hours\n• Genre preferences vary significantly by geography\n• Playlist creation spikes on Sunday evenings\n• Skip rates are highest in the first 30 seconds\n\nData tells such compelling stories about human behavior!\n\n#DataScience #Analytics #Music",
    images: ["/placeholder.svg?height=300&width=500"],
    likes: 267,
    comments: 52,
    reposts: 38,
    reactions: ["👍", "📊", "🎵"],
  },
  {
    id: "12",
    author: {
      name: "Rachel Green",
      title: "Mobile Developer at Uber",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    timeAgo: "1d",
    content:
      "React Native vs Flutter - after building apps in both, here's my honest take 📱\n\nReact Native wins for:\n• Leveraging existing React knowledge\n• Mature ecosystem and community\n• Better integration with existing React web apps\n\nFlutter wins for:\n• Performance and smooth animations\n• Consistent UI across platforms\n• Excellent developer tooling\n\nBoth are great choices - pick based on your team's expertise!\n\n#ReactNative #Flutter #MobileDev",
    images: [],
    likes: 145,
    comments: 67,
    reposts: 29,
    reactions: ["👍", "📱", "⚡"],
  },
  // Add more posts to simulate a larger dataset
  {
    id: "13",
    author: {
      name: "Tom Anderson",
      title: "Backend Engineer at Discord",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    timeAgo: "1d",
    content:
      "Scaling WebSocket connections to handle 10M+ concurrent users taught me a lot about distributed systems! ⚡\n\nKey lessons learned:\n• Connection pooling is crucial\n• Load balancing WebSockets is tricky\n• Message queues are your best friend\n• Monitor everything, especially memory usage\n\nReal-time systems are complex but incredibly rewarding to build!\n\n#WebSockets #DistributedSystems #Scaling",
    images: ["/placeholder.svg?height=300&width=500"],
    likes: 198,
    comments: 43,
    reposts: 31,
    reactions: ["👍", "⚡", "🔧"],
  },
  {
    id: "14",
    author: {
      name: "Sophie Martinez",
      title: "AI Engineer at Anthropic",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    timeAgo: "1d",
    content:
      "Working on responsible AI development has been the most meaningful work of my career 🤖✨\n\nSome principles we follow:\n• Transparency in model capabilities and limitations\n• Rigorous testing for bias and fairness\n• Clear documentation of training data\n• Ongoing monitoring of real-world impact\n\nAI is powerful - let's make sure we use it responsibly!\n\n#ResponsibleAI #MachineLearning #Ethics",
    images: [],
    likes: 324,
    comments: 78,
    reposts: 56,
    reactions: ["👍", "🤖", "✨"],
  },
  {
    id: "15",
    author: {
      name: "Kevin Liu",
      title: "Cloud Architect at AWS",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    timeAgo: "1d",
    content:
      "Serverless architecture isn't just about cost savings - it's about developer productivity! ☁️\n\nBenefits I've seen in practice:\n• Faster time to market\n• Automatic scaling\n• Reduced operational overhead\n• Pay-per-use pricing model\n\nOf course, it's not perfect for every use case, but when it fits, it's magical!\n\n#Serverless #CloudComputing #AWS",
    images: ["/placeholder.svg?height=300&width=500"],
    likes: 156,
    comments: 29,
    reposts: 18,
    reactions: ["👍", "☁️", "⚡"],
  },
]

// Simulate API call with delay
const fetchPosts = async (page: number, limit = 8): Promise<typeof allPosts> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

  const startIndex = page * limit
  const endIndex = startIndex + limit

  return allPosts.slice(startIndex, endIndex)
}

export function HomeFeed({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState<typeof allPosts>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [initialLoading, setInitialLoading] = useState(true)

  const observerRef = useRef<HTMLDivElement>(null)

  // Load initial posts
  useEffect(() => {
    const loadInitialPosts = async () => {
      setInitialLoading(true)
      try {
        const initialPosts = await fetchPosts(0)
        setPosts(initialPosts)
        setPage(1)
        if (initialPosts.length === 0) {
          setHasMore(false)
        }
      } catch (error) {
        console.error("Failed to load initial posts:", error)
      } finally {
        setInitialLoading(false)
      }
    }

    loadInitialPosts()
  }, [])

  // Load more posts
  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const newPosts = await fetchPosts(page)
      if (newPosts.length === 0) {
        setHasMore(false)
      } else {
        setPosts((prev) => [...prev, ...newPosts])
        setPage((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Failed to load more posts:", error)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore && !loading) {
          loadMorePosts()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      },
    )

    const currentObserverRef = observerRef.current
    if (currentObserverRef) {
      observer.observe(currentObserverRef)
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
    }
  }, [loadMorePosts, hasMore, loading])

  const filteredPosts = posts.filter(
    (post) =>
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Function to insert blog carousel after every 4 posts
  const renderPostsWithCarousel = () => {
    const elements = []
    const postsPerGroup = 4

    for (let i = 0; i < filteredPosts.length; i += postsPerGroup) {
      // Add posts
      const postsGroup = filteredPosts.slice(i, i + postsPerGroup)
      postsGroup.forEach((post) => {
        elements.push(<FeedPostCard key={post.id} {...post} theme={theme} />)
      })

      // Add carousel after every group (except the last one if it's incomplete)
      if (i + postsPerGroup < filteredPosts.length || (i + postsPerGroup >= filteredPosts.length && hasMore)) {
        elements.push(<FeedCarousel key={`carousel-${i}`} theme={theme} />)
      }
    }

    return elements
  }

  if (initialLoading) {
    return (
      <Card className={cn("w-full backdrop-blur-sm bg-card/50 border-border")}>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("backdrop-blur-sm bg-card/50 border-border")}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-foreground">
          <Users className="mr-2 h-5 w-5 text-primary" />
          Professional Network
        </CardTitle>

        {/* Post creation section */}
        <div className="mt-4 p-4 border border-border rounded-lg bg-card/30">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt="You" />
              <AvatarFallback className="bg-secondary text-secondary-foreground">You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                placeholder="Start a post..."
                className="border-border bg-background/50 text-foreground placeholder:text-muted-foreground rounded-full px-4 py-3 text-sm"
                readOnly
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
              <Video className="mr-2 h-4 w-4 text-green-500" />
              Video
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
              <ImageIcon className="mr-2 h-4 w-4 text-blue-500" />
              Photo
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
              <FileText className="mr-2 h-4 w-4 text-orange-500" />
              Write article
            </Button>
          </div>
        </div>

        {/* Feed controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="relative flex-1 max-w-xs">
            <Search
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4",
                theme === "dark" ? "text-slate-400" : "text-muted-foreground",
              )}
            />
            <Input
              type="text"
              placeholder="Search posts..."
              className={cn(
                "pl-9 border bg-background/50 border-border text-foreground placeholder:text-muted-foreground",
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Most relevant first
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="">
        <div className="flex flex-col space-y-6">
          {filteredPosts.length > 0 ? (
            <>
              {renderPostsWithCarousel()}

              {/* Loading indicator */}
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="text-muted-foreground">Loading more posts...</span>
                  </div>
                </div>
              )}

              {/* Intersection observer target */}
              <div ref={observerRef} className="h-4" />

              {/* End of posts message */}
              {!hasMore && !loading && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You've reached the end of the feed!</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-primary hover:text-primary/80"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Back to top
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className={cn("text-center py-8", theme === "dark" ? "text-slate-400" : "text-muted-foreground")}>
              {searchQuery ? "No posts found matching your search." : "No posts available."}
            </div>
          )}
        </div>
      </CardContent>

      
    </Card>
  )
}
