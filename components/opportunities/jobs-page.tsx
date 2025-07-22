"use client"

import { useRef } from "react"
import FeaturedJobSlider from "@/components/opportunities/featured-job-slider"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from "next/link"
import type { CarouselApi } from "@/components/ui/carousel"

export default function JobsPage() {
  const featuredCarouselRef = useRef<CarouselApi>(null)
  const engineeringCarouselRef = useRef<CarouselApi>(null)
  const remoteCarouselRef = useRef<CarouselApi>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Promo Banner */}
      <div className="container mx-auto px-4 py-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Find Your Dream Job</h2>
              <p className="max-w-[600px] text-white/80">
                Discover amazing career opportunities with top companies. From startups to Fortune 500, find the perfect
                role that matches your skills and ambitions.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-2xl bg-white text-purple-700 hover:bg-white/90" asChild>
                  <Link href="/opportunities/jobs/all">Browse All Jobs</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10"
                >
                  Post a Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <section className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Featured Opportunities</h2>
            <p className="text-muted-foreground">
              Discover our handpicked selection of top job opportunities from leading companies.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => featuredCarouselRef.current?.scrollPrev?.()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => featuredCarouselRef.current?.scrollNext?.()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="rounded-2xl" asChild>
              <Link href="/opportunities/jobs/all">View All</Link>
            </Button>
          </div>
        </div>
        <FeaturedJobSlider category="featured" ref={featuredCarouselRef} />
      </section>

      {/* Engineering Jobs Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 py-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Engineering Roles</h2>
              <p className="text-muted-foreground">
                Join innovative engineering teams building the future of technology.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
                onClick={() => engineeringCarouselRef.current?.scrollPrev?.()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
                onClick={() => engineeringCarouselRef.current?.scrollNext?.()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="rounded-2xl" asChild>
                <Link href="/opportunities/jobs/all?department=Engineering">View All</Link>
              </Button>
            </div>
          </div>
          <FeaturedJobSlider category="engineering" ref={engineeringCarouselRef} />
        </div>
      </section>

      {/* Remote Jobs Section */}
      <section className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Remote Opportunities</h2>
            <p className="text-muted-foreground">
              Work from anywhere with these fully remote positions from top companies.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => remoteCarouselRef.current?.scrollPrev?.()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => remoteCarouselRef.current?.scrollNext?.()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="rounded-2xl" asChild>
              <Link href="/opportunities/jobs/all?locationType=remote">View All</Link>
            </Button>
          </div>
        </div>
        <FeaturedJobSlider category="remote" ref={remoteCarouselRef} />
      </section>
    </div>
  )
}
