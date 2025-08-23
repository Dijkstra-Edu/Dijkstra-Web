"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeContext } from "@/app/context/ResumeContext";
import GlobalApi from "@/app/services/GlobalApi";

interface PersonalDetailProps {
  enabledNext: (value: boolean) => void;
}

export default function PersonalDetail({ enabledNext }: PersonalDetailProps) {
  const params = useParams();
  const resumeId = params?.resumeId as string;
  const { resumeInfo, setResumeInfo } = useResumeContext();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        firstName: resumeInfo.firstName || "",
        lastName: resumeInfo.lastName || "",
        jobTitle: resumeInfo.jobTitle || "",
        address: resumeInfo.address || "",
        phone: resumeInfo.phone || "",
        email: resumeInfo.email || "",
      });
    }
  }, [resumeInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    enabledNext(false);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (resumeInfo) {
      setResumeInfo({
        ...resumeInfo,
        [name]: value,
      });
    }
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = {
        data: formData,
      };
      
      await GlobalApi.UpdateResumeDetail(resumeId, data);
      enabledNext(true);
      toast("Details updated");
    } catch (error) {
      console.error("Error updating details:", error);
      toast("Failed to update details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input 
              name="firstName" 
              value={formData.firstName || ""} 
              required 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input 
              name="lastName" 
              value={formData.lastName || ""} 
              required 
              onChange={handleInputChange} 
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input 
              name="jobTitle" 
              value={formData.jobTitle || ""} 
              required 
              onChange={handleInputChange} 
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input 
              name="address" 
              value={formData.address || ""} 
              required 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input 
              name="phone" 
              value={formData.phone || ""} 
              required 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input 
              name="email" 
              value={formData.email || ""} 
              required 
              onChange={handleInputChange} 
            />
          </div>
        </div>
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


