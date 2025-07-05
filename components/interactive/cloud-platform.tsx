"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Server, Database, Globe, Cloud, Cpu, ArrowRight } from "lucide-react"

export function CloudPlatform() {
  const [activeServer, setActiveServer] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [deployStatus, setDeployStatus] = useState<string | null>(null)

  // Simulate server selection and deployment
  const handleServerClick = (index: number) => {
    setActiveServer(index)
    setIsLoading(true)
    setDeployStatus(null)

    setTimeout(() => {
      setIsLoading(false)
      setDeployStatus("Deployed successfully")
    }, 1500)
  }

  // Auto-cycle through servers for demo effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        setActiveServer((prev) => {
          const next = prev === null ? 0 : (prev + 1) % 6
          return next
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isLoading])

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-purple-500" />
          <h3 className="font-medium">TechNova Cloud Console</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          All Systems Operational
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/50 p-3 rounded-lg flex flex-col items-center justify-center text-center">
          <Cpu className="h-6 w-6 text-purple-400 mb-2" />
          <span className="text-xs text-gray-400">CPU Usage</span>
          <span className="text-sm font-medium">24%</span>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-lg flex flex-col items-center justify-center text-center">
          <Database className="h-6 w-6 text-blue-400 mb-2" />
          <span className="text-xs text-gray-400">Storage</span>
          <span className="text-sm font-medium">1.2 TB</span>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-lg flex flex-col items-center justify-center text-center">
          <Globe className="h-6 w-6 text-green-400 mb-2" />
          <span className="text-xs text-gray-400">Regions</span>
          <span className="text-sm font-medium">12 Active</span>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Global Server Network</h4>
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleServerClick(index)}
              className={`relative p-4 rounded-lg border transition-all ${
                activeServer === index
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
              }`}
            >
              <Server
                className={`h-6 w-6 mx-auto mb-2 ${activeServer === index ? "text-purple-400" : "text-gray-400"}`}
              />
              <span className="block text-xs text-center">Region {index + 1}</span>
              {activeServer === index && (
                <motion.div
                  className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-purple-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-medium">Deployment Status</h4>
          <span className="text-xs text-gray-400">Auto-scaling enabled</span>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 text-sm">
            <motion.div
              className="h-3 w-3 rounded-full bg-yellow-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
            />
            <span>Deploying to Region {activeServer !== null ? activeServer + 1 : "..."}</span>
          </div>
        ) : deployStatus ? (
          <div className="flex items-center gap-2 text-sm text-green-400">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span>{deployStatus}</span>
          </div>
        ) : (
          <div className="text-sm text-gray-400">
            {activeServer !== null ? (
              <span>Select a region to deploy your application</span>
            ) : (
              <span>Select a region to deploy your application</span>
            )}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
          <span className="text-xs text-gray-400">
            {activeServer !== null ? `Connected to Region ${activeServer + 1}` : "Not connected"}
          </span>
          <button className="text-xs text-purple-400 flex items-center gap-1 hover:text-purple-300">
            View Details <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
