import { getJobListings as getJobListings } from "@/services/dashboard/OpportunitiesService";
import { useQuery } from "@tanstack/react-query";

export function useFetchJobsByCategory(category?: string, limit: string = "20") {
  return useQuery({
    queryKey: ["jobs", category, limit],
    queryFn: async () => {
        const params = new Map();
        params.set("limit", limit); // TODO: This is an issue with caching fix it later, we want to cache by category but if we set a limit here it will always return 20 results and if we change the limit it will create a new cache entry
        if (category) {
        switch (category) {
          case "featured":
            params.set("featured", "true");
            break
          case "engineering":
            params.set("department", "engineering");
            break;
          case "remote":
            params.set("location_type", "REMOTE");
            break;
        }
    }
        const [jobs, total] = await getJobListings(params);
        return jobs;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

export function useFetchJobsFiltered(titleFilter?: string, locationFilter?: string, departmentFilter?: string, locationTypeFilter?: string, employmentTypeFilter?: string, experienceLevelFilter?: string, limit: string = "20", page: string = "1") {
  return useQuery({
    queryKey: ["jobs", titleFilter, locationFilter, departmentFilter, locationTypeFilter, employmentTypeFilter, experienceLevelFilter, limit, page],
    queryFn: async () => {
        const params = new Map();
        params.set("limit", limit); // TODO: This is an issue with caching fix it later, we want to cache by category but if we set a limit here it will always return 20 results and if we change the limit it will create a new cache entry
        params.set("page", page);
        if (titleFilter) {
            params.set("title", titleFilter);
        }
        if (locationFilter) {
            params.set("location", locationFilter);
        }
        if (departmentFilter) {
            params.set("department", departmentFilter);
        }
        if (locationTypeFilter) {
            params.set("location_type", locationTypeFilter.toUpperCase().replace("-", "_"));
        }
        if (employmentTypeFilter) {
            params.set("employment_type", employmentTypeFilter.replace("-", "_").toUpperCase());
        }
        if (experienceLevelFilter) {
            params.set("experience_level", experienceLevelFilter);
        }
        return getJobListings(params);
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}