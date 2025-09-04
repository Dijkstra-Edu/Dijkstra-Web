import { ResumeInfo } from "@/app/context/ResumeContext";

interface SkillsPreviewProps {
  resumeInfo: ResumeInfo;
}

export default function SkillsPreview({ resumeInfo }: SkillsPreviewProps) {
  if (!resumeInfo?.skills || resumeInfo.skills.length === 0) {
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
        Skills
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        {resumeInfo.skills.map((skill, index) => (
          <div key={index} className="flex items-center">
            <span className="text-xs font-medium mr-2">{skill.name}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <div 
                  key={star} 
                  className="w-2 h-2 rounded-full mx-0.5"
                  style={{
                    backgroundColor: star <= skill.rating 
                      ? (resumeInfo?.themeColor || "#4f46e5") 
                      : "#e5e7eb"
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
