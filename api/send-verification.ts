import { Resend } from 'resend';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { email, fullName, role } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey || resendKey === 're_123456789') {
      console.warn('RESEND_API_KEY missing. Mocking verification email.');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: '[MOCK] Verification email sent via Resend to ' + email 
        }), 
        { status: 200 }
      );
    }

    const resend = new Resend(resendKey);

    const { data, error } = await resend.emails.send({
      from: 'De-Brill Learn <onboarding@resend.dev>', // You should update this to your verified domain
      to: [email],
      subject: 'Welcome to De-Brill Learn!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h1 style="color: #1B3A7A; text-align: center;">Welcome, ${fullName}!</h1>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            We're so excited to have you join De-Brill Learn as a <strong>${role}</strong>. 
            Our mission is to make phonics learning fun and accessible for everyone.
          </p>
          <div style="background-color: #F5F7FA; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; font-size: 14px; color: #888;">Please verify your email to start your journey.</p>
            <a href="#" style="display: inline-block; background-color: #F47920; color: white; padding: 12px 24px; text-decoration: none; border-radius: 20px; font-weight: bold; margin-top: 15px;">Verify Email</a>
          </div>
          <p style="font-size: 12px; color: #AAA; text-align: center; margin-top: 30px;">
            If you didn't create this account, please ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
