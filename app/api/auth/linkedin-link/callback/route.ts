import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../[...nextauth]/authOptions';

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || (process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'http://localhost:3000');

// Exchange authorization code for access token
async function exchangeCodeForToken(code: string): Promise<string> {
  const redirectUri = `${NEXTAUTH_URL}/api/auth/linkedin-link/callback`;
  
  const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: LINKEDIN_CLIENT_ID!,
      client_secret: LINKEDIN_CLIENT_SECRET!,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to exchange code for token: ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Fetch LinkedIn profile data
async function fetchLinkedInProfile(accessToken: string) {
  const response = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch LinkedIn profile: ${errorText}`);
  }

  return response.json();
}

// GET /api/auth/linkedin-link/callback - Handle LinkedIn OAuth callback
export async function GET(request: NextRequest) {
  try {
    // Verify user has GitHub session (required for linking)
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.login) {
      return NextResponse.redirect(
        new URL('/onboarding?step=5&linkedin_error=github_session_required', NEXTAUTH_URL)
      );
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      const errorDescription = searchParams.get('error_description') || error;
      return NextResponse.redirect(
        new URL(`/onboarding?step=5&linkedin_error=${encodeURIComponent(errorDescription)}`, NEXTAUTH_URL)
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        new URL('/onboarding?step=5&linkedin_error=missing_code_or_state', NEXTAUTH_URL)
      );
    }

    // Verify state matches
    const expectedState = `linkedin_link_${session.user.login}`;
    if (state !== expectedState) {
      return NextResponse.redirect(
        new URL('/onboarding?step=5&linkedin_error=invalid_state', NEXTAUTH_URL)
      );
    }

    try {
      // Exchange code for access token
      const accessToken = await exchangeCodeForToken(code);
      
      // Fetch LinkedIn profile
      const profile = await fetchLinkedInProfile(accessToken);
      
      // Prepare LinkedIn data
      const linkedinData = {
        linkedinId: profile.sub || profile.id,
        linkedinName: profile.name || [profile.given_name, profile.family_name].filter(Boolean).join(' ') || undefined,
        linkedinImage: profile.picture || profile.image || undefined,
        linkedinEmail: profile.email || undefined,
      };

      // Store LinkedIn data in persistent cookie (30 days)
      const response = NextResponse.redirect(new URL('/onboarding?step=5&linkedin_success=true', NEXTAUTH_URL));
      response.cookies.set('linkedinData', JSON.stringify(linkedinData), {
        maxAge: 60 * 60 * 24 * 30, // 30 days (persistent storage)
        httpOnly: false, // Allow client-side access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      return response;
    } catch (error) {
      console.error('LinkedIn OAuth callback error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.redirect(
        new URL(`/onboarding?step=5&linkedin_error=${encodeURIComponent(errorMessage)}`, NEXTAUTH_URL)
      );
    }
  } catch (error) {
    console.error('LinkedIn callback error:', error);
    return NextResponse.redirect(
      new URL('/onboarding?step=5&linkedin_error=internal_server_error', NEXTAUTH_URL)
    );
  }
}
