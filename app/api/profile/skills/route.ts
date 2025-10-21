import { NextRequest, NextResponse } from 'next/server';
import { 
  fetchSkills, 
  addSkill, 
  updateSkill, 
  deleteSkill 
} from '@/server/profile/mock';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    
    const data = await fetchSkills(profileId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Skills fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    const body = await request.json();
    
    const data = await addSkill(profileId, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Skill add error:', error);
    return NextResponse.json(
      { error: 'Failed to add skill' },
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
    
    const data = await updateSkill(profileId, id, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Skill update error:', error);
    return NextResponse.json(
      { error: 'Failed to update skill' },
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
    
    await deleteSkill(profileId, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Skill delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
}
