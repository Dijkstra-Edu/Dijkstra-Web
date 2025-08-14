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

interface EducationItem {
  universityName: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
}

const emptyEducation: EducationItem = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

export default function Education() {
  const params = useParams();
  const resumeId = params?.resumeId as string;
  const { resumeInfo, setResumeInfo } = useResumeContext();
  const [educationList, setEducationList] = useState<EducationItem[]>([emptyEducation]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.education && resumeInfo.education.length > 0) {
      setEducationList(resumeInfo.education);
    }
  }, [resumeInfo]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const newEntries = [...educationList];
    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };
    
    setEducationList(newEntries);
    
    if (resumeInfo) {
      setResumeInfo({
        ...resumeInfo,
        education: newEntries,
      });
    }
  };

  const addNewEducation = () => {
    setEducationList([...educationList, { ...emptyEducation }]);
  };

  const removeEducation = () => {
    if (educationList.length > 1) {
      setEducationList(educationList.slice(0, -1));
    }
  };

  const onSave = async () => {
    setLoading(true);
    
    try {
      const data = {
        data: {
          education: educationList,
        },
      };
      
      await GlobalApi.UpdateResumeDetail(resumeId, data);
      toast("Education details updated");
    } catch (error) {
      console.error("Error updating education:", error);
      toast("Failed to update education details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>

      {educationList.map((item, index) => (
        <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
          <div className="col-span-2">
            <label className="text-xs">University/Institution Name</label>
            <Input 
              name="universityName"
              value={item.universityName}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          <div>
            <label className="text-xs">Degree</label>
            <Input 
              name="degree"
              value={item.degree}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          <div>
            <label className="text-xs">Major/Field of Study</label>
            <Input 
              name="major"
              value={item.major}
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
            <label className="text-xs">Description</label>
            <Textarea 
              name="description"
              value={item.description}
              onChange={(e) => handleChange(index, e)}
              className="min-h-[100px]"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={addNewEducation} className="text-primary">
            + Add More Education
          </Button>
          <Button 
            variant="outline" 
            onClick={removeEducation} 
            className="text-primary"
            disabled={educationList.length <= 1}
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


