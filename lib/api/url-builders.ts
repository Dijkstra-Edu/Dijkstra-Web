import { API_ENDPOINTS } from "./endpoints";
import { getDateRange } from "../utils";

export const API_URLS = {
  // Onboarding

  // Dashboard
  getUserData: (githubUsername: string, allData = true) =>
    `${API_ENDPOINTS.DATAFORGE_API}/Dijkstra/v1/u/${encodeURIComponent(
      githubUsername
    )}${allData ? "?all_data=true" : ""}`,

  getLeetcodeStatisticsUrl: (leetcodeUsername: string) =>
    `${
      API_ENDPOINTS.DATAFORGE_API
    }/Dijkstra/v1/statistics/lc/${encodeURIComponent(leetcodeUsername)}`,

    //Dashboard - Profile Operations
    

    // Document
} as const;

export const GITRIPPER_API_URLS = {
  // Dashboard
  getGithubCommitInformationByDatesUrl: (
    startDate: string,
    endDate: string,
    loginId: string
  ) =>
    `${API_ENDPOINTS.GITRIPPER_API}/userCommitData/${loginId}/${startDate}/${endDate}`,

  getGithubCommitInformationUrl: (timeRange: string, loginId: string) => {
    const { startTime, endTime } = getDateRange(timeRange);
    return `${API_ENDPOINTS.GITRIPPER_API}/userCommitData/${loginId}/${startTime}/${endTime}`;
  },
} as const;

export const OTHER_API_URLS = {
  //3rd Party
  getLogoDevSearchUrl: (query: string) =>
    `${API_ENDPOINTS.LOGO_DEV_SEARCH}?q=${encodeURIComponent(query)}`,
  getNominatimSearchUrl: (query: string) =>
    `${API_ENDPOINTS.NOMINATIM_SEARCH}?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&limit=5`,
} as const;
