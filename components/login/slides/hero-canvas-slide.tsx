"use client"

import { CanvasRevealEffect } from "@/components/canvas-reveal-effect"
import Link from "next/link"

export function HeroCanvasSlide() {
  return (
    <>
      <div className="flex h-full flex-col">
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-10">
          {/* Canvas Reveal Effect Background */}
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={2}
              containerClassName="bg-black"
              colors={[
                [0, 180, 0], // Brighter green
                [0, 220, 0], // Even brighter green
                [100, 255, 100], // Light green
              ]}
              dotSize={3}
              opacities={[0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1]}
            />
            {/* Overlay gradient for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-lg text-center">
            {/* Dijkstra Logo */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <img 
                  src="/icon-white.png" 
                  alt="Dijkstra Logo" 
                  className="h-24 w-24 drop-shadow-[0_0_20px_rgba(0,255,136,0.5)] filter" 
                />
                <div className="absolute inset-0 rounded-full bg-[#00ff88]/20 blur-xl -z-10" />
              </div>
            </div>

            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-0.5">
                  <div className="h-0.5 w-6 bg-[#00ff88]" />
                  <div className="h-0.5 w-6 bg-[#00ff88]" />
                  <div className="h-0.5 w-6 bg-[#00ff88]" />
                </div>
                <div className="flex gap-0.5">
                  <div className="h-0.5 w-3 bg-[#00ff88]" />
                  <div className="h-0.5 w-3 bg-[#00ff88]" />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-[2px]">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-3 w-0.5 bg-[#00ff88]" style={{ opacity: 0.3 + i * 0.12 }} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-0.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-1.5 bg-[#00ff88]" style={{ opacity: Math.random() * 0.5 + 0.3 }} />
                ))}
              </div>
            </div>

            <h2 className="mb-4 text-4xl font-bold leading-tight text-white">
              For Students, By Students
            </h2>

            <p className="mb-6 text-base leading-relaxed text-gray-300">
              Dijkstra is a student driven platform that helps you learn, collaborate and prepare towards a career in tech.
            </p>

            {/* Minimalist Mission Button */}
            <Link
              href="/mission"
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-transparent px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-[#00ff88]/50 hover:bg-white/5"
            >
              Dijkstra's Mission
            </Link>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] px-10 py-5">
          <p className="mb-2.5 text-[11px] text-[#666666]">Empowering the next generation of developers</p>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-[#999999]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
              <span className="text-[13px] font-medium">Student Built</span>
            </div>
            <div className="flex items-center gap-2 text-[#999999]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span className="text-[13px] font-medium">Student Driven</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

