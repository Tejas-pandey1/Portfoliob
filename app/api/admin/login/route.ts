import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

function sessionToken(secret: string) {
  return createHmac('sha256', secret).update('shadow-portfolio-admin').digest('hex')
}

export async function POST(request: Request) {
  // Set ADMIN_PASSWORD in Netlify for a private password. The default keeps first-time setup simple.
  const secret = process.env.ADMIN_PASSWORD || '123456'
  const body = await request.json().catch(() => null)
  if (!body || typeof body.password !== 'string') {
    return NextResponse.json({ error: 'Enter your admin password.' }, { status: 400 })
  }
  const expected = Buffer.from(sessionToken(secret))
  const supplied = Buffer.from(sessionToken(body.password))
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
    return NextResponse.json({ error: 'That password is not correct.' }, { status: 401 })
  }
  const response = NextResponse.json({ ok: true })
  response.cookies.set('shadow_portfolio_admin', sessionToken(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  return response
}
