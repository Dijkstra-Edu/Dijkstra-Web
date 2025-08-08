import { ResumeInfo } from "@/app/context/ResumeContext";

interface ExperiencePreviewProps {
  resumeInfo: ResumeInfo;
}

export default function ExperiencePreview({ resumeInfo }: ExperiencePreviewProps) {
  if (!resumeInfo?.Experience || resumeInfo.Experience.length === 0) {
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
        Professional Experience
      </h3>
      
      {resumeInfo.Experience.map((exp, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold">{exp.title}</h4>
            <p className="text-xs">
              {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short' 
              })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short' 
              }) : 'Present'}
            </p>
          </div>
          
          <p className="text-xs italic">{exp.companyName}</p>
          <p className="text-xs text-gray-600">{exp.city}, {exp.state}</p>
          
          <div className="text-xs mt-1" dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
        </div>
      ))}
    </div>
  );
}

// Made with Bob
