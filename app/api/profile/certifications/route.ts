import { NextRequest, NextResponse } from 'next/server';
import { 
  fetchCertifications, 
  addCertification, 
  updateCertification, 
  deleteCertification 
} from '@/server/profile/mock';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    
    const data = await fetchCertifications(profileId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Certifications fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profileId') || 'default-profile';
    const body = await request.json();
    
    const data = await addCertification(profileId, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Certification add error:', error);
    return NextResponse.json(
      { error: 'Failed to add certification' },
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
    
    const data = await updateCertification(profileId, id, body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Certification update error:', error);
    return NextResponse.json(
      { error: 'Failed to update certification' },
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
    
    await deleteCertification(profileId, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Certification delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete certification' },
      { status: 500 }
    );
  }
}
