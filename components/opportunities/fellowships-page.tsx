"use client"

import { useRef } from "react"
import FeaturedFellowshipSlider from "@/components/opportunities/featured-fellowship-slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from "next/link"
import type { CarouselApi } from "@/components/ui/carousel"

export default function FellowshipsPage() {
  const featuredCarouselRef = useRef<CarouselApi>(null)
  const openSourceCarouselRef = useRef<CarouselApi>(null)
  const internshipCarouselRef = useRef<CarouselApi>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Promo Banner */}
      <div className="container mx-auto px-4 py-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">Applications Open</Badge>
              <h2 className="text-3xl font-bold">Fellowship Programs</h2>
              <p className="max-w-[600px] text-white/80">
                Apply to prestigious fellowship programs including Google Summer of Code, MLH Fellowship, Linux
                Foundation mentorships, and more. Gain valuable experience and contribute to open source.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-2xl bg-white text-teal-700 hover:bg-white/90" asChild>
                  <Link href="/opportunities/fellowships/all">Browse All Fellowships</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10"
                >
                  Application Tips
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Fellowships Section */}
      <section className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Featured Fellowship Programs</h2>
            <p className="text-muted-foreground">
              Apply to prestigious fellowship programs and gain valuable experience in open source development.
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
              <Link href="/opportunities/fellowships/all">View All</Link>
            </Button>
          </div>
        </div>
        <FeaturedFellowshipSlider category="featured" ref={featuredCarouselRef} />
      </section>

      {/* Open Source Fellowships Section */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 py-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Open Source Programs</h2>
              <p className="text-muted-foreground">
                Contribute to major open source projects through mentorship programs and fellowships.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
                onClick={() => openSourceCarouselRef.current?.scrollPrev?.()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
                onClick={() => openSourceCarouselRef.current?.scrollNext?.()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="rounded-2xl" asChild>
                <Link href="/opportunities/fellowships/all?category=open-source">View All</Link>
              </Button>
            </div>
          </div>
          <FeaturedFellowshipSlider category="open-source" ref={openSourceCarouselRef} />
        </div>
      </section>

      {/* Internship Programs Section */}
      <section className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Internship Alternatives</h2>
            <p className="text-muted-foreground">
              Remote internship alternatives that provide real-world experience and professional development.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => internshipCarouselRef.current?.scrollPrev?.()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => internshipCarouselRef.current?.scrollNext?.()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="rounded-2xl" asChild>
              <Link href="/opportunities/fellowships/all?category=internship">View All</Link>
            </Button>
          </div>
        </div>
        <FeaturedFellowshipSlider category="internship" ref={internshipCarouselRef} />
      </section>
    </div>
  )
}
