import { NextRequest, NextResponse } from 'next/server';
import { 
  fetchEducation, 
  addEducation, 
  updateEducation, 
  deleteEducation 
} from '@/server/profile/mock';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    
    const data = await fetchEducation(profileId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Education fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    const body = await request.json();
    
    const data = await addEducation(profileId, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Education add error:', error);
    return NextResponse.json(
      { error: 'Failed to add education' },
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
    
    const data = await updateEducation(profileId, id, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Education update error:', error);
    return NextResponse.json(
      { error: 'Failed to update education' },
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
    
    await deleteEducation(profileId, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Education delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete education' },
      { status: 500 }
    );
  }
}
