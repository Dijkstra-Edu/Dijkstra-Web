import { apiCall } from "@/services/CoreApiService";
import { transformLogoDevResponse } from "@/services/dashboard/transformers/companyTransformers";
import { CompanySearchResult, LogoDevCompanyItem } from "@/types/client/dashboard/companies";


/**
 * Search companies via LogoDev API through the generic API proxy.
 * Uses GET /api/logo-dev/search?q=...
 */
export async function searchCompanies(query: string): Promise<CompanySearchResult[]> {
  const trimmed = query?.trim();
  if (!trimmed) {
    return [];
  }
  const path = `search?q=${encodeURIComponent(trimmed)}`;
  const data = await apiCall<LogoDevCompanyItem[]>("logo-dev", path);
  return transformLogoDevResponse(data);
}
