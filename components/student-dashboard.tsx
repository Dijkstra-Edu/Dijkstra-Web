import { ContributionHeatmap } from "./contribution-heatmap"
import { ProfileContainer } from "./profile/profile-container"

export function StudentDashboard() {
  return (
    <div className="max-w-8xl mx-auto space-y-4">
      {/* Dashboard Grid */}
      <div className="space-y-4">
        <ContributionHeatmap />
        <ProfileContainer />
      </div>
    </div>
  )
}
