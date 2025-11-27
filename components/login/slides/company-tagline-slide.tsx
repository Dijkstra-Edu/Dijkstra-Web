export function CompanyTaglineSlide() {
    return (
      <>
        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col items-center justify-center px-10">
          {/* Decorative graphics */}
          <div className="relative mb-12 h-48 w-full">
            {/* Central animated element */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-32 w-32">
                {/* Rotating outer ring */}
                <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-[#00ff88]/20 border-t-[#00ff88]" />
                {/* Inner pulsing circle */}
                <div className="absolute inset-4 animate-pulse rounded-full bg-[#00ff88]/10" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <img src="https://platform.dijkstra.org.in/icon.png" alt="Dijkstra" className="h-8 w-8" />
                </div>
              </div>
            </div>
  
            {/* Floating decorative elements */}
            <div className="absolute left-[15%] top-[20%] flex flex-col gap-0.5">
              <div className="flex gap-0.5">
                <div className="h-0.5 w-4 bg-[#00ff88]" />
                <div className="h-0.5 w-4 bg-[#00ff88]/60" />
              </div>
              <div className="flex gap-0.5">
                <div className="h-0.5 w-2 bg-[#00ff88]" />
              </div>
            </div>
  
            <div className="absolute right-[20%] top-[25%] grid grid-cols-3 gap-0.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-[#00ff88]" style={{ opacity: 0.3 + i * 0.1 }} />
              ))}
            </div>
  
            <div className="absolute bottom-[25%] left-[25%] flex gap-[2px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 w-0.5 bg-[#00ff88]" style={{ opacity: 0.3 + i * 0.15 }} />
              ))}
            </div>
  
            <div className="absolute bottom-[20%] right-[15%] flex flex-col gap-0.5">
              <div className="flex gap-0.5">
                <div className="h-0.5 w-6 bg-[#00ff88]" />
                <div className="h-0.5 w-6 bg-[#00ff88]/60" />
                <div className="h-0.5 w-6 bg-[#00ff88]/30" />
              </div>
            </div>
          </div>
  
          <div className="max-w-lg text-center">
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
              Building Incredible
              <br />
              Software
            </h2>
  
            <p className="text-lg font-medium text-[#00ff88]">For Students, By Students</p>
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
  