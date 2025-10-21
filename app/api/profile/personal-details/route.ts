import { NextRequest, NextResponse } from 'next/server';
import { fetchPersonalDetails, updatePersonalDetails } from '@/server/profile/mock';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default-user';
    
    const data = await fetchPersonalDetails(userId);
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
    const userId = searchParams.get('userId') || 'default-user';
    const body = await request.json();
    
    const data = await updatePersonalDetails(userId, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Personal details update error:', error);
    return NextResponse.json(
      { error: 'Failed to update personal details' },
      { status: 500 }
    );
  }
}
