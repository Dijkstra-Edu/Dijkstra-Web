import { useQuery } from '@tanstack/react-query';
import { DocumentApiService } from '@/services/DocumentApiService';
import { documentsQueryKeys } from '@/lib/documents/query-keys';

export function useDocuments(githubUsername?: string) {
  return useQuery({
    queryKey: documentsQueryKeys.list(githubUsername ?? ''),
    queryFn: () => DocumentApiService.getDocumentsByUser(githubUsername ?? ''),
    enabled: !!githubUsername,
    retry: false,
  });
}

export function useDocument(documentId?: string) {
  return useQuery({
    queryKey: documentId ? documentsQueryKeys.item(documentId) : ['document', 'none'],
    queryFn: () => (documentId ? DocumentApiService.getDocumentById(documentId) : Promise.reject(new Error('No document id'))),
    enabled: !!documentId,
    retry: false,
  });
}

export default useDocuments;
