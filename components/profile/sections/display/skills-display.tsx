// Skills Display Component

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getExperienceColor, getProficiencyLabel } from "@/lib/profile/profile-utils";
import type { SkillsData, Domain, SkillCategory } from "@/types/client/profile-section/profile-sections";

interface SkillsDisplayProps {
  data: SkillsData[];
}

type GroupByType = 'category' | 'domain';

export function SkillsDisplay({ data }: SkillsDisplayProps) {
  const [groupBy, setGroupBy] = useState<GroupByType>('category');

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No skills added yet
      </div>
    );
  }

  // Group skills by category or domain
  const groupedSkills = data.reduce((acc, skill) => {
    if (groupBy === 'category') {
      const category = skill.category || 'OTHER';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
    } else {
      // Group by domain - handle multiple domains per skill
      const domains = skill.domain || ['OTHER'];
      domains.forEach(domain => {
        if (!acc[domain]) {
          acc[domain] = [];
        }
        // Only add the skill once per domain group
        if (!acc[domain].find(s => s.id === skill.id)) {
          acc[domain].push(skill);
        }
      });
    }
    return acc;
  }, {} as Record<string, SkillsData[]>);

  const formatGroupName = (name: string) => {
    if (groupBy === 'category') {
      return name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      {/* Toggle buttons */}
      <div className="flex items-center justify-between">
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
        
        <div className="flex gap-2">
          <Button
            variant={groupBy === 'category' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setGroupBy('category')}
          >
            By Category
          </Button>
          <Button
            variant={groupBy === 'domain' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setGroupBy('domain')}
          >
            By Domain
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(groupedSkills).map(([groupName, skills]) => (
          <div key={groupName} className="space-y-4">
            <h4 className="font-semibold text-lg border-b pb-2">{formatGroupName(groupName)}</h4>
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
