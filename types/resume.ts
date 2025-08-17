// types/resume.ts
export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string[];
  link?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  expectedGraduation?: string;
  gpa?: string;
  honors?: string[];
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    website?: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: {
    programming: {
      expert: string[];
      intermediate: string[];
      beginner: string[];
    };
    technology: string[];
  };
  coursework: {
    graduate: string[];
    undergraduate: string[];
  };
  societies: string[];
  links: {
    github?: string;
    linkedin?: string;
  };
}