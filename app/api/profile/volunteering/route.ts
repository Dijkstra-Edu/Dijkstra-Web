import { NextRequest, NextResponse } from 'next/server';
import { 
  fetchVolunteering, 
  addVolunteering, 
  updateVolunteering, 
  deleteVolunteering 
} from '@/server/profile/mock';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    
    const data = await fetchVolunteering(profileId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Volunteering fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch volunteering' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    const body = await request.json();
    
    const data = await addVolunteering(profileId, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Volunteering add error:', error);
    return NextResponse.json(
      { error: 'Failed to add volunteering' },
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
    
    const data = await updateVolunteering(profileId, id, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Volunteering update error:', error);
    return NextResponse.json(
      { error: 'Failed to update volunteering' },
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
    
    await deleteVolunteering(profileId, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Volunteering delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete volunteering' },
      { status: 500 }
    );
  }
}
