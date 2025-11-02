/**
 * Utilities to transform API response data to Resume Builder format
 * Converts GetFullUserProfileResponse to UserProfileData (resume format)
 */

import { GetFullUserProfileResponse, EducationResponse, WorkExperienceResponse, ProjectResponse } from "@/types/server/dataforge/User/full-profile";
import { UserProfileData, User, Education, Experience, Project, Links } from "@/types/resume";

/**
 * Transform full user profile API response to resume data format
 * Handles null/undefined values gracefully
 */
export function transformFullUserProfileToResumeData(
  apiResponse: GetFullUserProfileResponse
): Partial<UserProfileData> {
  return {
    user: transformUser(apiResponse),
    links: transformLinks(apiResponse),
    education: transformEducationArray(apiResponse.profile.education),
    experience: transformPrimaryWorkExperience(apiResponse.profile.work_experience),
    projects: transformProjectsArray(apiResponse.profile.projects),
    organizations: [], // Not in API response, keeping empty array
  };
}

/**
 * Transform user basic info
 */
function transformUser(apiResponse: GetFullUserProfileResponse): User {
  return {
    id: apiResponse.id,
    created_at: apiResponse.created_at,
    updated_at: apiResponse.updated_at,
    github_user_name: apiResponse.github_user_name,
    first_name: apiResponse.first_name || '',
    middle_name: apiResponse.middle_name,
    last_name: apiResponse.last_name || '',
    rank: apiResponse.rank,
    streak: apiResponse.streak || 0,
  };
}

/**
 * Transform links data
 */
function transformLinks(apiResponse: GetFullUserProfileResponse): Links {
  const links = apiResponse.links;
  
  return {
    id: apiResponse.id,
    user_id: apiResponse.id,
    created_at: apiResponse.created_at,
    updated_at: apiResponse.updated_at,
    portfolio_link: links.portfolio_link || '',
    github_user_name: links.github_user_name || apiResponse.github_user_name,
    github_link: links.github_link || `https://github.com/${apiResponse.github_user_name}`,
    linkedin_user_name: links.linkedin_user_name || '',
    linkedin_link: links.linkedin_link || '',
    leetcode_user_name: links.leetcode_user_name || '',
    leetcode_link: links.leetcode_link || '',
    orcid_id: links.orcid_id || '',
    orcid_link: links.orcid_link || '',
  };
}

/**
 * Transform education array from API to resume format
 */
function transformEducationArray(educationArray: EducationResponse[]): Education[] {
  if (!educationArray || educationArray.length === 0) {
    return [];
  }

  return educationArray.map((edu) => transformEducation(edu));
}

/**
 * Transform single education entry
 */
function transformEducation(edu: EducationResponse): Education {
  // Format dates from month/year to ISO string
  const startDate = `${edu.start_date_year}-${String(edu.start_date_month).padStart(2, '0')}-01`;
  const endDate = edu.end_date_year && edu.end_date_month
    ? `${edu.end_date_year}-${String(edu.end_date_month).padStart(2, '0')}-01`
    : undefined;

  // Format location
  const location = edu.location 
    ? [edu.location.city, edu.location.state, edu.location.country]
        .filter(Boolean)
        .join(', ')
    : '';

  return {
    id: parseInt(edu.id as unknown as string) || Date.now(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile_id: edu.profile_id,
    school: edu.school_name,
    school_type: edu.school_type,
    degree: edu.degree,
    field: edu.course_field_name,
    currently_studying: edu.currently_studying,
    location: location,
    location_type: edu.location_type,
    start_date: startDate,
    end_date: endDate,
    description_general: edu.description_general,
    description_detailed: edu.description_detailed || '',
    description_less: edu.description_less || '',
    work_done: parseWorkDone(edu.work_done),
    school_score_multiplier: edu.school_score_multiplier || 1,
    tools_used: edu.tools_used || [],
  };
}

/**
 * Transform work experience - get the primary/most recent one for resume
 * Resume format expects single experience, not array
 */
function transformPrimaryWorkExperience(workExperienceArray: WorkExperienceResponse[]): Experience {
  if (!workExperienceArray || workExperienceArray.length === 0) {
    // Return empty experience object
    return createEmptyExperience();
  }

  // Sort by currently_working first, then by start date (most recent)
  const sortedExperience = [...workExperienceArray].sort((a, b) => {
    if (a.currently_working && !b.currently_working) return -1;
    if (!a.currently_working && b.currently_working) return 1;
    
    const aDate = new Date(a.start_date_year, a.start_date_month - 1);
    const bDate = new Date(b.start_date_year, b.start_date_month - 1);
    return bDate.getTime() - aDate.getTime();
  });

  return transformWorkExperience(sortedExperience[0]);
}

/**
 * Transform single work experience entry
 */
function transformWorkExperience(exp: WorkExperienceResponse): Experience {
  // Format dates from month/year to ISO string
  const startDate = `${exp.start_date_year}-${String(exp.start_date_month).padStart(2, '0')}-01`;
  const endDate = exp.end_date_year && exp.end_date_month
    ? `${exp.end_date_year}-${String(exp.end_date_month).padStart(2, '0')}-01`
    : undefined;

  // Format location
  const location = exp.location 
    ? [exp.location.city, exp.location.state, exp.location.country]
        .filter(Boolean)
        .join(', ')
    : '';

  return {
    id: parseInt(exp.id as unknown as string) || Date.now(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile_id: exp.profile_id,
    title: exp.title,
    employement_type: exp.employment_type,
    domain: exp.domain || [],
    company_name: exp.company_name,
    currently_working: exp.currently_working,
    location: location,
    location_type: exp.location_type,
    start_date: startDate,
    end_date: endDate,
    description_general: exp.description_general,
    description_detailed: exp.description_detailed || '',
    description_less: exp.description_less || '',
    work_done: parseWorkDone(exp.work_done),
    company_score: exp.company_score || 0,
    time_spent_multiplier: exp.time_spent_multiplier || 1,
    work_done_multiplier: exp.work_done_multiplier || 1,
    tools_used: exp.tools_used || [],
  };
}

/**
 * Create an empty experience object
 */
function createEmptyExperience(): Experience {
  return {
    id: Date.now(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    profile_id: '',
    title: '',
    employement_type: 'FULL_TIME',
    domain: [],
    company_name: '',
    currently_working: false,
    location: '',
    location_type: 'ON_SITE',
    start_date: '',
    description_general: '',
    description_detailed: '',
    description_less: '',
    work_done: [],
    company_score: 0,
    time_spent_multiplier: 1,
    work_done_multiplier: 1,
    tools_used: [],
  };
}

/**
 * Transform projects array
 */
function transformProjectsArray(projectsArray: ProjectResponse[]): Project[] {
  if (!projectsArray || projectsArray.length === 0) {
    return [];
  }

  return projectsArray.map((proj) => transformProject(proj));
}

/**
 * Transform single project entry
 */
function transformProject(proj: ProjectResponse): Project {
  return {
    id: parseInt(proj.id as unknown as string) || Date.now(),
    profile_id: proj.profile_id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: proj.name,
    organization: proj.organization || '',
    owner: proj.owner,
    private: proj.private,
    github_stars: proj.github_stars,
    github_about: proj.github_about || '',
    github_open_issues: proj.github_open_issues,
    github_forks: proj.github_forks,
    description: proj.description,
    domain: proj.domain,
    topics: proj.topics,
    tools: proj.tools,
    readme: proj.readme,
    license: proj.license,
    landing_page: proj.landing_page,
    landing_page_link: proj.landing_page_link,
    docs_page: proj.docs_page,
    docs_page_link: proj.docs_page_link,
    own_domain_name: proj.own_domain_name,
    domain_name: proj.domain_name,
    total_lines_contributed: proj.total_lines_contributed || 0,
    improper_uploads: proj.improper_uploads || false,
    complexity_rating: proj.complexity_rating || 0,
    testing_framework_present: proj.testing_framework_present,
    testing_framework: proj.testing_framework,
  };
}

/**
 * Parse work_done field which might be a string or array
 */
function parseWorkDone(workDone: string | undefined): string[] {
  if (!workDone) return [];
  
  // If it's already parsed, return it
  if (Array.isArray(workDone)) return workDone;
  
  // Try to parse as JSON array
  try {
    const parsed = JSON.parse(workDone);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // Not valid JSON, continue to split by delimiters
  }
  
  // Split by newlines or bullets
  return workDone
    .split(/\n|•|●|·/)
    .map(item => item.trim())
    .filter(Boolean);
}
