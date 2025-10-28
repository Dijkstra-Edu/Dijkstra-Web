import { NextRequest, NextResponse } from 'next/server';
import { 
  fetchTestScores, 
  addTestScore, 
  updateTestScore, 
  deleteTestScore 
} from '@/server/profile/mock';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    
    const data = await fetchTestScores(profileId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Test scores fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test scores' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    const body = await request.json();
    
    const data = await addTestScore(profileId, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Test score add error:', error);
    return NextResponse.json(
      { error: 'Failed to add test score' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    const id = searchParams.get('id');
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }
    
    const data = await updateTestScore(profileId, id, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Test score update error:', error);
    return NextResponse.json(
      { error: 'Failed to update test score' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }
    
    await deleteTestScore(profileId, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Test score delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete test score' },
      { status: 500 }
    );
  }
}
