import {
  getArchivistBaseUrl,
  getDataForgeBaseUrl,
  getGitripperBaseUrl,
  getHeliosBaseUrl,
  getLogoDevBaseUrl,
  getNominatimBaseUrl,
} from "../base-urls-keys";

export const API_ENDPOINTS = {
  DATAFORGE_API: getDataForgeBaseUrl(),
  GITRIPPER_API: getGitripperBaseUrl(),
  HELIOS_API: getHeliosBaseUrl(),
  ARCHIVIST_API: getArchivistBaseUrl(),

  LOGO_DEV_SEARCH: getLogoDevBaseUrl(),
  NOMINATIM_SEARCH: getNominatimBaseUrl(),
} as const;
