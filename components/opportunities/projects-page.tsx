"use client"

import { useRef } from "react"
import FeaturedProjectSlider from "@/components/opportunities/featured-project-slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from "next/link"
import type { CarouselApi } from "@/components/ui/carousel"

export default function ProjectsPage() {
  const featuredCarouselRef = useRef<CarouselApi>(null)
  const frontendCarouselRef = useRef<CarouselApi>(null)
  const mlCarouselRef = useRef<CarouselApi>(null)
  const beginnerCarouselRef = useRef<CarouselApi>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Promo Banner */}
      <div className="container mx-auto px-4 py-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 p-8 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">Open Source</Badge>
              <h2 className="text-3xl font-bold">Open Source Projects</h2>
              <p className="max-w-[600px] text-white/80">
                Contribute to popular open source projects on GitHub. From React and Kubernetes to TensorFlow and VS
                Code, find projects that match your skills and interests.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-2xl bg-white text-red-700 hover:bg-white/90" asChild>
                  <Link href="/opportunities/projects/all">Browse All Projects</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10"
                >
                  Contribution Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
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
              <Link href="/opportunities/projects/all">View All</Link>
            </Button>
          </div>
        </div>
        <FeaturedProjectSlider category="featured" ref={featuredCarouselRef} />
      </section>

      {/* Frontend Projects Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 py-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Frontend & UI Projects</h2>
              <p className="text-muted-foreground">
                Contribute to popular frontend frameworks and UI libraries that power modern web applications.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
                onClick={() => frontendCarouselRef.current?.scrollPrev?.()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
                onClick={() => frontendCarouselRef.current?.scrollNext?.()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="rounded-2xl" asChild>
                <Link href="/opportunities/projects/all?category=frontend">View All</Link>
              </Button>
            </div>
          </div>
          <FeaturedProjectSlider category="frontend" ref={frontendCarouselRef} />
        </div>
      </section>

      {/* Machine Learning Projects Section */}
      <section className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Machine Learning & AI</h2>
            <p className="text-muted-foreground">
              Contribute to cutting-edge machine learning frameworks and AI tools used by researchers and developers
              worldwide.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => mlCarouselRef.current?.scrollPrev?.()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => mlCarouselRef.current?.scrollNext?.()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="rounded-2xl" asChild>
              <Link href="/opportunities/projects/all?category=machine-learning">View All</Link>
            </Button>
          </div>
        </div>
        <FeaturedProjectSlider category="machine-learning" ref={mlCarouselRef} />
      </section>

      {/* Good First Issues Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 py-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Good First Issues</h2>
              <p className="text-muted-foreground">
                Perfect for beginners! Start your open source journey with these beginner-friendly projects.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
                onClick={() => beginnerCarouselRef.current?.scrollPrev?.()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
                onClick={() => beginnerCarouselRef.current?.scrollNext?.()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="rounded-2xl" asChild>
                <Link href="/opportunities/projects/all?difficulty=beginner">View All</Link>
              </Button>
            </div>
          </div>
          <FeaturedProjectSlider category="good-first-issue" ref={beginnerCarouselRef} />
        </div>
      </section>
    </div>
  )
}
