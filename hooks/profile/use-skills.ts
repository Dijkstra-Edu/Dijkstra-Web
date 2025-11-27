// Custom hook for skills

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  skillsQuery, 
  addSkillMutation, 
  updateSkillMutation, 
  deleteSkillMutation 
} from '@/lib/profile/query-options';
import { profileQueryKeys } from '@/lib/profile/query-keys';

export function useSkills(profileId: string) {
  return useQuery(skillsQuery(profileId));
}

/* Skills is managed from the Backend, cannot be updated by the user
export function useAddSkill() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...addSkillMutation,
    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.skills.list(profileId) 
      });
    },
  });
}

export function useUpdateSkill() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...updateSkillMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.all 
      });
    },
  });
}

export function useDeleteSkill() {
  const queryClient = useQueryClient();
  
  return useMutation({
    ...deleteSkillMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: profileQueryKeys.all 
      });
    },
  });
}
*/
