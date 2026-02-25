import {
  transformTestScores,
  transformTestScoresArray,
  transformTestScoresToRequest,
  transformTestScoresUpdateRequest,
} from "./transformers/transformers";
import { TestScoresData } from "@/types/client/profile-section/profile-sections";
import { GetTestScoresResponse } from "@/types/server/dataforge/User/profile";
import { apiCall } from "@/services/CoreApiService";

const TEST_SCORES_PATH = "Dijkstra/v1/test-scores";

/**
 * Get Test Scores by GitHub username
 */
export async function getTestScoresByGithubUsername(
  username: string
): Promise<TestScoresData[]> {
  const response = await apiCall<GetTestScoresResponse[]>(
    "dataforge",
    `${TEST_SCORES_PATH}/${encodeURIComponent(username)}`
  );
  return transformTestScoresArray(response);
}

/**
 * Add Test Score by GitHub username
 */
export async function addTestScoresByGithubUsername(
  data: Omit<TestScoresData, "id" | "createdAt" | "updatedAt">
): Promise<TestScoresData> {
  const request = transformTestScoresToRequest(data);
  const response = await apiCall<GetTestScoresResponse>(
    "dataforge",
    TEST_SCORES_PATH,
    {
      method: "POST",
      body: JSON.stringify(request),
    }
  );
  return transformTestScores(response);
}

/**
 * Update Test Score by Test Score ID
 */
export async function updateTestScoresByTestScoreId(
  testScoreId: string,
  data: Partial<TestScoresData>
): Promise<TestScoresData> {
  const request = transformTestScoresUpdateRequest(data);
  const response = await apiCall<GetTestScoresResponse>(
    "dataforge",
    `${TEST_SCORES_PATH}/${encodeURIComponent(testScoreId)}`,
    {
      method: "PUT",
      body: JSON.stringify(request),
    }
  );
  return transformTestScores(response);
}

/**
 * Delete Test Score by Test Score ID
 */
export async function deleteTestScoresByTestScoreId(
  testScoreId: string
): Promise<void> {
  await apiCall<void>(
    "dataforge",
    `${TEST_SCORES_PATH}/${encodeURIComponent(testScoreId)}`,
    {
      method: "DELETE",
    }
  );
}
