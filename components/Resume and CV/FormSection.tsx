"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResumeInfo, useResumeContext } from "@/app/context/ResumeContext";
import PersonalDetail from "./forms/PersonalDetail";
import Summary from "@/components/Resume and CV/forms/Summary";
import Experience from "@/components/Resume and CV/forms/Experience";
import Education from "@/components/Resume and CV/forms/Education";
import Skills from "@/components/Resume and CV/forms/Skills";
import ThemeColor from "@/components/Resume and CV/ThemeColor";

interface FormSectionProps {
  resumeId: string;
  initialData?: ResumeInfo | null;
}

export default function FormSection({ resumeId, initialData }: FormSectionProps) {
  const [activeFormIndex, setActiveFormIndex] = useState<number>(1);
  const [enableNext, setEnableNext] = useState<boolean>(true);
  const router = useRouter();
  const { resumeInfo, setResumeInfo } = useResumeContext();

  useEffect(() => {
    if (initialData) {
      setResumeInfo(initialData);
    }
  }, [initialData, setResumeInfo]);

  const handleNext = () => {
    if (activeFormIndex < 6) {
      setActiveFormIndex(activeFormIndex + 1);
    } else {
      // Navigate to view page when all sections are completed
      router.push(`/dashboard/resume/${resumeId}/view`);
    }
  };

  const handlePrevious = () => {
    if (activeFormIndex > 1) {
      setActiveFormIndex(activeFormIndex - 1);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link href="/dashboard">
            <Button><Home /></Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button size="sm" onClick={handlePrevious}>
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={handleNext}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Form Sections */}
      {activeFormIndex === 1 ? (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summary enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experience />
      ) : activeFormIndex === 4 ? (
        <Education />
      ) : activeFormIndex === 5 ? (
        <Skills />
      ) : null}
    </div>
  );
}


