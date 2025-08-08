"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the structure of a resume
export interface ResumeInfo {
  documentId?: string;
  title?: string;
  resumeId?: string;
  userEmail?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  summery?: string;
  themeColor?: string;
  Experience?: Array<{
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    workSummery: string;
  }>;
  education?: Array<{
    universityName: string;
    degree: string;
    major: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills?: Array<{
    name: string;
    rating: number;
  }>;
}

interface ResumeContextType {
  resumeInfo: ResumeInfo | null;
  setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfo | null>>;
}

// Create the context with default values
const ResumeContext = createContext<ResumeContextType>({
  resumeInfo: null,
  setResumeInfo: () => {},
});

// Provider component
export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);

  return (
    <ResumeContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeContext.Provider>
  );
}

// Custom hook to use the resume context
export function useResumeContext() {
  return useContext(ResumeContext);
}

// Made with Bob
