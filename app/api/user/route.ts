import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const allData = searchParams.get('all_data') === 'true';

    if (!username) {
      return NextResponse.json({ error: 'Username parameter is required' }, { status: 400 });
    }

    const baseUrl = process.env.DATAFORGE_SERVICE_URL;
    
    if (!baseUrl) {
      console.error('DATAFORGE_SERVICE_URL not configured');
      return NextResponse.json({ 
        error: 'Backend service not configured',
        message: 'DATAFORGE_SERVICE_URL environment variable is not set' 
      }, { status: 500 });
    }

    // Remove trailing slash from baseUrl to avoid double slashes
    const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
    const endpoint = `${cleanBaseUrl}/Dijkstra/v1/u/${encodeURIComponent(username)}?all_data=${allData}`;

    console.log('Fetching user data:', endpoint);

    const response = await fetch(endpoint, { 
      method: "GET",
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      // Read response body as text first to avoid "body already read" error
      const responseText = await response.text();
      let errorData;
      
      try {
        // Try to parse the text as JSON
        errorData = JSON.parse(responseText);
      } catch (e) {
        // Response is not JSON
        console.error('Backend error (non-JSON):', response.status, responseText);
        errorData = { 
          error: 'Backend error',
          message: responseText || `HTTP ${response.status}: ${response.statusText}`
        };
      }
      
      console.error('Backend error:', response.status, errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    console.log('User data fetched successfully for:', username);
    return NextResponse.json(data);
  } catch (error) {
    console.error('User data fetch error:', error);
    
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
