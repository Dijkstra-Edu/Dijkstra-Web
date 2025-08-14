"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { ResumeProvider, useResumeContext } from "@/app/context/ResumeContext";
import GlobalApi from "@/app/services/GlobalApi";
import dynamic from "next/dynamic";

// Import components dynamically to handle spaces in folder names
const ResumePreview = dynamic(() => import("@/components/Resume and CV/ResumePreview"));

export default function ViewResume() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params?.resumeId as string;
  const [loading, setLoading] = useState<boolean>(true);

  // We'll use the ResumeProvider to manage state
  function ResumeContent() {
    const { setResumeInfo } = useResumeContext();

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

    return <ResumePreview />;
  }

  const handleEdit = () => {
    router.push(`/dashboard/resume/${resumeId}/edit`);
  };

  const handleBack = () => {
    router.push("/dashboard");
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
      <div className="p-10">
        <div className="flex justify-between items-center mb-6">
          <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
          <Button onClick={handleEdit} className="flex items-center gap-2">
            <Edit size={16} />
            Edit Resume
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <ResumeContent />
        </div>
      </div>
    </ResumeProvider>
  );
}


