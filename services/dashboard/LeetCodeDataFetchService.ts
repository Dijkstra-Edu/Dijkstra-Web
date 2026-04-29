
import { API_URLS } from "@/lib/api/url-builders";
import { apiCall } from "@/services/CoreApiService";
import { LeetCodeStatisticsResponse } from "@/types/client/dashboard/leetcode-statistics";

export async function getLeetCodeStatistics(
  leetcodeUsername: string
): Promise<LeetCodeStatisticsResponse> {
    const raw = await apiCall<LeetCodeStatisticsResponse>("dataforge", API_URLS.getLeetcodeStatisticsUrl(leetcodeUsername));
    return raw;
}

