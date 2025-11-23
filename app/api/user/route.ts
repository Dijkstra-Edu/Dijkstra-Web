import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { getUserByGithubUsername } from '@/server/dataforge/User/user';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const allData = searchParams.get('all_data') === 'true';

    if (!username) {
      return NextResponse.json({ error: 'Username parameter is required' }, { status: 400 });
    }

    const data = await getUserByGithubUsername(username, allData);
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
