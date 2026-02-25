// Services Base URLs

/**
 * Get the DataForge base URL from environment variables
 * @throws Error if NEXT_PUBLIC_DATAFORGE_SERVICE_URL is not set
 */
export function getDataForgeBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_DATAFORGE_SERVICE_URL;
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_DATAFORGE_SERVICE_URL environment variable is not set"
    );
  }
  return baseUrl.replace(/\/+$/, ""); // Remove trailing slashes
}

/**
 * Get the Gitripper base URL from environment variables
 * @throws Error if NEXT_PUBLIC_GITRIPPER_SERVICE_URL is not set
 */
export function getGitripperBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_GITRIPPER_SERVICE_URL;
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_GITRIPPER_SERVICE_URL environment variable is not set"
    );
  }
  return baseUrl.replace(/\/+$/, ""); // Remove trailing slashes
}

/**
 * Get the Helios base URL from environment variables
 * @throws Error if NEXT_PUBLIC_HELIOS_SERVICE_URL is not set
 */
export function getHeliosBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_HELIOS_SERVICE_URL;
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_HELIOS_SERVICE_URL environment variable is not set"
    );
  }
  return baseUrl.replace(/\/+$/, ""); // Remove trailing slashes
}

/**
 * Get the Archivist base URL from environment variables
 * @throws Error if NEXT_PUBLIC_ARCHIVIST_SERVICE_URL is not set
 */
export function getArchivistBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_ARCHIVIST_SERVICE_URL;
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_ARCHIVIST_SERVICE_URL environment variable is not set"
    );
  }
  return baseUrl.replace(/\/+$/, ""); // Remove trailing slashes
}

// 3rd Party API Base URLs

/**
 * Get the Logo Dev base URL (origin only; append /search for search endpoint).
 */
export function getLogoDevBaseUrl(): string {
  return "https://api.logo.dev";
}

/**
 * Get the Nominatim base URL (origin only; append /search for search endpoint).
 */
export function getNominatimBaseUrl(): string {
  return "https://nominatim.openstreetmap.org";
}


// KEYs

/**
 * Get the LOGODEV_API_PUBLIC_KEY from environment variables
 * @throws Error if NEXT_PUBLIC_LOGODEV_API_PUBLIC_KEY is not set
 */
export function getLogoDevApiPublicKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_LOGODEV_API_PUBLIC_KEY;
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_LOGODEV_API_PUBLIC_KEY environment variable is not set");
  }
  return apiKey;
}

/**
 * Get the LOGODEV_API_PRIVATE_KEY from environment variables
 * @throws Error if LOGODEV_API_KEY is not set
 */
export function getLogoDevApiPrivateKey(): string {
  const apiKey = process.env.LOGODEV_API_KEY;
  if (!apiKey) {
    throw new Error("LOGODEV_API_KEY environment variable is not set");
  } 
  return apiKey;
}

/** Get Gemini API Key from environment variables
 * @throws Error if GEMINI_API_KEY is not set
 */
export function getGeminiApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }
  return apiKey;
}