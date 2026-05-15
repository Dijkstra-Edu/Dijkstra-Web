import { apiCall } from "@/services/CoreApiService";
import { UserRankDto } from "@/types/server/helios/rank";

/** Backend path for Gitripper commit data (used with apiCall so generic /api/[...path] proxies to Gitripper). */

export async function fetchUserRank(
  username: string
): Promise<UserRankDto> {
  const path = `user_xp/${encodeURIComponent(username)}`;
  console.log("Fetching user rank:", path);
  const raw = await apiCall<UserRankDto>("helios", path);
  return raw;
}
