// Skills Display Component

import { getExperienceColor, getProficiencyLabel } from "@/lib/profile/profile-utils";
import type { SkillsData } from "@/types/client/profile-section/profile-sections";

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

  // Group skills by domain (mapped from database field)
  const skillsByDomain = data.reduce((acc, skill) => {
    const domain = skill.domain || 'Other';
    if (!acc[domain]) {
      acc[domain] = [];
    }
    acc[domain].push(skill);
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
        {Object.entries(skillsByDomain).map(([domain, skills]) => (
          <div key={domain} className="space-y-4">
            <h4 className="font-semibold text-lg border-b pb-2">{domain}</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${getExperienceColor(skill.yearsOfExperience || 0)}`}
                  title={`${skill.skill} - ${skill.proficiency || 0}/100 proficiency (${getProficiencyLabel(skill.proficiency || 0)})`}
                >
                  {skill.skill} | {skill.yearsOfExperience || 0}y
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
