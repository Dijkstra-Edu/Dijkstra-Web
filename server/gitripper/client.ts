/**
 * Get the Gitripper base URL from environment variables
 * @throws Error if NEXT_PUBLIC_GITRIPPER_SERVICE_URL is not set
 */
export function getGitripperBaseUrl(): string {
    const baseUrl = process.env.NEXT_PUBLIC_GITRIPPER_SERVICE_URL;
    if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_GITRIPPER_SERVICE_URL environment variable is not set');
    }
    return baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
  }