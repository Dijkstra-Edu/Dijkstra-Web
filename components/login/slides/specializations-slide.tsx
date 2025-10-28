import { CAREER_PATHS, type CareerPathKey } from "@/data/career-paths"

const featuredSpecializations: CareerPathKey[] = [
  "FULLSTACK",
  "ML_ENGINEERING",
  "CLOUD",
  "COMPILERS",
  "GAME_DEV",
  "UI_UX",
]

export function SpecializationsSlide() {
  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-10">
          {/* Featured Specializations Grid */}
          <div className="mb-8 w-full max-w-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {featuredSpecializations.map((key) => {
                const path = CAREER_PATHS[key]
                if (!path) return null

                return (
                  <div
                    key={key}
                    className="relative group p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    {/* Background gradient layer */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${path.gradient} opacity-30 group-hover:opacity-40 transition-opacity duration-300`} />
                    {/* Content layer */}
                    <div className="relative z-10">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${path.gradient} flex items-center justify-center p-2 shadow-lg`}>
                        <img 
                          src={`/${path.icon}`} 
                          alt={path.label}
                          className="w-full h-full object-contain filter drop-shadow-sm"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const parent = e.currentTarget.parentElement
                            if (parent) {
                              const span = document.createElement('span')
                              span.className = 'text-white text-xs font-bold'
                              span.textContent = path.shortLabel
                              parent.appendChild(span)
                            }
                          }}
                        />
                      </div>
                      <h4 className="text-xs font-medium text-white text-center">{path.label}</h4>
                    </div>
                  </div>
                )
              })}
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
              Choose Your
              <br />
              Specializations
            </h2>

            <p className="mb-2 text-base leading-relaxed text-gray-300">
              Select <span className="text-[#00ff88] font-semibold">1 primary</span> and <span className="text-[#00ff88] font-semibold">3 secondary</span> specializations
            </p>
            <p className="text-sm leading-relaxed text-[#999999]">
              Tailor your learning path to match your career goals
              <br />
              {featuredSpecializations.length}+ career paths available
            </p>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] px-10 py-5">
          <p className="mb-2.5 text-[11px] text-[#666666]">Find your perfect career path</p>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-[#999999]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
              <span className="text-[13px] font-medium">35+ Paths</span>
            </div>
            <div className="flex items-center gap-2 text-[#999999]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span className="text-[13px] font-medium">Personalized Learning</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

