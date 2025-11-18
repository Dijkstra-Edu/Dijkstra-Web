import { EducationData, PersonalDetailsData, WorkExperienceData , CertificationsData, PublicationsData} from "@/types/client/profile-section/profile-sections";
import { GetEducationResponse, GetPersonalDetailsResponse, GetWorkExperienceResponse, UpdatePersonalDetailsRequest, GetCertificationsResponse, GetPublicationsResponse } from "./User/profile";
import { Degree, Domain, EmploymentType, Rank, SchoolType, Tools, WorkLocationType, CertificationType } from "./enums";
import { UUID } from "crypto";

export function transformPersonalDetails(personalDetails: GetPersonalDetailsResponse): PersonalDetailsData {
    return {
        githubUserName: personalDetails.github_user_name,
        firstName: personalDetails.first_name,
        middleName: personalDetails.middle_name,
        lastName: personalDetails.last_name,
        bio: personalDetails.bio,
        locationCity: personalDetails.location_city,
        locationState: personalDetails.location_state,
        locationCountry: personalDetails.location_country,
        locationLatitude: personalDetails.location_latitude,
        locationLongitude: personalDetails.location_longitude,
        primaryEmail: personalDetails.primary_email || "", //Taken From GitHUb by default, can be changed by the user
        
        secondaryEmail: personalDetails.secondary_email,
        universityEmail: personalDetails.school_email,
        workEmail: personalDetails.work_email,
        website: personalDetails.portfolio_link,
        
        linkedinUserName: personalDetails.linkedin_user_name,
        orcidUserName: undefined,
        leetcodeUserName: personalDetails.leetcode_user_name,
        
        dreamCompany: personalDetails.dream_company,
        dreamCompanyLogo: personalDetails.dream_company_logo,
        dreamPosition: personalDetails.dream_position,
        expectedSalaryBucket: personalDetails.expected_salary_bucket,
        timeLeft: personalDetails.time_left,
        primarySpecialization: personalDetails.primary_specialization as Domain,
        secondarySpecializations: personalDetails.secondary_specializations as Domain[],
        toolsToLearn: personalDetails.tools_to_learn as Tools[],
        
        rank: personalDetails.rank as Rank,
        streak: personalDetails.streak || 0,
        
        onboardingComplete: personalDetails.onboarding_complete,
        onboardingJourneyCompleted: personalDetails.onboarding_journey_completed,
        dataLoaded: personalDetails.data_loaded,
    }
}

export function transformPersonalDetailsUpdateRequest(personalDetails: Partial<PersonalDetailsData>): UpdatePersonalDetailsRequest {
    return {
        first_name: personalDetails.firstName,
        middle_name: personalDetails.middleName,
        last_name: personalDetails.lastName,
        bio: personalDetails.bio,
        location_city: personalDetails.locationCity,
        location_state: personalDetails.locationState,
        location_country: personalDetails.locationCountry,
        location_latitude: personalDetails.locationLatitude,
        location_longitude: personalDetails.locationLongitude,
        primary_email: personalDetails.primaryEmail,
        secondary_email: personalDetails.secondaryEmail,
        school_email: personalDetails.universityEmail,
        work_email: personalDetails.workEmail,
        portfolio_link: personalDetails.website,
        linkedin_user_name: personalDetails.linkedinUserName,
        leetcode_user_name: personalDetails.leetcodeUserName,
        dream_company: personalDetails.dreamCompany,
        dream_company_logo: personalDetails.dreamCompanyLogo,
        dream_position: personalDetails.dreamPosition,
        expected_salary_bucket: personalDetails.expectedSalaryBucket as Rank,
        time_left: personalDetails.timeLeft,
        tools_to_learn: personalDetails.toolsToLearn as Tools[],
        primary_specialization: personalDetails.primarySpecialization as Domain,
        secondary_specializations: personalDetails.secondarySpecializations as Domain[],
    }
}

export function transformWorkExperienceArray(workExperience: GetWorkExperienceResponse[]): WorkExperienceData[] {
    return workExperience.map((workExperience) => transformWorkExperience(workExperience));
}

export function transformWorkExperience(workExperience: GetWorkExperienceResponse): WorkExperienceData {
    return {
        id: workExperience.id,
        profileId: workExperience.profile_id,
        title: workExperience.title,
        employmentType: workExperience.employment_type as EmploymentType,
        domain: workExperience.domain as Domain[],
        companyName: workExperience.company_name,
        companyLogo: workExperience.company_logo,
        currentlyWorking: workExperience.currently_working,
        location: workExperience.location ? {
            id: workExperience.location.id as UUID,
            country: workExperience.location.country as string,
            state: workExperience.location.state as string,
            city: workExperience.location.city as string,
            latitude: workExperience.location.latitude as number,
            longitude: workExperience.location.longitude as number,
        } : undefined,
        locationType: workExperience.location_type as WorkLocationType,
        startDateMonth: workExperience.start_date_month,
        startDateYear: workExperience.start_date_year,
        endDateMonth: workExperience.end_date_month || undefined,
        endDateYear: workExperience.end_date_year || undefined,
        descriptionGeneral: workExperience.description_general,
        descriptionDetailed: workExperience.description_detailed || undefined,
        descriptionLess: workExperience.description_less || undefined,
        workDone: workExperience.work_done || undefined,
        toolsUsed: workExperience.tools_used || [],
    }
}

export function transformWorkExperienceToRequest(workExperience: Omit<WorkExperienceData, 'id' | 'createdAt' | 'updatedAt'>): Omit<GetWorkExperienceResponse, 'id'> {
    return {
        profile_id: workExperience.profileId as UUID,
        title: workExperience.title,
        employment_type: workExperience.employmentType as EmploymentType,
        domain: workExperience.domain as Domain[],
        company_name: workExperience.companyName,
        company_logo: workExperience.companyLogo,
        currently_working: workExperience.currentlyWorking,
        location: workExperience.location ? {
            id: workExperience.location.id as UUID,
            country: workExperience.location.country,
            state: workExperience.location.state || "",
            city: workExperience.location.city,
            latitude: workExperience.location.latitude || 0,
            longitude: workExperience.location.longitude || 0,
        } : undefined,
        location_type: workExperience.locationType as WorkLocationType,
        start_date_month: workExperience.startDateMonth,
        start_date_year: workExperience.startDateYear,
        end_date_month: workExperience.endDateMonth,
        end_date_year: workExperience.endDateYear,
        description_general: workExperience.descriptionGeneral,
        description_detailed: workExperience.descriptionDetailed,
        description_less: workExperience.descriptionLess,
        work_done: workExperience.workDone,
        tools_used: workExperience.toolsUsed as Tools[],
    }
}

export function transformWorkExperienceUpdateRequest(workExperience: Partial<WorkExperienceData>): Partial<GetWorkExperienceResponse> {
    return {
        profile_id: workExperience.profileId as UUID,
        title: workExperience.title,
        employment_type: workExperience.employmentType as EmploymentType,
        domain: workExperience.domain as Domain[],
        company_name: workExperience.companyName,
        company_logo: workExperience.companyLogo,
        currently_working: workExperience.currentlyWorking,
        location: workExperience.location ? {
            id: workExperience.location.id as UUID,
            country: workExperience.location.country,
            state: workExperience.location.state || "",
            city: workExperience.location.city,
            latitude: workExperience.location.latitude || 0,
            longitude: workExperience.location.longitude || 0,
        } : undefined,
        location_type: workExperience.locationType as WorkLocationType,
        start_date_month: workExperience.startDateMonth,
        start_date_year: workExperience.startDateYear,
        end_date_month: workExperience.endDateMonth,
        end_date_year: workExperience.endDateYear,
        description_general: workExperience.descriptionGeneral,
        description_detailed: workExperience.descriptionDetailed,
        description_less: workExperience.descriptionLess,
        work_done: workExperience.workDone,
        tools_used: workExperience.toolsUsed as Tools[],
    }
}


export function transformCertificationsArray(certificationsArray: GetCertificationsResponse[]): CertificationsData[] {
    return certificationsArray.map((certification) => transformCertifications(certification));
}


export function transformCertifications(certification: GetCertificationsResponse): CertificationsData {
    return  {
          id: certification.id,
          profileId: certification.profile_id,        
          name: certification.name, 
          type: certification.type as CertificationType,
          issuingOrganization: certification.issuing_organization,
          issueDate: certification.issue_date, // date field
          expiryDate: certification.expiry_date || undefined, // date field
          credentialId: certification.credential_id,
          credentialUrl: certification.credential_url,
          tools: certification.tools as Tools[] || undefined,
          issuingOrganizationLogo: certification.issuing_organization_logo || undefined,
    }
}

export function transformCertificationsToRequest(certification: Omit<CertificationsData, 'id' | 'createdAt' | 'updatedAt'>): Omit<GetCertificationsResponse, 'id'> {
    return {
          
          profile_id: certification.profileId as UUID,        
          name: certification.name, 
          type: certification.type as CertificationType,
          issuing_organization: certification.issuingOrganization,
          issue_date: certification.issueDate, // date field
          expiry_date: certification.expiryDate || undefined, // date field
          credential_id: certification.credentialId,
          credential_url: certification.credentialUrl,
          tools: certification.tools as Tools[] || undefined,
          issuing_organization_logo: certification.issuingOrganizationLogo || undefined,
    }
}

export function transformCertificationsUpdateRequest(certification: Partial<CertificationsData>): Partial<GetCertificationsResponse> {
    return {
          profile_id: certification.profileId as UUID,        
          name: certification.name, 
          type: certification.type as CertificationType,
          issuing_organization: certification.issuingOrganization,
          issue_date: certification.issueDate, // date field
          expiry_date: certification.expiryDate || undefined, // date field
          credential_id: certification.credentialId,
          credential_url: certification.credentialUrl,
          tools: certification.tools as Tools[] || undefined,
          issuing_organization_logo: certification.issuingOrganizationLogo || undefined,
    }
}



export function transformEducationArray(educationArray: GetEducationResponse[]): EducationData[] {
    return educationArray.map((education) => transformEducation(education));
}

export function transformEducation(education: GetEducationResponse): EducationData {
    return {
        id: education.id,
        profileId: education.profile_id,
        schoolName: education.school_name,
        schoolLogoUrl: education.school_logo_url,
        schoolType: education.school_type as SchoolType,
        degree: education.degree as Degree,
        courseFieldName: education.course_field_name,
        currentlyStudying: education.currently_studying,
        location: education.location ? {
            id: education.location.id as UUID,
            country: education.location.country as string,
            state: education.location.state as string,
            city: education.location.city as string,
            latitude: education.location.latitude as number,
            longitude: education.location.longitude as number,
        } : undefined,
        locationType: education.location_type as WorkLocationType,
        startDateMonth: education.start_date_month,
        startDateYear: education.start_date_year,
        endDateMonth: education.end_date_month || undefined,
        endDateYear: education.end_date_year || undefined,
        descriptionGeneral: education.description_general,
        descriptionDetailed: education.description_detailed || undefined,
        descriptionLess: education.description_less || undefined,
        workDone: education.work_done || undefined,
        cgpa: education.cgpa,
        toolsUsed: education.tools_used || [],
    }
}

export function transformEducationToRequest(education: Omit<EducationData, 'id' | 'createdAt' | 'updatedAt'>): Omit<GetEducationResponse, 'id'> {
    return {
        profile_id: education.profileId as UUID,
        school_name: education.schoolName,
        school_logo_url: education.schoolLogoUrl,
        school_type: education.schoolType as SchoolType,
        degree: education.degree as Degree,
        course_field_name: education.courseFieldName,
        currently_studying: education.currentlyStudying,
        location: education.location ? {
            id: education.location.id as UUID,
            country: education.location.country,
            state: education.location.state || "",
            city: education.location.city,
            latitude: education.location.latitude || 0,
            longitude: education.location.longitude || 0,
        } : undefined,
        location_type: education.locationType as WorkLocationType,
        start_date_month: education.startDateMonth,
        start_date_year: education.startDateYear,
        end_date_month: education.endDateMonth,
        end_date_year: education.endDateYear,
        description_general: education.descriptionGeneral,
        description_detailed: education.descriptionDetailed,
        description_less: education.descriptionLess,
        work_done: education.workDone,
        cgpa: education.cgpa,
        tools_used: education.toolsUsed as Tools[],
    }
}

export function transformEducationUpdateRequest(education: Partial<EducationData>): Partial<GetEducationResponse> {
    return {
        profile_id: education.profileId as UUID,
        school_name: education.schoolName,
        school_logo_url: education.schoolLogoUrl,
        school_type: education.schoolType as SchoolType,
        degree: education.degree as Degree,
        course_field_name: education.courseFieldName,
        currently_studying: education.currentlyStudying,
        location: education.location ? {
            id: education.location.id as UUID,
            country: education.location.country,
            state: education.location.state || "",
            city: education.location.city,
            latitude: education.location.latitude || 0,
            longitude: education.location.longitude || 0,
        } : undefined,
        location_type: education.locationType as WorkLocationType,
        start_date_month: education.startDateMonth,
        start_date_year: education.startDateYear,
        end_date_month: education.endDateMonth,
        end_date_year: education.endDateYear,
        description_general: education.descriptionGeneral,
        description_detailed: education.descriptionDetailed,
        description_less: education.descriptionLess,
        work_done: education.workDone,
        cgpa: education.cgpa,
        tools_used: education.toolsUsed as Tools[],
    }
}

export function transformPublicationsArray(publicationsArray: GetPublicationsResponse[]): PublicationsData[] {
    return publicationsArray.map((publication) => transformPublications(publication));
}

export function transformPublications(publication: GetPublicationsResponse): PublicationsData {
    return {
        id: publication.id,
        profileId: publication.profile_id,
        title: publication.title,
        authors: publication.authors,
        publicationDate: publication.publication_date,
        publisher: publication.publisher,
        publicationUrl: publication.publication_url,
        description: publication.description,
        publisherLogo: publication.publisher_logo || undefined,
        tools: publication.tools as Tools[] || undefined,
    }
}

export function transformPublicationsToRequest(publication: Omit<PublicationsData, 'id' | 'createdAt' | 'updatedAt'>): Omit<GetPublicationsResponse, 'id' | 'created_at' | 'updated_at'> {
    return {
        profile_id: publication.profileId as UUID,
        title: publication.title,
        authors: publication.authors,
        publication_date: publication.publicationDate,
        publisher: publication.publisher,
        publication_url: publication.publicationUrl,
        description: publication.description,
        publisher_logo: publication.publisherLogo,
        tools: publication.tools as Tools[] 
    }
}

export function transformPublicationsUpdateRequest(publication: Partial<PublicationsData>): Partial<GetPublicationsResponse> {
    return {
        profile_id: publication.profileId as UUID,
        title: publication.title,
        authors: publication.authors,
        publication_date: publication.publicationDate,
        publisher: publication.publisher,
        publication_url: publication.publicationUrl,
        description: publication.description,
        publisher_logo: publication.publisherLogo,
        tools: publication.tools as Tools[] ,
    }
}

