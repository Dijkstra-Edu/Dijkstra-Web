import { ResumeInfo } from "@/app/context/ResumeContext";

interface EducationPreviewProps {
  resumeInfo: ResumeInfo;
}

export default function EducationPreview({ resumeInfo }: EducationPreviewProps) {
  if (!resumeInfo?.education || resumeInfo.education.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-4">
      <h3 
        className="text-sm font-bold mb-2"
        style={{
          color: resumeInfo?.themeColor || "#4f46e5"
        }}
      >
        Education
      </h3>
      
      {resumeInfo.education.map((edu, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold">{edu.degree}</h4>
            <p className="text-xs">
              {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short' 
              })} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short' 
              }) : 'Present'}
            </p>
          </div>
          
          <p className="text-xs italic">{edu.universityName}</p>
          <p className="text-xs font-medium">{edu.major}</p>
          
          {edu.description && (
            <p className="text-xs mt-1">{edu.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}


