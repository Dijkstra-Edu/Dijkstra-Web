/** Raw LogoDev search API item */

import { CompanySearchResult, LogoDevCompanyItem } from "@/types/client/dashboard/companies";

export function transformLogoDevResponse(data: unknown): CompanySearchResult[] {
  if (!Array.isArray(data)) return [];
  return data.map((item: LogoDevCompanyItem) => ({
    name: item.name ?? "",
    domain: item.domain,
    logo_url: item.logo_url,
  }));
}
