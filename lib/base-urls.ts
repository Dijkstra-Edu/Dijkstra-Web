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
 * Get the Gemini base URL from environment variables
 * @throws Error if GEMINI_API_KEY is not set
 */
export function getGeminiBaseUrl(): string {
  const baseUrl = process.env.GEMINI_API_KEY;
  if (!baseUrl) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }
  return baseUrl;
}