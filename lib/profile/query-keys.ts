// TanStack Query keys for profile sections

export const profileQueryKeys = {
  all: ['profile'] as const,
  personalDetails: (userId: string) => [...profileQueryKeys.all, 'personal-details', userId] as const,
  workExperience: {
    all: (profileId: string) => [...profileQueryKeys.all, 'work-experience', profileId] as const,
    list: (profileId: string) => [...profileQueryKeys.workExperience.all(profileId), 'list'] as const,
    detail: (profileId: string, id: string) => [...profileQueryKeys.workExperience.all(profileId), 'detail', id] as const,
  },
  skills: {
    all: (profileId: string) => [...profileQueryKeys.all, 'skills', profileId] as const,
    list: (profileId: string) => [...profileQueryKeys.skills.all(profileId), 'list'] as const,
    detail: (profileId: string, id: string) => [...profileQueryKeys.skills.all(profileId), 'detail', id] as const,
  },
  education: {
    all: (profileId: string) => [...profileQueryKeys.all, 'education', profileId] as const,
    list: (profileId: string) => [...profileQueryKeys.education.all(profileId), 'list'] as const,
    detail: (profileId: string, id: string) => [...profileQueryKeys.education.all(profileId), 'detail', id] as const,
  },
  projects: {
    all: (profileId: string) => [...profileQueryKeys.all, 'projects', profileId] as const,
    list: (profileId: string) => [...profileQueryKeys.projects.all(profileId), 'list'] as const,
    detail: (profileId: string, id: string) => [...profileQueryKeys.projects.all(profileId), 'detail', id] as const,
  },
  certifications: {
    all: (profileId: string) => [...profileQueryKeys.all, 'certifications', profileId] as const,
    list: (profileId: string) => [...profileQueryKeys.certifications.all(profileId), 'list'] as const,
    detail: (profileId: string, id: string) => [...profileQueryKeys.certifications.all(profileId), 'detail', id] as const,
  },
  publications: {
    all: (profileId: string) => [...profileQueryKeys.all, 'publications', profileId] as const,
    list: (profileId: string) => [...profileQueryKeys.publications.all(profileId), 'list'] as const,
    detail: (profileId: string, id: string) => [...profileQueryKeys.publications.all(profileId), 'detail', id] as const,
  },
  volunteering: {
    all: (profileId: string) => [...profileQueryKeys.all, 'volunteering', profileId] as const,
    list: (profileId: string) => [...profileQueryKeys.volunteering.all(profileId), 'list'] as const,
    detail: (profileId: string, id: string) => [...profileQueryKeys.volunteering.all(profileId), 'detail', id] as const,
  },
  testScores: {
    all: (profileId: string) => [...profileQueryKeys.all, 'test-scores', profileId] as const,
    list: (profileId: string) => [...profileQueryKeys.testScores.all(profileId), 'list'] as const,
    detail: (profileId: string, id: string) => [...profileQueryKeys.testScores.all(profileId), 'detail', id] as const,
  },
} as const;
