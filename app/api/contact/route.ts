import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { parentName, childName, childAge, phone, email, startDate, message } = body;

    if (!parentName || !childName || !childAge || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to Supabase
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      parent_name: parentName,
      child_name: childName,
      child_age: childAge,
      phone,
      email,
      start_date: startDate || null,
      message: message || null,
    });

    if (dbError) {
      console.error('Supabase error:', dbError);
    }

    // Send email via Resend
    await resend.emails.send({
      from: 'Brilliant Beginnings Childcare <noreply@brilliantbeginningsutah.com>',
      to: 'brilliantbeginningschildcare@yahoo.com',
      replyTo: email,
      subject: `New Enrollment Inquiry — ${childName} (${childAge})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f4803e; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">🌈 New Enrollment Inquiry</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 4px 0 0;">Brilliant Beginnings Childcare</p>
          </div>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Parent Name</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${parentName}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Child's Name</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${childName}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Child's Age</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${childAge}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; font-weight: bold; color: #111827;"><a href="tel:${phone}" style="color: #f4803e;">${phone}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0; font-weight: bold; color: #111827;"><a href="mailto:${email}" style="color: #f4803e;">${email}</a></td></tr>
              ${startDate ? `<tr><td style="padding: 8px 0; color: #6b7280;">Start Date</td><td style="padding: 8px 0; font-weight: bold; color: #111827;">${startDate}</td></tr>` : ''}
              ${message ? `<tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Message</td><td style="padding: 8px 0; color: #111827;">${message}</td></tr>` : ''}
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #fff7ed; border-radius: 8px; border-left: 4px solid #f4803e;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">Reply directly to this email to contact ${parentName} at <strong>${email}</strong></p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
