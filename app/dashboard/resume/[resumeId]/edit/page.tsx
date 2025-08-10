"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ResumeProvider } from "@/app/context/ResumeContext";
import GlobalApi from "@/app/services/GlobalApi";
import { ResumeInfo } from "@/app/context/ResumeContext";

// Import components dynamically to handle spaces in folder names
const FormSection = dynamic(() => import("@/components/Resume and CV/FormSection"));
const ResumePreview = dynamic(() => import("@/components/Resume and CV/ResumePreview"));

// Add the missing import for dynamic
import dynamic from "next/dynamic";

export default function EditResume() {
  const params = useParams();
  const resumeId = params?.resumeId as string;
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (resumeId) {
      getResumeInfo();
    }
  }, [resumeId]);

  const getResumeInfo = async () => {
    try {
      const response = await GlobalApi.GetResumeById(resumeId);
      setResumeInfo(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching resume:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ResumeProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FormSection resumeId={resumeId} initialData={resumeInfo} />
        
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeProvider>
  );
}


