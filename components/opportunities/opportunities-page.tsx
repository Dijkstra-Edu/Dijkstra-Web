"use client"

import { useRef } from "react"
import OpportunitiesPromoBanner from "@/components/opportunities/opportunities-promo-banner"
import FeaturedProjectSlider from "@/components/opportunities/featured-project-slider"
import FeaturedFellowshipSlider from "@/components/opportunities/featured-fellowship-slider"
import FeaturedJobSlider from "@/components/opportunities/featured-job-slider"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function OpportunitiesPage() {
  const projectsCarouselRef = useRef<any>(null)
  const fellowshipsCarouselRef = useRef<any>(null)
  const jobsCarouselRef = useRef<any>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Promo Banner */}
      <div className="container mx-auto px-4 py-8">
        <OpportunitiesPromoBanner />
      </div>

      {/* Featured Projects Section */}
      <section className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Featured Open Source Projects</h2>
            <p className="text-muted-foreground">
              Contribute to popular open source projects and make an impact in the developer community.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => projectsCarouselRef.current?.scrollPrev?.()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => projectsCarouselRef.current?.scrollNext?.()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="rounded-2xl" asChild>
              <Link href="/opportunities/projects">View All</Link>
            </Button>
          </div>
        </div>
        <FeaturedProjectSlider category="featured" ref={projectsCarouselRef} />
      </section>

      {/* Featured Fellowships Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 py-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Featured Fellowship Programs</h2>
              <p className="text-muted-foreground">
                Apply to prestigious fellowship programs like GSoC, MLH Fellowship, and more.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
                onClick={() => fellowshipsCarouselRef.current?.scrollPrev?.()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
                onClick={() => fellowshipsCarouselRef.current?.scrollNext?.()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="rounded-2xl" asChild>
                <Link href="/opportunities/fellowships">View All</Link>
              </Button>
            </div>
          </div>
          <FeaturedFellowshipSlider category="featured" ref={fellowshipsCarouselRef} />
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Featured Job Opportunities</h2>
            <p className="text-muted-foreground">
              Discover our handpicked selection of top job opportunities from leading companies.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => jobsCarouselRef.current?.scrollPrev?.()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => jobsCarouselRef.current?.scrollNext?.()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="rounded-2xl" asChild>
              <Link href="/opportunities/jobs">View All</Link>
            </Button>
          </div>
        </div>
        <FeaturedJobSlider category="featured" ref={jobsCarouselRef} />
      </section>
    </div>
  )
}
