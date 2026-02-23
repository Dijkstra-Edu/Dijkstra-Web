/**
 * Response type for DataForge GET /Dijkstra/v1/statistics/lc/{username}
 */

export interface LeetCodeSubmissionCount {
  difficulty: string;
  count: number;
}

export interface LeetCodeBadge {
  name: string;
  icon: string;
  hoverText: string;
}

export interface LeetCodeStatisticsProfile {
  submitStatsGlobal?: {
    acSubmissionNum: LeetCodeSubmissionCount[];
  };
  badges?: LeetCodeBadge[];
}

export interface LeetCodeContestRanking {
  attendedContestsCount: number;
  rating: number;
  globalRanking: number;
  totalParticipants: number;
  topPercentage: number;
  badge: string | null;
}

export interface LeetCodeStatisticsResponse {
  leetcode?: {
    profile?: LeetCodeStatisticsProfile;
    contestRanking?: LeetCodeContestRanking;
  };
}
