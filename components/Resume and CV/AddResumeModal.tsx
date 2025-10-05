"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
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

interface ResumeData {
  title: string;
  resumeId: string;
  userEmail: string;
  userName: string;
  documentId: string;
}

interface AddResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResumeCreated?: (resumeData: ResumeData) => void;
  documentType?: "resume" | "cv";
}

export default function AddResumeModal({
  isOpen,
  onClose,
  onResumeCreated,
  documentType = "resume",
}: AddResumeModalProps) {
  const [resumeTitle, setResumeTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const docTypeLabel = documentType === "cv" ? "CV" : "Resume";
  const defaultTitle = documentType === "cv" ? "My New CV" : "My New Resume";

  const handleCreate = async () => {
    if (!resumeTitle) return;

    setLoading(true);
    const uuid = uuidv4();

    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: session?.user?.email || "",
        userName: session?.user?.name || "",
      },
    };

    try {
      const response = await GlobalApi.CreateNewResume(data);
      if (response) {
        setLoading(false);
        // Instead of navigating, call the onResumeCreated callback
        if (onResumeCreated) {
          onResumeCreated({
            title: resumeTitle,
            resumeId: uuid,
            userEmail: session?.user?.email || "",
            userName: session?.user?.name || "",
            documentId: response.data.data.documentId,
          });
        }
        onClose(); // Close the modal
      }
    } catch (error) {
      setLoading(false);
      console.error("Error creating resume:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl shadow-lg border border-border/50 p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Create a New {docTypeLabel}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Give your {docTypeLabel.toLowerCase()} a name to get started.
          </DialogDescription>
        </DialogHeader>

        <Input
          className="my-4 rounded-xl border border-border/70 focus:ring-2 focus:ring-primary/40"
          placeholder={`Ex. ${defaultTitle}`}
          onChange={(e) => setResumeTitle(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" className="rounded-lg" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!resumeTitle || loading}
            onClick={handleCreate}
            className="rounded-lg shadow-sm px-5"
          >
            {loading && <Loader2 className="animate-spin mr-2" />}
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
