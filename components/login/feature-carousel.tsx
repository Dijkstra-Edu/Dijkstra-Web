"use client"

import { useEffect, useState } from "react"
import { HeroCanvasSlide } from "@/components/login/slides/hero-canvas-slide"
import { SpecializationsSlide } from "@/components/login/slides/specializations-slide"
import { RankingSystemSlide } from "@/components/login/slides/ranking-system-slide"
import { DijkstraGPTSlide } from "@/components/login/slides/dijkstra-gpt-slide"

const slides = [
  { id: 1, component: HeroCanvasSlide },
  { id: 2, component: SpecializationsSlide },
  { id: 3, component: RankingSystemSlide },
  { id: 4, component: DijkstraGPTSlide },
]

export function FeatureCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="hidden w-[40%] p-3 lg:flex lg:flex-col">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#1a1a1a]">
        <div className="absolute right-6 top-6 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-0.5 rounded-full transition-all ${
                index === currentSlide ? "w-6 bg-white" : "w-6 bg-white/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative flex flex-1 flex-col">
          {slides.map((slide, index) => {
            const SlideComponent = slide.component
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <SlideComponent />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
