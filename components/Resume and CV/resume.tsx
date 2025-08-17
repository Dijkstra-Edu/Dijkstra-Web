"use client";

import { useState } from "react";
import { FileText, FileImage, BarChart3, Video } from "lucide-react";
import { ResourceSection } from "@/components/Resume and CV/resource-section";
import { StackedProjectsTable } from "@/components/Resume and CV/stacked-projects-table";
import AddResumeModal from "./AddResumeModal";
import ResumeBuilder from "@/components/Resume and CV/ResumeBuilder/ResumeBuilder";

interface ResumeData {
  title: string;
  resumeId: string;
  userEmail: string;
  userName: string;
  documentId: string;
}

// Placeholder component for the new resume builder
const ResumeBuilderWrapper = ({ resumeData, onBack }: { resumeData: ResumeData; onBack: () => void }) => {
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
              <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
              <p className="text-sm text-muted-foreground">Editing: {resumeData.title}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resume Builder Component */}
      <ResumeBuilder 
        showHeader={false}
        height="calc(100vh - 80px)"
        className=""
      />
    </div>
  );
};

const Resume = ({ onResumeBuildingModeChange }: { onResumeBuildingModeChange?: (isBuilding: boolean) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResumeData, setCurrentResumeData] = useState<ResumeData | null>(null);

  // Demo resource arrays
  const resumesCreated = [
    {
      id: "1",
      title: "Resume template 1",
      description: "Executive-style resume ideal for senior professionals and C-suite roles.",
      fileType: "PDF",
      fileSize: "1.2 MB",
      color: "charcoal" as const,
      icon: <FileText />,
      pdfUrl: "/pdfs/resume-template-1.pdf",
    },
    {
      id: "2",
      title: "Resume template 2",
      description: "Creative and visually appealing layout, perfect for designers and artists.",
      fileType: "PDF",
      fileSize: "8.5 MB",
      color: "taupe" as const,
      icon: <FileImage />,
      pdfUrl: "/pdfs/resume-template-2.pdf",
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
      owner: "You",
      lastModified: "4 days ago",
    })),
    ...cvsCreated.map((item) => ({
      id: item.id,
      title: item.title,
      owner: "You",
      lastModified: "4 days ago",
    })),
  ];

  const handleOpenModal = () => {
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
    // Notify parent component that we're exiting resume building mode
    if (onResumeBuildingModeChange) {
      onResumeBuildingModeChange(false);
    }
  };

  // If we have currentResumeData, show the ResumeBuilder instead of the regular page
  if (currentResumeData) {
    return <ResumeBuilderWrapper resumeData={currentResumeData} onBack={handleBackToDashboard} />;
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
        <StackedProjectsTable projects={stackedProjects} />
        
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


