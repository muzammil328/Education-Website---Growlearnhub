import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { status: '400', message: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    const backendUrl = config.API_URL || 'http://localhost:3001';
    await request({
      url: `${backendUrl}/api/contact`,
      method: 'POST',
      data: { name, email, phone, subject, message },
      runtime: 'server',
    });

    return NextResponse.json(
      { status: '200', message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ status: '500', message: 'Failed to send message' }, { status: 500 });
  }
}
