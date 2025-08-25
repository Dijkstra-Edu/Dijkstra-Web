import { ContributionHeatmap } from "./contribution-heatmap"
import { PersonalDetails } from "./personal-details"
import { WorkExperience } from "./work-experience"
import { Education } from "./education"
import { Projects } from "./projects"
import { Certifications } from "./certifications"
import { Publications } from "./publications"
import { Volunteering } from "./volunteering"
import { TestScores } from "./test-scores"
import { Skills } from "./skills"

export function StudentDashboard() {
  return (
    <div className="max-w-8xl mx-auto space-y-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Overall Profile</h1>
        <p className="text-muted-foreground">Comprehensive academic and professional profile</p>
      </div>

      {/* Dashboard Grid */}
      <div className="space-y-4">
        <ContributionHeatmap />
        
        <PersonalDetails />
        <WorkExperience />
        <Skills />
        <Education />
        <Projects />
        <Certifications />
        <Publications />
        <Volunteering />
        <TestScores />
        
      </div>
    </div>
  )
}
