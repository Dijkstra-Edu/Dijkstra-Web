/**
 * Get the Helios base URL from environment variables
 * @throws Error if NEXT_PUBLIC_HELIOS_SERVICE_URL is not set
 */
export function getHeliosBaseUrl(): string {
    const baseUrl = process.env.NEXT_PUBLIC_HELIOS_SERVICE_URL;
    if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_HELIOS_SERVICE_URL environment variable is not set');
    }
    return baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
  }