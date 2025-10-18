import type { OnboardUserRequest, OnboardUserResponse, CheckOnboardingStatusResponse, GetUserBasicResponse } from "@/types/server/dataforge/User/user";

export const checkOnboardingStatus = async (username: string): Promise<CheckOnboardingStatusResponse> => {
    const response = await fetch(`/api/onboarding?check=true&username=${encodeURIComponent(username)}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to check onboarding status");
    }

    return response.json();
}

export const onboardUser = async (data: OnboardUserRequest): Promise<OnboardUserResponse> => {
    // Call our Next.js API route instead of the backend directly
    // This avoids CORS issues and keeps the backend URL server-side only
    const response = await fetch('/api/onboarding', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 409) {
            throw new Error("This GitHub account has already been registered");
        } else if (response.status === 400) {
            throw new Error("Invalid data. Please check your selections");
        } else if (response.status === 503) {
            throw new Error("Backend service is currently unavailable. Please Try Again Later. For more information, kindly check dijkstra.org.in/status");
        } else if (response.status === 401) {
            throw new Error("Your session has expired. Please refresh the page and try again.");
        } else {
            throw new Error(errorData.message || errorData.error || "An error occurred. Please try again");
        }
    }

    return response.json();
}

export const getUserByGithubUsername = async (username: string, allData: boolean = false): Promise<GetUserBasicResponse> => {
    // Call our Next.js API route instead of the backend directly
    // This avoids CORS issues and keeps the backend URL server-side only
    const response = await fetch(`/api/user?username=${encodeURIComponent(username)}&all_data=${allData}`, {
        method: "GET",
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 404) {
            throw new Error("User not found");
        } else if (response.status === 401) {
            throw new Error("Unauthorized access");
        } else if (response.status === 503) {
            throw new Error("Backend service is currently unavailable. Please try again later.");
        } else {
            throw new Error(errorData.message || errorData.error || "Failed to fetch user data");
        }
    }

    return response.json();
}