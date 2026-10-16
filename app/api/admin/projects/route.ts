import { getStore } from '@netlify/blobs'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import initialProjects from '@/data/projects.json'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const store = () => getStore('shadow-portfolio')
const key = 'projects'

function expectedSession(secret: string) {
  return createHmac('sha256', secret).update('shadow-portfolio-admin').digest('hex')
}

async function isAdmin() {
  const secret = process.env.ADMIN_PASSWORD || '123456'
  const jar = await cookies()
  const value = jar.get('shadow_portfolio_admin')?.value
  if (!value) return false
  const expected = Buffer.from(expectedSession(secret))
  const supplied = Buffer.from(value)
  return expected.length === supplied.length && timingSafeEqual(expected, supplied)
}

export async function GET() {
  try {
    const projects = await store().get(key, { type: 'json' }) as unknown
    return NextResponse.json(Array.isArray(projects) ? projects : initialProjects, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  } catch {
    // The bundled JSON keeps local previews usable; Netlify Blobs is used on the deployed site.
    return NextResponse.json(initialProjects, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Please sign in to edit projects.' }, { status: 401 })
  }

  const projects = await request.json().catch(() => null)
  if (!Array.isArray(projects) || projects.length > 200) {
    return NextResponse.json({ error: 'Project data must be a list of up to 200 projects.' }, { status: 400 })
  }

  for (const project of projects) {
    if (!project || typeof project.id !== 'string' || typeof project.title !== 'string' ||
      typeof project.category !== 'string' || typeof project.description !== 'string' ||
      typeof project.href !== 'string' || typeof project.image !== 'string' ||
      typeof project.linkLabel !== 'string' || typeof project.color !== 'string' ||
      !Array.isArray(project.stack) || typeof project.featured !== 'boolean') {
      return NextResponse.json({ error: 'One or more projects are missing required fields.' }, { status: 400 })
    }
    if (project.title.length > 120 || project.description.length > 2000 ||
      project.href.length > 500 || project.image.length > 500 ||
      project.stack.length > 30 || project.stack.some((item: unknown) => typeof item !== 'string' || item.length > 80)) {
      return NextResponse.json({ error: 'A project field is too long.' }, { status: 400 })
    }
  }

  try {
    await store().setJSON(key, projects)
    return NextResponse.json({
      ok: true,
      message: 'Saved to Netlify. Your updated projects are now available to everyone.',
    }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({
      error: 'Netlify storage was unavailable. Make sure this site is deployed on Netlify, then try again.',
    }, { status: 503 })
  }
}
