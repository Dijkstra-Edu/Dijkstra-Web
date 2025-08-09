// Base interface for all detail pages
export interface BaseDetailItem {
  id: string
  title: string
  organization: string
  organizationLogo: string
  heroImage: string
  description: string
  featured: boolean
  highlight: "new" | "trending" | "competitive" | "popular" | "good-first-issue" | undefined
  category: string
}

// Fellowship interface
export interface Fellowship extends BaseDetailItem {
  location: string
  locationType: "remote" | "onsite" | "hybrid"
  duration: string
  stipend: string
  applicationDeadline: string
  startDate: string
  benefits: string[]
  requirements: string[]
  technologies: string[]
  highlight: "new" | "trending" | "competitive" | "popular" | undefined
}

// Project interface
export interface Project extends BaseDetailItem {
  repository: string
  language: string
  stars: number
  forks: number
  lastUpdated: string
  topics: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  issuesCount: number
  contributorsCount: number
  license: string
}

// Job interface
export interface JobPosition extends BaseDetailItem {
  department: string
  companyName: string
  location: string
  locationType: "remote" | "onsite" | "hybrid"
  employmentType: "full-time" | "part-time" | "contract" | "internship"
  experienceLevel: "entry" | "mid" | "senior" | "lead" | "executive"
  postedDate: string
  salary: string
  perks: string[]
  highlight: "new" | "trending" | "competitive" | "popular" | undefined
}

// Union type for all possible items
export type DetailItem = Fellowship | Project | JobPosition

// Type guards
export function isFellowship(item: DetailItem): item is Fellowship {
  return "duration" in item && "stipend" in item
}

export function isProject(item: DetailItem): item is Project {
  return "repository" in item && "stars" in item
}

export function isJobPosition(item: DetailItem): item is JobPosition {
  return "department" in item && "employmentType" in item
}

// Configuration for different item types
export interface DetailPageConfig {
  type: "fellowship" | "project" | "job"
  heroImage: string
  heroImageAlt: string
  tabs: {
    overview: boolean
    issues?: boolean
    readme?: boolean
    details?: boolean
    requirements?: boolean
  }
}
