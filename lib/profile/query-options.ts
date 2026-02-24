// TanStack Query options for profile sections - Updated to match database schema

import { queryOptions } from '@tanstack/react-query';
import { 
  fetchWorkExperience,
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
  fetchSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  fetchEducation,
  addEducation,
  updateEducation,
  deleteEducation,
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  fetchCertifications,
  addCertification,
  updateCertification,
  deleteCertification,
  fetchPublications,
  addPublication,
  updatePublication,
  deletePublication,
  fetchVolunteering,
  addVolunteering,
  updateVolunteering,
  deleteVolunteering,
  fetchTestScores,
  addTestScore,
  updateTestScore,
  deleteTestScore,
} from './api-client';
import type { 
  PersonalDetailsData, 
  WorkExperienceData, 
  SkillsData,
  EducationData,
  ProjectsData,
  CertificationsData,
  PublicationsData,
  VolunteeringData,
  TestScoresData
} from '@/types/client/profile-section/profile-sections';
import { getPersonalDetailsByGithubUsername } from '@/server/dataforge/User/user';

// Personal Details Query Options - matches User table

// Work Experience Query Options - matches WorkExperience table

// Skills Query Options - matches Skills table

// Placeholder query options for other sections

export const projectsQuery = (profileId: string) =>
  queryOptions({
    queryKey: profileQueryKeys.projects.list(profileId),
    queryFn: () => fetchProjects(profileId),
  });

export const volunteeringQuery = (profileId: string) =>
  queryOptions({
    queryKey: profileQueryKeys.volunteering.list(profileId),
    queryFn: () => fetchVolunteering(profileId),
  });

// Education mutation options

// Projects mutation options
export const addProjectMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: Omit<ProjectsData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'> }) =>
    addProject(profileId, data),
};

export const updateProjectMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: Partial<ProjectsData> }) =>
    updateProject(profileId, id, data),
};

export const deleteProjectMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) =>
    deleteProject(profileId, id),
};

// Certifications mutation options

// Publications mutation options

// Volunteering mutation options
export const addVolunteeringMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: Omit<VolunteeringData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'> }) =>
    addVolunteering(profileId, data),
};

export const updateVolunteeringMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: Partial<VolunteeringData> }) =>
    updateVolunteering(profileId, id, data),
};

export const deleteVolunteeringMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) =>
    deleteVolunteering(profileId, id),
};

// Test Scores mutation options