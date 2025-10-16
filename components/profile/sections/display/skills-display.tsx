// Skills Display Component

import { getExperienceColor, getProficiencyLabel } from "@/lib/profile/profile-utils";
import type { SkillsData } from "@/types/profile-sections";

interface SkillsDisplayProps {
  data: SkillsData[];
}

export function SkillsDisplay({ data }: SkillsDisplayProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No skills added yet
      </div>
    );
  }

  // Group skills by category
  const skillsByCategory = data.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, SkillsData[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Skills are color-coded by years of experience:</span>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-green-700 rounded mr-1"></span>0-1y
          <span className="inline-block w-3 h-3 bg-yellow-500 rounded mr-1"></span>1-2y
          <span className="inline-block w-3 h-3 bg-orange-500 rounded mr-1"></span>2-4y
          <span className="inline-block w-3 h-3 bg-red-500 rounded mr-1"></span>4-6y
          <span className="inline-block w-3 h-3 bg-purple-500 rounded mr-1"></span>6-8y
          <span className="inline-block w-3 h-3 bg-black border-2 border-yellow-500 rounded mr-1"></span>8+y
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category} className="space-y-4">
            <h4 className="font-semibold text-lg border-b pb-2">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${getExperienceColor(skill.yearsOfExperience)}`}
                  title={`${skill.name} - ${skill.proficiency}/100 proficiency (${getProficiencyLabel(skill.proficiency)})`}
                >
                  {skill.name} | {skill.yearsOfExperience}y
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
