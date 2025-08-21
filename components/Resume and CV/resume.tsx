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
  template = 'deedy' 
}: { 
  resumeData: ResumeData; 
  onBack: () => void; 
  template?: 'deedy' | 'row-based';
}) => {
  const templateTitle = template === 'row-based' ? 'Row-based Resume Builder' : 'Column Resume Builder';
  const templateSubtitle = template === 'row-based' ? 
    'Row-based Resume' : 
    'Column Resume';

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
  const resumesCreated = [
    {
      id: "1",
      title: "Column Resume",
      description: "Executive-style resume ideal for senior professionals and C-suite roles.",
      fileType: "PDF",
      fileSize: "1.2 MB",
      color: "charcoal" as const,
      icon: <FileText />,
      pdfUrl: "/pdfs/resume-template-1.pdf",
      template: 'deedy' as const,
    },
    {
      id: "2",
      title: "Row Resume",
      description: "Creative and visually appealing layout, perfect for designers and artists.",
      fileType: "PDF",
      fileSize: "8.5 MB",
      color: "taupe" as const,
      icon: <FileImage />,
      pdfUrl: "/pdfs/resume-template-2.pdf",
      template: 'row-based' as const,
    },
  ];

  const cvsCreated = [
    {
      id: "4",
      title: "CV template 1",
      description: "Academic CV designed for research, publications, and scholarly achievements.",
      fileType: "PDF",
      fileSize: "4.7 MB",
      color: "slateBlue" as const,
      icon: <BarChart3 />,
      pdfUrl: "/pdfs/cv-template-1.pdf",
    },
    {
      id: "5",
      title: "CV template 2",
      description: "Video CV template to present a dynamic personal introduction and skills summary.",
      fileType: "MP4",
      fileSize: "22 MB",
      color: "bronze" as const,
      icon: <Video />,
      pdfUrl: "/pdfs/cv-template-2.pdf",
    },
  ];

  const stackedProjects = [
    ...resumesCreated.map((item) => ({
      id: item.id,
      title: item.title,
      owner: "Template",
      lastModified: "Template",
      isTemplate: true,
    })),
    ...cvsCreated.map((item) => ({
      id: item.id,
      title: item.title,
      owner: "Template", 
      lastModified: "Template",
      isTemplate: true,
    })),
    ...savedResumes.map((item) => ({
      id: item.resumeId,
      title: item.title,
      owner: "You",
      lastModified: ResumeDataService.formatLastModified(item.lastModified),
      isTemplate: false,
      resumeData: item,
    })),
  ];

  const handleOpenModal = (template?: 'deedy' | 'row-based') => {
    if (template) {
      setSelectedTemplate(template);
    }
    setIsModalOpen(true);
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
    return <ResumeBuilderWrapper resumeData={currentResumeData} onBack={handleBackToDashboard} template={selectedTemplate} />;
  }

  return (
    <div
      className="min-h-screen py-12 font-inter relative bg-card text-card-foreground transition-colors duration-300"
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-background/80 to-primary/10 dark:from-background/90 dark:to-primary/20"></div>
      <div className="max-w-6xl mx-auto px-6 space-y-10 relative z-10">
        <ResourceSection
          title="Resumes Templates"
          resources={resumesCreated}
          onCreate={handleOpenModal}
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
        <ResourceSection
          title="CV's Templates"
          resources={cvsCreated}
          onCreate={handleOpenModal}
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
        />
      </div>
    </div>
  );
};

export default Resume;


