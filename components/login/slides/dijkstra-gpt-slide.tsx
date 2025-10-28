export function DijkstraGPTSlide() {
    return (
      <>
        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col items-center justify-center px-10">
            {/* Terminal Interface Visualization */}
            <div className="relative mb-10 h-84 w-full max-w-2xl mx-auto">
              {/* Terminal Window */}
              <div className="h-full rounded-lg border border-[#333] bg-[#0d1117] shadow-xl overflow-hidden">
                {/* Terminal Header Bar */}
                <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22] border-b border-[#333]">
                  {/* Window Controls */}
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-[10px] text-[#8b949e] font-mono">dijkstra-gpt — AI Tutor</span>
                  </div>
                  <div className="w-8" />
                </div>

                {/* Terminal Content */}
                <div className="p-4 font-mono text-[11px] leading-relaxed h-[calc(100%-40px)] overflow-y-auto">
                  {/* Welcome message */}
                  <div className="mb-3 text-[#c9d1d9]">
                    <span className="text-[#00ff88]">╭─</span>
                    <span className="ml-2">Welcome to Dijkstra GPT</span>
                  </div>
                  <div className="mb-4 ml-4 text-[#8b949e]">
                    Type 'help' for commands, or ask me anything about CS!
                  </div>

                  {/* Prompt 1 */}
                  <div className="mb-2">
                    <span className="text-[#00ff88]">➜</span>
                    <span className="text-[#58a6ff] ml-2">dijkstra-gpt</span>
                    <span className="text-white ml-2">"help with interviews"</span>
                  </div>

                  {/* Response */}
                  <div className="mb-3 text-[#c9d1d9]">
                    <span className="text-[#58a6ff]">✓</span>
                    <span className="ml-2">I can help you prepare for technical interviews!</span>
                  </div>
                  <div className="mb-2 ml-6 text-[#8b949e]">
                    <span className="text-[#00ff88]">├─</span>
                    <span className="ml-2">Practice coding problems</span>
                  </div>
                  <div className="mb-2 ml-6 text-[#8b949e]">
                    <span className="text-[#00ff88]">├─</span>
                    <span className="ml-2">Mock interview sessions</span>
                  </div>
                  <div className="mb-4 ml-6 text-[#8b949e]">
                    <span className="text-[#00ff88]">└─</span>
                    <span className="ml-2">Career guidance</span>
                  </div>

                  {/* Prompt 2 */}
                  <div className="mb-2">
                    <span className="text-[#00ff88]">➜</span>
                    <span className="text-[#58a6ff] ml-2">dijkstra-gpt</span>
                    <span className="text-white ml-2">review-code</span>
                  </div>

                  {/* Code snippet */}
                  <div className="mb-3 ml-6 p-2 bg-[#161b22] rounded border-l-2 border-[#58a6ff]">
                    <div className="text-[#c9d1d9]">
                      <span className="text-[#79c0ff]">function</span>
                      <span className="text-white"> solve(nums) </span>
                      <span className="text-[#79c0ff]">{`{`}</span>
                    </div>
                    <div className="text-white ml-4">
                      return nums.<span className="text-[#d2a8ff]">filter</span>(x =&gt; {"x > 0"});
                    </div>
                    <div>
                      <span className="text-[#79c0ff]">{`}`}</span>
                    </div>
                  </div>

                  {/* Response */}
                  <div className="mb-3 text-[#c9d1d9]">
                    <span className="text-[#58a6ff]">→</span>
                    <span className="ml-2">Time: O(n), Space: O(n). Consider in-place solution?</span>
                  </div>

                  {/* Prompt 3 */}
                  <div className="mb-2">
                    <span className="text-[#00ff88]">➜</span>
                    <span className="text-[#58a6ff] ml-2">dijkstra-gpt</span>
                    <span className="text-white ml-2 cursor-pulse">_</span>
                  </div>

                  {/* Blinking cursor */}
                  <div className="inline-block ml-2">
                    <span className="text-[#00ff88] animate-pulse">▋</span>
                  </div>
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
  
            <h2 className="mb-3 text-4xl font-bold leading-tight text-white">
              Dijkstra
              <br />
              GPT
            </h2>
  
            <p className="mb-1.5 text-base font-medium text-white">Cutting-Edge AI for CS Education</p>
            <p className="text-sm leading-relaxed text-[#999999]">
              Advanced LLM trained specifically for computer science learning
              <br />
              Get personalized guidance, code reviews, and career insights
              <br />
              Powered by state-of-the-art AI technology
            </p>
          </div>
          </div>

          <div className="border-t border-[#2a2a2a] px-10 py-5">
            <p className="mb-2.5 text-[11px] text-[#666666]">Next-generation AI learning assistant</p>
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-[#999999]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                </svg>
                <span className="text-[13px] font-medium">24/7 Tutor</span>
              </div>
              <div className="flex items-center gap-2 text-[#999999]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span className="text-[13px] font-medium">CS Expert</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  