// Custom hook for work experience

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWorkExperienceByGithubUsername,
  addWorkExperienceByGithubUsername,
  updateWorkExperienceByWorkExperienceId,
  deleteWorkExperienceByWorkExperienceId,
} from "@/services/profile/WorkExperienceService";
import { WorkExperienceData } from "@/types/client/profile-section/profile-sections";

export const useGetWorkExperience = (username: string) => {
  return useQuery({
    queryKey: ["work-experience", username],
    queryFn: () => getWorkExperienceByGithubUsername(username), //call service -> Core API -> /api/
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // avoid instant refetch
    gcTime: 1000 * 60 * 30, // keep data cached longer
  });
}

export const useAddWorkExperienceMutation = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
    }: {
      data: Omit<WorkExperienceData, "id" | "createdAt" | "updatedAt">;
    }) => {
      return addWorkExperienceByGithubUsername(data); //call service -> Core API -> /api/
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["work-experience", username],
      });
    },
  });
};

export const useUpdateWorkExperienceMutation = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workExperienceId,
      data,
    }: {
      workExperienceId: string;
      data: Partial<WorkExperienceData>;
    }) => {
      return updateWorkExperienceByWorkExperienceId(workExperienceId, data); //call service -> Core API -> /api/
    },
    onSuccess: () => {
      // Invalidate and refetch work experience data
      queryClient.invalidateQueries({
        queryKey: ["work-experience", username],
      });
    },
  });
};

export const useDeleteWorkExperienceMutation = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workExperienceId }: { workExperienceId: string }) => {
      return deleteWorkExperienceByWorkExperienceId(workExperienceId); //call service -> Core API -> /api/
    },
    onSuccess: () => {
      // Invalidate and refetch work experience data
      queryClient.invalidateQueries({
        queryKey: ["work-experience", username],
      });
    },
  });
};
