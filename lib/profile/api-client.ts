/**
 * Client-side API functions for profile sections
 * Updated to call Next.js API routes instead of direct mock data
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

const API_BASE = '';

// Helper function to handle API responses
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Personal Details API
export async function fetchPersonalDetails(githubUserName: string): Promise<PersonalDetailsData> {
  const response = await fetch(`${API_BASE}/api/profile/personal-details?githubUserName=${encodeURIComponent(githubUserName)}`);
  return handleApiResponse<PersonalDetailsData>(response);
}

export async function updatePersonalDetails(userId: string, data: Partial<PersonalDetailsData>): Promise<PersonalDetailsData> {
  const response = await fetch(`${API_BASE}/api/profile/personal-details?userId=${encodeURIComponent(userId)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<PersonalDetailsData>(response);
}

// Work Experience API
export async function fetchWorkExperience(profileId: string): Promise<WorkExperienceData[]> {
  const response = await fetch(`${API_BASE}/api/profile/work-experience?profileId=${encodeURIComponent(profileId)}`);
  return handleApiResponse<WorkExperienceData[]>(response);
}

export async function addWorkExperience(profileId: string, data: Omit<WorkExperienceData, 'id' | 'profileId'>): Promise<WorkExperienceData> {
  const response = await fetch(`${API_BASE}/api/profile/work-experience?profileId=${encodeURIComponent(profileId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<WorkExperienceData>(response);
}

export async function updateWorkExperience(profileId: string, id: string, data: Partial<WorkExperienceData>): Promise<WorkExperienceData> {
  const response = await fetch(`${API_BASE}/api/profile/work-experience?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<WorkExperienceData>(response);
}

export async function deleteWorkExperience(profileId: string, id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/api/profile/work-experience?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  await handleApiResponse<void>(response);
}

// Skills API
export async function fetchSkills(profileId: string): Promise<SkillsData[]> {
  const response = await fetch(`${API_BASE}/api/profile/skills?profileId=${encodeURIComponent(profileId)}`);
  return handleApiResponse<SkillsData[]>(response);
}

export async function addSkill(profileId: string, data: Omit<SkillsData, 'id' | 'profileId'>): Promise<SkillsData> {
  const response = await fetch(`${API_BASE}/api/profile/skills?profileId=${encodeURIComponent(profileId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<SkillsData>(response);
}

export async function updateSkill(profileId: string, id: string, data: Partial<SkillsData>): Promise<SkillsData> {
  const response = await fetch(`${API_BASE}/api/profile/skills?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<SkillsData>(response);
}

export async function deleteSkill(profileId: string, id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/api/profile/skills?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  await handleApiResponse<void>(response);
}

// Education API
export async function fetchEducation(profileId: string): Promise<EducationData[]> {
  const response = await fetch(`${API_BASE}/api/profile/education?profileId=${encodeURIComponent(profileId)}`);
  return handleApiResponse<EducationData[]>(response);
}

export async function addEducation(profileId: string, data: Omit<EducationData, 'id' | 'profileId'>): Promise<EducationData> {
  const response = await fetch(`${API_BASE}/api/profile/education?profileId=${encodeURIComponent(profileId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<EducationData>(response);
}

export async function updateEducation(profileId: string, id: string, data: Partial<EducationData>): Promise<EducationData> {
  const response = await fetch(`${API_BASE}/api/profile/education?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<EducationData>(response);
}

export async function deleteEducation(profileId: string, id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/api/profile/education?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  await handleApiResponse<void>(response);
}

// Projects API
export async function fetchProjects(profileId: string): Promise<ProjectsData[]> {
  const response = await fetch(`${API_BASE}/api/profile/projects?profileId=${encodeURIComponent(profileId)}`);
  return handleApiResponse<ProjectsData[]>(response);
}

export async function addProject(profileId: string, data: Omit<ProjectsData, 'id' | 'profileId'>): Promise<ProjectsData> {
  const response = await fetch(`${API_BASE}/api/profile/projects?profileId=${encodeURIComponent(profileId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<ProjectsData>(response);
}

export async function updateProject(profileId: string, id: string, data: Partial<ProjectsData>): Promise<ProjectsData> {
  const response = await fetch(`${API_BASE}/api/profile/projects?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<ProjectsData>(response);
}

export async function deleteProject(profileId: string, id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/api/profile/projects?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  await handleApiResponse<void>(response);
}

// Certifications API
export async function fetchCertifications(profileId: string): Promise<CertificationsData[]> {
  const response = await fetch(`${API_BASE}/api/profile/certifications?profileId=${encodeURIComponent(profileId)}`);
  return handleApiResponse<CertificationsData[]>(response);
}

export async function addCertification(profileId: string, data: Omit<CertificationsData, 'id' | 'profileId'>): Promise<CertificationsData> {
  const response = await fetch(`${API_BASE}/api/profile/certifications?profileId=${encodeURIComponent(profileId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<CertificationsData>(response);
}

export async function updateCertification(profileId: string, id: string, data: Partial<CertificationsData>): Promise<CertificationsData> {
  const response = await fetch(`${API_BASE}/api/profile/certifications?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<CertificationsData>(response);
}

export async function deleteCertification(profileId: string, id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/api/profile/certifications?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  await handleApiResponse<void>(response);
}

// Publications API
export async function fetchPublications(profileId: string): Promise<PublicationsData[]> {
  const response = await fetch(`${API_BASE}/api/profile/publications?profileId=${encodeURIComponent(profileId)}`);
  return handleApiResponse<PublicationsData[]>(response);
}

export async function addPublication(profileId: string, data: Omit<PublicationsData, 'id' | 'profileId'>): Promise<PublicationsData> {
  const response = await fetch(`${API_BASE}/api/profile/publications?profileId=${encodeURIComponent(profileId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<PublicationsData>(response);
}

export async function updatePublication(profileId: string, id: string, data: Partial<PublicationsData>): Promise<PublicationsData> {
  const response = await fetch(`${API_BASE}/api/profile/publications?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<PublicationsData>(response);
}

export async function deletePublication(profileId: string, id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/api/profile/publications?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  await handleApiResponse<void>(response);
}

// Volunteering API
export async function fetchVolunteering(profileId: string): Promise<VolunteeringData[]> {
  const response = await fetch(`${API_BASE}/api/profile/volunteering?profileId=${encodeURIComponent(profileId)}`);
  return handleApiResponse<VolunteeringData[]>(response);
}

export async function addVolunteering(profileId: string, data: Omit<VolunteeringData, 'id' | 'profileId'>): Promise<VolunteeringData> {
  const response = await fetch(`${API_BASE}/api/profile/volunteering?profileId=${encodeURIComponent(profileId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<VolunteeringData>(response);
}

export async function updateVolunteering(profileId: string, id: string, data: Partial<VolunteeringData>): Promise<VolunteeringData> {
  const response = await fetch(`${API_BASE}/api/profile/volunteering?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<VolunteeringData>(response);
}

export async function deleteVolunteering(profileId: string, id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/api/profile/volunteering?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  await handleApiResponse<void>(response);
}

// Test Scores API
export async function fetchTestScores(profileId: string): Promise<TestScoresData[]> {
  const response = await fetch(`${API_BASE}/api/profile/test-scores?profileId=${encodeURIComponent(profileId)}`);
  return handleApiResponse<TestScoresData[]>(response);
}

export async function addTestScore(profileId: string, data: Omit<TestScoresData, 'id' | 'profileId'>): Promise<TestScoresData> {
  const response = await fetch(`${API_BASE}/api/profile/test-scores?profileId=${encodeURIComponent(profileId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<TestScoresData>(response);
}

export async function updateTestScore(profileId: string, id: string, data: Partial<TestScoresData>): Promise<TestScoresData> {
  const response = await fetch(`${API_BASE}/api/profile/test-scores?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleApiResponse<TestScoresData>(response);
}

export async function deleteTestScore(profileId: string, id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/api/profile/test-scores?profileId=${encodeURIComponent(profileId)}&id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  await handleApiResponse<void>(response);
}
