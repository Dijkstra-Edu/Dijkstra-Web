export function DijkstraGPTSlide() {
    return (
      <>
        <div className="flex flex-1 flex-col items-center justify-center px-10 pt-16">
          {/* AI/LLM visualization */}
          <div className="relative mb-10 h-48 w-full">
            {/* Neural network style visualization */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Center node */}
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#00ff88] bg-[#00ff88]/10">
                <svg className="h-8 w-8 text-[#00ff88]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c.5-.5.5-1 0-1.5S11 6 10.5 6.5 10 7.5 10.5 8s1.5.5 2 0zm0 0c.5.5 1 .5 1.5 0s.5-1.5 0-2-.5-1.5-1-1.5-1.5.5-1.5 1.5.5 1.5 1 2z"
                  />
                </svg>
              </div>
  
              {/* Connecting nodes */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * Math.PI * 2) / 8
                const radius = 80
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
  
                return (
                  <div key={i}>
                    {/* Connection line */}
                    <div
                      className="absolute left-8 top-8 h-0.5 origin-left bg-[#00ff88]/30"
                      style={{
                        width: `${radius}px`,
                        transform: `rotate(${angle}rad)`,
                      }}
                    />
                    {/* Outer node */}
                    <div
                      className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#00ff88]"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  </div>
                )
              })}
            </div>
  
            {/* Floating code-like elements */}
            <div className="absolute left-[10%] top-[15%] rounded border border-[#333] bg-[#1a1a1a] px-2 py-1">
              <span className="font-mono text-[10px] text-[#00ff88]">{"<AI>"}</span>
            </div>
            <div className="absolute right-[15%] top-[20%] rounded border border-[#333] bg-[#1a1a1a] px-2 py-1">
              <span className="font-mono text-[10px] text-[#00ff88]">{"GPT"}</span>
            </div>
            <div className="absolute bottom-[20%] left-[15%] rounded border border-[#333] bg-[#1a1a1a] px-2 py-1">
              <span className="font-mono text-[10px] text-[#00ff88]">{"LLM"}</span>
            </div>
            <div className="absolute bottom-[25%] right-[10%] rounded border border-[#333] bg-[#1a1a1a] px-2 py-1">
              <span className="font-mono text-[10px] text-[#00ff88]">{"ML"}</span>
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
  
            <h2 className="mb-3 text-4xl font-bold leading-tight text-white">
              Dijkstra
              <br />
              GPT
            </h2>
  
            <p className="mb-1.5 text-base font-medium text-white">Your AI Interview Coach</p>
            <p className="text-sm leading-relaxed text-[#999999]">
              In-house LLM designed for job hunt preparation
              <br />
              Practice interviews, get feedback, land your dream job
              <br />
              Powered by advanced AI technology
            </p>
          </div>
        </div>
  
        <div className="border-t border-[#2a2a2a] px-10 py-5">
          <p className="mb-2.5 text-[11px] text-[#666666]">AI-powered career development</p>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-[#999999]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
              <span className="text-[13px] font-medium">Smart Coaching</span>
            </div>
            <div className="flex items-center gap-2 text-[#999999]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span className="text-[13px] font-medium">Real Feedback</span>
            </div>
          </div>
        </div>
      </>
    )
  }
  