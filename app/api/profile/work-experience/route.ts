import { NextRequest, NextResponse } from 'next/server';
import { 
  fetchWorkExperience, 
  addWorkExperience, 
  updateWorkExperience, 
  deleteWorkExperience 
} from '@/server/profile/mock';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    
    const data = await fetchWorkExperience(profileId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Work experience fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch work experience' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    const body = await request.json();
    
    const data = await addWorkExperience(profileId, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Work experience add error:', error);
    return NextResponse.json(
      { error: 'Failed to add work experience' },
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
    
    const data = await updateWorkExperience(profileId, id, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Work experience update error:', error);
    return NextResponse.json(
      { error: 'Failed to update work experience' },
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
    
    await deleteWorkExperience(profileId, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Work experience delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete work experience' },
      { status: 500 }
    );
  }
}
