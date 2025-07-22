import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchIcon, MapPinIcon, BriefcaseIcon, TrendingUpIcon } from "lucide-react"
import Link from "next/link"

export default function OpportunitiesHero() {
  const stats = [
    { label: "Open Positions", value: "150+", icon: BriefcaseIcon },
    { label: "Companies", value: "50+", icon: TrendingUpIcon },
    { label: "Remote Jobs", value: "80+", icon: MapPinIcon },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="container relative mx-auto px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <TrendingUpIcon className="mr-2 h-4 w-4" />
            Now Hiring - Join Our Growing Team
          </Badge>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find Your Dream{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Career</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Discover amazing opportunities with top companies. From startups to Fortune 500, find the perfect role that
            matches your skills and ambitions.
          </p>

          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="px-8" asChild>
              <Link href="/opportunities/all">
                <SearchIcon className="mr-2 h-5 w-5" />
                Browse All Jobs
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              Post a Job
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
