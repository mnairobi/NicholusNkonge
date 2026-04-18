import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema } from '@/lib/validations'
import { z } from 'zod'

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting store (in-memory, resets on cold start — sufficient for serverless)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function getRateLimitInfo(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour window
  const maxRequests = 5 // max 5 requests per IP per hour

  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: maxRequests - record.count }
}

// Email HTML template
function buildEmailHtml(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Contact: ${data.subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#050508;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050508;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0A0A0F;border-radius:16px;border:1px solid #252535;overflow:hidden;max-width:600px;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#00F0FF22,#00FF9911);padding:32px;border-bottom:1px solid #252535;">
              <p style="margin:0;font-family:'Courier New',monospace;color:#00F0FF;font-size:12px;text-transform:uppercase;letter-spacing:3px;margin-bottom:8px;">
                Portfolio Contact Form
              </p>
              <h1 style="margin:0;color:#F0F0F8;font-size:24px;font-weight:700;">${data.subject}</h1>
            </td>
          </tr>
          <!-- Sender Info -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #1A1A26;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;">
                    <p style="margin:0;color:#606078;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">From</p>
                    <p style="margin:0;color:#F0F0F8;font-size:15px;font-weight:600;">${data.name}</p>
                  </td>
                  <td style="padding:8px 0;">
                    <p style="margin:0;color:#606078;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Reply To</p>
                    <a href="mailto:${data.email}" style="color:#00F0FF;text-decoration:none;font-size:15px;">${data.email}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Message -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;color:#606078;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>
              <div style="background:#12121A;border-radius:12px;padding:24px;border:1px solid #1A1A26;">
                <p style="margin:0;color:#A0A0B8;font-size:15px;line-height:1.7;white-space:pre-wrap;">${data.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;background:#0A0A0F;border-top:1px solid #1A1A26;text-align:center;">
              <p style="margin:0;color:#606078;font-size:12px;">
                Sent via your portfolio contact form at ${new Date().toLocaleString()}
              </p>
              <a href="mailto:${data.email}" 
                 style="display:inline-block;margin-top:16px;padding:12px 24px;background:#00F0FF;color:#050508;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
                Reply to ${data.name}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export async function POST(request: NextRequest) {
  try {
    // ── Rate Limiting ─────────────────────────────────────────
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'

    const { allowed } = getRateLimitInfo(ip)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before sending another message.' },
        { status: 429 }
      )
    }

    // ── Parse & Validate Body ─────────────────────────────────
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400 }
      )
    }

    const validation = contactFormSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed.',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const { name, email, subject, message } = validation.data

    // ── Environment check ─────────────────────────────────────
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 503 }
      )
    }

    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'
    const toEmail = process.env.CONTACT_EMAIL

    if (!toEmail) {
      console.error('CONTACT_EMAIL is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 503 }
      )
    }

    // ── Send Email via Resend ─────────────────────────────────
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: [toEmail],
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      html: buildEmailHtml({ name, email, subject, message }),
      text: `New contact from: ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    // ── Success ───────────────────────────────────────────────
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!',
        id: data?.id,
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

// Block non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}