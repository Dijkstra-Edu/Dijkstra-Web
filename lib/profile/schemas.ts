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

// Personal Details schema (for form data, without system fields)
export const personalDetailsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  location: z.string().min(1, 'Location is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  github: z.string().min(1, 'GitHub username is required'),
  linkedin: z.string().min(1, 'LinkedIn username is required'),
  dreamCompany: z.string().min(1, 'Dream company is required'),
  dreamPosition: z.string().min(1, 'Dream position is required'),
  wantedSalary: z.string().min(1, 'Salary range is required'),
  timeFrame: z.number().min(1, 'Time frame must be at least 1 month'),
  primaryPath: z.string().min(1, 'Primary path is required'),
  secondaryPaths: z.array(z.string()).max(3, 'Maximum 3 secondary paths allowed'),
});

// Form data type (without system fields)
export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;

// Work Experience schema
export const workExperienceSchema = z.object({
  company: companySchema.nullable(),
  position: z.string().min(1, 'Position is required'),
  startDate: z.date(),
  endDate: z.date().nullable(),
  current: z.boolean(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
});

// Form data type (without system fields)
export type WorkExperienceFormData = z.infer<typeof workExperienceSchema>;

// Skills schema
export const skillsSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.enum(SKILL_CATEGORIES),
  proficiency: z.number().min(1).max(100, 'Proficiency must be between 1 and 100'),
  yearsOfExperience: z.number().min(0, 'Years of experience cannot be negative'),
});

// Form data type (without system fields)
export type SkillsFormData = z.infer<typeof skillsSchema>;

// Education schema
export const educationSchema = z.object({
  institution: institutionSchema,
  degree: z.enum(EDUCATION_LEVELS),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  startDate: z.date(),
  endDate: z.date().nullable(),
  current: z.boolean(),
  gpa: z.number().min(0).max(4.0).optional(),
  description: z.string().optional(),
});

// Projects schema
export const projectsSchema = z.object({
  title: z.string().min(1, 'Project title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  startDate: z.date(),
  endDate: z.date().nullable(),
  current: z.boolean(),
});

// Certifications schema
export const certificationsSchema = z.object({
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  issueDate: z.date(),
  expiryDate: z.date().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional().or(z.literal('')),
});

// Publications schema
export const publicationsSchema = z.object({
  title: z.string().min(1, 'Publication title is required'),
  authors: z.array(z.string()).min(1, 'At least one author is required'),
  publication: z.string().min(1, 'Publication name is required'),
  publishDate: z.date(),
  doi: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
});

// Volunteering schema
export const volunteeringSchema = z.object({
  organization: z.string().min(1, 'Organization name is required'),
  role: z.string().min(1, 'Role is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startDate: z.date(),
  endDate: z.date().nullable(),
  current: z.boolean(),
  hoursPerWeek: z.number().min(0).optional(),
  totalHours: z.number().min(0).optional(),
});

// Test Scores schema
export const testScoresSchema = z.object({
  testName: z.enum(TEST_TYPES),
  score: z.string().min(1, 'Score is required'),
  percentile: z.number().min(0).max(100).optional(),
  testDate: z.date(),
  validityDate: z.date().optional(),
  description: z.string().optional(),
});

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
