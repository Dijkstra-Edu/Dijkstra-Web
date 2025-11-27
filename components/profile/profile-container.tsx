// Main Profile Container Component

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { PersonalDetailsSection } from './sections/personal-details-section';
import { WorkExperienceSection } from './sections/work-experience-section';
import { SkillsSection } from './sections/skills-section';
import { EducationSection } from './sections/education-section';
import { ProjectsSection } from './sections/projects-section';
import { CertificationsSection } from './sections/certifications-section';
import { PublicationsSection } from './sections/publications-section';
import { VolunteeringSection } from './sections/volunteering-section';
import { TestScoresSection } from './sections/test-scores-section';

const PROFILE_SECTIONS = [
  { id: 'personal-details', title: 'Personal Details', component: PersonalDetailsSection },
  { id: 'work-experience', title: 'Work Experience', component: WorkExperienceSection },
  { id: 'skills', title: 'Skills', component: SkillsSection },
  { id: 'education', title: 'Education', component: EducationSection },
  { id: 'projects', title: 'Projects', component: ProjectsSection },
  { id: 'certifications', title: 'Certifications', component: CertificationsSection },
  { id: 'publications', title: 'Publications', component: PublicationsSection },
  { id: 'volunteering', title: 'Volunteering', component: VolunteeringSection },
  { id: 'test-scores', title: 'Test Scores', component: TestScoresSection },
];

export function ProfileContainer() {
  const { data: session } = useSession();
  const [editingSections, setEditingSections] = useState<Set<string>>(new Set());

  if (!session?.user?.id) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const toggleEdit = (sectionId: string) => {
    setEditingSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  console.log("Session", session);

  return (
    <div className="max-w-8xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your professional profile and showcase your achievements</p>
      </div>

      {/* Profile Sections */}
      <div className="space-y-6">
        {PROFILE_SECTIONS.map(({ id, component: SectionComponent }) => (
          <SectionComponent
            key={id}
            profileId={session?.user?.profile_id || ""}
            githubUserName={session?.user?.login || ""}
            isEditing={editingSections.has(id)}
            onToggleEdit={() => toggleEdit(id)}
          />
        ))}
      </div>
    </div>
  );
}
