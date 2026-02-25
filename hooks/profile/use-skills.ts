// Custom hook for skills

import { useQuery } from '@tanstack/react-query';
import { getSkillsByGithubUsername } from '@/services/profile/SkillsService';

export const useGetSkills = (username: string) => {
  return useQuery({
    queryKey: ["skills", username],
    queryFn: () => getSkillsByGithubUsername(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // avoid instant refetch
    gcTime: 1000 * 60 * 30, // keep data cached longer
  });
};