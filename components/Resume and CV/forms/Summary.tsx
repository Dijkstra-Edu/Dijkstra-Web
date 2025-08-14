"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/app/context/ResumeContext";
import GlobalApi from "@/app/services/GlobalApi";

interface SummaryProps {
  enabledNext: (value: boolean) => void;
}

export default function Summary({ enabledNext }: SummaryProps) {
  const params = useParams();
  const resumeId = params?.resumeId as string;
  const { resumeInfo, setResumeInfo } = useResumeContext();
  const [summaryText, setSummaryText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.summery) {
      setSummaryText(resumeInfo.summery);
    }
  }, [resumeInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    enabledNext(false);
    setSummaryText(e.target.value);
    
    if (resumeInfo) {
      setResumeInfo({
        ...resumeInfo,
        summery: e.target.value,
      });
    }
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = {
        data: {
          summery: summaryText,
        },
      };
      
      await GlobalApi.UpdateResumeDetail(resumeId, data);
      enabledNext(true);
      toast("Summary updated");
    } catch (error) {
      console.error("Error updating summary:", error);
      toast("Failed to update summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Summary</h2>
      <p className="mb-4">Write a short summary highlighting your skills and experience</p>

      <form onSubmit={onSave}>
        <Textarea
          className="min-h-[200px] resize-none"
          placeholder="Describe your professional background, key skills, and career highlights..."
          value={summaryText}
          onChange={handleChange}
        />
        
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin mr-2" /> : null}
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}


