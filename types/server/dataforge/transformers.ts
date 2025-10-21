import { PersonalDetailsData } from "@/types/client/profile-section/profile-sections";
import { GetPersonalDetailsResponse, UpdatePersonalDetailsRequest } from "./User/profile";
import { Domain, Rank, Tools } from "./enums";

export function transformPersonalDetails(personalDetails: GetPersonalDetailsResponse): PersonalDetailsData {
    return {
        githubUserName: personalDetails.github_user_name,
        firstName: personalDetails.first_name,
        middleName: personalDetails.middle_name,
        lastName: personalDetails.last_name,
        bio: personalDetails.bio,
        location: personalDetails.location, //Not Editable Directly
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
        location: undefined,
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