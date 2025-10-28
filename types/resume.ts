// types/resume.ts
// This file contains all types related to resumes

// User profile data types
export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  github_user_name: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  rank: string;
  streak: number;
}

export interface Experience {
  id: number;
  created_at: string;
  updated_at: string;
  profile_id: string;
  title: string;
  employement_type: string;
  domain: string[];
  company_name: string;
  currently_working: boolean;
  location: string;
  location_type: string;
  start_date: string;
  end_date?: string;
  description_general: string;
  description_detailed: string;
  description_less: string;
  work_done: string[];
  company_score: number;
  time_spent_multiplier: number;
  work_done_multiplier: number;
  tools_used: string[];
}

export interface Education {
  id: number;
  created_at: string;
  updated_at: string;
  profile_id: string;
  school: string;
  school_type: string;
  degree: string;
  field: string;
  currently_studying: boolean;
  location: string;
  location_type: string;
  start_date: string;
  end_date?: string;
  description_general: string;
  description_detailed: string;
  description_less: string;
  work_done: string[];
  school_score_multiplier: number;
  tools_used: string[];
}

export interface Project {
  id: number;
  profile_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  organization: string;
  owner: string;
  private: boolean;
  github_stars: number;
  github_about: string;
  github_open_issues: number;
  github_forks: number;
  description: string;
  domain: string;
  topics: string[];
  tools: string[];
  readme: boolean;
  license: boolean;
  landing_page: boolean;
  landing_page_link?: string;
  docs_page: boolean;
  docs_page_link?: string;
  own_domain_name: boolean;
  domain_name?: string;
  total_lines_contributed: number;
  improper_uploads: boolean;
  complexity_rating: number;
  testing_framework_present: boolean;
  testing_framework?: string;
}

export interface Links {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  portfolio_link: string;
  github_user_name: string;
  github_link: string;
  linkedin_user_name: string;
  linkedin_link: string;
  leetcode_user_name: string;
  leetcode_link: string;
  orcid_id: string;
  orcid_link: string;
}

export interface Organization {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  image: string;
  repo_link: string;
}

export interface UserProfileData {
  user: User;
  experience: Experience;
  education: Education[];
  projects: Project[];
  links: Links;
  organizations: Organization[];
}

// Saved resume data type
export interface SavedUserProfileData {
  resumeId: string;
  title: string;
  template: 'deedy' | 'row-based';
  content: Partial<UserProfileData>;
  lastModified: string;
  documentId: string;
  userEmail: string;
  userName: string;
}

export interface SavedResumeData {
  resumeId: string;
  title: string;
  template: 'deedy' | 'row-based';
  content: Partial<UserProfileData>;
  lastModified: string;
  documentId: string;
  userEmail: string;
  userName: string;
}
