import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendLeadNotification(lead: { name: string; email: string; phone: string; service?: string | null; message?: string | null; address?: string | null }) {
  if (!resend) {
    console.warn('RESEND_API_KEY not set, skipping email')
    return
  }
  try {
    await resend.emails.send({
      from: 'Kings Roofs <onboarding@resend.dev>',
      to: 'info@kingsroofsbristol.co.uk',
      subject: `New Lead: ${lead.name} - ${lead.service || 'General Enquiry'}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#3D5A3C;padding:32px 24px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:24px;">Kings Roofs Bristol</h1>
            <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">New Booking Enquiry</p>
          </div>
          <div style="padding:32px 24px;background:#fff;">
            <h2 style="color:#2C2C2C;font-size:18px;margin:0 0 24px;">Lead Details</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:12px 0;border-bottom:1px solid #E8E6E1;color:#6B6B6B;font-size:13px;width:120px;">Name</td><td style="padding:12px 0;border-bottom:1px solid #E8E6E1;color:#2C2C2C;font-size:14px;font-weight:500;">${lead.name}</td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid #E8E6E1;color:#6B6B6B;font-size:13px;">Email</td><td style="padding:12px 0;border-bottom:1px solid #E8E6E1;color:#2C2C2C;font-size:14px;">${lead.email}</td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid #E8E6E1;color:#6B6B6B;font-size:13px;">Phone</td><td style="padding:12px 0;border-bottom:1px solid #E8E6E1;color:#2C2C2C;font-size:14px;">${lead.phone}</td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid #E8E6E1;color:#6B6B6B;font-size:13px;">Service</td><td style="padding:12px 0;border-bottom:1px solid #E8E6E1;color:#2C2C2C;font-size:14px;">${lead.service || 'General Enquiry'}</td></tr>
              <tr><td style="padding:12px 0;border-bottom:1px solid #E8E6E1;color:#6B6B6B;font-size:13px;">Address</td><td style="padding:12px 0;border-bottom:1px solid #E8E6E1;color:#2C2C2C;font-size:14px;">${lead.address || 'Not provided'}</td></tr>
              <tr><td style="padding:12px 0;color:#6B6B6B;font-size:13px;vertical-align:top;">Message</td><td style="padding:12px 0;color:#2C2C2C;font-size:14px;">${lead.message || 'No message'}</td></tr>
            </table>
          </div>
          <div style="background:#F5F4F1;padding:20px 24px;text-align:center;">
            <p style="color:#9B9B9B;font-size:12px;margin:0;">This email was sent automatically from the Kings Roofs Bristol website.</p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error('Failed to send email:', err)
  }
}
