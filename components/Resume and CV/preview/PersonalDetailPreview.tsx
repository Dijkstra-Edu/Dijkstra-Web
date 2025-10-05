import { ResumeInfo } from "@/app/context/ResumeContext";

interface PersonalDetailPreviewProps {
  resumeInfo: ResumeInfo;
}

export default function PersonalDetailPreview({ resumeInfo }: PersonalDetailPreviewProps) {
  return (
    <div>
      <h2 
        className="font-bold text-xl text-center"
        style={{
          color: resumeInfo?.themeColor || "#4f46e5"
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      
      <h2 className="text-center text-sm font-medium">
        {resumeInfo?.jobTitle}
      </h2>
      
      <h2 
        className="text-center font-normal text-xs"
        style={{
          color: resumeInfo?.themeColor || "#4f46e5"
        }}
      >
        {resumeInfo?.address}
      </h2>

      <div className="flex justify-between">
        <h2 
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor || "#4f46e5"
          }}
        >
          {resumeInfo?.phone}
        </h2>
        
        <h2 
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor || "#4f46e5"
          }}
        >
          {resumeInfo?.email}
        </h2>
      </div>
      
      <hr 
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor || "#4f46e5"
        }}
      />
    </div>
  );
}
