import { PersonalDetailsData, WorkExperienceData } from "@/types/client/profile-section/profile-sections";
import { GetPersonalDetailsResponse, GetWorkExperienceResponse, UpdatePersonalDetailsRequest } from "./User/profile";
import { Domain, EmploymentType, Rank, Tools, WorkLocationType } from "./enums";
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