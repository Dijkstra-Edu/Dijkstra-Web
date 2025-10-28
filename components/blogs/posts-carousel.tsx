"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { UserPostCard } from "./user-post-card"
import type { Post } from "@/types/client/blog/blog-types"
import { cn } from "@/lib/utils"

interface PostsCarouselProps {
  posts: Post[]
  onEdit?: (postId: string) => void
  onDelete?: (postId: string) => void
}

export function PostsCarousel({ posts, onEdit, onDelete }: PostsCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [slidesPerView, setSlidesPerView] = React.useState(1)

  React.useEffect(() => {
    const updateSlidesPerView = () => {
      if (typeof window !== "undefined") {
        setSlidesPerView(
          window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1
        )
      }
    }

    updateSlidesPerView()
    window.addEventListener("resize", updateSlidesPerView)
    return () => window.removeEventListener("resize", updateSlidesPerView)
  }, [])

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No posts yet. Create your first post!
      </div>
    )
  }

  const shouldShowNavigation = posts.length > slidesPerView

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {posts.map((post) => (
            <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <UserPostCard post={post} onEdit={onEdit} onDelete={onDelete} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons */}
        {shouldShowNavigation && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-8 w-8 rounded-full shadow-md hover:shadow-lg z-10 bg-background"
              onClick={() => api?.scrollPrev()}
              disabled={current === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-8 w-8 rounded-full shadow-md hover:shadow-lg z-10 bg-background"
              onClick={() => api?.scrollNext()}
              disabled={current === count}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </>
        )}
      </Carousel>

      {/* Pagination dots */}
      {count > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: Math.ceil(posts.length / slidesPerView) }).map((_, index) => {
            const isActive = Math.floor((current - 1) / slidesPerView) === index
            return (
              <button
                key={index}
                onClick={() => {
                  const slideIndex = index * slidesPerView
                  api?.scrollTo(slideIndex)
                }}
                className={cn(
                  "h-2 rounded-full transition-all",
                  isActive ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

