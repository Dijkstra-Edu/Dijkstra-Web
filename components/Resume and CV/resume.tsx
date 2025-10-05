"use client";

import { useState, useEffect } from "react";
import { FileText, FileImage, BarChart3, Video } from "lucide-react";
import { ResourceSection } from "@/components/Resume and CV/resource-section";
import { StackedProjectsTable } from "@/components/Resume and CV/stacked-projects-table";
import AddResumeModal from "./AddResumeModal";
import ResumeBuilder from "@/components/Resume and CV/ResumeBuilder/ResumeBuilder";
import { ResumeDataService } from "@/app/services/ResumeDataService";
import { SavedResumeData } from "@/types/resume";

interface ResumeData {
  title: string;
  resumeId: string;
  userEmail: string;
  userName: string;
  documentId: string;
}

// Placeholder component for the new resume builder
const ResumeBuilderWrapper = ({ 
  resumeData, 
  onBack, 
  template = 'deedy',
  documentType = 'resume'
}: { 
  resumeData: ResumeData; 
  onBack: () => void; 
  template?: 'deedy' | 'row-based';
  documentType?: 'resume' | 'cv';
}) => {
  const isCV = documentType === 'cv';
  const docTypeLabel = isCV ? 'CV' : 'Resume';
  const templateTitle = template === 'row-based' ? 
    `Row-based ${docTypeLabel} Builder` : 
    `Column ${docTypeLabel} Builder`;
  const templateSubtitle = template === 'row-based' ? 
    `Row-based ${docTypeLabel}` : 
    `Column ${docTypeLabel}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Editing: {resumeData.title}</h1>
              <p className="text-sm text-muted-foreground">{templateSubtitle}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resume Builder Component */}
      <ResumeBuilder 
        showHeader={false}
        height="calc(100vh - 80px)"
        className=""
        template={template}
        documentType={documentType}
        headerTitle={templateTitle}
        headerSubtitle={templateSubtitle}
        resumeId={resumeData.resumeId}
        resumeTitle={resumeData.title}
        documentId={resumeData.documentId}
        userEmail={resumeData.userEmail}
        userName={resumeData.userName}
      />
    </div>
  );
};

const Resume = ({ onResumeBuildingModeChange }: { onResumeBuildingModeChange?: (isBuilding: boolean) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResumeData, setCurrentResumeData] = useState<ResumeData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<'deedy' | 'row-based'>('deedy');
  const [currentDocumentType, setCurrentDocumentType] = useState<'resume' | 'cv'>('resume');
  const [savedResumes, setSavedResumes] = useState<SavedResumeData[]>([]);

  // Load saved resumes on component mount
  useEffect(() => {
    const loadSavedResumes = () => {
      const saved = ResumeDataService.getAllSavedResumes();
      setSavedResumes(saved);
    };

    loadSavedResumes();
    // Set up an interval to refresh saved resumes (in case of updates from other tabs)
    const interval = setInterval(loadSavedResumes, 5000);
    return () => clearInterval(interval);
  }, []);

  // Demo resource arrays
  const resumesCvTemplates = [
    {
      id: "1",
      title: "Double Column Template",
      description: "Executive-style resume ideal for senior professionals and C-suite roles.",
      fileType: "PDF",
      fileSize: "1.2 MB",
      color: "charcoal" as const,
      img_placeholder: "./resume_example.png",
      pdfUrl: "/pdfs/resume-template-1.pdf",
      template: 'deedy' as const,
    },
    {
      id: "2",
      title: "Single Column Template",
      description: "Creative and visually appealing layout, perfect for designers and artists.",
      fileType: "PDF",
      fileSize: "8.5 MB",
      color: "taupe" as const,
      img_placeholder: "./cv_example.png",
      pdfUrl: "/pdfs/resume-template-2.pdf",
      template: 'row-based' as const,
    },
  ];

  const stackedProjects = [
    ...savedResumes.map((item) => ({
      id: item.resumeId,
      title: item.title,
      owner: "You",
      lastModified: ResumeDataService.formatLastModified(item.lastModified),
      isTemplate: false,
      resumeData: item,
    })),
  ];

  const handleOpenModal = (template?: 'deedy' | 'row-based', documentType: 'resume' | 'cv' = 'resume') => {
    if (template) {
      setSelectedTemplate(template);
    }
    setCurrentDocumentType(documentType);
    setIsModalOpen(true);
  };

  const handleOpenResumeModal = (template?: 'deedy' | 'row-based') => {
    handleOpenModal(template, 'resume');
  };

  const handleOpenCVModal = (template?: 'deedy' | 'row-based') => {
    handleOpenModal(template, 'cv');
  };

  const handleResumeCreated = (resumeData: ResumeData) => {
    setCurrentResumeData(resumeData);
    // Notify parent component that we're entering resume building mode
    if (onResumeBuildingModeChange) {
      onResumeBuildingModeChange(true);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentResumeData(null);
    setSelectedTemplate('deedy');
    // Refresh saved resumes when returning to dashboard
    const saved = ResumeDataService.getAllSavedResumes();
    setSavedResumes(saved);
    // Notify parent component that we're exiting resume building mode
    if (onResumeBuildingModeChange) {
      onResumeBuildingModeChange(false);
    }
  };

  const handleProjectClick = (project: { 
    id: string; 
    title: string; 
    owner: string; 
    lastModified: string; 
    isTemplate?: boolean; 
    resumeData?: SavedResumeData;
  }) => {
    if (project.isTemplate) {
      // Handle template clicks (existing functionality)
      return;
    }
    
    if (project.resumeData) {
      // Load saved resume
      const resumeData: ResumeData = {
        title: project.resumeData.title,
        resumeId: project.resumeData.resumeId,
        userEmail: project.resumeData.userEmail,
        userName: project.resumeData.userName,
        documentId: project.resumeData.documentId,
      };
      
      setSelectedTemplate(project.resumeData.template);
      setCurrentResumeData(resumeData);
      
      if (onResumeBuildingModeChange) {
        onResumeBuildingModeChange(true);
      }
    }
  };

  const handleDeleteResume = (projectId: string) => {
    // Only allow deleting saved resumes, not templates
    const project = stackedProjects.find(p => p.id === projectId);
    if (project && !project.isTemplate) {
      const success = ResumeDataService.deleteResumeData(projectId);
      if (success) {
        // Refresh saved resumes
        const saved = ResumeDataService.getAllSavedResumes();
        setSavedResumes(saved);
      }
    }
  };

  const handleBulkDeleteResumes = (projectIds: string[]) => {
    // Filter out templates - only delete saved resumes
    const resumeIdsToDelete = projectIds.filter(id => {
      const project = stackedProjects.find(p => p.id === id);
      return project && !project.isTemplate;
    });

    if (resumeIdsToDelete.length > 0) {
      const deletedCount = ResumeDataService.deleteBulkResumeData(resumeIdsToDelete);
      if (deletedCount > 0) {
        // Refresh saved resumes
        const saved = ResumeDataService.getAllSavedResumes();
        setSavedResumes(saved);
      }
    }
  };

  // If we have currentResumeData, show the ResumeBuilder instead of the regular page
  if (currentResumeData) {
    return <ResumeBuilderWrapper resumeData={currentResumeData} onBack={handleBackToDashboard} template={selectedTemplate} documentType={currentDocumentType} />;
  }

  return (
    <div className="min-h-screenfont-inter relative bg-gradient-to-b from-background to-muted/30 text-card-foreground transition-colors duration-300">
      <div className="relative z-10 py-4 px-2">
        
        
        <ResourceSection
          title="Resumes & CV Templates"
          resources={resumesCvTemplates}
          onCreate={handleOpenResumeModal}
          onDownload={(pdfUrl) => {
            if (pdfUrl) {
              const link = document.createElement('a');
              link.href = pdfUrl;
              const fileName = pdfUrl.split('/').pop() ?? 'resume.pdf';
              link.download = fileName;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }}
        />
        
        <StackedProjectsTable 
          projects={stackedProjects} 
          onProjectClick={handleProjectClick} 
          onDelete={handleDeleteResume}
          onBulkDelete={handleBulkDeleteResumes}
        />
        
        {/* Use our new AddResumeModal component */}
        <AddResumeModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onResumeCreated={handleResumeCreated}
          documentType={currentDocumentType}
        />
      </div>
    </div>
  );
};

export default Resume;


