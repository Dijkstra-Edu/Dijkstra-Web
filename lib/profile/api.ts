// API functions for profile sections - Updated to match database schema

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
  ApiResponse,
  CreateMutationData,
  UpdateMutationData,
  DeleteMutationData
} from '@/types/client/profile-section/profile-sections';
import { mockProfileData } from '@/data/mock-profile-data';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

// Helper function to handle API responses
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Personal Details API - matches User table
export async function fetchPersonalDetails(userId: string): Promise<PersonalDetailsData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data for development
  return Promise.resolve(mockProfileData.personalDetails);
}

export async function updatePersonalDetails(userId: string, data: Partial<PersonalDetailsData>): Promise<PersonalDetailsData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return updated mock data
  const updatedData = {
    ...mockProfileData.personalDetails,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  return Promise.resolve(updatedData);
}

// Work Experience API - matches WorkExperience table
export async function fetchWorkExperience(profileId: string): Promise<WorkExperienceData[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Return mock data for development
  return Promise.resolve(mockProfileData.workExperience);
}

export async function addWorkExperience(profileId: string, data: Omit<WorkExperienceData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>): Promise<WorkExperienceData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Create new work experience entry
  const newExperience: WorkExperienceData = {
    ...data,
    id: `we_${Date.now()}`,
    profileId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return Promise.resolve(newExperience);
}

export async function updateWorkExperience(profileId: string, id: string, data: Partial<WorkExperienceData>): Promise<WorkExperienceData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find and update the work experience entry
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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find the work experience entry
  const existingExperience = mockProfileData.workExperience.find(exp => exp.id === id);
  if (!existingExperience) {
    throw new Error('Work experience not found');
  }
  
  // Simulate deletion
  return Promise.resolve();
}

// Skills API - matches Skills table
export async function fetchSkills(profileId: string): Promise<SkillsData[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Return mock data for development
  return Promise.resolve(mockProfileData.skills);
}

export async function addSkill(profileId: string, data: Omit<SkillsData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>): Promise<SkillsData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Create new skill entry
  const newSkill: SkillsData = {
    ...data,
    id: `skill_${Date.now()}`,
    profileId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return Promise.resolve(newSkill);
}

export async function updateSkill(profileId: string, id: string, data: Partial<SkillsData>): Promise<SkillsData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find and update the skill entry
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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find the skill entry
  const existingSkill = mockProfileData.skills.find(skill => skill.id === id);
  if (!existingSkill) {
    throw new Error('Skill not found');
  }
  
  // Simulate deletion
  return Promise.resolve();
}

// Education API - matches Education table
export async function fetchEducation(profileId: string): Promise<EducationData[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Return mock data for development
  return Promise.resolve(mockProfileData.education);
}

export async function addEducation(profileId: string, data: Omit<EducationData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>): Promise<EducationData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Create new education entry
  const newEducation: EducationData = {
    ...data,
    id: `edu_${Date.now()}`,
    profileId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return Promise.resolve(newEducation);
}

export async function updateEducation(profileId: string, id: string, data: Partial<EducationData>): Promise<EducationData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find and update the education entry
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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find the education entry
  const existingEducation = mockProfileData.education.find(edu => edu.id === id);
  if (!existingEducation) {
    throw new Error('Education not found');
  }
  
  // Simulate deletion
  return Promise.resolve();
}

// Projects API - matches Projects table
export async function fetchProjects(profileId: string): Promise<ProjectsData[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Return mock data for development
  return Promise.resolve(mockProfileData.projects);
}

export async function addProject(profileId: string, data: Omit<ProjectsData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>): Promise<ProjectsData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Create new project entry
  const newProject: ProjectsData = {
    ...data,
    id: `proj_${Date.now()}`,
    profileId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return Promise.resolve(newProject);
}

export async function updateProject(profileId: string, id: string, data: Partial<ProjectsData>): Promise<ProjectsData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find and update the project entry
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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find the project entry
  const existingProject = mockProfileData.projects.find(proj => proj.id === id);
  if (!existingProject) {
    throw new Error('Project not found');
  }
  
  // Simulate deletion
  return Promise.resolve();
}

// Certifications API - matches Certifications table
export async function fetchCertifications(profileId: string): Promise<CertificationsData[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Return mock data for development
  return Promise.resolve(mockProfileData.certifications);
}

export async function addCertification(profileId: string, data: Omit<CertificationsData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>): Promise<CertificationsData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Create new certification entry
  const newCertification: CertificationsData = {
    ...data,
    id: `cert_${Date.now()}`,
    profileId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return Promise.resolve(newCertification);
}

export async function updateCertification(profileId: string, id: string, data: Partial<CertificationsData>): Promise<CertificationsData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find and update the certification entry
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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find the certification entry
  const existingCertification = mockProfileData.certifications.find(cert => cert.id === id);
  if (!existingCertification) {
    throw new Error('Certification not found');
  }
  
  // Simulate deletion
  return Promise.resolve();
}

// Publications API - matches Publications table
export async function fetchPublications(profileId: string): Promise<PublicationsData[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Return mock data for development
  return Promise.resolve(mockProfileData.publications);
}

export async function addPublication(profileId: string, data: Omit<PublicationsData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>): Promise<PublicationsData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Create new publication entry
  const newPublication: PublicationsData = {
    ...data,
    id: `pub_${Date.now()}`,
    profileId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return Promise.resolve(newPublication);
}

export async function updatePublication(profileId: string, id: string, data: Partial<PublicationsData>): Promise<PublicationsData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find and update the publication entry
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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find the publication entry
  const existingPublication = mockProfileData.publications.find(pub => pub.id === id);
  if (!existingPublication) {
    throw new Error('Publication not found');
  }
  
  // Simulate deletion
  return Promise.resolve();
}

// Volunteering API - matches Volunteering table
export async function fetchVolunteering(profileId: string): Promise<VolunteeringData[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Return mock data for development
  return Promise.resolve(mockProfileData.volunteering);
}

export async function addVolunteering(profileId: string, data: Omit<VolunteeringData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>): Promise<VolunteeringData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Create new volunteering entry
  const newVolunteering: VolunteeringData = {
    ...data,
    id: `vol_${Date.now()}`,
    profileId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return Promise.resolve(newVolunteering);
}

export async function updateVolunteering(profileId: string, id: string, data: Partial<VolunteeringData>): Promise<VolunteeringData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find and update the volunteering entry
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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find the volunteering entry
  const existingVolunteering = mockProfileData.volunteering.find(vol => vol.id === id);
  if (!existingVolunteering) {
    throw new Error('Volunteering not found');
  }
  
  // Simulate deletion
  return Promise.resolve();
}

// Test Scores API - matches TestScores table
export async function fetchTestScores(profileId: string): Promise<TestScoresData[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Return mock data for development
  return Promise.resolve(mockProfileData.testScores);
}

export async function addTestScore(profileId: string, data: Omit<TestScoresData, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>): Promise<TestScoresData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Create new test score entry
  const newTestScore: TestScoresData = {
    ...data,
    id: `test_${Date.now()}`,
    profileId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  return Promise.resolve(newTestScore);
}

export async function updateTestScore(profileId: string, id: string, data: Partial<TestScoresData>): Promise<TestScoresData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find and update the test score entry
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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find the test score entry
  const existingTestScore = mockProfileData.testScores.find(test => test.id === id);
  if (!existingTestScore) {
    throw new Error('Test score not found');
  }
  
  // Simulate deletion
  return Promise.resolve();
}
