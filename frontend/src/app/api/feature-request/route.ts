import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, featureTitle, description } = body;

    if (!name || !email || !featureTitle || !description) {
      return NextResponse.json(
        { status: '400', message: 'All fields are required' },
        { status: 400 }
      );
    }

    const backendUrl = config.API_URL || 'http://localhost:3001';
    await request({
      url: `${backendUrl}/api/feature-request`,
      method: 'POST',
      data: { name, email, featureTitle, description },
      runtime: 'server',
    });

    return NextResponse.json(
      { status: '200', message: 'Feature request submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Feature request error:', error);
    return NextResponse.json(
      { status: '500', message: 'Failed to submit feature request' },
      { status: 500 }
    );
  }
}
