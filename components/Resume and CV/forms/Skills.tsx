"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeContext } from "@/app/context/ResumeContext";
import GlobalApi from "@/app/services/GlobalApi";

interface SkillItem {
  name: string;
  rating: number;
}

const emptySkill: SkillItem = {
  name: "",
  rating: 3, // Default rating
};

export default function Skills() {
  const params = useParams();
  const resumeId = params?.resumeId as string;
  const { resumeInfo, setResumeInfo } = useResumeContext();
  const [skillsList, setSkillsList] = useState<SkillItem[]>([emptySkill]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.skills && resumeInfo.skills.length > 0) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo]);

  const handleChange = (index: number, name: string, value: string | number) => {
    const newEntries = [...skillsList];
    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };
    
    setSkillsList(newEntries);
    
    if (resumeInfo) {
      setResumeInfo({
        ...resumeInfo,
        skills: newEntries,
      });
    }
  };

  const handleRatingChange = (index: number, rating: number) => {
    handleChange(index, 'rating', rating);
  };

  const addNewSkill = () => {
    setSkillsList([...skillsList, { ...emptySkill }]);
  };

  const removeSkill = () => {
    if (skillsList.length > 1) {
      setSkillsList(skillsList.slice(0, -1));
    }
  };

  const onSave = async () => {
    setLoading(true);
    
    try {
      const data = {
        data: {
          skills: skillsList,
        },
      };
      
      await GlobalApi.UpdateResumeDetail(resumeId, data);
      toast("Skills updated");
    } catch (error) {
      console.error("Error updating skills:", error);
      toast("Failed to update skills");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your top professional key skills</p>

      {skillsList.map((item, index) => (
        <div key={index} className="flex justify-between mb-2 border rounded-lg p-3">
          <div className="w-full mr-4">
            <label className="text-xs">Skill Name</label>
            <Input 
              className="w-full"
              value={item.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs block mb-1">Rating (1-5)</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className={`w-8 h-8 rounded-full mx-1 ${
                    item.rating >= rating ? 'bg-primary' : 'bg-gray-200'
                  }`}
                  onClick={() => handleRatingChange(index, rating)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={addNewSkill} className="text-primary">
            + Add More Skill
          </Button>
          <Button 
            variant="outline" 
            onClick={removeSkill} 
            className="text-primary"
            disabled={skillsList.length <= 1}
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


