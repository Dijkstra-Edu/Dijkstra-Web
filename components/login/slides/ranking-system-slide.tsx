export function RankingSystemSlide() {
    const ranks = [
      { name: "IRON_3", displayName: "Iron", color: "#929292", pay: "2LPA" },
      { name: "BRONZE_3", displayName: "Bronze", color: "#cd7f32", pay: "4LPA" },
      { name: "SILVER_3", displayName: "Silver", color: "#e8e8e8", pay: "8LPA" },
      { name: "GOLD_3", displayName: "Gold", color: "#ffd700", pay: "12LPA" },
      { name: "PLATINUM_3", displayName: "Platinum", color: "#7e9bbf", pay: "16LPA" },
      { name: "DIAMOND_3", displayName: "Diamond", color: "#b9f2ff", pay: "20LPA" },
      { name: "EMERALD_3", displayName: "Emerald", color: "#50c878", pay: "26LPA" },
      { name: "LAPIS_3", displayName: "Lapis", color: "#c77df3", pay: "36LPA" },
      { name: "QUARTZ_3", displayName: "Quartz", color: "#f9e076", pay: "50LPA" },
      { name: "SAPHIRE_3", displayName: "Amethyst", color: "#e3480b", pay: "75LPA" },
      { name: "OBSIDIAN", displayName: "Obsidian", color: "#6a5acd", pay: "1Cr+" },
    ]
  
    return (
      <>
        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col items-center justify-center px-10">
          {/* Ranking visualization */}
          <div className="relative mb-12 w-full max-w-md h-80">
            <div className="flex items-end justify-between gap-1.5 h-full">
              {ranks.map((rank, index) => {
                // Exponential growth: more dramatic curve for better visual impact
                // Base height of 20px, exponential multiplier targeting ~190px for last bar
                const baseHeight = 20
                const exponentialHeight = Math.pow(1.3, index) * 15
                const barHeight = baseHeight + exponentialHeight
                
                return (
                  <div key={rank.name} className="flex flex-1 flex-col items-center relative pb-12">
                    {/* Rank badge image positioned above the bar */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                      <img
                        src={`/Ranks/${rank.name}.png`}
                        alt={rank.displayName}
                        className="h-16 w-16 object-contain transition-all duration-300 hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "/Ranks/UNRANKED.png"
                        }}
                      />
                    </div>
                    {/* Ascending bar visualization with exponential growth */}
                    <div
                      className="w-full rounded-t transition-all duration-300 hover:opacity-95 relative"
                      style={{
                        backgroundColor: rank.color,
                        height: `${barHeight}px`,
                        opacity: 0.95,
                      }}
                    />
                    {/* Pay label - positioned below bar with proper spacing */}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[10px] font-semibold text-[#00ff88] text-center leading-tight z-10 whitespace-nowrap">{rank.pay}</span>
                  </div>
                )
              })}
            </div>

            {/* Ascending arrow indicator */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2">
              <svg className="h-20 w-6 text-[#00ff88]" viewBox="0 0 24 80" fill="none">
                <path d="M12 4 L12 76 M12 4 L8 8 M12 4 L16 8" stroke="currentColor" strokeWidth="2" />
              </svg>
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
              Ranking
              <br />
              System
            </h2>
  
            <p className="text-sm leading-relaxed text-[#999999]">
              Climb the ranks and increase your earnings
              <br />
              Performance-based progression system
              <br />
              Higher rank = Higher pay
            </p>
          </div>
          </div>

          <div className="border-t border-[#2a2a2a] px-10 py-5">
            <p className="mb-2.5 text-[11px] text-[#666666]">Inspired by competitive gaming</p>
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-[#999999]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                </svg>
                <span className="text-[13px] font-medium">Merit-Based</span>
              </div>
              <div className="flex items-center gap-2 text-[#999999]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span className="text-[13px] font-medium">Fair Progression</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  