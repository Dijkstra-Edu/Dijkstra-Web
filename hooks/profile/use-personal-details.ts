// Custom hook for personal details

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPersonalDetailsByGithubUsername,
  updatePersonalDetailsByGithubUsername,
} from "@/services/profile/PersonalDetailsService";
import { PersonalDetailsData } from "@/types/client/profile-section/profile-sections";

export const useGetPersonalDetails = (username: string) => {
  return useQuery({
    queryKey: ["personal-details", username],
    queryFn: () => getPersonalDetailsByGithubUsername(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // avoid instant refetch
    gcTime: 1000 * 60 * 30, // keep data cached longer
  });
};

export const useUpdatePersonalDetails = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, data }: { username: string; data: Partial<PersonalDetailsData> }) =>
      updatePersonalDetailsByGithubUsername(username, data),
    onSuccess: () => {
      // Invalidate and refetch work experience data
      queryClient.invalidateQueries({
        queryKey: ["personal-details", username],
      });
    },
  });
};