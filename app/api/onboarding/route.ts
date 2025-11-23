import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { checkOnboardingStatus, submitOnboarding } from '@/server/dataforge/User/user';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const check = searchParams.get('check');
    const username = searchParams.get('username');

    if (check !== 'true' || !username) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const data = await checkOnboardingStatus(username);
    return NextResponse.json(data);
  } catch (error) {
    
    if (error instanceof Error) {
      if (error.message.includes('Backend service unavailable')) {
        return NextResponse.json(
          { 
            error: 'Backend service unavailable',
            message: 'Unable to connect to the backend server. Please ensure the DataForge service is running.',
            details: error.message
          }, 
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Internal server error', 
          message: error.message
        }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: 'Unknown error occurred' 
      }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Ensure GitHub session exists (required for onboarding)
    if (!session?.user?.login) {
      return NextResponse.json({ 
        error: 'GitHub authentication required', 
        message: 'You must be signed in with GitHub to complete onboarding.'
      }, { status: 401 });
    }

    const body = await request.json();

    // Validate that GitHub username matches session
    if (body.github_user_name && body.github_user_name !== session.user.login) {
      return NextResponse.json({ 
        error: 'Invalid GitHub username',
        message: 'GitHub username in request does not match authenticated session.'
      }, { status: 400 });
    }

    // Ensure github_user_name is set from session if not in body
    if (!body.github_user_name) {
      body.github_user_name = session.user.login;
    }
    
    const data = await submitOnboarding(body);
    console.log('User onboarded successfully:', data.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Onboarding error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      // Connection refused or network errors
      if (error.message.includes('Backend service unavailable')) {
        return NextResponse.json(
          { 
            error: 'Backend service unavailable',
            message: 'Unable to connect to the backend server. Please ensure the DataForge service is running.',
            details: error.message
          }, 
          { status: 503 }
        );
      }
      
      // Other errors
      return NextResponse.json(
        { 
          error: 'Internal server error', 
          message: error.message
        }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: 'Unknown error occurred' 
      }, 
      { status: 500 }
    );
  }
}

