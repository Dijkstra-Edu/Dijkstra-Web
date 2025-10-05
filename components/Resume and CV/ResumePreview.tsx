"use client";

import { useResumeContext } from "@/app/context/ResumeContext";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationPreview from "./preview/EducationPreview";
import SkillsPreview from "./preview/SkillsPreview";
import LatexTemplate from "./templates/LatexTemplate";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import PdfExportButton from "./PdfExportButton";

export default function ResumePreview() {
  const { resumeInfo } = useResumeContext();
  const [template, setTemplate] = useState<"default" | "latex">("default");
  // Explicitly type the ref as HTMLDivElement
  const contentRef = useRef<HTMLDivElement>(null);

  if (!resumeInfo) {
    return (
      <div className="shadow-lg h-full p-14 border-t-[20px] border-gray-300 flex items-center justify-center">
        <p className="text-gray-500">Resume preview will appear here</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <Button 
            variant={template === "default" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTemplate("default")}
          >
            Default Template
          </Button>
          <Button 
            variant={template === "latex" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTemplate("latex")}
          >
            LaTeX Template
          </Button>
        </div>
        <PdfExportButton 
          contentRef={contentRef} 
          fileName={`${resumeInfo.firstName || 'resume'}_${resumeInfo.lastName || ''}`}
        />
      </div>

      {template === "default" ? (
        <div 
          ref={contentRef}
          className="shadow-lg h-full p-14 border-t-[20px] overflow-auto"
          style={{
            borderColor: resumeInfo?.themeColor || "#4f46e5"
          }}
        >
          {/* Personal Detail */}
          <PersonalDetailPreview resumeInfo={resumeInfo} />
          
          {/* Summary */}
          {resumeInfo?.summery && <SummaryPreview resumeInfo={resumeInfo} />}
          
          {/* Professional Experience */}
          {resumeInfo?.Experience && resumeInfo.Experience.length > 0 && (
            <ExperiencePreview resumeInfo={resumeInfo} />
          )}
          
          {/* Education */}
          {resumeInfo?.education && resumeInfo.education.length > 0 && (
            <EducationPreview resumeInfo={resumeInfo} />
          )}
          
          {/* Skills */}
          {resumeInfo?.skills && resumeInfo.skills.length > 0 && (
            <SkillsPreview resumeInfo={resumeInfo} />
          )}
        </div>
      ) : (
        <div ref={contentRef} className="shadow-lg h-full overflow-auto">
          <LatexTemplate />
        </div>
      )}
    </div>
  );
}


