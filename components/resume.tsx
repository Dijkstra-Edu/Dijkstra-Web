import { FileText, FileImage, Archive, BarChart3, Video, Calculator } from "lucide-react";
import { ResourceSection } from "../components/ResourceSection";

const Resume = () => {
  const resumesCreated = [
    { id: "1", title: "Executive Resume", description: "Professional C-level resume template", fileType: "PDF", fileSize: "1.2 MB", color: "blue" as const, icon: <FileText /> },
    { id: "2", title: "Creative Portfolio", description: "Visual showcase of design work", fileType: "PDF", fileSize: "8.5 MB", color: "purple" as const, icon: <FileImage /> },
    { id: "3", title: "Brand Package", description: "Complete branding assets bundle", fileType: "ZIP", fileSize: "15 MB", color: "orange" as const, icon: <Archive /> },
  ];

  const cvsCreated = [
    { id: "4", title: "Academic CV", description: "Detailed research and publication CV", fileType: "PDF", fileSize: "4.7 MB", color: "green" as const, icon: <BarChart3 /> },
    { id: "5", title: "Video CV", description: "Personal video introduction", fileType: "MP4", fileSize: "22 MB", color: "red" as const, icon: <Video /> },
    { id: "6", title: "Rates Guide", description: "Professional pricing structure", fileType: "PDF", fileSize: "900 KB", color: "teal" as const, icon: <Calculator /> },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">Downloadable Resources</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Access and download my professional documents and resources to learn more about
            my work, experience, and offerings.
          </p>
        </div> */}
        <ResourceSection title="Resumes Templates" resources={resumesCreated} />
        <ResourceSection title="CV's Templates" resources={cvsCreated} />
        <ResourceSection title="Resumes Created" resources={resumesCreated} />
        <ResourceSection title="CV's Created" resources={cvsCreated} />
      </div>
    </div>
  );
};

export default Resume;
