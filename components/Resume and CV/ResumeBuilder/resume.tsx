"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { DocumentResponse } from '@/services/DocumentApiService';
import { ResourceSection } from "@/components/Resume and CV/resource-section";
import { StackedDocumentsTable } from "@/components/Resume and CV/stacked-documents-table";
import AddResumeModal from "./AddResumeModal";
import ResumeBuilder from "@/components/Resume and CV/ResumeBuilder/ResumeBuilder";
import { ResumeStorageService } from "@/services/ResumeStorageService";
import { DocumentApiService } from "@/services/DocumentApiService";
import { SavedResumeData, ResumeData } from "@/types/resume";

// Wrapper for the new ResumeBuilder with header/back button
const ResumeBuilderWrapper = ({
  resumeData,
  onBack,
  template = "deedy",
  documentType = "resume",
}: {
  resumeData: ResumeData;
  onBack: () => void;
  template?: "deedy" | "row-based";
  documentType?: "resume" | "cv";
}) => {
  const { data: session } = useSession();
  const githubUsername = session?.user?.github_user_name || "test_user_123"; // Fallback to test user
  
  const isCV = documentType === "cv";
  const docTypeLabel = isCV ? "CV" : "Resume";
  const templateTitle =
    template === "row-based"
      ? `Row-based ${docTypeLabel} Builder`
      : `Column ${docTypeLabel} Builder`;
  const templateSubtitle =
    template === "row-based"
      ? `Row-based ${docTypeLabel}`
      : `Column ${docTypeLabel}`;

  return (
    <div className="min-h-screen bg-background">
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
              <h1 className="text-2xl font-bold text-foreground">
                Editing: {resumeData.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {templateSubtitle} {session?.user?.github_user_name && `• ${session.user.github_user_name}`}
              </p>
            </div>
          </div>
        </div>
      </div>
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
        githubUsername={githubUsername}
        useApiData={false}
        initialData={resumeData.initialData}
      />
    </div>
  );
};

const Resume = ({
  onResumeBuildingModeChange,
}: {
  onResumeBuildingModeChange?: (isBuilding: boolean) => void;
}) => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResumeData, setCurrentResumeData] = useState<ResumeData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<
    "deedy" | "row-based"
  >("deedy");
  const [currentDocumentType, setCurrentDocumentType] = useState<
    "resume" | "cv"
  >("resume");
  const [savedResumes, setSavedResumes] = useState<SavedResumeData[]>([]);
  const queryClient = useQueryClient();

  const githubUsername = session?.user?.github_user_name || "test_user_123";

  // Use TanStack Query to fetch documents for the user
  const { data: docs } = useQuery({
    queryKey: ["documents", githubUsername],
    queryFn: () => DocumentApiService.getDocumentsByUser(githubUsername),
    enabled: !!githubUsername,
    retry: false,
  });

  useEffect(() => {
    if (docs === null) {
      setSavedResumes([]);
      return;
    }

    if (Array.isArray(docs) && docs.length > 0) {
      const mapped: SavedResumeData[] = docs.map((d) => ({
        resumeId: d.id,
        title: d.document_name || "Untitled",
        // Map backend document_type to UI template values
        template: d.document_type === 'row' ? 'row-based' : 'deedy',
        content: d.base_structure || {},
        lastModified: d.updated_at || d.created_at,
        documentId: d.id,
        // document_kind from backend indicates resume or cv
        documentType: d.document_kind === 'cv' ? 'cv' : 'resume',
        userEmail: "",
        userName: "",
      }));
      setSavedResumes(mapped);
      return;
    }

    setSavedResumes([]);
  }, [docs]);


  // Demo resource arrays
  const resumesCvTemplates = [
    {
      id: "1",
      title: "Double Column Template",
      description:
        "Executive-style resume ideal for senior professionals and C-suite roles.",
      fileType: "PDF",
      fileSize: "1.2 MB",
      color: "charcoal" as const,
      img_placeholder: "./resume_example.png",
      pdfUrl: "/pdfs/resume-template-1.pdf",
      template: "deedy" as const,
    },
    {
      id: "2",
      title: "Single Column Template",
      description:
        "Creative and visually appealing layout, perfect for designers and artists.",
      fileType: "PDF",
      fileSize: "8.5 MB",
      color: "taupe" as const,
      img_placeholder: "./cv_example.png",
      pdfUrl: "/pdfs/resume-template-2.pdf",
      template: "row-based" as const,
    },
  ];

  const stackedProjects = [
    ...savedResumes.map((item) => ({
      id: item.resumeId,
      title: item.title,
      owner: "You",
  lastModified: ResumeStorageService.formatLastModified(item.lastModified),
      isTemplate: false,
      resumeData: item,
    })),
  ];

  // Store the template to use for AddResumeModal
  const [pendingTemplate, setPendingTemplate] = useState<"deedy" | "row-based">("deedy");

  const handleOpenModal = (
    template?: "deedy" | "row-based",
    documentType: "resume" | "cv" = "resume"
  ) => {
    if (template) {
      setSelectedTemplate(template);
      setPendingTemplate(template);
    }
    setCurrentDocumentType(documentType);
    setIsModalOpen(true);
  };

  const handleOpenResumeModal = (template?: "deedy" | "row-based") => {
    handleOpenModal(template, "resume");
  };

  

  const handleResumeCreated = (resumeData: ResumeData) => {
    // Use the pendingTemplate if not set in resumeData
    const templateToUse = resumeData.template || pendingTemplate || "deedy";
    setSelectedTemplate(templateToUse);
    setCurrentDocumentType(resumeData.documentType || "resume");
    setCurrentResumeData({ ...resumeData, template: templateToUse });

    if (onResumeBuildingModeChange) {
      onResumeBuildingModeChange(true);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentResumeData(null);
    setSelectedTemplate("deedy");
    // Refresh saved resumes when returning to dashboard
    queryClient.invalidateQueries({ queryKey: ["documents", githubUsername] });
    // Notify parent component that we're exiting resume building mode
    if (onResumeBuildingModeChange) {
      onResumeBuildingModeChange(false);
    }
  };

  const handleProjectClick = async (project: {
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

    // If we have a documentId, fetch full document details first
    if (project.resumeData && project.resumeData.documentId) {
      try {
        const doc = await queryClient.fetchQuery({ queryKey: ['document', project.resumeData!.documentId], queryFn: () => DocumentApiService.getDocumentById(project.resumeData!.documentId) }) as DocumentResponse;
        const templateToUse = doc.document_type === 'row' ? 'row-based' : (project.resumeData.template || 'deedy');
        const kindToUse = doc.document_kind === 'cv' ? 'cv' : (project.resumeData.documentType || 'resume');
        setSelectedTemplate(templateToUse);
        setCurrentResumeData({
          title: doc.document_name || project.title || project.resumeData.title,
          resumeId: doc.id,
          userEmail: project.resumeData.userEmail || "",
          userName: project.resumeData.userName || "",
          documentId: doc.id,
          template: templateToUse,
          documentType: kindToUse,
          initialData: doc.base_structure || project.resumeData.content || {},
        });

        if (onResumeBuildingModeChange) {
          onResumeBuildingModeChange(true);
        }

        return;
      } catch {
        // If fetching by ID fails, fall back to using saved resume data
      }
    }

    // Fallback: use resumeData if present
    if (project.resumeData) {
      const templateToUse = project.resumeData.template || "deedy";
      setSelectedTemplate(templateToUse);
      setCurrentResumeData({
        title: project.resumeData.title,
        resumeId: project.resumeData.resumeId,
        userEmail: project.resumeData.userEmail,
        userName: project.resumeData.userName,
        documentId: project.resumeData.documentId,
        template: templateToUse,
        documentType: project.resumeData.documentType || 'resume',
        initialData: project.resumeData.content || {},
      });

      if (onResumeBuildingModeChange) {
        onResumeBuildingModeChange(true);
      }
    }
  };

  const handleDeleteResume = async (projectId: string) => {
    // Only allow deleting saved resumes, not templates
    const project = stackedProjects.find((p) => p.id === projectId);
    if (project && !project.isTemplate) {
      try {
        await DocumentApiService.deleteDocument(projectId);
        // Refresh list from API
        await queryClient.invalidateQueries({ queryKey: ["documents", githubUsername] });
      } catch {
        // If API delete fails, refresh from backend to remain consistent
        await queryClient.invalidateQueries({ queryKey: ["documents", githubUsername] });
      }
    }
  };

  const handleBulkDeleteResumes = async (projectIds: string[]) => {
    // Filter out templates - only delete saved resumes
    const resumeIdsToDelete = projectIds.filter((id) => {
      const project = stackedProjects.find((p) => p.id === id);
      return project && !project.isTemplate;
    });

    if (resumeIdsToDelete.length > 0) {
      try {
        await Promise.all(resumeIdsToDelete.map((id) => DocumentApiService.deleteDocument(id)));
        await queryClient.invalidateQueries({ queryKey: ["documents", githubUsername] });
      } catch {
        await queryClient.invalidateQueries({ queryKey: ["documents", githubUsername] });
      }
    }
  };

  // If we have currentResumeData, show the ResumeBuilder instead of the regular page
  if (currentResumeData) {
    return (
      <ResumeBuilderWrapper
        resumeData={currentResumeData}
        onBack={handleBackToDashboard}
        template={selectedTemplate}
        documentType={currentDocumentType}
      />
    );
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
              const link = document.createElement("a");
              link.href = pdfUrl;
              const fileName = pdfUrl.split("/").pop() ?? "resume.pdf";
              link.download = fileName;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }}
        />

        <StackedDocumentsTable
          projects={stackedProjects}
          onProjectClick={handleProjectClick}
          onDelete={handleDeleteResume}
          onBulkDelete={handleBulkDeleteResumes}
        />

        {/* Use our new AddResumeModal component */}
        <AddResumeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onResumeCreated={(resumeData) => handleResumeCreated({ ...resumeData, template: pendingTemplate })}
          documentType={currentDocumentType}
        />
      </div>
    </div>
  );
};

export default Resume;
