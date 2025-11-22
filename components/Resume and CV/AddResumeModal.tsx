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
import { useFetchUserData } from "@/hooks/user/use-fetch-user-data";
import { transformFullUserProfileToResumeData } from "@/lib/user/resume-transformers";
import { UserProfileData, ResumeData } from "@/types/document";

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
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<"resume" | "cv">(
    documentType
  );
  const { data: session } = useSession();
  const githubUsername = session?.user?.github_user_name || "";

  const { 
    data: userData, 
    isLoading: isLoadingUserData,
    error: userDataError 
  } = useFetchUserData(githubUsername, isOpen);

  const defaultTitle = selectedDocType === "cv" ? "My New CV" : "My New Resume";

  const handleCreate = async () => {
    if (!resumeTitle) return;

    setLoading(true);
    const uuid = uuidv4();

    try {
      let transformedData: Partial<UserProfileData> | undefined;
      
      if (userData) {
        transformedData = transformFullUserProfileToResumeData(userData);
      }
      
      setLoading(false);

      if (onResumeCreated) {
        // documentId should be empty for a newly created local resume. The
        // backend will return a server document id after the first create.
        onResumeCreated({
          title: resumeTitle,
          resumeId: uuid,
          userEmail: session?.user?.email || "",
          userName: session?.user?.name || "",
          documentId: "",
          documentType: selectedDocType,
          initialData: transformedData,
        });
      }

      onClose();
      setResumeTitle("");
    } catch {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl shadow-lg border border-border/50 p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Create a New Document
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Enter a title and choose the type of document you want to create.
          </DialogDescription>
        </DialogHeader>

        <Input
          className="my-4 rounded-xl border border-border/70 focus:ring-2 focus:ring-primary/40"
          placeholder={`Ex. ${defaultTitle}`}
          value={resumeTitle}
          onChange={(e) => setResumeTitle(e.target.value)}
        />

        <div className="mt-2">
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Document Type
          </label>
          <select
            value={selectedDocType}
            onChange={(e) =>
              setSelectedDocType(e.target.value as "resume" | "cv")
            }
            className="w-full rounded-xl border border-border/70 bg-background px-3 py-2 focus:ring-2 focus:ring-primary/40"
          >
            <option value="resume">Resume</option>
            <option value="cv">CV</option>
          </select>
        </div>

        {userDataError && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              Failed to load user data. Resume will be created with empty data.
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" className="rounded-lg" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!resumeTitle || loading || isLoadingUserData}
            onClick={handleCreate}
            className="rounded-lg shadow-sm px-5"
          >
            {(loading || isLoadingUserData) && <Loader2 className="animate-spin mr-2" />}
            {isLoadingUserData ? "Loading Data..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
