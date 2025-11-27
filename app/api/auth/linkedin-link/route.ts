import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/authOptions';

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || (process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'http://localhost:3000');

// Generate LinkedIn OAuth authorization URL
function getLinkedInAuthUrl(state: string): string {
  const redirectUri = `${NEXTAUTH_URL}/api/auth/linkedin-link/callback`;
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: LINKEDIN_CLIENT_ID!,
    redirect_uri: redirectUri,
    state,
    scope: 'profile email openid', // URLSearchParams handles encoding automatically
  });
  
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}

// GET /api/auth/linkedin-link - Initiate LinkedIn OAuth flow
export async function GET(request: NextRequest) {
  try {
    // Verify user has GitHub session (required for linking)
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.login) {
      return NextResponse.json(
        { error: 'GitHub session required. Please sign in with GitHub first.' },
        { status: 401 }
      );
    }

    // Initiate OAuth flow - redirect to LinkedIn
    const state = `linkedin_link_${session.user.login}`;
    const authUrl = getLinkedInAuthUrl(state);
    
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('LinkedIn link error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
