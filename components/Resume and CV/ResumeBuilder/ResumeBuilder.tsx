// ResumeBuilder.tsx - Standalone Resume Builder Component
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { UserProfileData } from '@/types/resume';
import ResumeForm from '@/components/Resume and CV/ResumeBuilder/ResumeForm';
import LatexPreview from '@/components/Resume and CV/ResumeBuilder/LatexPreview';
import { ResumeStorageService } from '@/services/ResumeStorageService';
import { DocumentApiService } from '@/services/DocumentApiService';
import { generateDeedyLatex, generateRowBasedLatex } from '@/lib/latex-generator';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { DocumentCreateResponse } from '@/services/DocumentApiService';
import { userProfileData } from '@/data/mockResumeData';

interface ResumeBuilderProps {
  initialData?: Partial<UserProfileData>;
  onDataChange?: (data: Partial<UserProfileData>) => void;
  className?: string;
  height?: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
  template?: 'deedy' | 'row-based';
  documentType?: 'resume' | 'cv';
  resumeId?: string;
  resumeTitle?: string;
  documentId?: string;
  userEmail?: string;
  userName?: string;
  githubUsername?: string; // NEW: GitHub username to fetch profile data
  useApiData?: boolean; // NEW: Flag to enable API data fetching (default: false for backward compatibility)
}

export default function ResumeBuilder({
  initialData = {},
  onDataChange,
  className = "",
  height = "calc(100vh - 80px)",
  showHeader = true,
  headerTitle,
  headerSubtitle,
  template = 'deedy',
  documentType = 'resume',
  resumeId,
  resumeTitle,
  documentId,
  userEmail,
  userName,
  githubUsername,
  useApiData = false,
}: ResumeBuilderProps) {
  const [resumeData, setResumeData] = useState<Partial<UserProfileData>>(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      return initialData;
    }
    if (useApiData && githubUsername) {
      return {};
    }
    return initialData;
  });
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!!resumeId);
  const [previewScale, setPreviewScale] = useState(1);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [documentApiId, setDocumentApiId] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState<string>(resumeTitle || '');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const previewContainerRef = React.useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const lastSavedStringRef = React.useRef<string | null>(null);

  // Keep documentName in sync with resumeTitle when no server document exists yet
  useEffect(() => {
    if (!documentApiId) {
      setDocumentName(resumeTitle || '');
    }
  }, [resumeTitle, documentApiId]);

  // Initialize documentApiId from incoming prop only when initialData is
  // present. This avoids treating a new resume as an existing server
  // document when the prop is present but no server data was loaded.
  useEffect(() => {
    if (documentId && initialData && Object.keys(initialData).length > 0) {
      setDocumentApiId(documentId);
    }
  }, [documentId, initialData]);

  useEffect(() => {
    if (useApiData && Object.keys(resumeData).length === 0) {
      setResumeData(userProfileData);
    }
  }, [useApiData, resumeData]);

  const defaultHeaderTitle = documentType === 'cv' 
    ? "LaTeX CV Builder" 
    : "LaTeX Resume Builder";
  const defaultHeaderSubtitle = documentType === 'cv'
    ? "Professional CV with Real-time Preview"
    : "Professional Resume with Real-time Preview";
  
  const displayHeaderTitle = headerTitle || defaultHeaderTitle;
  const displayHeaderSubtitle = headerSubtitle || defaultHeaderSubtitle;
  
  // Mutations for create / update using TanStack Query
  const createMutation = useMutation({
    mutationFn: (payload: { github: string; latex: string; base: Partial<UserProfileData>; name?: string; document_type?: string; document_kind?: string }) =>
      DocumentApiService.createDocument(payload.github, payload.latex, payload.base, payload.name, payload.document_type, payload.document_kind),
    onSuccess(data) {
      setDocumentApiId(data.id);
      if (data?.document_name) setDocumentName(data.document_name);
      queryClient.setQueryData(['document', data.id], data);
    },
    onError(err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create document';
      setSaveError(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: { id: string; latex: string; base: Partial<UserProfileData>; name?: string; document_type?: string; document_kind?: string }) =>
      DocumentApiService.updateDocument(payload.id, payload.latex, payload.base, payload.name, payload.document_type, payload.document_kind),
    onSuccess(data) {
      if (data?.document_name) setDocumentName(data.document_name);
      queryClient.setQueryData(['document', data.id], data);
    },
    onError(err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update document';
      setSaveError(message);
    },
  });

  // Load saved localStorage data (if present) when opening an existing resume
  useEffect(() => {
    const loadSavedData = async () => {
      if (resumeId) {
        try {
          setIsLoading(true);
          const savedData = await ResumeStorageService.loadResumeData(resumeId);
          if (savedData && savedData.content) {
            setResumeData(savedData.content);
            setLastSaved(new Date());
            // restore documentType if present in local storage
            // (the parent may override via props)
          }
        } catch {
          // ignore
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadSavedData();
  }, [resumeId]);

  // Auto-save effect: only call server if data changed since last save
  useEffect(() => {
    if (!resumeId || !resumeData || Object.keys(resumeData).length === 0) return;

    const saveTimer = setTimeout(async () => {
      // Only proceed if data actually changed since last save
      let currentString: string | null = null;
      try {
        currentString = JSON.stringify(resumeData || {});
      } catch {
        currentString = null;
      }

      if (currentString && lastSavedStringRef.current === currentString) {
        // No changes since last save — skip server update
        return;
      }

      // Save to localStorage
      ResumeStorageService.saveResumeData(
        resumeId,
        resumeData,
        template,
        resumeTitle || 'Untitled Resume',
        documentId || '',
        userEmail || '',
        userName || '',
        documentType
      );

      if (githubUsername) {
        try {
          const latex = template === 'deedy' ? generateDeedyLatex(resumeData) : generateRowBasedLatex(resumeData);
          const apiDocumentType = template === 'row-based' ? 'row' : 'deedy';
          const apiDocumentKind = documentType === 'cv' ? 'cv' : 'resume';
          if (documentApiId) {
            await updateMutation.mutateAsync({ id: documentApiId, latex, base: resumeData, name: documentName, document_type: apiDocumentType, document_kind: apiDocumentKind });
          } else {
            const validation = DocumentApiService.validateDocumentData(githubUsername, latex, resumeData);
            if (!validation.isValid) {
              setSaveError(validation.errors.join(', '));
            } else {
              const resp = await createMutation.mutateAsync({ github: githubUsername, latex, base: resumeData, name: documentName || resumeTitle || 'Untitled Resume', document_type: apiDocumentType, document_kind: apiDocumentKind });
              setDocumentApiId((resp as DocumentCreateResponse).id);
            }
          }

          // On success update lastSaved snapshot
          lastSavedStringRef.current = currentString;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Auto-save failed';
          setSaveError(errorMessage);
        }
      }

      setLastSaved(new Date());
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [resumeData, resumeId, template, resumeTitle, documentId, userEmail, userName, githubUsername, documentApiId, documentName, queryClient, createMutation, updateMutation, documentType]);

  const calculatePreviewScale = useCallback(() => {
    if (!previewContainerRef.current) return;
    
    const standardResumeWidth = 816;
    const containerWidth = previewContainerRef.current.clientWidth;
    const padding = 48;
    const availableWidth = containerWidth - padding;
    
    const newScale = Math.min(1, availableWidth / standardResumeWidth);
    setPreviewScale(Math.max(0.3, newScale));
  }, []);

  // Update scale when container resizes
  useEffect(() => {
    calculatePreviewScale();
    
    const resizeObserver = new ResizeObserver(() => {
      calculatePreviewScale();
    });
    
    if (previewContainerRef.current) {
      resizeObserver.observe(previewContainerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [calculatePreviewScale]);

  useEffect(() => {
    const timer = setTimeout(() => {
      calculatePreviewScale();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [leftPanelWidth, calculatePreviewScale]);

  const handleManualSave = async () => {
    if (resumeId && resumeData && Object.keys(resumeData).length > 0) {
      setIsSaving(true);
      setSaveError(null);
      try {
        // Save to localStorage
        await ResumeStorageService.saveResumeData(
          resumeId,
          resumeData,
          template,
          resumeTitle || 'Untitled Resume',
          documentId || '',
          userEmail || '',
          userName || '',
          documentType
        );
        
        // Save to API if GitHub username is available
        if (githubUsername) {
          try {
            const latex = template === 'deedy' ? generateDeedyLatex(resumeData) : generateRowBasedLatex(resumeData);
            const apiDocumentType = template === 'row-based' ? 'row' : 'deedy';
            const apiDocumentKind = documentType === 'cv' ? 'cv' : 'resume';
            if (documentApiId) {
              await updateMutation.mutateAsync({ id: documentApiId, latex, base: resumeData, name: documentName, document_type: apiDocumentType, document_kind: apiDocumentKind });
            } else {
              const validation = DocumentApiService.validateDocumentData(githubUsername, latex, resumeData);
              if (!validation.isValid) {
                setSaveError(validation.errors.join(', '));
              } else {
                const resp = await createMutation.mutateAsync({ github: githubUsername, latex, base: resumeData, name: documentName || resumeTitle || 'Untitled Resume', document_type: apiDocumentType, document_kind: apiDocumentKind });
                setDocumentApiId((resp as DocumentCreateResponse).id);
              }
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to save';
            setSaveError(errorMessage);
          }
        }
        
        setLastSaved(new Date());
        try {
          lastSavedStringRef.current = JSON.stringify(resumeData || {});
        } catch {}
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to save';
        setSaveError(errorMessage);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleDataChange = useCallback((data: Partial<UserProfileData>) => {
    setResumeData(data);
    onDataChange?.(data);
  }, [onDataChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const containerWidth = rect.width;
    const newLeftWidth = ((e.clientX - rect.left) / containerWidth) * 100;
    
    const constrainedWidth = Math.min(80, Math.max(20, newLeftWidth));
    setLeftPanelWidth(constrainedWidth);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      {showHeader && (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{displayHeaderTitle}</h1>
              <p className="text-sm text-gray-600">{displayHeaderSubtitle}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-500">
                  {isLoading ? 'Loading resume...' :
                   isSaving ? 'Saving...' :
                   lastSaved ? `Last saved: ${lastSaved.toLocaleTimeString()}` : 
                   'Auto-save enabled'}
                </div>
                {saveError && (
                  <div className="text-xs text-red-600 mt-1">
                    Error: {saveError}
                  </div>
                )}
                {documentApiId && (
                  <div className="text-xs text-green-600 mt-1">
                    Synced to server
                  </div>
                )}
              </div>
              <button
                onClick={handleManualSave}
                disabled={isLoading || isSaving || !githubUsername}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                title={!githubUsername ? 'GitHub username required to save' : ''}
              >
                {isSaving ? 'Saving...' : 'Save Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your resume...</p>
          </div>
        </div>
      ) : (
        <>
      <div className="flex w-full max-w-full overflow-hidden" style={{ height: height }} ref={containerRef}>
        <div 
          className="border-r border-gray-200 bg-gray-50 flex-shrink-0 overflow-hidden"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <div className="bg-white rounded-lg shadow-sm">
                <ResumeForm
                  key={`${resumeId || 'new-resume'}-${resumeData.user?.id || resumeData.user?.github_user_name || 'no-api'}`}
                  onDataChange={handleDataChange}
                  initialData={resumeData}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize transition-colors relative group ${
            isDragging ? 'bg-blue-500' : ''
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-1 bg-gray-400 group-hover:bg-blue-600 transition-colors"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-12 bg-white border border-gray-300 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex flex-col space-y-0.5">
              <div className="w-0.5 h-4 bg-gray-400"></div>
              <div className="w-0.5 h-4 bg-gray-400"></div>
            </div>
          </div>
        </div>

        <div 
          className="bg-white flex-shrink-0 overflow-hidden"
          style={{ width: `${100 - leftPanelWidth}%` }}
          ref={previewContainerRef}
        >
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <LatexPreview
                data={resumeData}
                template={template}
                scale={previewScale}
              />
            </div>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
}


