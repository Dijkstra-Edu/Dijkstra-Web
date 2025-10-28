export function RankingSystemSlide() {
    const ranks = [
      { name: "Iron", color: "#4A4A4A", pay: "$20/hr" },
      { name: "Bronze", color: "#CD7F32", pay: "$30/hr" },
      { name: "Silver", color: "#C0C0C0", pay: "$45/hr" },
      { name: "Gold", color: "#FFD700", pay: "$60/hr" },
      { name: "Platinum", color: "#00CED1", pay: "$80/hr" },
      { name: "Diamond", color: "#B9F2FF", pay: "$100/hr" },
      { name: "Immortal", color: "#FF4655", pay: "$125/hr" },
    ]
  
    return (
      <>
        <div className="flex flex-1 flex-col items-center justify-center px-10 pt-16">
          {/* Ranking visualization */}
          <div className="relative mb-10 w-full max-w-md">
            <div className="flex items-end justify-between gap-2">
              {ranks.map((rank, index) => (
                <div key={rank.name} className="flex flex-1 flex-col items-center gap-2">
                  {/* Bar */}
                  <div
                    className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                    style={{
                      backgroundColor: rank.color,
                      height: `${40 + index * 20}px`,
                      opacity: 0.8,
                    }}
                  />
                  {/* Rank icon */}
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded"
                    style={{
                      backgroundColor: rank.color,
                      opacity: 0.9,
                    }}
                  >
                    <div className="h-3 w-3 rounded-sm bg-black/30" />
                  </div>
                  {/* Pay label */}
                  <span className="text-[10px] font-medium text-[#00ff88]">{rank.pay}</span>
                </div>
              ))}
            </div>
  
            {/* Ascending arrow indicator */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2">
              <svg className="h-16 w-6 text-[#00ff88]" viewBox="0 0 24 64" fill="none">
                <path d="M12 4 L12 60 M12 4 L8 8 M12 4 L16 8" stroke="currentColor" strokeWidth="2" />
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
      </>
    )
  }
  