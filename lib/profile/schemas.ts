// Zod validation schemas for profile sections

import { z } from 'zod';
import { SKILL_CATEGORIES, EDUCATION_LEVELS, TEST_TYPES } from '@/constants/profile-constants';

// Company schema
export const companySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  domain: z.string().optional(),
  logo_url: z.string().url().optional().or(z.literal('')),
});

// Institution schema
export const institutionSchema = z.object({
  name: z.string().min(1, 'Institution name is required'),
  logo_url: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
});

export const locationSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  state: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// Personal Details schema (for form data, mapped to database fields)
export const personalDetailsSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().min(10, 'Bio must be at least 10 characters').optional(),
  locationCity: z.string().optional(),
  locationState: z.string().optional(),
  locationCountry: z.string().optional(),
  locationLatitude: z.number().optional(),
  locationLongitude: z.number().optional(),
  primaryEmail: z.string().email('Invalid email address'),
  secondaryEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  universityEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  workEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  githubUserName: z.string().min(1, 'GitHub username is required'),
  linkedinUserName: z.string().optional(),
  orcidUserName: z.string().optional(),
  leetcodeUserName: z.string().optional(),
  dreamCompany: z.string().min(1, 'Dream company is required'),
  dreamCompanyLogo: z.string().optional(),
  dreamPosition: z.string().min(1, 'Dream position is required'),
  expectedSalaryBucket: z.string().min(1, 'Salary range is required'),
  timeLeft: z.number().min(1, 'Time frame must be at least 1 month'),
  primarySpecialization: z.string().min(1, 'Primary specialization is required'),
  secondarySpecializations: z.array(z.string()).max(3, 'Maximum 3 secondary specializations allowed'),
  toolsToLearn: z.array(z.string()).optional(),
});

// Form data type (without system fields)
export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

// Work Experience schema (mapped to database fields)
export const workExperienceSchema = z.object({
  title: z.string().min(1, 'Position is required'),
  employmentType: z.string().min(1, 'Employment type is required'),
  domain: z.array(z.string()).min(1, 'At least one domain is required'),
  companyName: z.string().min(1, 'Company name is required'),
  companyLogo: z.string().optional(),
  currentlyWorking: z.boolean(),
  location: locationSchema,
  locationType: z.string().min(1, 'Location type is required'),
  startDateMonth: z.number().min(1).max(12, 'Invalid month'),
  startDateYear: z.number().min(1900).max(2100, 'Invalid year'),
  endDateMonth: z.number().min(1).max(12, 'Invalid month').optional(),
  endDateYear: z.number().min(1900).max(2100, 'Invalid year').optional(),
  descriptionGeneral: z.string().min(10, 'Description must be at least 10 characters'),
  descriptionDetailed: z.string().optional(),
  descriptionLess: z.string().optional(),
  workDone: z.string().optional(),
  toolsUsed: z.array(z.string()).min(1, 'At least one tool is required'),
});

// Form data type (without system fields)
export type WorkExperienceFormData = z.infer<typeof workExperienceSchema>;

// Skills schema (mapped to database fields)
export const skillsSchema = z.object({
  skill: z.string().min(1, 'Skill is required'),
  domain: z.string().optional(),
  proficiency: z.number().min(1).max(100, 'Proficiency must be between 1 and 100').optional(),
  yearsOfExperience: z.number().min(0, 'Years of experience cannot be negative').optional(),
});

// Form data type (without system fields)
export type SkillsFormData = z.infer<typeof skillsSchema>;

// Education schema (mapped to database fields)
export const educationSchema = z.object({
  schoolName: z.string().min(1, 'School name is required'),
  schoolLogoUrl: z.string().optional(),
  schoolType: z.string().min(1, 'School type is required'),
  degree: z.string().min(1, 'Degree is required'),
  courseFieldName: z.string().min(1, 'Field of study is required'),
  currentlyStudying: z.boolean(),
  location: z.object({
    id: z.string(),
    country: z.string(),
    state: z.string().optional(),
    city: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  locationType: z.string().min(1, 'Location type is required'),
  startDateMonth: z.number().min(1).max(12, 'Invalid month'),
  startDateYear: z.number().min(1900).max(2100, 'Invalid year'),
  endDateMonth: z.number().min(1).max(12, 'Invalid month').optional(),
  endDateYear: z.number().min(1900).max(2100, 'Invalid year').optional(),
  descriptionGeneral: z.string().min(10, 'Description must be at least 10 characters'),
  descriptionDetailed: z.string().optional(),
  descriptionLess: z.string().optional(),
  workDone: z.string().optional(),
  cgpa: z.number().min(0).max(4, 'CGPA must be between 0 and 4').optional(),
  toolsUsed: z.array(z.string()).min(1, 'At least one tool is required'),
});

// Form data type (without system fields)
export type EducationFormData = z.infer<typeof educationSchema>;

// Projects schema (mapped to database fields)
export const projectsSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  organization: z.string().min(1, 'Organization is required'),
  owner: z.string().min(1, 'Owner is required'),
  private: z.boolean(),
  githubStars: z.number().min(0, 'Stars cannot be negative'),
  githubAbout: z.string().min(1, 'GitHub description is required'),
  githubOpenIssues: z.number().min(0, 'Open issues cannot be negative'),
  githubForks: z.number().min(0, 'Forks cannot be negative'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  domain: z.string().min(1, 'Domain is required'),
  topics: z.array(z.string()).min(1, 'At least one topic is required'),
  tools: z.array(z.string()).min(1, 'At least one tool is required'),
  readme: z.boolean(),
  license: z.boolean(),
  landingPage: z.boolean(),
  landingPageLink: z.string().url().optional().or(z.literal('')),
  docsPage: z.boolean(),
  docsPageLink: z.string().url().optional().or(z.literal('')),
  ownDomainName: z.boolean(),
  totalLinesContributed: z.number().min(0, 'Lines of code cannot be negative'),
  improperUploads: z.boolean(),
  complexityRating: z.number().min(1).max(10, 'Complexity rating must be between 1 and 10'),
  testingFrameworkPresent: z.boolean(),
  testingFramework: z.string().optional(),
  projectOrganizationLogo: z.string().optional(),
});

// Form data type (without system fields)
export type ProjectsFormData = z.infer<typeof projectsSchema>;

// Certifications schema (mapped to database fields)
export const certificationsSchema = z.object({
  name: z.string().min(1, 'Certification name is required'),
  type: z.string().min(1, 'Type is required'),
  issuingOrganization: z.string().min(1, 'Issuing organization is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional().or(z.literal('')),
  tools: z.array(z.string()).optional(),
  issuingOrganizationLogo: z.string().optional(),
});

// Form data type (without system fields)
export type CertificationsFormData = z.infer<typeof certificationsSchema>;

// Publications schema (mapped to database fields)
export const publicationsSchema = z.object({
  title: z.string().min(1, 'Publication title is required'),
  publisher: z.string().min(1, 'Publisher is required'),
  authors: z.array(z.string()).min(1, 'At least one author is required'),
  publicationDate: z.string().min(1, 'Publication date is required'),
  publicationUrl: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  tools: z.array(z.string()).optional(),
  publisherLogo: z.string().optional(),
});

// Form data type (without system fields)
export type PublicationsFormData = z.infer<typeof publicationsSchema>;

// Volunteering schema (mapped to database fields)
export const volunteeringSchema = z.object({
  organization: z.string().min(1, 'Organization name is required'),
  role: z.string().min(1, 'Role is required'),
  cause: z.string().min(1, 'Cause is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  currentlyVolunteering: z.boolean(),
  description: z.string().optional(),
  tools: z.array(z.string()).optional(),
  organizationLogo: z.string().optional(),
});

// Form data type (without system fields)
export type VolunteeringFormData = z.infer<typeof volunteeringSchema>;

// Test Scores schema (mapped to database fields)
export const testScoresSchema = z.object({
  title: z.string().min(1, 'Test title is required'),
  type: z.enum(['TENTH', 'TWELFTH', 'CGPA', 'GRE', 'GMAT', 'TOEFL', 'IELTS', 'SAT', 'ACT', 'OTHER']),
  score: z.string().min(1, 'Score is required'),
  testDate: z.string().min(1, 'Test date is required'),
  description: z.string().optional(),
});

// Form data type (without system fields)
export type TestScoresFormData = z.infer<typeof testScoresSchema>;

// Form validation schemas (for partial updates)
export const personalDetailsFormSchema = personalDetailsSchema.partial();
export const workExperienceFormSchema = workExperienceSchema.partial();
export const skillsFormSchema = skillsSchema.partial();
export const educationFormSchema = educationSchema.partial();
export const projectsFormSchema = projectsSchema.partial();
export const certificationsFormSchema = certificationsSchema.partial();
export const publicationsFormSchema = publicationsSchema.partial();
export const volunteeringFormSchema = volunteeringSchema.partial();
export const testScoresFormSchema = testScoresSchema.partial();
