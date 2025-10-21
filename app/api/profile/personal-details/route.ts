import { NextRequest, NextResponse } from 'next/server';
import { updatePersonalDetails } from '@/server/profile/mock';
import { getPersonalDetailsQuery } from '@/server/dataforge/User/QueryOptions/user.queryOptions';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'default-user';
    
    const data = await getPersonalDetailsQuery(username);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Personal details fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch personal details' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'default-user';
    const body = await request.json();
    
    const data = await updatePersonalDetails(username, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Personal details update error:', error);
    return NextResponse.json(
      { error: 'Failed to update personal details' },
      { status: 500 }
    );
  }
}
