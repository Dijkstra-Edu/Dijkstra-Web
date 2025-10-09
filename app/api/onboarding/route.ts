import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const check = searchParams.get('check');
    const username = searchParams.get('username');

    if (check !== 'true' || !username) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const baseUrl = process.env.DATAFORGE_SERVICE_URL;
    
    if (!baseUrl) {
      console.error('DATAFORGE_SERVICE_URL not configured');
      return NextResponse.json({ 
        error: 'Backend service not configured',
        message: 'DATAFORGE_SERVICE_URL environment variable is not set' 
      }, { status: 500 });
    }

    const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
    const endpoint = `${cleanBaseUrl}/Dijkstra/v1/u/onboard?check=true&username=${encodeURIComponent(username)}`;

    console.log('Checking onboarding status:', endpoint);

    const response = await fetch(endpoint, { method: "GET" });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        const errorText = await response.text();
        console.error('Backend error (non-JSON):', response.status, errorText);
        errorData = { 
          error: 'Backend error',
          message: errorText || `HTTP ${response.status}: ${response.statusText}`
        };
      }
      
      console.error('Backend error:', response.status, errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    console.log('Onboarding status check result:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Onboarding status check error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED') || error.message.includes('fetch failed')) {
        return NextResponse.json(
          { 
            error: 'Backend service unavailable',
            message: 'Unable to connect to the backend server. Please ensure the DataForge service is running.',
            details: `Connection to ${process.env.DATAFORGE_SERVICE_URL} failed`
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
    
    if (!session?.user?.login) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const baseUrl = process.env.DATAFORGE_SERVICE_URL;
    
    if (!baseUrl) {
      console.error('DATAFORGE_SERVICE_URL not configured');
      return NextResponse.json({ 
        error: 'Backend service not configured',
        message: 'DATAFORGE_SERVICE_URL environment variable is not set' 
      }, { status: 500 });
    }

    const body = await request.json();

    // Remove trailing slash from baseUrl to avoid double slashes
    const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
    const endpoint = `${cleanBaseUrl}/Dijkstra/v1/u/onboard`;

    console.log('Calling backend:', endpoint);
    console.log('Request data:', { 
      github_user_name: body.github_user_name,
      primary_specialization: body.primary_specialization,
      secondary_specializations: body.secondary_specializations,
      selectedTools: `${body.selectedTools?.length || 0} tools`,
      dreamCompany: body.dreamCompany,
      dreamRole: body.dreamRole,
    });
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Check if response is ok BEFORE trying to parse JSON
    if (!response.ok) {
      // Try to parse as JSON, but handle cases where it's not JSON
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // Response is not JSON, get as text instead
        const errorText = await response.text();
        console.error('Backend error (non-JSON):', response.status, errorText);
        errorData = { 
          error: 'Backend error',
          message: errorText || `HTTP ${response.status}: ${response.statusText}`
        };
      }
      
      console.error('Backend error:', response.status, errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    // Response is ok, now parse the JSON
    const data = await response.json();
    console.log('User onboarded successfully:', data.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Onboarding error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      // Connection refused or network errors
      if (error.message.includes('ECONNREFUSED') || error.message.includes('fetch failed')) {
        return NextResponse.json(
          { 
            error: 'Backend service unavailable',
            message: 'Unable to connect to the backend server. Please ensure the DataForge service is running.',
            details: `Connection to ${process.env.DATAFORGE_SERVICE_URL} failed`
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

