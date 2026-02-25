// Custom hook for volunteering
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getVolunteeringByGithubUsername, addVolunteeringByGithubUsername, updateVolunteeringByVolunteeringId, deleteVolunteeringByVolunteeringId } from "@/services/profile/VolunteeringService";
import { VolunteeringData } from "@/types/client/profile-section/profile-sections";

export const useGetVolunteering = (username: string) => {
  return useQuery({
    queryKey: ["volunteering", username],
    queryFn: () => getVolunteeringByGithubUsername(username), //call service -> Core API -> /api/
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // avoid instant refetch
    gcTime: 1000 * 60 * 30, // keep data cached longer
  });
}

export const useAddVolunteering = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
    }: {
      data: Omit<VolunteeringData, "id" | "createdAt" | "updatedAt">;
    }) => {
      return addVolunteeringByGithubUsername(data); //call service -> Core API -> /api/
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["volunteering", username],
      });
    },
  });
};

export const useUpdateVolunteering = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      volunteeringId,
      data,
    }: {
      volunteeringId: string;
      data: Partial<VolunteeringData>;
    }) => {
      return updateVolunteeringByVolunteeringId(volunteeringId, data); //call service -> Core API -> /api/
    },
    onSuccess: () => {
      // Invalidate and refetch work experience data
      queryClient.invalidateQueries({
        queryKey: ["volunteering", username],
      });
    },
  });
};

export const useDeleteVolunteering = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ volunteeringId }: { volunteeringId: string }) => {
      return deleteVolunteeringByVolunteeringId(volunteeringId); //call service -> Core API -> /api/
    },
    onSuccess: () => {
      // Invalidate and refetch work experience data
      queryClient.invalidateQueries({
        queryKey: ["volunteering", username],
      });
    },
  });
};
