import {
  transformCertifications,
  transformCertificationsArray,
  transformCertificationsToRequest,
  transformCertificationsUpdateRequest,
} from "./transformers/transformers";
import { CertificationsData } from "@/types/client/profile-section/profile-sections";
import { GetCertificationsResponse } from "@/types/server/dataforge/User/profile";
import { apiCall } from "@/services/CoreApiService";

const WP_PATH = "Dijkstra/v1/certifications";

/**
 * Get Certifications by GitHub username
 */
export async function getCertificationsByGithubUsername(
  username: string
): Promise<CertificationsData[]> {
  const response = await apiCall<GetCertificationsResponse[]>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(username)}`
  );
  return transformCertificationsArray(response);
}

/**
 * Add Certifications by GitHub username
 */
export async function addCertificationsByGithubUsername(
  data: Omit<CertificationsData, "id" | "createdAt" | "updatedAt">
): Promise<CertificationsData> {
  const request = transformCertificationsToRequest(data);
  const response = await apiCall<GetCertificationsResponse>("dataforge", WP_PATH, {
    method: "POST",
    body: JSON.stringify(request),
  });
  return transformCertifications(response);
}

/**
 * Update Certifications by Certification ID
 */
export async function updateCertificationsByCertificationId(
  certificationId: string,
  data: Partial<CertificationsData>
): Promise<CertificationsData> {
  const request = transformCertificationsUpdateRequest(data);
  const response = await apiCall<GetCertificationsResponse>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(certificationId)}`,
    {
      method: "PUT",
      body: JSON.stringify(request),
    }
  );
  return transformCertifications(response);
}

/**
 * Delete Certifications by Certification ID
 */
export async function deleteCertificationsByCertificationId(
  certificationId: string
): Promise<void> {
  await apiCall<void>(
    "dataforge",
    `${WP_PATH}/${encodeURIComponent(certificationId)}`,
    {
      method: "DELETE",
    }
  );
}
