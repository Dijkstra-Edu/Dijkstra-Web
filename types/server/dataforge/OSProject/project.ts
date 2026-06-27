import { Project } from "@/types/client/opportunities/opportunities-types"
import { Difficulty, ProjectLevel, Tools } from "../enums";

export type PaginatedProject = {
    projects: ProjectDto[],
    total: number,
}
export type ProjectDto = {
  id: string;
  title?: string | null;
  project_level?: ProjectLevel | null;
  is_user_project?: boolean | null;
  owner?: string | null;
  organization: string;
  organization_logo?: string | null;
  hero_image?: string | null;
  repository?: string | null;
  languages?: Tools[] | null;
  frameworks?: Tools[] | null;
  stars?: number | null;
  forks?: number | null;
  last_updated?: string | null;
  description?: string | null;
  featured?: boolean | null;
  highlight?: string | null;
  category?: string[] | null;
  difficulty?: Difficulty | null;
  issues_count?: number | null;
  contributors_count?: number | null;
  license?: string | null;
  topics?: string[] | null;
  created_at: string;
  updated_at: string;
  readme?: string | null;
};

export type ProjectFilterHelpersResponseDto = {
   languages: string[],
   categories: string[],
   difficulties: Difficulty[],
   licenses: string[],
}

export type ProjectFilterHelpers = {
languages: string[],
   categories: string[],
   difficulties: Project["difficulty"][],
   licenses: string[],
}