import { NextRequest, NextResponse } from 'next/server';
import { 
  fetchPublications, 
  addPublication, 
  updatePublication, 
  deletePublication 
} from '@/server/profile/mock';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    
    const data = await fetchPublications(profileId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Publications fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch publications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    const body = await request.json();
    
    const data = await addPublication(profileId, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Publication add error:', error);
    return NextResponse.json(
      { error: 'Failed to add publication' },
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
    
    const data = await updatePublication(profileId, id, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Publication update error:', error);
    return NextResponse.json(
      { error: 'Failed to update publication' },
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
    
    await deletePublication(profileId, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Publication delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete publication' },
      { status: 500 }
    );
  }
}
