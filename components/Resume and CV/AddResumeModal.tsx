"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/app/services/GlobalApi";

interface AddResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddResumeModal({ isOpen, onClose }: AddResumeModalProps) {
  const [resumeTitle, setResumeTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleCreate = async () => {
    if (!resumeTitle) return;
    
    setLoading(true);
    const uuid = uuidv4();
    
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: session?.user?.email || "",
        userName: session?.user?.name || ""
      }
    };

    try {
      const response = await GlobalApi.CreateNewResume(data);
      if (response) {
        setLoading(false);
        router.push(`/dashboard/resume/${response.data.data.documentId}/edit`);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error creating resume:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Resume</DialogTitle>
          <DialogDescription>
            <p>Add a title for your new resume</p>
            <Input 
              className="my-2" 
              placeholder="Ex. Full Stack Resume"
              onChange={(e) => setResumeTitle(e.target.value)}
            />
          </DialogDescription>
          <div className="flex justify-end gap-5 mt-4">
            <Button onClick={onClose} variant="ghost">Cancel</Button>
            <Button 
              disabled={!resumeTitle || loading}
              onClick={handleCreate}
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : null}
              Create
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}


