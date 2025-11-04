import { NextRequest } from 'next/server';
import { Session } from 'next-auth';

/**
 * Helper function to get LinkedIn data from session or cookie
 * Used server-side in API routes and server components
 */
export async function getLinkedInData(
  request: NextRequest,
  session?: Session | null
): Promise<{
  linkedinId: string;
  linkedinName?: string;
  linkedinImage?: string;
  linkedinEmail?: string;
} | null> {
  // Check session first (if LinkedIn was merged into JWT)
  if (session?.user) {
    const user = session.user as any;
    if (user.linkedinId) {
      return {
        linkedinId: user.linkedinId,
        linkedinName: user.linkedinName,
        linkedinImage: user.linkedinImage,
        linkedinEmail: user.linkedinEmail,
      };
    }
  }

  // Fallback to cookie (persistent storage)
  const cookie = request.cookies.get('linkedinData')?.value;
  if (cookie) {
    try {
      return JSON.parse(cookie);
    } catch (error) {
      return null;
    }
  }

  return null;
}
