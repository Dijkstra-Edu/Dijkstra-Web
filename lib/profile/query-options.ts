// TanStack Query options for profile sections - Updated to match database schema

import { queryOptions } from '@tanstack/react-query';
import { 
  fetchPersonalDetails, 
  updatePersonalDetails,
  fetchWorkExperience,
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
  fetchSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  fetchEducation,
  fetchProjects,
  fetchCertifications,
  fetchPublications,
  fetchVolunteering,
  fetchTestScores
} from './api';
import { profileQueryKeys } from './query-keys';
import type { 
  PersonalDetailsData, 
  WorkExperienceData, 
  SkillsData 
} from '@/types/client/profile-section/profile-sections';

// Personal Details Query Options - matches User table
export const personalDetailsQuery = (userId: string) =>
  queryOptions({
    queryKey: profileQueryKeys.personalDetails(userId),
    queryFn: () => fetchPersonalDetails(userId),
  });

export const updatePersonalDetailsMutation = {
  mutationFn: ({ userId, data }: { userId: string; data: Partial<PersonalDetailsData> }) =>
    updatePersonalDetails(userId, data),
};

// Work Experience Query Options - matches WorkExperience table
export const workExperienceQuery = (profileId: string) =>
  queryOptions({
    queryKey: profileQueryKeys.workExperience.list(profileId),
    queryFn: () => fetchWorkExperience(profileId),
  });

export const addWorkExperienceMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: Omit<WorkExperienceData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'> }) =>
    addWorkExperience(profileId, data),
};

export const updateWorkExperienceMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: Partial<WorkExperienceData> }) =>
    updateWorkExperience(profileId, id, data),
};

export const deleteWorkExperienceMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) =>
    deleteWorkExperience(profileId, id),
};

// Skills Query Options - matches Skills table
export const skillsQuery = (profileId: string) =>
  queryOptions({
    queryKey: profileQueryKeys.skills.list(profileId),
    queryFn: () => fetchSkills(profileId),
  });

export const addSkillMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: Omit<SkillsData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'> }) =>
    addSkill(profileId, data),
};

export const updateSkillMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: Partial<SkillsData> }) =>
    updateSkill(profileId, id, data),
};

export const deleteSkillMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) =>
    deleteSkill(profileId, id),
};

// Placeholder query options for other sections
export const educationQuery = (profileId: string) =>
  queryOptions({
    queryKey: profileQueryKeys.education.list(profileId),
    queryFn: () => fetchEducation(profileId),
  });

export const projectsQuery = (profileId: string) =>
  queryOptions({
    queryKey: profileQueryKeys.projects.list(profileId),
    queryFn: () => fetchProjects(profileId),
  });

export const certificationsQuery = (profileId: string) =>
  queryOptions({
    queryKey: profileQueryKeys.certifications.list(profileId),
    queryFn: () => fetchCertifications(profileId),
  });

export const publicationsQuery = (profileId: string) =>
  queryOptions({
    queryKey: profileQueryKeys.publications.list(profileId),
    queryFn: () => fetchPublications(profileId),
  });

export const volunteeringQuery = (profileId: string) =>
  queryOptions({
    queryKey: profileQueryKeys.volunteering.list(profileId),
    queryFn: () => fetchVolunteering(profileId),
  });

export const testScoresQuery = (profileId: string) =>
  queryOptions({
    queryKey: profileQueryKeys.testScores.list(profileId),
    queryFn: () => fetchTestScores(profileId),
  });

// Placeholder mutation options for other sections (to be implemented)
export const addCertificationMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: any }) => 
    Promise.resolve(), // Placeholder
};

export const updateCertificationMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: any }) => 
    Promise.resolve(), // Placeholder
};

export const deleteCertificationMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) => 
    Promise.resolve(), // Placeholder
};

export const addPublicationMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: any }) => 
    Promise.resolve(), // Placeholder
};

export const updatePublicationMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: any }) => 
    Promise.resolve(), // Placeholder
};

export const deletePublicationMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) => 
    Promise.resolve(), // Placeholder
};

// Additional mutation options for other sections
export const addEducationMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: any }) => 
    Promise.resolve(), // Placeholder
};

export const updateEducationMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: any }) => 
    Promise.resolve(), // Placeholder
};

export const deleteEducationMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) => 
    Promise.resolve(), // Placeholder
};

export const addProjectMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: any }) => 
    Promise.resolve(), // Placeholder
};

export const updateProjectMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: any }) => 
    Promise.resolve(), // Placeholder
};

export const deleteProjectMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) => 
    Promise.resolve(), // Placeholder
};

export const addVolunteeringMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: any }) => 
    Promise.resolve(), // Placeholder
};

export const updateVolunteeringMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: any }) => 
    Promise.resolve(), // Placeholder
};

export const deleteVolunteeringMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) => 
    Promise.resolve(), // Placeholder
};

export const addTestScoreMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: any }) => 
    Promise.resolve(), // Placeholder
};

export const updateTestScoreMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: any }) => 
    Promise.resolve(), // Placeholder
};

export const deleteTestScoreMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) => 
    Promise.resolve(), // Placeholder
};