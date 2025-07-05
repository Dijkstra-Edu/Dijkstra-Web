"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, User, Briefcase, Code, Palette, MessageSquare } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export function TeamVisualization() {
  const [activeTeam, setActiveTeam] = useState<string | null>("engineering")
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isVerySmall = useMediaQuery("(max-width: 500px)")

  // Define team data
  const teams = [
    {
      id: "engineering",
      name: isVerySmall ? "Eng" : "Engineering",
      icon: Code,
      color: "text-blue-500",
      count: isVerySmall ? 6 : isMobile ? 8 : 24,
    },
    {
      id: "design",
      name: "Design",
      icon: Palette,
      color: "text-purple-500",
      count: isVerySmall ? 4 : isMobile ? 6 : 12,
    },
    {
      id: "product",
      name: isVerySmall ? "Prod" : "Product",
      icon: Briefcase,
      color: "text-green-500",
      count: isVerySmall ? 3 : isMobile ? 4 : 8,
    },
    {
      id: "support",
      name: isVerySmall ? "Supp" : "Support",
      icon: MessageSquare,
      color: "text-yellow-500",
      count: isVerySmall ? 4 : isMobile ? 6 : 16,
    },
  ]

  // Generate team members when active team changes
  useEffect(() => {
    if (!activeTeam) return

    const team = teams.find((t) => t.id === activeTeam)
    if (!team) return

    // Generate random team members
    const members = Array.from({ length: team.count }, (_, i) => ({
      id: i,
      name: `Team Member ${i + 1}`,
      role:
        team.id === "engineering"
          ? ["Frontend", "Backend", "DevOps", "QA"][i % 4]
          : team.id === "design"
            ? ["UI", "UX", "Visual", "Motion"][i % 4]
            : team.id === "product"
              ? ["Manager", "Owner", "Analyst", "Strategist"][i % 4]
              : ["L1", "L2", "L3", "Manager"][i % 4],
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 80 + 10, // 10-90%
    }))

    setTeamMembers(members)
  }, [activeTeam, isMobile, isVerySmall])

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-3 md:p-6 h-full">
      <div className="flex justify-between items-center mb-3 md:mb-6">
        <div className="flex items-center gap-1 md:gap-2">
          <Users className="h-4 w-4 md:h-5 md:w-5 text-purple-500" />
          <h3 className="font-medium text-xs sm:text-sm md:text-base">TechNova Team</h3>
        </div>
        <div className="text-[8px] sm:text-xs text-gray-400">{isVerySmall ? "60+" : "60+ Team Members"}</div>
      </div>

      <div className="flex gap-1 sm:gap-2 md:gap-3 mb-3 md:mb-6 overflow-x-auto pb-2 -mx-1 px-1">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => setActiveTeam(team.id)}
            className={`flex items-center gap-1 md:gap-2 px-1.5 sm:px-2 md:px-3 py-1 md:py-2 rounded-lg transition-colors whitespace-nowrap text-[8px] sm:text-xs md:text-sm ${
              activeTeam === team.id
                ? `bg-gray-800 ${team.color}`
                : "bg-gray-800/30 text-gray-400 hover:bg-gray-800/50 hover:text-gray-300"
            }`}
          >
            <team.icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
            <span>{team.name}</span>
            <span className="text-[6px] sm:text-[10px] md:text-xs bg-gray-700/50 px-1 md:px-1.5 py-0.5 rounded-full">
              {team.count}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-gray-800/30 rounded-lg p-2 sm:p-3 md:p-4 mb-3 md:mb-6">
        <div className="flex justify-between items-center mb-1.5 sm:mb-2 md:mb-3">
          <h4 className="text-[10px] sm:text-xs md:text-sm font-medium">
            {activeTeam ? teams.find((t) => t.id === activeTeam)?.name : "All"} Team
          </h4>
          <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-400">
            {activeTeam ? teams.find((t) => t.id === activeTeam)?.count : 0} {isVerySmall ? "" : "members"}
          </span>
        </div>

        <div className="relative h-[120px] sm:h-[150px] md:h-[200px] bg-gray-900/50 rounded-lg border border-gray-800 overflow-hidden">
          {/* Team visualization */}
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="absolute flex flex-col items-center"
              style={{ left: `${member.x}%`, top: `${member.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`relative w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-gray-800 flex items-center justify-center ${
                  activeTeam === "engineering"
                    ? "text-blue-500"
                    : activeTeam === "design"
                      ? "text-purple-500"
                      : activeTeam === "product"
                        ? "text-green-500"
                        : "text-yellow-500"
                }`}
              >
                <User className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                <motion.div
                  className={`absolute inset-0 rounded-full border ${
                    activeTeam === "engineering"
                      ? "border-blue-500"
                      : activeTeam === "design"
                        ? "border-purple-500"
                        : activeTeam === "product"
                          ? "border-green-500"
                          : "border-yellow-500"
                  }`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, delay: member.id * 0.1 }}
                />
              </div>
              {!isVerySmall && !isMobile && (
                <div className="mt-1 px-1.5 py-0.5 bg-gray-800/80 rounded text-[8px] whitespace-nowrap">
                  {member.role}
                </div>
              )}
            </motion.div>
          ))}

          {/* Connection lines - only show on larger screens */}
          {!isMobile && teamMembers.length > 0 && (
            <svg className="absolute inset-0 w-full h-full">
              {teamMembers.slice(0, 10).flatMap((member, i) => {
                const connections = teamMembers
                  .slice(0, 10)
                  .filter((_, j) => j !== i && Math.random() > 0.7)
                  .slice(0, 2)

                return connections.map((connection, j) => (
                  <motion.line
                    key={`${i}-${j}`}
                    x1={`${member.x}%`}
                    y1={`${member.y}%`}
                    x2={`${connection.x}%`}
                    y2={`${connection.y}%`}
                    stroke={
                      activeTeam === "engineering"
                        ? "#3b82f6"
                        : activeTeam === "design"
                          ? "#8b5cf6"
                          : activeTeam === "product"
                            ? "#22c55e"
                            : "#eab308"
                    }
                    strokeWidth="0.5"
                    strokeOpacity="0.2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  />
                ))
              })}
            </svg>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        <div className="bg-gray-800/50 p-1.5 sm:p-2 md:p-3 rounded-lg">
          <h4 className="text-[8px] sm:text-[10px] md:text-xs font-medium mb-1 md:mb-2">
            {isVerySmall ? "Collab" : "Team Collaboration"}
          </h4>
          <div className="flex items-center">
            <div className="w-full bg-gray-700 rounded-full h-1 sm:h-1.5 md:h-2.5">
              <motion.div
                className={`h-full rounded-full ${
                  activeTeam === "engineering"
                    ? "bg-blue-500"
                    : activeTeam === "design"
                      ? "bg-purple-500"
                      : activeTeam === "product"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    activeTeam === "engineering"
                      ? 85
                      : activeTeam === "design"
                        ? 92
                        : activeTeam === "product"
                          ? 78
                          : 88
                  }%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="ml-1 sm:ml-2 text-[8px] sm:text-[10px] md:text-xs">
              {activeTeam === "engineering"
                ? "85%"
                : activeTeam === "design"
                  ? "92%"
                  : activeTeam === "product"
                    ? "78%"
                    : "88%"}
            </span>
          </div>
        </div>

        <div className="bg-gray-800/50 p-1.5 sm:p-2 md:p-3 rounded-lg">
          <h4 className="text-[8px] sm:text-[10px] md:text-xs font-medium mb-1 md:mb-2">
            {isVerySmall ? "Prod" : "Productivity"}
          </h4>
          <div className="flex items-center">
            <div className="w-full bg-gray-700 rounded-full h-1 sm:h-1.5 md:h-2.5">
              <motion.div
                className={`h-full rounded-full ${
                  activeTeam === "engineering"
                    ? "bg-blue-500"
                    : activeTeam === "design"
                      ? "bg-purple-500"
                      : activeTeam === "product"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    activeTeam === "engineering"
                      ? 92
                      : activeTeam === "design"
                        ? 88
                        : activeTeam === "product"
                          ? 95
                          : 82
                  }%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="ml-1 sm:ml-2 text-[8px] sm:text-[10px] md:text-xs">
              {activeTeam === "engineering"
                ? "92%"
                : activeTeam === "design"
                  ? "88%"
                  : activeTeam === "product"
                    ? "95%"
                    : "82%"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
