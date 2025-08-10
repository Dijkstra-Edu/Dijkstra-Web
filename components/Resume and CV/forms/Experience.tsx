"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/app/context/ResumeContext";
import GlobalApi from "@/app/services/GlobalApi";

interface ExperienceItem {
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  workSummery: string;
}

const emptyExperience: ExperienceItem = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

export default function Experience() {
  const params = useParams();
  const resumeId = params?.resumeId as string;
  const { resumeInfo, setResumeInfo } = useResumeContext();
  const [experienceList, setExperienceList] = useState<ExperienceItem[]>([emptyExperience]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.Experience && resumeInfo.Experience.length > 0) {
      setExperienceList(resumeInfo.Experience);
    }
  }, [resumeInfo]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const newEntries = [...experienceList];
    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };
    
    setExperienceList(newEntries);
    
    if (resumeInfo) {
      setResumeInfo({
        ...resumeInfo,
        Experience: newEntries,
      });
    }
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, { ...emptyExperience }]);
  };

  const removeExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList(experienceList.slice(0, -1));
    }
  };

  const onSave = async () => {
    setLoading(true);
    
    try {
      const data = {
        data: {
          Experience: experienceList,
        },
      };
      
      await GlobalApi.UpdateResumeDetail(resumeId, data);
      toast("Experience details updated");
    } catch (error) {
      console.error("Error updating experience:", error);
      toast("Failed to update experience details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add your previous job experience</p>

      {experienceList.map((item, index) => (
        <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
          <div>
            <label className="text-xs">Position Title</label>
            <Input 
              name="title"
              value={item.title}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          <div>
            <label className="text-xs">Company Name</label>
            <Input 
              name="companyName"
              value={item.companyName}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          <div>
            <label className="text-xs">City</label>
            <Input 
              name="city"
              value={item.city}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          <div>
            <label className="text-xs">State</label>
            <Input 
              name="state"
              value={item.state}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          <div>
            <label className="text-xs">Start Date</label>
            <Input 
              type="date"
              name="startDate"
              value={item.startDate}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          <div>
            <label className="text-xs">End Date</label>
            <Input 
              type="date"
              name="endDate"
              value={item.endDate}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs">Work Summary</label>
            <Textarea 
              name="workSummery"
              value={item.workSummery}
              onChange={(e) => handleChange(index, e)}
              className="min-h-[100px]"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={addNewExperience} className="text-primary">
            + Add More Experience
          </Button>
          <Button 
            variant="outline" 
            onClick={removeExperience} 
            className="text-primary"
            disabled={experienceList.length <= 1}
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin mr-2" /> : null}
          Save
        </Button>
      </div>
    </div>
  );
}


