import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, url, description } = body;

    if (!name || !email || !subject || !description) {
      return NextResponse.json(
        { status: '400', message: 'All fields are required' },
        { status: 400 }
      );
    }

    const backendUrl = config.API_URL || 'http://localhost:3001';
    await request({
      url: `${backendUrl}/api/bug-report`,
      method: 'POST',
      data: { name, email, subject, url, description },
      runtime: 'server',
    });

    return NextResponse.json(
      { status: '200', message: 'Bug report submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Bug report error:', error);
    return NextResponse.json(
      { status: '500', message: 'Failed to submit bug report' },
      { status: 500 }
    );
  }
}
