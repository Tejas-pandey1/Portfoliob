import { list, put } from '@vercel/blob'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const key = 'portfolio/site-settings.json'
const defaults = {
  mascot: '',
  contactButtons: [
    { id: 'discord', label: 'Contact me on Discord', detail: 'Message me about a project', href: 'https://discord.gg/uVVfQFE9Cm', icon: 'MessageCircle', color: 'sky', enabled: true },
    { id: 'fiverr', label: 'Hire me on Fiverr', detail: 'For freelance projects', href: 'https://www.fiverr.com/shadowknightrpg?public_mode=true', icon: 'BriefcaseBusiness', color: 'mint', enabled: true },
  ],
}
function token(secret: string) { return createHmac('sha256', secret).update('shadow-portfolio-admin').digest('hex') }
async function admin() {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) return false
  const jar = await cookies()
  const value = jar.get('shadow_portfolio_admin')?.value
  if (!value) return false
  const a = Buffer.from(token(secret)), b = Buffer.from(value)
  return a.length === b.length && timingSafeEqual(a, b)
}
async function readSettings() {
  const { blobs } = await list({ prefix: key, limit: 10 })
  const blob = blobs.find((item) => item.pathname === key)
  if (!blob) return defaults
  const response = await fetch(blob.url, { cache: 'no-store' })
  if (!response.ok) throw new Error('Could not read saved site settings.')
  const saved: unknown = await response.json()
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return defaults
  return { ...defaults, ...(saved as Record<string, unknown>) }
}
export async function GET(request: Request) {
  let settings = defaults
  try {
    settings = await readSettings()
  } catch {}
  const section = new URL(request.url).searchParams.get('section')
  const result = section === 'contact' ? { contactButtons: settings.contactButtons }
    : section === 'mascot' ? { mascot: settings.mascot }
    : settings
  return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store, max-age=0' } })
}
export async function POST(request: Request) {
  if (!(await admin())) return NextResponse.json({ error: 'Please sign in to edit site settings.' }, { status: 401 })
  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object' || Array.isArray(body)) return NextResponse.json({ error: 'Invalid settings.' }, { status: 400 })
  const mascot = typeof body.mascot === 'string' ? body.mascot : ''
  const buttons = body.contactButtons
  if (mascot.length > 2500000) return NextResponse.json({ error: 'Mascot image is too large. Use an image under about 1.5 MB.' }, { status: 413 })
  if (!Array.isArray(buttons) || buttons.length > 5) return NextResponse.json({ error: 'Use up to five contact buttons.' }, { status: 400 })
  for (const item of buttons) {
    if (!item || typeof item.id !== 'string' || typeof item.label !== 'string' || typeof item.detail !== 'string' || typeof item.href !== 'string' || typeof item.icon !== 'string' || typeof item.color !== 'string' || typeof item.enabled !== 'boolean') return NextResponse.json({ error: 'One or more contact buttons are invalid.' }, { status: 400 })
    if (item.label.length > 90 || item.detail.length > 140 || item.href.length > 500) return NextResponse.json({ error: 'A contact button field is too long.' }, { status: 400 })
  }
  if (mascot && !mascot.startsWith('data:image/')) return NextResponse.json({ error: 'Upload a supported image file.' }, { status: 400 })
  try {
    await put(key, JSON.stringify({ mascot, contactButtons: buttons }), {
      access: 'public',
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: 'application/json; charset=utf-8',
      cacheControlMaxAge: 60,
    })
    return NextResponse.json({ ok: true, message: 'Site settings saved to Vercel Blob. Your changes are live.' }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Could not save site settings to Vercel. Open your Vercel project, go to Storage, create a Blob store, and connect it to this project so BLOB_READ_WRITE_TOKEN is added. Then redeploy and save again.' }, { status: 503 })
  }
}
