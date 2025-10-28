"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, Info } from "lucide-react"

interface Skill {
  id: string
  name: string
  category: string
  proficiency: number // 1-100
  yearsOfExperience: number
}

export function Skills() {
  const [skills] = useState<Skill[]>([
    // Programming Languages
    { id: "1", name: "JavaScript", category: "Programming Languages", proficiency: 90, yearsOfExperience: 5 },
    { id: "2", name: "Python", category: "Programming Languages", proficiency: 85, yearsOfExperience: 6 },
    { id: "3", name: "TypeScript", category: "Programming Languages", proficiency: 80, yearsOfExperience: 3 },
    { id: "4", name: "Java", category: "Programming Languages", proficiency: 75, yearsOfExperience: 11 },
    { id: "5", name: "C++", category: "Programming Languages", proficiency: 70, yearsOfExperience: 3 },
    { id: "6", name: "Rust", category: "Programming Languages", proficiency: 70, yearsOfExperience: 3.5 },
    { id: "7", name: "Go", category: "Programming Languages", proficiency: 70, yearsOfExperience: 0.5 },
    { id: "8", name: "Groovy", category: "Programming Languages", proficiency: 70, yearsOfExperience: 0.5 },
    { id: "9", name: "Zig", category: "Programming Languages", proficiency: 70, yearsOfExperience: 0.2 },

    // Frameworks & Libraries
    { id: "6", name: "React", category: "Frameworks & Libraries", proficiency: 90, yearsOfExperience: 2.5 },
    { id: "7", name: "Node.js", category: "Frameworks & Libraries", proficiency: 85, yearsOfExperience: 2 },
    { id: "8", name: "Next.js", category: "Frameworks & Libraries", proficiency: 80, yearsOfExperience: 1.5 },
    { id: "9", name: "Express.js", category: "Frameworks & Libraries", proficiency: 80, yearsOfExperience: 2 },
    { id: "10", name: "TensorFlow", category: "Frameworks & Libraries", proficiency: 70, yearsOfExperience: 1 },

    // Databases
    { id: "11", name: "PostgreSQL", category: "Databases", proficiency: 80, yearsOfExperience: 2 },
    { id: "12", name: "MongoDB", category: "Databases", proficiency: 75, yearsOfExperience: 1.5 },
    { id: "13", name: "Redis", category: "Databases", proficiency: 70, yearsOfExperience: 1 },

    // Cloud & DevOps
    { id: "14", name: "AWS", category: "Cloud & DevOps", proficiency: 75, yearsOfExperience: 1.5 },
    { id: "15", name: "Docker", category: "Cloud & DevOps", proficiency: 70, yearsOfExperience: 1 },
    { id: "16", name: "Git", category: "Cloud & DevOps", proficiency: 90, yearsOfExperience: 3 },

    // Tools & Technologies
    { id: "17", name: "VS Code", category: "Tools & Technologies", proficiency: 95, yearsOfExperience: 3 },
    { id: "18", name: "Figma", category: "Tools & Technologies", proficiency: 75, yearsOfExperience: 2 },
    { id: "19", name: "Postman", category: "Tools & Technologies", proficiency: 80, yearsOfExperience: 2 },
  ])

  const categories = Array.from(new Set(skills.map((skill) => skill.category)))

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 90) return "Expert"
    if (proficiency >= 80) return "Advanced"
    if (proficiency >= 70) return "Intermediate"
    if (proficiency >= 60) return "Beginner"
    return "Learning"
  }

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return "text-green-600"
    if (proficiency >= 80) return "text-blue-600"
    if (proficiency >= 70) return "text-yellow-600"
    if (proficiency >= 60) return "text-orange-600"
    return "text-gray-600"
  }

  const getExperienceColor = (years: number) => {
    if (years >= 8) return "bg-black border-2 border-yellow-500 text-yellow-500"
    if (years >= 6) return "bg-purple-500 text-white"
    if (years >= 4) return "bg-red-500 text-white"
    if (years >= 2) return "bg-orange-500 text-white"
    if (years >= 1) return "bg-yellow-500 text-black"
    return "bg-green-700 text-white"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Skills
          </CardTitle>
          <div className="relative group">
            <Button size="sm" variant="outline">
              <Info className="w-4 h-4" />
            </Button>
            <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-popover border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <p className="text-sm text-muted-foreground">
                Skills are color-coded by years of experience:
                <span className="block mt-1">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded mr-1"></span>0-1 years
                  <span className="inline-block w-3 h-3 bg-yellow-500 rounded mr-1 ml-2"></span>1-2 years
                  <span className="inline-block w-3 h-3 bg-orange-500 rounded mr-1 ml-2"></span>2-4 years
                </span>
                <span className="block">
                  <span className="inline-block w-3 h-3 bg-red-500 rounded mr-1"></span>4-6 years
                  <span className="inline-block w-3 h-3 bg-purple-500 rounded mr-1 ml-2"></span>6-8 years
                  <span className="inline-block w-3 h-3 bg-gradient-to-r from-black to-yellow-500 rounded mr-1 ml-2"></span>
                  8+ years
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div key={category} className="space-y-4">
              <h4 className="font-semibold text-lg border-b pb-2">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div
                      key={skill.id}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${getExperienceColor(skill.yearsOfExperience)}`}
                    >
                      {skill.name} | {skill.yearsOfExperience}y
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
