/**
 * Server-side profile mock data providers
 * Moved from lib/profile/api.ts to be server-only
 */

import type { 
  PersonalDetailsData, 
  WorkExperienceData, 
  SkillsData,
  EducationData,
  ProjectsData,
  CertificationsData,
  PublicationsData,
  VolunteeringData,
  TestScoresData,
} from '@/types/client/profile-section/profile-sections';
import { mockProfileData } from '@/data/mock-profile-data';

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Personal Details API - matches User table
export async function fetchPersonalDetails(userId: string): Promise<PersonalDetailsData> {
  await delay(500);
  return Promise.resolve(mockProfileData.personalDetails);
}

export async function updatePersonalDetails(userId: string, data: Partial<PersonalDetailsData>): Promise<PersonalDetailsData> {
  await delay(300);
  const updatedData = {
    ...mockProfileData.personalDetails,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return Promise.resolve(updatedData);
}

// Work Experience API - matches WorkExperience table
export async function fetchWorkExperience(profileId: string): Promise<WorkExperienceData[]> {
  await delay(400);
  return Promise.resolve(mockProfileData.workExperience);
}

export async function addWorkExperience(profileId: string, data: Omit<WorkExperienceData, 'id' | 'profileId'>): Promise<WorkExperienceData> {
  await delay(300);
  const newExperience: WorkExperienceData = {
    ...data,
    id: `we_${Date.now()}`,
    profileId,
  };
  return Promise.resolve(newExperience);
}

export async function updateWorkExperience(profileId: string, id: string, data: Partial<WorkExperienceData>): Promise<WorkExperienceData> {
  await delay(300);
  const existingExperience = mockProfileData.workExperience.find(exp => exp.id === id);
  if (!existingExperience) {
    throw new Error('Work experience not found');
  }
  const updatedExperience = {
    ...existingExperience,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return Promise.resolve(updatedExperience);
}

export async function deleteWorkExperience(profileId: string, id: string): Promise<void> {
  await delay(300);
  const existingExperience = mockProfileData.workExperience.find(exp => exp.id === id);
  if (!existingExperience) {
    throw new Error('Work experience not found');
  }
  return Promise.resolve();
}

// Skills API - matches Skills table
export async function fetchSkills(profileId: string): Promise<SkillsData[]> {
  await delay(400);
  return Promise.resolve(mockProfileData.skills);
}

export async function addSkill(profileId: string, data: Omit<SkillsData, 'id' | 'profileId'>): Promise<SkillsData> {
  await delay(300);
  const newSkill: SkillsData = {
    ...data,
    id: `skill_${Date.now()}`,
    profileId,
  };
  return Promise.resolve(newSkill);
}

export async function updateSkill(profileId: string, id: string, data: Partial<SkillsData>): Promise<SkillsData> {
  await delay(300);
  const existingSkill = mockProfileData.skills.find(skill => skill.id === id);
  if (!existingSkill) {
    throw new Error('Skill not found');
  }
  const updatedSkill = {
    ...existingSkill,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return Promise.resolve(updatedSkill);
}

export async function deleteSkill(profileId: string, id: string): Promise<void> {
  await delay(300);
  const existingSkill = mockProfileData.skills.find(skill => skill.id === id);
  if (!existingSkill) {
    throw new Error('Skill not found');
  }
  return Promise.resolve();
}

// Education API - matches Education table
export async function fetchEducation(profileId: string): Promise<EducationData[]> {
  await delay(400);
  return Promise.resolve(mockProfileData.education);
}

export async function addEducation(profileId: string, data: Omit<EducationData, 'id' | 'profileId'>): Promise<EducationData> {
  await delay(300);
  const newEducation: EducationData = {
    ...data,
    id: `edu_${Date.now()}`,
    profileId,
  };
  return Promise.resolve(newEducation);
}

export async function updateEducation(profileId: string, id: string, data: Partial<EducationData>): Promise<EducationData> {
  await delay(300);
  const existingEducation = mockProfileData.education.find(edu => edu.id === id);
  if (!existingEducation) {
    throw new Error('Education not found');
  }
  const updatedEducation = {
    ...existingEducation,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return Promise.resolve(updatedEducation);
}

export async function deleteEducation(profileId: string, id: string): Promise<void> {
  await delay(300);
  const existingEducation = mockProfileData.education.find(edu => edu.id === id);
  if (!existingEducation) {
    throw new Error('Education not found');
  }
  return Promise.resolve();
}

// Projects API - matches Projects table
export async function fetchProjects(profileId: string): Promise<ProjectsData[]> {
  await delay(400);
  return Promise.resolve(mockProfileData.projects);
}

export async function addProject(profileId: string, data: Omit<ProjectsData, 'id' | 'profileId'>): Promise<ProjectsData> {
  await delay(300);
  const newProject: ProjectsData = {
    ...data,
    id: `proj_${Date.now()}`,
    profileId,
  };
  return Promise.resolve(newProject);
}

export async function updateProject(profileId: string, id: string, data: Partial<ProjectsData>): Promise<ProjectsData> {
  await delay(300);
  const existingProject = mockProfileData.projects.find(proj => proj.id === id);
  if (!existingProject) {
    throw new Error('Project not found');
  }
  const updatedProject = {
    ...existingProject,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return Promise.resolve(updatedProject);
}

export async function deleteProject(profileId: string, id: string): Promise<void> {
  await delay(300);
  const existingProject = mockProfileData.projects.find(proj => proj.id === id);
  if (!existingProject) {
    throw new Error('Project not found');
  }
  return Promise.resolve();
}

// Certifications API - matches Certifications table
export async function fetchCertifications(profileId: string): Promise<CertificationsData[]> {
  await delay(400);
  return Promise.resolve(mockProfileData.certifications);
}

export async function addCertification(profileId: string, data: Omit<CertificationsData, 'id' | 'profileId'>): Promise<CertificationsData> {
  await delay(300);
  const newCertification: CertificationsData = {
    ...data,
    id: `cert_${Date.now()}`,
    profileId,
  };
  return Promise.resolve(newCertification);
}

export async function updateCertification(profileId: string, id: string, data: Partial<CertificationsData>): Promise<CertificationsData> {
  await delay(300);
  const existingCertification = mockProfileData.certifications.find(cert => cert.id === id);
  if (!existingCertification) {
    throw new Error('Certification not found');
  }
  const updatedCertification = {
    ...existingCertification,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return Promise.resolve(updatedCertification);
}

export async function deleteCertification(profileId: string, id: string): Promise<void> {
  await delay(300);
  const existingCertification = mockProfileData.certifications.find(cert => cert.id === id);
  if (!existingCertification) {
    throw new Error('Certification not found');
  }
  return Promise.resolve();
}

// Publications API - matches Publications table
export async function fetchPublications(profileId: string): Promise<PublicationsData[]> {
  await delay(400);
  return Promise.resolve(mockProfileData.publications);
}

export async function addPublication(profileId: string, data: Omit<PublicationsData, 'id' | 'profileId'>): Promise<PublicationsData> {
  await delay(300);
  const newPublication: PublicationsData = {
    ...data,
    id: `pub_${Date.now()}`,
    profileId,
  };
  return Promise.resolve(newPublication);
}

export async function updatePublication(profileId: string, id: string, data: Partial<PublicationsData>): Promise<PublicationsData> {
  await delay(300);
  const existingPublication = mockProfileData.publications.find(pub => pub.id === id);
  if (!existingPublication) {
    throw new Error('Publication not found');
  }
  const updatedPublication = {
    ...existingPublication,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return Promise.resolve(updatedPublication);
}

export async function deletePublication(profileId: string, id: string): Promise<void> {
  await delay(300);
  const existingPublication = mockProfileData.publications.find(pub => pub.id === id);
  if (!existingPublication) {
    throw new Error('Publication not found');
  }
  return Promise.resolve();
}

// Volunteering API - matches Volunteering table
export async function fetchVolunteering(profileId: string): Promise<VolunteeringData[]> {
  await delay(400);
  return Promise.resolve(mockProfileData.volunteering);
}

export async function addVolunteering(profileId: string, data: Omit<VolunteeringData, 'id' | 'profileId'>): Promise<VolunteeringData> {
  await delay(300);
  const newVolunteering: VolunteeringData = {
    ...data,
    id: `vol_${Date.now()}`,
    profileId,
  };
  return Promise.resolve(newVolunteering);
}

export async function updateVolunteering(profileId: string, id: string, data: Partial<VolunteeringData>): Promise<VolunteeringData> {
  await delay(300);
  const existingVolunteering = mockProfileData.volunteering.find(vol => vol.id === id);
  if (!existingVolunteering) {
    throw new Error('Volunteering not found');
  }
  const updatedVolunteering = {
    ...existingVolunteering,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return Promise.resolve(updatedVolunteering);
}

export async function deleteVolunteering(profileId: string, id: string): Promise<void> {
  await delay(300);
  const existingVolunteering = mockProfileData.volunteering.find(vol => vol.id === id);
  if (!existingVolunteering) {
    throw new Error('Volunteering not found');
  }
  return Promise.resolve();
}

// Test Scores API - matches TestScores table
export async function fetchTestScores(profileId: string): Promise<TestScoresData[]> {
  await delay(400);
  return Promise.resolve(mockProfileData.testScores);
}

export async function addTestScore(profileId: string, data: Omit<TestScoresData, 'id' | 'profileId'>): Promise<TestScoresData> {
  await delay(300);
  const newTestScore: TestScoresData = {
    ...data,
    id: `test_${Date.now()}`,
    profileId,
  };
  return Promise.resolve(newTestScore);
}

export async function updateTestScore(profileId: string, id: string, data: Partial<TestScoresData>): Promise<TestScoresData> {
  await delay(300);
  const existingTestScore = mockProfileData.testScores.find(test => test.id === id);
  if (!existingTestScore) {
    throw new Error('Test score not found');
  }
  const updatedTestScore = {
    ...existingTestScore,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return Promise.resolve(updatedTestScore);
}

export async function deleteTestScore(profileId: string, id: string): Promise<void> {
  await delay(300);
  const existingTestScore = mockProfileData.testScores.find(test => test.id === id);
  if (!existingTestScore) {
    throw new Error('Test score not found');
  }
  return Promise.resolve();
}
