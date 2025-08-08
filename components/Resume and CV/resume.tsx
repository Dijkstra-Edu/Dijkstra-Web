"use client";

import { useState } from "react";
import { FileText, FileImage, BarChart3, Video } from "lucide-react";
import { ResourceSection } from "@/components/Resume and CV/resource-section";
import { StackedProjectsTable } from "@/components/Resume and CV/stacked-projects-table";
import AddResumeModal from "./AddResumeModal";

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div
      className="min-h-screen py-12 font-inter relative"
      style={{
        background: 'linear-gradient(135deg,#001600 0%,#011e01 65%,#000000 100%), linear-gradient(315deg, transparent 0%, rgba(0,0,0,0.7) 40%, #000000 100%)',
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(255,255,255,0.02),transparent)] pointer-events-none"></div>
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
        />
      </div>
    </div>
  );
};

export default Resume;


