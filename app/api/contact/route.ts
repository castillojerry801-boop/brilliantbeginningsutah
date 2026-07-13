import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { parentName, childName, childAge, phone, email, startDate, message } = body;

    if (!parentName || !childName || !childAge || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In production: send email via SendGrid/Resend/Nodemailer here.
    // For now, log the submission server-side.
    console.log('New enrollment inquiry:', {
      parentName,
      childName,
      childAge,
      phone,
      email,
      startDate,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
