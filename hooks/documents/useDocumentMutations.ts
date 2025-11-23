import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DocumentApiService } from '@/services/DocumentApiService';
import type { UserProfileData } from '@/types/document';
import { documentsQueryKeys } from '@/lib/documents/query-keys';

type CreateVars = {
  github: string;
  latex: string;
  base: Partial<UserProfileData> | undefined;
  name?: string;
  document_type?: string;
  document_kind?: string;
};

type UpdateVars = {
  id: string;
  latex?: string;
  base?: Partial<UserProfileData> | undefined;
  name?: string;
  document_type?: string;
  document_kind?: string;
};

export function useCreateDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vars: CreateVars) =>
      DocumentApiService.createDocument(vars.github, vars.latex, vars.base ?? {}, vars.name, vars.document_type, vars.document_kind),
    onSuccess(data) {
      // Prime single-document cache
      queryClient.setQueryData(documentsQueryKeys.item(data.id), data);
    },
  });
}

export function useUpdateDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vars: UpdateVars) =>
      DocumentApiService.updateDocument(vars.id, vars.latex, vars.base, vars.name, vars.document_type, vars.document_kind),
    onSuccess(data) {
      queryClient.setQueryData(documentsQueryKeys.item(data.id), data);
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: string; github?: string }) => DocumentApiService.deleteDocument(payload.id),
    onSuccess(_, vars) {
      // Remove single item cache
      if (vars?.id) queryClient.removeQueries({ queryKey: documentsQueryKeys.item(vars.id) });
      if (vars?.github) queryClient.invalidateQueries({ queryKey: documentsQueryKeys.list(vars.github) });
    },
  });
}
