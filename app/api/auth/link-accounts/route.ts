import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/authOptions';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { provider, data } = await request.json();
    
    // Store account data in HTTP cookies for persistence across sessions
    const response = NextResponse.json({ success: true });
    
    if (provider === 'github') {
      response.cookies.set('githubData', JSON.stringify(data), {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: false, // Allow client-side access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
    } else if (provider === 'linkedin') {
      response.cookies.set('linkedinData', JSON.stringify(data), {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: false, // Allow client-side access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
    }
    
    return response;
  } catch (error) {
    console.error('Account linking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const githubData = request.cookies.get('githubData')?.value;
    const linkedinData = request.cookies.get('linkedinData')?.value;
    
    return NextResponse.json({
      github: githubData ? JSON.parse(githubData) : null,
      linkedin: linkedinData ? JSON.parse(linkedinData) : null
    });
  } catch (error) {
    console.error('Account data retrieval error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
