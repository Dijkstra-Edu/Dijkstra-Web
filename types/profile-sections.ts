// Profile section types for modular architecture - Updated to match database schema

// Database Enums
export type Rank = 'UNRANKED' | 'IRON_1' | 'IRON_2' | 'IRON_3' | 'BRONZE_1' | 'BRONZE_2' | 'BRONZE_3' | 'SILVER_1' | 'SILVER_2' | 'SILVER_3' | 'GOLD_1' | 'GOLD_2' | 'GOLD_3' | 'PLATINUM_1' | 'PLATINUM_2' | 'PLATINUM_3' | 'DIAMOND_1' | 'DIAMOND_2' | 'DIAMOND_3' | 'EMERALD_1' | 'EMERALD_2' | 'EMERALD_3' | 'LAPIS_1' | 'LAPIS_2' | 'LAPIS_3' | 'QUARTZ_1' | 'QUARTZ_2' | 'QUARTZ_3' | 'SAPHIRE_1' | 'SAPHIRE_2' | 'SAPHIRE_3' | 'OBSIDIAN';

export type Domain = 'FRONTEND' | 'BACKEND' | 'FULLSTACK' | 'SDE_TEST' | 'QUALITY_ASSURANCE' | 'TEST_AUTOMATION' | 'DEVOPS' | 'MLOPS' | 'CI_CD' | 'CLOUD' | 'SITE_RELIABILITY' | 'SOFTWARE_INFRASTRUCTURE' | 'DISTRIBUTED_SYSTEMS' | 'EMBEDDED_IOT' | 'ML_ENGINEERING' | 'ML_RESEARCH' | 'DATA_SCIENCE_ANALYSIS' | 'DATA_ENGINEERING' | 'QUANT_ENGINEERING' | 'ANDROID' | 'IOS' | 'CROSS_PLATFORM_MOBILE' | 'WINDOWS' | 'MACOS' | 'LINUX' | 'CROSS_PLATFORM_PC' | 'COMPUTER_SYSTEMS' | 'COMPILERS' | 'GAME_DEV' | 'APPLICATION_SECURITY' | 'PLATFORM_SECURITY' | 'DEVSECOPS' | 'UI_UX' | 'PRODUCT_MANAGEMENT' | 'PRODUCT_ENGINEERING' | 'TECHNICAL_WRITING' | 'OTHER';

export type WorkLocationType = 'ON_SITE' | 'REMOTE' | 'HYBRID';

export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'SELF_EMPLOYED' | 'FREELANCE' | 'CONTRACT' | 'INTERNSHIP' | 'APPRENTICESHIP' | 'SEASONAL';

export type Tools = 'JAVA' | 'C' | 'CPP' | 'PYTHON' | 'CSHARP' | 'RUST' | 'JAVASCRIPT' | 'TYPESCRIPT' | 'GO' | 'GROOVY' | 'RUBY' | 'PHP' | 'SWIFT' | 'REACTJS' | 'ANGULARJS' | 'NEXTJS' | 'VUEJS' | 'SVELTE' | 'NODEJS' | 'DJANGO' | 'FLASK' | 'SPRINGBOOT' | 'GIT' | 'MARKDOWN' | 'DOCKER' | 'KUBERNETES' | 'HTML' | 'CSS' | 'POSTMAN' | 'FIREBASE' | 'SUPABASE' | 'AWS' | 'AZURE' | 'GCP' | 'HEROKU' | 'DIGITALOCEAN' | 'VERCEL' | 'RAILWAY' | 'NETLIFY' | 'JENKINS' | 'REDIS' | 'MONGODB' | 'MYSQL' | 'MSSQL' | 'POSTGRESQL' | 'SQLITE' | 'ELASTICSEARCH' | 'KAFKA' | 'RABBITMQ' | 'GRAPHQL' | 'COUCHDB' | 'CASSANDRA';

export type CertificationType = 'CERTIFICATE' | 'LICENSE' | 'CERTIFICATION';

export type Cause = 'EDUCATION' | 'ENVIRONMENT' | 'SOCIAL_CAUSES' | 'HUMAN_RIGHT' | 'SCIENCE_TECHNOLOGY';

export type SchoolType = 'UNIVERSITY' | 'COLLEGE' | 'SCHOOL' | 'COURSE' | 'BOOTCAMP' | 'OTHER';

export type Degree = 'BTECH' | 'BSC' | 'BE' | 'BCA' | 'BSCHONS' | 'BDES' | 'BPHIL' | 'MTECH' | 'MSC' | 'ME' | 'MCA' | 'MSR' | 'MBA' | 'MDES' | 'MPHIL' | 'PGDM' | 'PHD' | 'DENG';

export type TestScoreType = 'GRE' | 'GMAT' | 'CGPA' | 'TENTH' | 'TWELFTH';

export interface Company {
  name: string;
  logo_url?: string;
}

export interface Institution {
  name: string;
  logo_url?: string;
}

// Personal Details - matches User table
export interface PersonalDetailsData {
  id: string;
  userId: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  githubUserName: string;
  rank: Rank;
  streak?: number;
  primarySpecialization: Domain;
  secondarySpecializations: Domain[];
  expectedSalaryBucket: Rank;
  timeLeft: number;
  onboardingComplete: boolean;
  dataLoaded: boolean;
  bio?: string;
  location?: string; // UUID reference to Location table
  dreamCompany?: string;
  dreamCompanyLogo?: string;
  dreamPosition?: string;
  toolsToLearn: Tools[];
  createdAt: string;
  updatedAt: string;
}

// Work Experience - matches WorkExperience table
export interface WorkExperienceData {
  id: string;
  profileId: string;
  title: string;
  employmentType: EmploymentType;
  domain: Domain[];
  companyName: string;
  companyLogo?: string;
  currentlyWorking: boolean;
  location?: string; // UUID reference to Location table
  locationType: WorkLocationType;
  startDateMonth: number;
  startDateYear: number;
  endDateMonth?: number;
  endDateYear?: number;
  descriptionGeneral: string;
  descriptionDetailed?: string;
  descriptionLess?: string;
  workDone?: string;
  companyScore?: number;
  timeSpentMultiplier?: number;
  workDoneMultiplier?: number;
  toolsUsed: Tools[];
  createdAt: string;
  updatedAt: string;
}

// Skills - matches Skills table
export interface SkillsData {
  id: string;
  profileId: string;
  skill: Tools;
  domain?: Domain;
  proficiency?: number;
  yearsOfExperience?: number;
  associatedExperience?: string[];
  associatedCertifications?: string[];
  associatedEducations?: string[];
  createdAt: string;
  updatedAt: string;
}

// Education - matches Education table
export interface EducationData {
  id: string;
  profileId: string;
  schoolName: string;
  schoolLogoUrl?: string;
  schoolType: SchoolType;
  degree: Degree;
  courseFieldName: string;
  currentlyStudying: boolean;
  location: string; // UUID reference to Location table
  locationType: WorkLocationType;
  startDateMonth: number;
  startDateYear: number;
  endDateMonth?: number;
  endDateYear?: number;
  descriptionGeneral: string;
  descriptionDetailed?: string;
  descriptionLess?: string;
  workDone?: string;
  schoolScoreMultiplier?: number;
  cgpa?: number;
  toolsUsed: Tools[];
  createdAt: string;
  updatedAt: string;
}

// Projects - matches Projects table
export interface ProjectsData {
  id: string;
  profileId: string;
  name: string;
  organization?: string;
  owner: string; // GitHub username
  private: boolean;
  githubStars: number;
  githubAbout?: string;
  githubOpenIssues: number;
  githubForks: number;
  description: string;
  domain: Domain;
  topics: string[];
  tools: Tools[];
  readme: boolean;
  license: boolean;
  landingPage: boolean;
  landingPageLink?: string;
  docsPage: boolean;
  docsPageLink?: string;
  ownDomainName: boolean;
  domainName?: string;
  totalLinesContributed?: number;
  improperUploads?: boolean;
  complexityRating?: number;
  testingFrameworkPresent: boolean;
  testingFramework?: string;
  projectOrganizationLogo?: string;
  createdAt: string;
  updatedAt: string;
}

// Certifications - matches Certifications table
export interface CertificationsData {
  id: string;
  profileId: string;
  name: string;
  type: CertificationType;
  issuingOrganization: string;
  issueDate: string; // date field
  expiryDate?: string; // date field
  credentialId: string;
  credentialUrl: string;
  tools?: Tools[];
  issuingOrganizationLogo?: string;
  createdAt: string;
  updatedAt: string;
}

// Publications - matches Publications table
export interface PublicationsData {
  id: string;
  profileId: string;
  title: string;
  publisher: string;
  authors: string[];
  publicationDate: string; // date field
  publicationUrl: string;
  description: string;
  tools?: Tools[];
  publisherLogo?: string;
  createdAt: string;
  updatedAt: string;
}

// Volunteering - matches Volunteering table
export interface VolunteeringData {
  id: string;
  profileId: string;
  organization: string;
  role: string;
  cause: Cause;
  startDate: string; // date field
  endDate?: string; // date field
  currentlyVolunteering: boolean;
  description?: string;
  tools?: Tools[];
  organizationLogo?: string;
  createdAt: string;
  updatedAt: string;
}

// Test Scores - matches TestScores table
export interface TestScoresData {
  id: string;
  profileId: string;
  title: string;
  type: TestScoreType;
  score: string;
  testDate: string; // date field
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Common interfaces for forms and display
export interface ProfileSectionProps {
  profileId: string;
  isEditing: boolean;
  onToggleEdit: () => void;
}

export interface ProfileFormProps<T> {
  data: T | undefined;
  onSave: (data: Partial<T>) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export interface ProfileDisplayProps<T> {
  data: T | T[] | undefined;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Mutation types for optimistic updates
export interface CreateMutationData<T> {
  profileId: string;
  data: Omit<T, 'id' | 'profileId' | 'createdAt' | 'updatedAt'>;
}

export interface UpdateMutationData<T> {
  id: string;
  data: Partial<T>;
}

export interface DeleteMutationData {
  id: string;
  profileId: string;
}
