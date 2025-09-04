import { ResumeInfo } from "@/app/context/ResumeContext";

interface SummaryPreviewProps {
  resumeInfo: ResumeInfo;
}

export default function SummaryPreview({ resumeInfo }: SummaryPreviewProps) {
  if (!resumeInfo?.summery) {
    return null;
  }
  
  return (
    <div className="mb-4">
      <h3 
        className="text-sm font-bold mb-1"
        style={{
          color: resumeInfo?.themeColor || "#4f46e5"
        }}
      >
        Professional Summary
      </h3>
      <p className="text-xs">
        {resumeInfo.summery}
      </p>
    </div>
  );
}
