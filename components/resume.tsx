import { useState } from "react";
import {
  FileText,
  FileImage,
  BarChart3,
  Video,
} from "lucide-react";
import { ResourceSection } from "@/components/resource-section";
import { Modal } from "../components/Modal";

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const resumesCreated = [
  {
    id: "1",
    title: "Resume template 1",
    description: "Executive-style resume ideal for senior professionals and C-suite roles.",
    fileType: "PDF",
    fileSize: "1.2 MB",
    color: "blue" as const,
    icon: <FileText />,
  },
  {
    id: "2",
    title: "Resume template 2",
    description: "Creative and visually appealing layout, perfect for designers and artists.",
    fileType: "PDF",
    fileSize: "8.5 MB",
    color: "purple" as const,
    icon: <FileImage />,
  },
];


  const cvsCreated = [
  {
    id: "4",
    title: "CV template 1",
    description: "Academic CV designed for research, publications, and scholarly achievements.",
    fileType: "PDF",
    fileSize: "4.7 MB",
    color: "green" as const,
    icon: <BarChart3 />,
  },
  {
    id: "5",
    title: "CV template 2",
    description: "Video CV template to present a dynamic personal introduction and skills summary.",
    fileType: "MP4",
    fileSize: "22 MB",
    color: "red" as const,
    icon: <Video />,
  },
];


  const handleOpenModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <ResourceSection title="Resumes Templates" resources={resumesCreated} />
        <ResourceSection title="CV's Templates" resources={cvsCreated} />

        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">Resume Created</h2>
          <div className="flex gap-6 flex-wrap">
            <div
              onClick={() => handleOpenModal("Create New Resume")}
              className="cursor-pointer w-48 h-64 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center hover:shadow-lg transition"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white shadow">
                <span className="text-3xl font-bold text-gray-600">+</span>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold">CV&apos;s Created</h2>
          <div className="flex gap-6 flex-wrap">
            <div
              onClick={() => handleOpenModal("Create New CV")}
              className="cursor-pointer w-48 h-64 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center hover:shadow-lg transition"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white shadow">
                <span className="text-3xl font-bold text-gray-600">+</span>
              </div>
            </div>

          </div>
        </div>

        {isModalOpen && (
          <Modal title={modalTitle} onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Resume;
