import { API_URLS } from "@/constants/api";
import { GetFullUserProfileResponse } from "@/types/server/dataforge/User/full-profile";

export class UserApiService {
  static async getUserByGithubUsername(
    githubUsername: string,
    allData: boolean = true
  ): Promise<GetFullUserProfileResponse> {
    const url = API_URLS.getUserData(githubUsername, allData);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user data: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }
}
