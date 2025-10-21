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
  deleteTestScore
} from './api-client';
import { profileQueryKeys } from './query-keys';
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

// Education mutation options
export const addEducationMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: Omit<EducationData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'> }) =>
    addEducation(profileId, data),
};

export const updateEducationMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: Partial<EducationData> }) =>
    updateEducation(profileId, id, data),
};

export const deleteEducationMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) =>
    deleteEducation(profileId, id),
};

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
export const addCertificationMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: Omit<CertificationsData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'> }) =>
    addCertification(profileId, data),
};

export const updateCertificationMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: Partial<CertificationsData> }) =>
    updateCertification(profileId, id, data),
};

export const deleteCertificationMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) =>
    deleteCertification(profileId, id),
};

// Publications mutation options
export const addPublicationMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: Omit<PublicationsData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'> }) =>
    addPublication(profileId, data),
};

export const updatePublicationMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: Partial<PublicationsData> }) =>
    updatePublication(profileId, id, data),
};

export const deletePublicationMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) =>
    deletePublication(profileId, id),
};

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
export const addTestScoreMutation = {
  mutationFn: ({ profileId, data }: { profileId: string; data: Omit<TestScoresData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'> }) =>
    addTestScore(profileId, data),
};

export const updateTestScoreMutation = {
  mutationFn: ({ profileId, id, data }: { profileId: string; id: string; data: Partial<TestScoresData> }) =>
    updateTestScore(profileId, id, data),
};

export const deleteTestScoreMutation = {
  mutationFn: ({ profileId, id }: { profileId: string; id: string }) =>
    deleteTestScore(profileId, id),
};