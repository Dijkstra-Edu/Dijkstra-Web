// ResumeBuilder.tsx - Standalone Resume Builder Component
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { UserProfileData } from '@/types/resume';
import ResumeForm from '@/components/Resume and CV/ResumeBuilder/ResumeForm';
import LatexPreview from '@/components/Resume and CV/ResumeBuilder/LatexPreview';
import { ResumeStorageService } from '@/services/ResumeStorageService';
import { useFullUserProfile } from '@/hooks/user/use-user-profile';
import { transformFullUserProfileToResumeData } from '@/lib/user/resume-transformers';

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
  // If using API data, start with empty state; otherwise use initialData
  const [resumeData, setResumeData] = useState<Partial<UserProfileData>>(() => {
    if (useApiData && githubUsername) {
      console.log('🎬 ResumeBuilder: Starting with empty data, will load from API');
      return {};
    }
    console.log('🎬 ResumeBuilder: Starting with initialData:', initialData);
    return initialData;
  });
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // Percentage
  const [isDragging, setIsDragging] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!!resumeId); // Loading if resumeId is provided
  const [previewScale, setPreviewScale] = useState(1); // Scale factor for preview
  const containerRef = React.useRef<HTMLDivElement>(null);
  const previewContainerRef = React.useRef<HTMLDivElement>(null);

  // Fetch user profile data from API if enabled and username provided
  const shouldFetchApiData = useApiData && !!githubUsername;
  
  // Only call the hook when we should fetch API data
  const queryResult = useFullUserProfile(githubUsername || '');
  
  // Extract data only if we should be using API data
  const apiProfileData = shouldFetchApiData ? queryResult.data : undefined;
  const isLoadingApiData = shouldFetchApiData ? queryResult.isLoading : false;
  const apiError = shouldFetchApiData ? queryResult.error : undefined;

  // Transform and load API data when available
  useEffect(() => {
    if (shouldFetchApiData && apiProfileData && !isLoadingApiData) {
      console.log('🔄 Starting API data transformation...');
      console.log('API Profile Data:', apiProfileData);
      
      const transformedData = transformFullUserProfileToResumeData(apiProfileData);
      console.log('✅ Transformed Resume Data:', transformedData);
      console.log('📊 Transformation Summary:', {
        hasUser: !!transformedData.user,
        userName: transformedData.user?.first_name,
        educationCount: Array.isArray(transformedData.education) ? transformedData.education.length : 0,
        experienceCount: Array.isArray(transformedData.experience) ? transformedData.experience.length : 0,
        projectsCount: Array.isArray(transformedData.projects) ? transformedData.projects.length : 0,
        hasLinks: !!transformedData.links
      });
      
      setResumeData(transformedData);
      console.log('✅ Resume data state updated from API for user:', githubUsername);
    }
  }, [apiProfileData, isLoadingApiData, shouldFetchApiData, githubUsername]);

  // Dynamic titles based on document type
  const defaultHeaderTitle = documentType === 'cv' 
    ? "LaTeX CV Builder" 
    : "LaTeX Resume Builder";
  const defaultHeaderSubtitle = documentType === 'cv'
    ? "Professional CV with Real-time Preview"
    : "Professional Resume with Real-time Preview";
  
  const displayHeaderTitle = headerTitle || defaultHeaderTitle;
  const displayHeaderSubtitle = headerSubtitle || defaultHeaderSubtitle;
  
  // Load saved data on mount if resumeId is provided
  useEffect(() => {
    const loadSavedData = async () => {
      if (resumeId) {
        try {
          setIsLoading(true);
          const savedData = await ResumeStorageService.loadResumeData(resumeId);
          if (savedData && savedData.content) {
            setResumeData(savedData.content);
            setLastSaved(new Date());
          }
        } catch (error) {
          console.error('Error loading resume data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadSavedData();
  }, [resumeId]);

  // Auto-save functionality
  useEffect(() => {
    if (!resumeId || !resumeData || Object.keys(resumeData).length === 0) return;

    const saveTimer = setTimeout(() => {
  ResumeStorageService.saveResumeData(
        resumeId,
        resumeData,
        template,
        resumeTitle || 'Untitled Resume',
        documentId || '',
        userEmail || '',
        userName || ''
      );
      setLastSaved(new Date());
    }, 2000); // Save after 2 seconds of inactivity

    return () => clearTimeout(saveTimer);
  }, [resumeData, resumeId, template, resumeTitle, documentId, userEmail, userName]);

  // Calculate preview scale based on container width
  const calculatePreviewScale = useCallback(() => {
    if (!previewContainerRef.current) return;
    
    // Standard resume width (8.5 inches * 96 DPI = 816px)
    const standardResumeWidth = 816;
    const containerWidth = previewContainerRef.current.clientWidth;
    const padding = 48; // 24px padding on each side (p-6 = 1.5rem = 24px)
    const availableWidth = containerWidth - padding;
    
    // Calculate scale to fit the resume in the available width
    const newScale = Math.min(1, availableWidth / standardResumeWidth);
    setPreviewScale(Math.max(0.3, newScale)); // Minimum scale of 30%
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

  // Recalculate scale when left panel width changes
  useEffect(() => {
    const timer = setTimeout(() => {
      calculatePreviewScale();
    }, 100); // Small delay to let the DOM update
    
    return () => clearTimeout(timer);
  }, [leftPanelWidth, calculatePreviewScale]);

  // Manual save function
  const handleManualSave = async () => {
    if (resumeId && resumeData && Object.keys(resumeData).length > 0) {
      setIsSaving(true);
      try {
  await ResumeStorageService.saveResumeData(
          resumeId,
          resumeData,
          template,
          resumeTitle || 'Untitled Resume',
          documentId || '',
          userEmail || '',
          userName || ''
        );
        setLastSaved(new Date());
      } catch (error) {
        console.error('Error saving resume:', error);
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
    
    // Constrain between 20% and 80%
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
              {useApiData && githubUsername && (
                <p className="text-xs text-gray-500 mt-1">
                  Loading data for: <span className="font-medium">{githubUsername}</span>
                </p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {isLoading ? 'Loading resume...' :
                 isLoadingApiData ? 'Fetching profile data...' :
                 isSaving ? 'Saving...' :
                 lastSaved ? `Last saved: ${lastSaved.toLocaleTimeString()}` : 
                 'Auto-save enabled'}
              </div>
              <button
                onClick={handleManualSave}
                disabled={isLoading || isSaving || isLoadingApiData}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Now'}
              </button>
            </div>
          </div>
          {/* API Error Display */}
          {apiError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">
                <strong>Error loading profile data:</strong> {apiError.message}
              </p>
              <p className="text-xs text-red-600 mt-1">
                Using {initialData && Object.keys(initialData).length > 0 ? 'provided initial data' : 'empty data'} instead.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Show loading state while loading saved data or API data */}
      {(isLoading || (shouldFetchApiData && (isLoadingApiData || !resumeData.user))) ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              {isLoadingApiData ? `Loading profile data for ${githubUsername}...` : 'Loading your resume...'}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Two Panel Layout with Resizable Divider */}
      <div className="flex w-full max-w-full overflow-hidden" style={{ height: height }} ref={containerRef}>
        {/* Left Panel - Form - Resizable width */}
        <div 
          className="border-r border-gray-200 bg-gray-50 flex-shrink-0 overflow-hidden"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <div className="bg-white rounded-lg shadow-sm">
                <ResumeForm
                  key={`${resumeId || 'new-resume'}-${resumeData.user?.id || resumeData.user?.github_user_name || 'no-api'}`} // Force re-mount when resume data changes
                  onDataChange={handleDataChange}
                  initialData={resumeData}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resizable Divider */}
        <div
          className={`w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize transition-colors relative group ${
            isDragging ? 'bg-blue-500' : ''
          }`}
          onMouseDown={handleMouseDown}
        >
          {/* Drag handle indicator */}
          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-1 bg-gray-400 group-hover:bg-blue-600 transition-colors"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-12 bg-white border border-gray-300 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex flex-col space-y-0.5">
              <div className="w-0.5 h-4 bg-gray-400"></div>
              <div className="w-0.5 h-4 bg-gray-400"></div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview - Resizable width */}
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


